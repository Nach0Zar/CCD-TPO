import os
from typing import Any, Dict, List

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

# ============================================================
# Carga de configuración y conexión a MongoDB
# ============================================================

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DATABASE = os.getenv("MONGODB_DATABASE", "ecommerce_brazil")

if not MONGODB_URI:
    raise RuntimeError(
        "MONGODB_URI no está definido. "
        "Creá un archivo .env basado en .env.example y completa MONGODB_URI."
    )

# Conexión directa con PyMongo
client = MongoClient(MONGODB_URI)
db = client[MONGODB_DATABASE]


def fetch_collection(
    collection_name: str,
    limit: int | None = None,
) -> List[Dict[str, Any]]:
    """
    Devuelve documentos de una colección como lista de dicts.
    Convierte los ObjectId de Mongo (_id) a str para que FastAPI
    pueda serializarlos a JSON sin errores.
    """
    try:
        collection = db[collection_name]
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error accediendo a la colección '{collection_name}': {exc}",
        )

    cursor = collection.find()
    if limit is not None:
        cursor = cursor.limit(limit)

    docs = list(cursor)

    # Convertir ObjectId -> str
    for doc in docs:
        if "_id" in doc:
            doc["_id"] = str(doc["_id"])

    return docs


# ============================================================
# Inicialización de FastAPI
# ============================================================

app = FastAPI(
    title="CCD – API Modelos de Clustering",
    description=(
        "API para exponer resultados procesados del ETL de e-commerce Brazil.\n\n"
        "Colecciones principales:\n"
        "- customers, sellers, products, order_items, geolocation,\n"
        "- economic_indicators,\n"
        "- processed_results_gmm, processed_results_kmeans, processed_results_minibatch."
    ),
    version="1.0.0",
)

# CORS básico para que el front pueda consumir sin problemas
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # si quieren, más adelante se puede restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# Endpoints utilitarios
# ============================================================

@app.get("/", summary="Ping básico")
async def root() -> Dict[str, str]:
    """Endpoint simple para verificar que el backend está vivo."""
    return {"message": "API de clustering CCD-TPO operativa"}


@app.get("/health", summary="Healthcheck de MongoDB")
async def healthcheck() -> Dict[str, Any]:
    """Verifica conexión con MongoDB y devuelve info mínima."""
    try:
        db_names = client.list_database_names()
        return {
            "status": "ok",
            "databases": db_names,
            "active_database": MONGODB_DATABASE,
        }
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error conectando a MongoDB: {exc}",
        )


# ============================================================
# Endpoints de modelos (GMM, KMeans, MiniBatch)
# ============================================================

def _get_model_results(collection_name: str, model_name: str) -> Dict[str, Any]:
    """
    Función común para leer las colecciones processed_results_*.

    Cada una tiene hoy un único documento con:
    - timestamp
    - metrics
    - economic_analysis
    - delivery_stats
    - warehouses (array)
    - cluster_logs (array)
    - notes
    """
    docs = fetch_collection(collection_name, limit=1)

    return {
        "model": model_name,
        "count": len(docs),
        "data": docs,
    }


@app.get("/models/gmm", summary="Resultados del modelo GMM")
async def get_gmm(
    limit: int = Query(1, ge=1, le=100),  # se mantiene por compatibilidad
) -> Dict[str, Any]:
    return _get_model_results("processed_results_gmm", "gmm")


@app.get("/models/kmeans", summary="Resultados del modelo KMeans")
async def get_kmeans(
    limit: int = Query(1, ge=1, le=100),
) -> Dict[str, Any]:
    return _get_model_results("processed_results_kmeans", "kmeans")


@app.get("/models/minibatch", summary="Resultados del modelo MiniBatch KMeans")
async def get_minibatch(
    limit: int = Query(1, ge=1, le=100),
) -> Dict[str, Any]:
    return _get_model_results("processed_results_minibatch", "minibatch")



# ============================================================
# Endpoints espaciales para el front (warehouses)
# ============================================================

