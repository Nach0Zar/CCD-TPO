from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from bson import ObjectId
import os

from etl.database.mongo_handler import MongoDBHandler

# Cargar variables de entorno
load_dotenv()

# Leer los datos desde .env (ya probaste que funciona)
MONGO_URI = os.getenv("MONGODB_URI")
MONGO_DB_NAME = os.getenv("MONGODB_DATABASE", "ecommerce_brazil")

# Conexión a Mongo
db_handler = MongoDBHandler(MONGO_URI, MONGO_DB_NAME)
if not db_handler.connect():
    raise RuntimeError("No se pudo conectar a MongoDB. Revisar el archivo .env")

# Iniciar FastAPI
app = FastAPI(
    title="TPO - API de Modelos",
    description="API para consultar resultados de clustering desde MongoDB",
    version="1.0.0"
)

# 🔄 Helper para convertir ObjectId en string
def serialize(doc):
    if "_id" in doc and isinstance(doc["_id"], ObjectId):
        doc["_id"] = str(doc["_id"])
    return doc

def fetch_collection(collection_name: str, limit: int = 100):
    if db_handler.db is None:
        raise HTTPException(status_code=500, detail="DB no inicializada")

    docs = list(db_handler.db[collection_name].find().limit(limit))
    return [serialize(d) for d in docs]


# 📌 ENDPOINTS — UN ENDPOINT POR MODELO (PEDIDO EXACTO)
@app.get("/models/gmm")
def get_gmm(limit: int = 100):
    data = fetch_collection("processed_results_gmm", limit)
    return {"model": "gmm", "count": len(data), "data": data}

@app.get("/models/kmeans")
def get_kmeans(limit: int = 100):
    data = fetch_collection("processed_results_kmeans", limit)
    return {"model": "kmeans", "count": len(data), "data": data}

@app.get("/models/minibatch")
def get_minibatch(limit: int = 100):
    data = fetch_collection("processed_results_minibatch", limit)
    return {"model": "minibatch", "count": len(data), "data": data}


# 🔍 Endpoint opcional para DEBUG
@app.get("/collections/{name}")
def get_collection(name: str, limit: int = 50):
    data = fetch_collection(name, limit)
    return {"collection": name, "count": len(data), "data": data}