@app.get(
    "/models/gmm/warehouses",
    summary="Datos espaciales (warehouses) del modelo GMM",
)
async def get_gmm_warehouses() -> Dict[str, Any]:
    docs = fetch_collection("processed_results_gmm", limit=1)
    if not docs:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron resultados procesados para GMM.",
        )

    warehouses = docs[0].get("warehouses", [])
    return {
        "model": "gmm",
        "warehouses": warehouses,
    }


@app.get(
    "/models/kmeans/warehouses",
    summary="Datos espaciales (warehouses) del modelo KMeans",
)
async def get_kmeans_warehouses() -> Dict[str, Any]:
    docs = fetch_collection("processed_results_kmeans", limit=1)
    if not docs:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron resultados procesados para KMeans.",
        )

    warehouses = docs[0].get("warehouses", [])
    return {
        "model": "kmeans",
        "warehouses": warehouses,
    }


@app.get(
    "/models/minibatch/warehouses",
    summary="Datos espaciales (warehouses) del modelo MiniBatch KMeans",
)
async def get_minibatch_warehouses() -> Dict[str, Any]:
    docs = fetch_collection("processed_results_minibatch", limit=1)
    if not docs:
        raise HTTPException(
            status_code=404,
            detail="No se encontraron resultados procesados para MiniBatch KMeans.",
        )

    warehouses = docs[0].get("warehouses", [])
    return {
        "model": "minibatch",
        "warehouses": warehouses,
    }

# ============================================================
# Endpoint genérico para inspeccionar colecciones
# ============================================================

@app.get(
    "/collections/{name}",
    summary="Obtener documentos de una colección arbitraria",
)
async def get_collection(
    name: str,
    limit: int = Query(100, ge=1, le=10_000),
) -> Dict[str, Any]:
    """
    Devuelve documentos crudos de cualquier colección del schema ecommerce_brazil.

    Ejemplos útiles:
    - /collections/customers
    - /collections/sellers
    - /collections/products
    - /collections/order_items
    - /collections/geolocation
    - /collections/economic_indicators
    - /collections/processed_results_gmm
    - /collections/processed_results_kmeans
    - /collections/processed_results_minibatch
    """
    try:
        docs = fetch_collection(name, limit=limit)
    except HTTPException:
        # si fue un error nuestro de acceso, lo dejamos pasar tal cual
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error obteniendo colección '{name}': {exc}",
        )

    return {
        "collection": name,
        "count": len(docs),
        "data": docs,
    }


# ============================================================
# Endpoints especializados para las colecciones base
# ============================================================

@app.get("/collections/customers/basic", summary="Listado básico de customers")
async def get_basic_customers(limit: int = Query(100, ge=1, le=1000)):
    docs = fetch_collection("customers", limit=limit)

    # Devolver solo campos clave
    customers = [
        {
            "customer_id": doc.get("customer_id"),
            "state": doc.get("customer_state"),
            "city": doc.get("customer_city"),
            "lat": doc.get("geolocation", {}).get("lat", None),
            "lon": doc.get("geolocation", {}).get("lon", None)
        }
        for doc in docs
    ]
    return {"count": len(customers), "customers": customers}


@app.get("/collections/sellers/basic", summary="Listado básico de sellers")
async def get_basic_sellers(limit: int = Query(100, ge=1, le=1000)):
    docs = fetch_collection("sellers", limit=limit)
    sellers = [
        {
            "seller_id": doc.get("seller_id"),
            "state": doc.get("seller_state"),
            "city": doc.get("seller_city"),
            "lat": doc.get("geolocation", {}).get("lat", None),
            "lon": doc.get("geolocation", {}).get("lon", None)
        }
        for doc in docs
    ]
    return {"count": len(sellers), "sellers": sellers}




@app.get("/collections/geolocation", summary="Datos crudos de geolocalización")
async def get_geolocation(limit: int = Query(100, ge=1, le=1000)):
    docs = fetch_collection("geolocation", limit=limit)
    return {"count": len(docs), "data": docs}


@app.get("/collections/economic_indicators", summary="Datos de indicadores económicos")
async def get_economic_indicators(limit: int = Query(100, ge=1, le=1000)):
    docs = fetch_collection("economic_indicators", limit=limit)
    return {"count": len(docs), "data": docs}
