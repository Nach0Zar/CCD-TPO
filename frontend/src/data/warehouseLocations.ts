import type { AlgorithmType, PredictiveWarehouse } from "@/services/predictiveTypes";

const gmmLocations: PredictiveWarehouse[] = [
    {
      "warehouse_id": 0,
      "latitude": -22.63847482067538,
      "longitude": -42.03269986663262,
      "customer_count": 1013,
      "density_ratio": 0.0102,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.53,
      "top_items": [
        "3713f19c71c4be21ced80738e2fa49bc",
        "99a4788cb24856965c36a24e339b6058",
        "7a5df623713bbcb94a51ea4540748c12",
        "9d9734db712d5ab6c3ff4c33700eb34c",
        "a49969155f3a64afc931fd281444b2b6"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1374,
      "estimated_customer_growth_2y": 1864
    },
    {
      "warehouse_id": 1,
      "latitude": -23.380083798204627,
      "longitude": -51.61121965715213,
      "customer_count": 898,
      "density_ratio": 0.0091,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.36,
      "top_items": [
        "a9516a079e37a9c9c36b9b78b10169e8",
        "74437e600638a59559c5238c84805b76",
        "8701ef265f73fd18064df16faa4104ae",
        "53759a2ecddad2bb87a079a1f1519f73",
        "79706e79825f7409ef032653a271fba2"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1218,
      "estimated_customer_growth_2y": 1652
    },
    {
      "warehouse_id": 2,
      "latitude": -12.970763463798008,
      "longitude": -38.45362644650968,
      "customer_count": 1364,
      "density_ratio": 0.0138,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 12.06,
      "top_items": [
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "03d10117bf5dbd1e4f194566be73de5a",
        "554e48b94bf084525ae0fb37b9ed7f84",
        "1a080577618e7fe4d9ddd8fb2b47a964",
        "50fd2b788dc166edd20512370dac54df"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1850,
      "estimated_customer_growth_2y": 2510
    },
    {
      "warehouse_id": 3,
      "latitude": -23.490017226404653,
      "longitude": -46.48780184390829,
      "customer_count": 5814,
      "density_ratio": 0.0586,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 18.79,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "99a4788cb24856965c36a24e339b6058",
        "154e7e31ebfa092203795c972e5804a6",
        "389d119b48cf3043d311335e499d9c6b",
        "e0cf79767c5b016251fe139915c59a26"
      ],
      "note": "Subcluster automático",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 7887,
      "estimated_customer_growth_2y": 10701
    },
    {
      "warehouse_id": 65,
      "latitude": -23.666409004201284,
      "longitude": -46.562426734472304,
      "customer_count": 7135,
      "density_ratio": 0.072,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 20.79,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "99a4788cb24856965c36a24e339b6058",
        "154e7e31ebfa092203795c972e5804a6",
        "389d119b48cf3043d311335e499d9c6b",
        "e0cf79767c5b016251fe139915c59a26"
      ],
      "note": "Subcluster automático",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 9680,
      "estimated_customer_growth_2y": 13132
    },
    {
      "warehouse_id": 66,
      "latitude": -23.561798429007524,
      "longitude": -46.73579353201526,
      "customer_count": 12304,
      "density_ratio": 0.1241,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 25,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "99a4788cb24856965c36a24e339b6058",
        "154e7e31ebfa092203795c972e5804a6",
        "389d119b48cf3043d311335e499d9c6b",
        "e0cf79767c5b016251fe139915c59a26"
      ],
      "note": "Subcluster automático",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 16692,
      "estimated_customer_growth_2y": 22647
    },
    {
      "warehouse_id": 4,
      "latitude": -19.916978114535084,
      "longitude": -43.958170330888606,
      "customer_count": 3328,
      "density_ratio": 0.0336,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 15.03,
      "top_items": [
        "362b773250263786dd58670d2df42c3b",
        "389d119b48cf3043d311335e499d9c6b",
        "368c6c730842d78016ad823897a372db",
        "99a4788cb24856965c36a24e339b6058",
        "aca2eb7d00ea1a7b8ebd4e68314663af"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 4515,
      "estimated_customer_growth_2y": 6125
    },
    {
      "warehouse_id": 5,
      "latitude": -1.4297352528860983,
      "longitude": -48.46431155920027,
      "customer_count": 513,
      "density_ratio": 0.0052,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.78,
      "top_items": [
        "bb50f2e236e5eea0100680137654686c",
        "2635c3e7db0ac6cb3e733cac61ce0ba5",
        "4ae634441e444ca4bc85903cafe98d73",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "6b54c329383ae411a34c9791f7a51145"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 695,
      "estimated_customer_growth_2y": 944
    },
    {
      "warehouse_id": 6,
      "latitude": -31.868027819218327,
      "longitude": -52.298849087735725,
      "customer_count": 400,
      "density_ratio": 0.004,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.61,
      "top_items": [
        "d3c044bd42d84a79e3b0c42662806a48",
        "3ece1fcd5a64459a4e24143920178f42",
        "b3b0bce74668bf355cbd94db1e4d17b9",
        "2b2d98d1e9b6f68a472c5ace64d704fa",
        "422879e10f46682990de24d770e7f83d"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 542,
      "estimated_customer_growth_2y": 736
    },
    {
      "warehouse_id": 7,
      "latitude": -16.695639722498544,
      "longitude": -49.27079706339725,
      "customer_count": 774,
      "density_ratio": 0.0078,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.17,
      "top_items": [
        "37eb69aca8718e843d897aa7b82f462d",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "9571759451b1d780ee7c15012ea109d4",
        "19c91ef95d509ea33eda93495c4d3481",
        "ba80c9f47a84d1e08465f72e22930c83"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1050,
      "estimated_customer_growth_2y": 1424
    },
    {
      "warehouse_id": 8,
      "latitude": -26.01008203854364,
      "longitude": -49.37061398064483,
      "customer_count": 1421,
      "density_ratio": 0.0143,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 12.15,
      "top_items": [
        "154e7e31ebfa092203795c972e5804a6",
        "a62e25e09e05e6faf31d90c6ec1aa3d1",
        "cb61986817d2a774d7c902dbbce84342",
        "368c6c730842d78016ad823897a372db",
        "53759a2ecddad2bb87a079a1f1519f73"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1927,
      "estimated_customer_growth_2y": 2615
    },
    {
      "warehouse_id": 9,
      "latitude": -15.452739284617868,
      "longitude": -56.26417173857239,
      "customer_count": 541,
      "density_ratio": 0.0055,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.82,
      "top_items": [
        "90b58782fdd04cb829667fcc41fb65f5",
        "33202a8e7a645388c41ed714203d7131",
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "cec51758e9839eb5414b214934430da6",
        "f32415d23c358ef1e387a7d329d9ce9f"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 733,
      "estimated_customer_growth_2y": 995
    },
    {
      "warehouse_id": 10,
      "latitude": -7.098423304675071,
      "longitude": -35.33114280838573,
      "customer_count": 1119,
      "density_ratio": 0.0113,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.69,
      "top_items": [
        "09c3a2ea33f044aebffecd6681e00133",
        "bb50f2e236e5eea0100680137654686c",
        "a62e25e09e05e6faf31d90c6ec1aa3d1",
        "e5f3a09149ee7db697907f61e7366267",
        "480be8d20c4b6a7df1eae0f2c17f2db2"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1518,
      "estimated_customer_growth_2y": 2059
    },
    {
      "warehouse_id": 11,
      "latitude": -21.82678023584842,
      "longitude": -47.95266827100175,
      "customer_count": 1431,
      "density_ratio": 0.0144,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 12.16,
      "top_items": [
        "ec3f8e78677c7e0395b155bc67417158",
        "cc5c6bf704a4b642e8964b5b2dcdb0da",
        "422879e10f46682990de24d770e7f83d",
        "3dd2a17168ec895c781a9191c1e95ad7",
        "437c05a395e9e47f9762e677a7068ce7"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1941,
      "estimated_customer_growth_2y": 2633
    },
    {
      "warehouse_id": 12,
      "latitude": -8.757746810900985,
      "longitude": -63.87791816184753,
      "customer_count": 117,
      "density_ratio": 0.0012,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.18,
      "top_items": [
        "84d0e98e468edffdfe4f1f5b178d4ecc",
        "1a4f338579cef9360aa407e3d97b4c89",
        "caf1ca4c82e6ab734903a3407795f556",
        "e891d4a9622cae3b9fc2ec558bda155b",
        "7f0340808fbbaa6d3a3122e72a394795"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 158,
      "estimated_customer_growth_2y": 215
    },
    {
      "warehouse_id": 13,
      "latitude": -30.03389721743563,
      "longitude": -51.19809382262916,
      "customer_count": 1846,
      "density_ratio": 0.0186,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.79,
      "top_items": [
        "f3720bc68555b1bff49b9ffd41b017ac",
        "e7cc48a9daff5436f63d3aad9426f28b",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "d55487f6b9833914549348cc2839f9e9",
        "ec2d43cc59763ec91694573b31f1c29a"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 2504,
      "estimated_customer_growth_2y": 3397
    },
    {
      "warehouse_id": 14,
      "latitude": -20.296728450067203,
      "longitude": -40.289008304305206,
      "customer_count": 1142,
      "density_ratio": 0.0115,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.73,
      "top_items": [
        "e0d64dcfaa3b6db5c54ca298ae101d05",
        "f713c90e84b1bf2e157637d63fe09a68",
        "0b2d8323940867a9979b90f7692dcbc0",
        "2fea0f2cec6b6324a277d4a61c2ed2c6",
        "924c635d837c240da3956f3c28c1e6f4"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1549,
      "estimated_customer_growth_2y": 2102
    },
    {
      "warehouse_id": 15,
      "latitude": -29.331323167761543,
      "longitude": -51.324208949438486,
      "customer_count": 2172,
      "density_ratio": 0.0219,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 13.29,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "389d119b48cf3043d311335e499d9c6b",
        "54d7ad85b648d3cb2b7069ed446d7f35",
        "5a848e4ab52fd5445cdc07aab1c40e48",
        "422879e10f46682990de24d770e7f83d"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 2946,
      "estimated_customer_growth_2y": 3997
    },
    {
      "warehouse_id": 16,
      "latitude": -16.727035487774288,
      "longitude": -43.86255020082331,
      "customer_count": 211,
      "density_ratio": 0.0021,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.32,
      "top_items": [
        "c4baedd846ed09b85f78a781b522f126",
        "16ce899c7af0c99f46948734a0d00f0f",
        "24c66f106f642621e524291a895c9032",
        "08574b074924071f4e201e151b152b4e",
        "1b474c650cb9407d32a1e066937b68fd"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 286,
      "estimated_customer_growth_2y": 388
    },
    {
      "warehouse_id": 17,
      "latitude": -22.90551216343245,
      "longitude": -43.395439168125904,
      "customer_count": 4755,
      "density_ratio": 0.048,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 17.19,
      "top_items": [
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "53b36df67ebb7c41585e8d54d6772e08",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "53759a2ecddad2bb87a079a1f1519f73",
        "422879e10f46682990de24d770e7f83d"
      ],
      "note": "Subcluster automático",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 6451,
      "estimated_customer_growth_2y": 8752
    },
    {
      "warehouse_id": 67,
      "latitude": -22.919183488260828,
      "longitude": -43.228383772440225,
      "customer_count": 4974,
      "density_ratio": 0.0502,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 17.52,
      "top_items": [
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "53b36df67ebb7c41585e8d54d6772e08",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "53759a2ecddad2bb87a079a1f1519f73",
        "422879e10f46682990de24d770e7f83d"
      ],
      "note": "Subcluster automático",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 6748,
      "estimated_customer_growth_2y": 9155
    },
    {
      "warehouse_id": 68,
      "latitude": -22.891813210501667,
      "longitude": -43.0985212162621,
      "customer_count": 1589,
      "density_ratio": 0.016,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.4,
      "top_items": [
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "53b36df67ebb7c41585e8d54d6772e08",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "53759a2ecddad2bb87a079a1f1519f73",
        "422879e10f46682990de24d770e7f83d"
      ],
      "note": "Subcluster automático",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 2155,
      "estimated_customer_growth_2y": 2924
    },
    {
      "warehouse_id": 18,
      "latitude": -18.917189844088323,
      "longitude": -48.272562966513966,
      "customer_count": 379,
      "density_ratio": 0.0038,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.57,
      "top_items": [
        "6e835aea84ae8eb68b8c14878dd43b30",
        "652ab2a1bee7f7f0ab475b06cd290865",
        "e932008cf0ea7c93a077dd8d7e5f49eb",
        "368c6c730842d78016ad823897a372db",
        "0a57f7d2c983bcf8188589a5fea4a8da"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 514,
      "estimated_customer_growth_2y": 697
    },
    {
      "warehouse_id": 19,
      "latitude": -4.713340260265525,
      "longitude": -41.998001675980284,
      "customer_count": 808,
      "density_ratio": 0.0081,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.22,
      "top_items": [
        "6cdd53843498f92890544667809f1595",
        "3eef0cb94ba82de806bb30ab743c7655",
        "95320d70592f898880af9c3d5394728c",
        "776ef0ee36e20757c513e64903f1fa8a",
        "165f86fe8b799a708a20ee4ba125c289"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1096,
      "estimated_customer_growth_2y": 1487
    },
    {
      "warehouse_id": 20,
      "latitude": -26.986719360996933,
      "longitude": -48.72955349534873,
      "customer_count": 702,
      "density_ratio": 0.0071,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.06,
      "top_items": [
        "8b50a72d52d7a91fb19d19fbe069e2f2",
        "de7087431dce1f95bf39105df32825cd",
        "10717ff440b2320081989126e858b220",
        "6ae7f4ef0ca670ca2609d039af87d057",
        "f00cc56c5df0c63515f85365d418e199"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 952,
      "estimated_customer_growth_2y": 1292
    },
    {
      "warehouse_id": 21,
      "latitude": -22.87522840609412,
      "longitude": -47.1452801835941,
      "customer_count": 4969,
      "density_ratio": 0.0501,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 17.52,
      "top_items": [
        "99a4788cb24856965c36a24e339b6058",
        "422879e10f46682990de24d770e7f83d",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "42a2c92a0979a949ca4ea89ec5c7b934",
        "53b36df67ebb7c41585e8d54d6772e08"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 6741,
      "estimated_customer_growth_2y": 9146
    },
    {
      "warehouse_id": 22,
      "latitude": -21.26556354448359,
      "longitude": -51.20540943479688,
      "customer_count": 980,
      "density_ratio": 0.0099,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.48,
      "top_items": [
        "368c6c730842d78016ad823897a372db",
        "279d5c3589fceee2a1c236fbe5287975",
        "99a4788cb24856965c36a24e339b6058",
        "f919da4f716dc149cef4551a322001fd",
        "8dc3328a29da1f07e005157e22233f7b"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1329,
      "estimated_customer_growth_2y": 1803
    },
    {
      "warehouse_id": 23,
      "latitude": -8.08315160370532,
      "longitude": -34.90895029752862,
      "customer_count": 892,
      "density_ratio": 0.009,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.35,
      "top_items": [
        "d84339772d824505b7f19e647f373ec3",
        "73c5d3186138770b5ae53055adf10ad9",
        "b532349fe46b38fbc7bb3914c1bdae07",
        "a5f25345083fc9e537fe69c874886fe7",
        "1d3ecbda18167c766a3381fd16108e4a"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1210,
      "estimated_customer_growth_2y": 1641
    },
    {
      "warehouse_id": 24,
      "latitude": -19.47883388265591,
      "longitude": -42.56929521518588,
      "customer_count": 275,
      "density_ratio": 0.0028,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.42,
      "top_items": [
        "002af88741ba70c7b5cf4e4a0ad7ef85",
        "0ecaf0629e5e227413504f3892bd76ba",
        "42a2c92a0979a949ca4ea89ec5c7b934",
        "6703d5fc618113f23d9749a7a05d9e3b",
        "b6911a73311462653bc381da86a3a3c6"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 373,
      "estimated_customer_growth_2y": 506
    },
    {
      "warehouse_id": 25,
      "latitude": -22.222243306456786,
      "longitude": -45.511996992213156,
      "customer_count": 1163,
      "density_ratio": 0.0117,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.76,
      "top_items": [
        "3dd2a17168ec895c781a9191c1e95ad7",
        "584d0486add75aa0f5c0660a7cd8afba",
        "422879e10f46682990de24d770e7f83d",
        "29427de7f8a9ee983d9dbc51cec569b4",
        "880be32f4db1d9f6e2bec38fb6ac23ab"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1577,
      "estimated_customer_growth_2y": 2140
    },
    {
      "warehouse_id": 26,
      "latitude": -6.8967176419141625,
      "longitude": -57.43923002344477,
      "customer_count": 389,
      "density_ratio": 0.0039,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.59,
      "top_items": [
        "dbb4ce89c8ed5fb6fd901e2e51093179",
        "422879e10f46682990de24d770e7f83d",
        "0412ec72192f1d85e92047c0773434ec",
        "a9516a079e37a9c9c36b9b78b10169e8",
        "130482add9fd75ccb6c57ba007694a2d"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 527,
      "estimated_customer_growth_2y": 716
    },
    {
      "warehouse_id": 27,
      "latitude": -16.364238709105678,
      "longitude": -46.89667628716545,
      "customer_count": 54,
      "density_ratio": 0.0005,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.08,
      "top_items": [
        "154e7e31ebfa092203795c972e5804a6",
        "dd0dcee76f9c12fff4bc0eb641d57c7f",
        "c4baedd846ed09b85f78a781b522f126",
        "e8f7d2639ff8caa8b86e5973295898b7",
        "7b85e3deef35afd6ebed5461ee8f0641"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 73,
      "estimated_customer_growth_2y": 99
    },
    {
      "warehouse_id": 28,
      "latitude": -4.283871566861992,
      "longitude": -48.50095737168757,
      "customer_count": 1002,
      "density_ratio": 0.0101,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.52,
      "top_items": [
        "e8f7d2639ff8caa8b86e5973295898b7",
        "acc444eb5ad26f79d5a11baa6a03c439",
        "ce066f4a83649651549d717c9b566816",
        "8d7372d1b5ad8302fee4eed7f8bb4d84",
        "389d119b48cf3043d311335e499d9c6b"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1359,
      "estimated_customer_growth_2y": 1844
    },
    {
      "warehouse_id": 29,
      "latitude": -12.495799886170024,
      "longitude": -55.7134834817862,
      "customer_count": 91,
      "density_ratio": 0.0009,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.14,
      "top_items": [
        "4e53a453045707bbc5febcf5f32097ac",
        "0504d5c0f9b71510b2b0bee952e380fa",
        "79366d6a24de9351b7ca6e3cf75a68ec",
        "f9f899bf492ac59cf645a6c93eb91e05",
        "5ab3c4c7b2b499f85cf923cd0f331c9f"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 123,
      "estimated_customer_growth_2y": 167
    },
    {
      "warehouse_id": 30,
      "latitude": -24.727886323736406,
      "longitude": -53.69586650038216,
      "customer_count": 704,
      "density_ratio": 0.0071,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.06,
      "top_items": [
        "f7bb503725fb4d7bb55301d5bceba728",
        "3b10cf7d1e08c598428ad6eb7c59d09c",
        "a3816405c56f1df398541ee9c498b056",
        "a5647c44af977b148e0a3a4751a09e2e",
        "b1acb7e8152c90c9619897753a75c973"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 955,
      "estimated_customer_growth_2y": 1295
    },
    {
      "warehouse_id": 31,
      "latitude": -18.4422909434445,
      "longitude": -40.922018617162486,
      "customer_count": 751,
      "density_ratio": 0.0076,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.14,
      "top_items": [
        "aeb767ca82c5a6cca8bbac33c4e21579",
        "368c6c730842d78016ad823897a372db",
        "0bcc3eeca39e1064258aa1e932269894",
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "909b87db6cb3a7ab26bd03cc59860136"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1018,
      "estimated_customer_growth_2y": 1382
    },
    {
      "warehouse_id": 32,
      "latitude": -3.7655210087740816,
      "longitude": -38.52475948151274,
      "customer_count": 713,
      "density_ratio": 0.0072,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.08,
      "top_items": [
        "e6c30d6c9696ee10542e7e25dcdffa92",
        "6a1234a3847f4ef3090a02a8b07fa42f",
        "bb50f2e236e5eea0100680137654686c",
        "65266b2da20d04dbe00c5c2d3bb7859e",
        "c23bb9673ec1f70f31171d5a7dff1260"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 967,
      "estimated_customer_growth_2y": 1312
    },
    {
      "warehouse_id": 33,
      "latitude": -20.801335700961104,
      "longitude": -49.291265159644,
      "customer_count": 1233,
      "density_ratio": 0.0124,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.87,
      "top_items": [
        "99a4788cb24856965c36a24e339b6058",
        "422879e10f46682990de24d770e7f83d",
        "84f456958365164420cfc80fbe4c7fab",
        "7814c273ab16783d73a9863ebfa8b141",
        "44fc450365728c413fefc547592626be"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1672,
      "estimated_customer_growth_2y": 2269
    },
    {
      "warehouse_id": 34,
      "latitude": -27.803869361714426,
      "longitude": -48.67968404373848,
      "customer_count": 1186,
      "density_ratio": 0.012,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.79,
      "top_items": [
        "04c4a4b9c924494fcf82e0fba966f955",
        "a29c32ba19cb3a3a0a8184fd9f8cb6b7",
        "e03102efbc2229024c89be731f0aedcb",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "fc5bf9e50dbfb45e7634bd8c045411c5"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1609,
      "estimated_customer_growth_2y": 2182
    },
    {
      "warehouse_id": 35,
      "latitude": -9.21014878170421,
      "longitude": -39.522073108850165,
      "customer_count": 1522,
      "density_ratio": 0.0153,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.3,
      "top_items": [
        "acc444eb5ad26f79d5a11baa6a03c439",
        "2c4930c4b284c7b99db2a4c52071a45e",
        "bb50f2e236e5eea0100680137654686c",
        "422879e10f46682990de24d770e7f83d",
        "3dd2a17168ec895c781a9191c1e95ad7"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 2064,
      "estimated_customer_growth_2y": 2801
    },
    {
      "warehouse_id": 36,
      "latitude": -20.467680524654348,
      "longitude": -54.61149006101968,
      "customer_count": 311,
      "density_ratio": 0.0031,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.47,
      "top_items": [
        "56cdfe67fbda57c1dcc752f5f361f981",
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "c8cfa622661e047ea2499f8bce4731a5",
        "9ecadb84c81da840dbf3564378b586e9",
        "8817f0cda3d5b42e5f949ee3be9dc80c"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 421,
      "estimated_customer_growth_2y": 572
    },
    {
      "warehouse_id": 37,
      "latitude": -21.239924495053007,
      "longitude": -42.84319330668223,
      "customer_count": 6643,
      "density_ratio": 0.067,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 20.05,
      "top_items": [
        "99a4788cb24856965c36a24e339b6058",
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "389d119b48cf3043d311335e499d9c6b",
        "97f1396a5a1f7c07ba51784efdec44b8",
        "422879e10f46682990de24d770e7f83d"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 9012,
      "estimated_customer_growth_2y": 12227
    },
    {
      "warehouse_id": 38,
      "latitude": -2.5261349338476995,
      "longitude": -44.25365611767183,
      "customer_count": 374,
      "density_ratio": 0.0038,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.57,
      "top_items": [
        "d9894482fba41f536a273ba2276d951f",
        "f0bbc1bdaf90ddcab4aa862660dfc6d3",
        "aaa31e14a24ce654af7f6f2061d1b7ed",
        "8c0c378bf3515c9c2543766389a5532c",
        "b9ac7314894a193a11fd3150f8c69307"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 507,
      "estimated_customer_growth_2y": 688
    },
    {
      "warehouse_id": 39,
      "latitude": -20.642190440719844,
      "longitude": -47.525381888552126,
      "customer_count": 962,
      "density_ratio": 0.0097,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.46,
      "top_items": [
        "c7fd13b5e515bffdab855d0812842edb",
        "36f60d45225e60c7da4558b070ce4b60",
        "2b7aa376a6e728560bddb5558cc48e89",
        "034abfb9b758233fd393bd361d4ec599",
        "e53e557d5a159f5aa2c5e995dfdf244b"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1305,
      "estimated_customer_growth_2y": 1770
    },
    {
      "warehouse_id": 40,
      "latitude": -12.105117484521712,
      "longitude": -45.56524753233141,
      "customer_count": 96,
      "density_ratio": 0.001,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.15,
      "top_items": [
        "b532349fe46b38fbc7bb3914c1bdae07",
        "1bfb290d7273a442c874dbe74b4abae6",
        "19936fa4f614ee0590d3b77ac83fd648",
        "86b22a03cb72239dd53996a67df35c63",
        "d1c427060a0f73f6b889a5c7c61f2ac4"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 130,
      "estimated_customer_growth_2y": 176
    },
    {
      "warehouse_id": 41,
      "latitude": -30.185554169032375,
      "longitude": -53.86845796193058,
      "customer_count": 378,
      "density_ratio": 0.0038,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.57,
      "top_items": [
        "f646af315b0f3a597f69213537ca2199",
        "422879e10f46682990de24d770e7f83d",
        "368c6c730842d78016ad823897a372db",
        "7a10781637204d8d10485c71a6108a2e",
        "7c1bd920dbdf22470b68bde975dd3ccf"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 512,
      "estimated_customer_growth_2y": 695
    },
    {
      "warehouse_id": 42,
      "latitude": -27.033894809325403,
      "longitude": -51.24532292432177,
      "customer_count": 927,
      "density_ratio": 0.0093,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.4,
      "top_items": [
        "89b190a046022486c635022524a974a8",
        "389d119b48cf3043d311335e499d9c6b",
        "d9f29c5e92ade1d2ed40235c56445b58",
        "f7a17d2c51d9df89a4f1711c4ac17f33",
        "99a4788cb24856965c36a24e339b6058"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1257,
      "estimated_customer_growth_2y": 1706
    },
    {
      "warehouse_id": 43,
      "latitude": -23.284148273805382,
      "longitude": -45.59806303375202,
      "customer_count": 1860,
      "density_ratio": 0.0188,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.81,
      "top_items": [
        "99a4788cb24856965c36a24e339b6058",
        "3120b244fb6ccbf5e91a53148ea1bd88",
        "0521fe3eb04940304b489d0fb49a37dd",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "730f1927f42fda4370209c28203eb0ab"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 2523,
      "estimated_customer_growth_2y": 3423
    },
    {
      "warehouse_id": 44,
      "latitude": -15.577355698781638,
      "longitude": -40.12236618155572,
      "customer_count": 808,
      "density_ratio": 0.0081,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.22,
      "top_items": [
        "5f00c50de3d989194f0439e343480372",
        "909b87db6cb3a7ab26bd03cc59860136",
        "3dd2a17168ec895c781a9191c1e95ad7",
        "62d41a80c366aa2d8644e3270adf8440",
        "cdd68c0ef3e507db79631336cf9ec285"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1096,
      "estimated_customer_growth_2y": 1487
    },
    {
      "warehouse_id": 45,
      "latitude": -10.193167068603266,
      "longitude": -48.32892634377007,
      "customer_count": 80,
      "density_ratio": 0.0008,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.12,
      "top_items": [
        "a62e25e09e05e6faf31d90c6ec1aa3d1",
        "07d56eb519d315a2d8fb2f98f095e6bf",
        "8c292ca193d326152e335d77176746f0",
        "7c1ac37ea884ec9c46ebf155ffc53d50",
        "95578be74a242e7a0eae084908bbb5f8"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 108,
      "estimated_customer_growth_2y": 147
    },
    {
      "warehouse_id": 46,
      "latitude": -22.535881933687193,
      "longitude": -49.642499969578815,
      "customer_count": 2204,
      "density_ratio": 0.0222,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 13.33,
      "top_items": [
        "eb8c629f70275fd1c4f809116cce1efc",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "422879e10f46682990de24d770e7f83d",
        "994ab76f0da3349fffcfe5d598e9babb",
        "368c6c730842d78016ad823897a372db"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 2990,
      "estimated_customer_growth_2y": 4056
    },
    {
      "warehouse_id": 47,
      "latitude": -9.963285811743926,
      "longitude": -67.82487011881088,
      "customer_count": 70,
      "density_ratio": 0.0007,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.11,
      "top_items": [
        "b81a05d0dd312ece2140846909f5ef81",
        "9afaad66aca8b0c79e4f084a89c9c92b",
        "8d1cfc0463b545928bfb4e589e017bd4",
        "02475368dfb38934fe55f574024fe1d7",
        "803f77475e1b51b47f1bfec4f2ec353f"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 94,
      "estimated_customer_growth_2y": 128
    },
    {
      "warehouse_id": 48,
      "latitude": -17.766137858255664,
      "longitude": -49.266704033812715,
      "customer_count": 2910,
      "density_ratio": 0.0293,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 14.4,
      "top_items": [
        "b532349fe46b38fbc7bb3914c1bdae07",
        "99a4788cb24856965c36a24e339b6058",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "43267ceb81c34b7d49decd624671ccfa",
        "53759a2ecddad2bb87a079a1f1519f73"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 3947,
      "estimated_customer_growth_2y": 5356
    },
    {
      "warehouse_id": 49,
      "latitude": -20.058992699613672,
      "longitude": -44.443044986805646,
      "customer_count": 2652,
      "density_ratio": 0.0267,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 14.01,
      "top_items": [
        "389d119b48cf3043d311335e499d9c6b",
        "422879e10f46682990de24d770e7f83d",
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "c2c989ac5100e59a6c3d12b2c31a2c72",
        "aca2eb7d00ea1a7b8ebd4e68314663af"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 3597,
      "estimated_customer_growth_2y": 4881
    },
    {
      "warehouse_id": 50,
      "latitude": -25.451948909412536,
      "longitude": -49.2650021915857,
      "customer_count": 1764,
      "density_ratio": 0.0178,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.67,
      "top_items": [
        "a62e25e09e05e6faf31d90c6ec1aa3d1",
        "69ddf2dd08328f81e57bdaf72c4f3b03",
        "f5d8f4fbc70ca2a0038b9a0010ed5cb0",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "53759a2ecddad2bb87a079a1f1519f73"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 2393,
      "estimated_customer_growth_2y": 3246
    },
    {
      "warehouse_id": 51,
      "latitude": -23.18342196114671,
      "longitude": -47.29055231137927,
      "customer_count": 3578,
      "density_ratio": 0.0361,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 15.41,
      "top_items": [
        "42a2c92a0979a949ca4ea89ec5c7b934",
        "99a4788cb24856965c36a24e339b6058",
        "44a5d24dd383324a421569ca697b13c2",
        "368c6c730842d78016ad823897a372db",
        "b532349fe46b38fbc7bb3914c1bdae07"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 4854,
      "estimated_customer_growth_2y": 6585
    },
    {
      "warehouse_id": 52,
      "latitude": -12.61886187058521,
      "longitude": -38.70428673999664,
      "customer_count": 687,
      "density_ratio": 0.0069,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.04,
      "top_items": [
        "53759a2ecddad2bb87a079a1f1519f73",
        "00de7f393d962717eeeb2d7131a40dba",
        "0aabfb375647d9738ad0f7b4ea3653b1",
        "223d34a3d9334039f5ff9511dc044bbb",
        "cac9e5692471a0700418aa3400b9b2b1"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 932,
      "estimated_customer_growth_2y": 1264
    },
    {
      "warehouse_id": 53,
      "latitude": -14.221319403787364,
      "longitude": -42.779278447214104,
      "customer_count": 38,
      "density_ratio": 0.0004,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.06,
      "top_items": [
        "b2f15c23f560da3b247e1090d9d12be7",
        "2b4609f8948be18874494203496bc318",
        "a55b43b743437ab4a7ffcfc47d2927c7",
        "d65b6607952f9e0d705b1cbdc92ac027",
        "f9182a0ca4e95b38186deff41198a333"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 51,
      "estimated_customer_growth_2y": 69
    },
    {
      "warehouse_id": 54,
      "latitude": -28.58168177413384,
      "longitude": -54.49584909288235,
      "customer_count": 666,
      "density_ratio": 0.0067,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.01,
      "top_items": [
        "d581a9097bc2a13adf46bbd864ee0d08",
        "a3a10562c9d134b92f04b8cce298d037",
        "747152211829957938862c1c57a30f16",
        "d6d73c1fe2e8c0e3e90e2421ffa4b963",
        "3a081630438070b86de554fac9edcc7a"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 903,
      "estimated_customer_growth_2y": 1225
    },
    {
      "warehouse_id": 55,
      "latitude": -17.22422618814969,
      "longitude": -46.874481130596884,
      "customer_count": 63,
      "density_ratio": 0.0006,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.1,
      "top_items": [
        "fce1a7007f115fe2b900a7592ee87c47",
        "cb81df0e3ccece253557f2a07df4727e",
        "a19b6951c75da43aad691622dd2f6abe",
        "362b773250263786dd58670d2df42c3b",
        "8c591ab0ca519558779df02023177f44"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 85,
      "estimated_customer_growth_2y": 115
    },
    {
      "warehouse_id": 56,
      "latitude": -9.942689246591732,
      "longitude": -36.1467417997359,
      "customer_count": 779,
      "density_ratio": 0.0079,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.18,
      "top_items": [
        "3dd2a17168ec895c781a9191c1e95ad7",
        "606b5bf4a5c5ac2f72196afa18b77d3d",
        "6cdd53843498f92890544667809f1595",
        "3fbc0ef745950c7932d5f2a446189725",
        "53b36df67ebb7c41585e8d54d6772e08"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 1056,
      "estimated_customer_growth_2y": 1433
    },
    {
      "warehouse_id": 57,
      "latitude": -11.399313254861923,
      "longitude": -61.584751071704595,
      "customer_count": 116,
      "density_ratio": 0.0012,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.18,
      "top_items": [
        "6ff1fc9209c7854704a4f75c9fac41b4",
        "edfdce0d1155be85dd53074e63bb9e8b",
        "cfe6e9c01d0bbb5df9a75f0e3286baa9",
        "bece4176ed6f09d246aedb44261b4c61",
        "4e2fa5131fc9956bb6a6b9e84b39e798"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 157,
      "estimated_customer_growth_2y": 213
    },
    {
      "warehouse_id": 58,
      "latitude": -15.830104579188014,
      "longitude": -47.99948323180709,
      "customer_count": 1913,
      "density_ratio": 0.0193,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.89,
      "top_items": [
        "4c2394abfbac7ff59ec7a420918562fa",
        "0bd5c2b2dd207f23739a694f006d63e6",
        "3fbc0ef745950c7932d5f2a446189725",
        "99a4788cb24856965c36a24e339b6058",
        "0a9bdadab17a9b0f258f64d11a0adf7b"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 2595,
      "estimated_customer_growth_2y": 3521
    },
    {
      "warehouse_id": 59,
      "latitude": 3.226395326295805,
      "longitude": -61.340048689977436,
      "customer_count": 45,
      "density_ratio": 0.0005,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.07,
      "top_items": [
        "ba92b5a0701d2f820ba6ca8f8c86294f",
        "77ff4f618d7c0d6b442ecdf5f02f6a74",
        "1fe8e6e01596885617fa1c90d29c2f81",
        "5a848e4ab52fd5445cdc07aab1c40e48",
        "6dab56beb5263f0d554cae5c55809208"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 61,
      "estimated_customer_growth_2y": 82
    },
    {
      "warehouse_id": 60,
      "latitude": -26.465333713230013,
      "longitude": -52.92556116853302,
      "customer_count": 587,
      "density_ratio": 0.0059,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.89,
      "top_items": [
        "e53e557d5a159f5aa2c5e995dfdf244b",
        "368c6c730842d78016ad823897a372db",
        "cfd43c5e600d45ac029357406b05dd82",
        "474bb6b54fc608ca71059a6c4f7ecda3",
        "fb1c85ab4adb8f0fd63d3e2156e51f4b"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 796,
      "estimated_customer_growth_2y": 1080
    },
    {
      "warehouse_id": 61,
      "latitude": -21.183027927202005,
      "longitude": -47.80425341993906,
      "customer_count": 523,
      "density_ratio": 0.0053,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.79,
      "top_items": [
        "cdb2ede3e6744ad7011a7305b95442a1",
        "61963c77fd2c3db173915d9dc837ee12",
        "3eb2d78dda82bc83c9b047fbba954dbe",
        "187b442eb4df48574faa31381921991f",
        "167b4b8c4bd0c401bea62f5e050d70a4"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 709,
      "estimated_customer_growth_2y": 962
    },
    {
      "warehouse_id": 62,
      "latitude": -23.923545592769287,
      "longitude": -46.41344107026784,
      "customer_count": 2866,
      "density_ratio": 0.0289,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 14.34,
      "top_items": [
        "9ecadb84c81da840dbf3564378b586e9",
        "422879e10f46682990de24d770e7f83d",
        "26c6145c9687019a428467c8852ae36b",
        "c82e581a3ec7e992cd06723b0caae96f",
        "2b4609f8948be18874494203496bc318"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 3888,
      "estimated_customer_growth_2y": 5275
    },
    {
      "warehouse_id": 63,
      "latitude": -21.741763486460112,
      "longitude": -46.64893257576749,
      "customer_count": 215,
      "density_ratio": 0.0022,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.33,
      "top_items": [
        "4deb009c36a910076a023947a7929201",
        "16ce899c7af0c99f46948734a0d00f0f",
        "0e5955fbbb16c3f92127ac470386ea88",
        "aa0568a1b7093748a1922993f5817983",
        "491067a4bc3ca4303e9fba74d629412c"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 291,
      "estimated_customer_growth_2y": 395
    },
    {
      "warehouse_id": 64,
      "latitude": -18.989508293772566,
      "longitude": -46.659484182792944,
      "customer_count": 378,
      "density_ratio": 0.0038,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.57,
      "top_items": [
        "422879e10f46682990de24d770e7f83d",
        "1f2b62e693c588aef7be1f457137b15e",
        "154e7e31ebfa092203795c972e5804a6",
        "99a4788cb24856965c36a24e339b6058",
        "7c1bd920dbdf22470b68bde975dd3ccf"
      ],
      "note": "Cluster normal",
      "algorithm": "gmm",
      "estimated_customer_growth_1y": 512,
      "estimated_customer_growth_2y": 695
    }
  ];
const kmeansLocations: PredictiveWarehouse[] = [
    {
      "warehouse_id": 0,
      "latitude": -22.436680740579735,
      "longitude": -42.05234277449875,
      "customer_count": 1524,
      "density_ratio": 0.0154,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.31,
      "top_items": [
        "99a4788cb24856965c36a24e339b6058",
        "368c6c730842d78016ad823897a372db",
        "3713f19c71c4be21ced80738e2fa49bc",
        "53759a2ecddad2bb87a079a1f1519f73",
        "9d6dd55c4d66be7b7021bb471061ce16"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 2067,
      "estimated_customer_growth_2y": 2805
    },
    {
      "warehouse_id": 1,
      "latitude": -23.762620614981184,
      "longitude": -52.333631627353235,
      "customer_count": 1839,
      "density_ratio": 0.0185,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.78,
      "top_items": [
        "422879e10f46682990de24d770e7f83d",
        "a9516a079e37a9c9c36b9b78b10169e8",
        "74437e600638a59559c5238c84805b76",
        "8701ef265f73fd18064df16faa4104ae",
        "53759a2ecddad2bb87a079a1f1519f73"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 2494,
      "estimated_customer_growth_2y": 3384
    },
    {
      "warehouse_id": 2,
      "latitude": -12.641256913986373,
      "longitude": -38.43851818644955,
      "customer_count": 2361,
      "density_ratio": 0.0238,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 13.57,
      "top_items": [
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "3dd2a17168ec895c781a9191c1e95ad7",
        "03d10117bf5dbd1e4f194566be73de5a",
        "554e48b94bf084525ae0fb37b9ed7f84",
        "422879e10f46682990de24d770e7f83d"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 3203,
      "estimated_customer_growth_2y": 4345
    },
    {
      "warehouse_id": 3,
      "latitude": -23.56382285690166,
      "longitude": -46.48352146161697,
      "customer_count": 11072,
      "density_ratio": 0.1117,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 25,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "99a4788cb24856965c36a24e339b6058",
        "422879e10f46682990de24d770e7f83d",
        "154e7e31ebfa092203795c972e5804a6",
        "389d119b48cf3043d311335e499d9c6b"
      ],
      "note": "Subcluster automático",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 15021,
      "estimated_customer_growth_2y": 20379
    },
    {
      "warehouse_id": 42,
      "latitude": -23.580373430192818,
      "longitude": -46.74472013138616,
      "customer_count": 15638,
      "density_ratio": 0.1577,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 25,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "99a4788cb24856965c36a24e339b6058",
        "422879e10f46682990de24d770e7f83d",
        "154e7e31ebfa092203795c972e5804a6",
        "389d119b48cf3043d311335e499d9c6b"
      ],
      "note": "Subcluster automático",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 21216,
      "estimated_customer_growth_2y": 28783
    },
    {
      "warehouse_id": 39,
      "latitude": -23.998671756776684,
      "longitude": -46.40596058922859,
      "customer_count": 1811,
      "density_ratio": 0.0183,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.74,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "99a4788cb24856965c36a24e339b6058",
        "422879e10f46682990de24d770e7f83d",
        "154e7e31ebfa092203795c972e5804a6",
        "389d119b48cf3043d311335e499d9c6b"
      ],
      "note": "Subcluster automático",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 2456,
      "estimated_customer_growth_2y": 3333
    },
    {
      "warehouse_id": 4,
      "latitude": -17.11470901974875,
      "longitude": -51.770897128905595,
      "customer_count": 454,
      "density_ratio": 0.0046,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.69,
      "top_items": [
        "43267ceb81c34b7d49decd624671ccfa",
        "ac25e2fbad9f60979fc3bfeda708178b",
        "43423cdffde7fda63d0414ed38c11a73",
        "2ae5ed1d99afbb14a8b24041a81df16b",
        "d678178aa4291cd25a755a90188375c8"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 615,
      "estimated_customer_growth_2y": 835
    },
    {
      "warehouse_id": 5,
      "latitude": -29.96641089523393,
      "longitude": -51.267922647988236,
      "customer_count": 3988,
      "density_ratio": 0.0402,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 16.03,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "389d119b48cf3043d311335e499d9c6b",
        "422879e10f46682990de24d770e7f83d",
        "53759a2ecddad2bb87a079a1f1519f73",
        "99a4788cb24856965c36a24e339b6058"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 5410,
      "estimated_customer_growth_2y": 7340
    },
    {
      "warehouse_id": 6,
      "latitude": -1.430056622863873,
      "longitude": -48.755937469597626,
      "customer_count": 783,
      "density_ratio": 0.0079,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.18,
      "top_items": [
        "bb50f2e236e5eea0100680137654686c",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "b192be433004cc1f10b467c0e9ea309b",
        "4ae634441e444ca4bc85903cafe98d73",
        "2635c3e7db0ac6cb3e733cac61ce0ba5"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1062,
      "estimated_customer_growth_2y": 1441
    },
    {
      "warehouse_id": 7,
      "latitude": -19.977727042811804,
      "longitude": -44.093870142319425,
      "customer_count": 5327,
      "density_ratio": 0.0537,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 18.06,
      "top_items": [
        "389d119b48cf3043d311335e499d9c6b",
        "362b773250263786dd58670d2df42c3b",
        "422879e10f46682990de24d770e7f83d",
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "368c6c730842d78016ad823897a372db"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 7227,
      "estimated_customer_growth_2y": 9805
    },
    {
      "warehouse_id": 8,
      "latitude": -27.44167049418121,
      "longitude": -48.75442379141274,
      "customer_count": 2231,
      "density_ratio": 0.0225,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 13.37,
      "top_items": [
        "04c4a4b9c924494fcf82e0fba966f955",
        "a29c32ba19cb3a3a0a8184fd9f8cb6b7",
        "368c6c730842d78016ad823897a372db",
        "10717ff440b2320081989126e858b220",
        "154e7e31ebfa092203795c972e5804a6"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 3026,
      "estimated_customer_growth_2y": 4106
    },
    {
      "warehouse_id": 9,
      "latitude": -9.629433587605911,
      "longitude": -64.71759511895763,
      "customer_count": 311,
      "density_ratio": 0.0031,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.47,
      "top_items": [
        "b81a05d0dd312ece2140846909f5ef81",
        "84d0e98e468edffdfe4f1f5b178d4ecc",
        "6ff1fc9209c7854704a4f75c9fac41b4",
        "1a4f338579cef9360aa407e3d97b4c89",
        "63085bb4366ded27bcb63cbb59b4103a"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 421,
      "estimated_customer_growth_2y": 572
    },
    {
      "warehouse_id": 10,
      "latitude": -4.154935030010155,
      "longitude": -38.79898450021522,
      "customer_count": 1293,
      "density_ratio": 0.013,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.96,
      "top_items": [
        "bb50f2e236e5eea0100680137654686c",
        "e6c30d6c9696ee10542e7e25dcdffa92",
        "6a1234a3847f4ef3090a02a8b07fa42f",
        "65266b2da20d04dbe00c5c2d3bb7859e",
        "a62e25e09e05e6faf31d90c6ec1aa3d1"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1754,
      "estimated_customer_growth_2y": 2379
    },
    {
      "warehouse_id": 11,
      "latitude": -15.590855204969987,
      "longitude": -56.12792170200095,
      "customer_count": 500,
      "density_ratio": 0.005,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.76,
      "top_items": [
        "90b58782fdd04cb829667fcc41fb65f5",
        "33202a8e7a645388c41ed714203d7131",
        "f32415d23c358ef1e387a7d329d9ce9f",
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "e251ebd2858be1aa7d9b2087a6992580"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 678,
      "estimated_customer_growth_2y": 920
    },
    {
      "warehouse_id": 12,
      "latitude": -20.161221655026164,
      "longitude": -40.39223723137692,
      "customer_count": 1909,
      "density_ratio": 0.0193,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.89,
      "top_items": [
        "e0d64dcfaa3b6db5c54ca298ae101d05",
        "f713c90e84b1bf2e157637d63fe09a68",
        "422879e10f46682990de24d770e7f83d",
        "2fea0f2cec6b6324a277d4a61c2ed2c6",
        "3fbc0ef745950c7932d5f2a446189725"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 2589,
      "estimated_customer_growth_2y": 3513
    },
    {
      "warehouse_id": 13,
      "latitude": -17.316843201870654,
      "longitude": -46.47144445452899,
      "customer_count": 466,
      "density_ratio": 0.0047,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.7,
      "top_items": [
        "99a4788cb24856965c36a24e339b6058",
        "c4baedd846ed09b85f78a781b522f126",
        "fce1a7007f115fe2b900a7592ee87c47",
        "b532349fe46b38fbc7bb3914c1bdae07",
        "154e7e31ebfa092203795c972e5804a6"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 632,
      "estimated_customer_growth_2y": 857
    },
    {
      "warehouse_id": 14,
      "latitude": -6.6959658992489155,
      "longitude": -35.46322514154684,
      "customer_count": 919,
      "density_ratio": 0.0093,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.39,
      "top_items": [
        "bb50f2e236e5eea0100680137654686c",
        "09c3a2ea33f044aebffecd6681e00133",
        "e5f3a09149ee7db697907f61e7366267",
        "480be8d20c4b6a7df1eae0f2c17f2db2",
        "682fa9a2b1120191903abcde5950f072"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1246,
      "estimated_customer_growth_2y": 1691
    },
    {
      "warehouse_id": 15,
      "latitude": -21.251717877127728,
      "longitude": -47.949720671581275,
      "customer_count": 2635,
      "density_ratio": 0.0266,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 13.99,
      "top_items": [
        "36f60d45225e60c7da4558b070ce4b60",
        "c7fd13b5e515bffdab855d0812842edb",
        "99a4788cb24856965c36a24e339b6058",
        "422879e10f46682990de24d770e7f83d",
        "2b7aa376a6e728560bddb5558cc48e89"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 3574,
      "estimated_customer_growth_2y": 4850
    },
    {
      "warehouse_id": 16,
      "latitude": -27.34240027373652,
      "longitude": -53.22313425739836,
      "customer_count": 1424,
      "density_ratio": 0.0144,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 12.15,
      "top_items": [
        "e53e557d5a159f5aa2c5e995dfdf244b",
        "422879e10f46682990de24d770e7f83d",
        "cfd43c5e600d45ac029357406b05dd82",
        "5a848e4ab52fd5445cdc07aab1c40e48",
        "474bb6b54fc608ca71059a6c4f7ecda3"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1931,
      "estimated_customer_growth_2y": 2621
    },
    {
      "warehouse_id": 17,
      "latitude": -6.1302781730693345,
      "longitude": -47.18730089555593,
      "customer_count": 227,
      "density_ratio": 0.0023,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.34,
      "top_items": [
        "b6106bf3d09b8fdd33c3a9559da43145",
        "97dd14dcd2c85f01c271127d6413f2d8",
        "ff62ab4c255754dd5cfbd1822cd97b40",
        "461f43be3bdf8844e65b62d9ac2c7a5a",
        "88c20c5a22f2ca169af8cfc2df00a7a2"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 307,
      "estimated_customer_growth_2y": 417
    },
    {
      "warehouse_id": 18,
      "latitude": -1.7525312991150597,
      "longitude": -58.10217471388511,
      "customer_count": 255,
      "density_ratio": 0.0026,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.39,
      "top_items": [
        "7ce94ab189134e2d3c05f496d635419c",
        "130482add9fd75ccb6c57ba007694a2d",
        "57d79905de06d8897872c551bfd09358",
        "7402c8cf69df715729b26da0ac2cc721",
        "4f2c53c9a1a7a00a247b351c1fdbed13"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 345,
      "estimated_customer_growth_2y": 469
    },
    {
      "warehouse_id": 19,
      "latitude": -22.417713785246953,
      "longitude": -43.34459308253819,
      "customer_count": 1176,
      "density_ratio": 0.0119,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.78,
      "top_items": [
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "53b36df67ebb7c41585e8d54d6772e08",
        "422879e10f46682990de24d770e7f83d",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "53759a2ecddad2bb87a079a1f1519f73"
      ],
      "note": "Subcluster automático",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1595,
      "estimated_customer_growth_2y": 2164
    },
    {
      "warehouse_id": 40,
      "latitude": -22.89001377123954,
      "longitude": -43.47972526827608,
      "customer_count": 5526,
      "density_ratio": 0.0557,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 18.36,
      "top_items": [
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "53b36df67ebb7c41585e8d54d6772e08",
        "422879e10f46682990de24d770e7f83d",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "53759a2ecddad2bb87a079a1f1519f73"
      ],
      "note": "Subcluster automático",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 7497,
      "estimated_customer_growth_2y": 10171
    },
    {
      "warehouse_id": 41,
      "latitude": -22.907067183611368,
      "longitude": -43.19807253508765,
      "customer_count": 7318,
      "density_ratio": 0.0738,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 21.07,
      "top_items": [
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "53b36df67ebb7c41585e8d54d6772e08",
        "422879e10f46682990de24d770e7f83d",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "53759a2ecddad2bb87a079a1f1519f73"
      ],
      "note": "Subcluster automático",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 9928,
      "estimated_customer_growth_2y": 13469
    },
    {
      "warehouse_id": 20,
      "latitude": -21.58567143273857,
      "longitude": -50.25147682001083,
      "customer_count": 3217,
      "density_ratio": 0.0324,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 14.87,
      "top_items": [
        "368c6c730842d78016ad823897a372db",
        "422879e10f46682990de24d770e7f83d",
        "99a4788cb24856965c36a24e339b6058",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "84f456958365164420cfc80fbe4c7fab"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 4364,
      "estimated_customer_growth_2y": 5921
    },
    {
      "warehouse_id": 21,
      "latitude": -3.608174378218593,
      "longitude": -43.751488495505754,
      "customer_count": 955,
      "density_ratio": 0.0096,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.44,
      "top_items": [
        "3fbc0ef745950c7932d5f2a446189725",
        "d9894482fba41f536a273ba2276d951f",
        "bb50f2e236e5eea0100680137654686c",
        "389d119b48cf3043d311335e499d9c6b",
        "b9ac7314894a193a11fd3150f8c69307"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1295,
      "estimated_customer_growth_2y": 1757
    },
    {
      "warehouse_id": 22,
      "latitude": -18.944743580745122,
      "longitude": -48.23406634432848,
      "customer_count": 1178,
      "density_ratio": 0.0119,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.78,
      "top_items": [
        "6e835aea84ae8eb68b8c14878dd43b30",
        "652ab2a1bee7f7f0ab475b06cd290865",
        "368c6c730842d78016ad823897a372db",
        "e932008cf0ea7c93a077dd8d7e5f49eb",
        "99a4788cb24856965c36a24e339b6058"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1598,
      "estimated_customer_growth_2y": 2168
    },
    {
      "warehouse_id": 23,
      "latitude": -30.010538051223588,
      "longitude": -54.479144526463436,
      "customer_count": 686,
      "density_ratio": 0.0069,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.04,
      "top_items": [
        "d581a9097bc2a13adf46bbd864ee0d08",
        "f646af315b0f3a597f69213537ca2199",
        "adc48fd26eea311ca6856b58dfc3ca21",
        "422879e10f46682990de24d770e7f83d",
        "7c1bd920dbdf22470b68bde975dd3ccf"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 930,
      "estimated_customer_growth_2y": 1262
    },
    {
      "warehouse_id": 24,
      "latitude": -25.431421526421033,
      "longitude": -49.23853535987411,
      "customer_count": 2957,
      "density_ratio": 0.0298,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 14.47,
      "top_items": [
        "a62e25e09e05e6faf31d90c6ec1aa3d1",
        "422879e10f46682990de24d770e7f83d",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "b532349fe46b38fbc7bb3914c1bdae07",
        "eb8c629f70275fd1c4f809116cce1efc"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 4011,
      "estimated_customer_growth_2y": 5442
    },
    {
      "warehouse_id": 25,
      "latitude": -20.867579309157023,
      "longitude": -42.44165226057944,
      "customer_count": 1136,
      "density_ratio": 0.0115,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.72,
      "top_items": [
        "97f1396a5a1f7c07ba51784efdec44b8",
        "42a2c92a0979a949ca4ea89ec5c7b934",
        "53759a2ecddad2bb87a079a1f1519f73",
        "84f456958365164420cfc80fbe4c7fab",
        "9cb2ed2f273027b8daa3b0863368105c"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1541,
      "estimated_customer_growth_2y": 2090
    },
    {
      "warehouse_id": 26,
      "latitude": -15.777302784248583,
      "longitude": -43.87791832615405,
      "customer_count": 763,
      "density_ratio": 0.0077,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.15,
      "top_items": [
        "c4baedd846ed09b85f78a781b522f126",
        "24c66f106f642621e524291a895c9032",
        "16ce899c7af0c99f46948734a0d00f0f",
        "08574b074924071f4e201e151b152b4e",
        "d1c427060a0f73f6b889a5c7c61f2ac4"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1035,
      "estimated_customer_growth_2y": 1404
    },
    {
      "warehouse_id": 27,
      "latitude": -8.512550725516153,
      "longitude": -49.27039381608991,
      "customer_count": 291,
      "density_ratio": 0.0029,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.44,
      "top_items": [
        "e8f7d2639ff8caa8b86e5973295898b7",
        "acc444eb5ad26f79d5a11baa6a03c439",
        "ce066f4a83649651549d717c9b566816",
        "8d7372d1b5ad8302fee4eed7f8bb4d84",
        "a62e25e09e05e6faf31d90c6ec1aa3d1"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 394,
      "estimated_customer_growth_2y": 535
    },
    {
      "warehouse_id": 28,
      "latitude": -22.986701974311007,
      "longitude": -45.530073850606904,
      "customer_count": 2725,
      "density_ratio": 0.0275,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 14.12,
      "top_items": [
        "3dd2a17168ec895c781a9191c1e95ad7",
        "99a4788cb24856965c36a24e339b6058",
        "0521fe3eb04940304b489d0fb49a37dd",
        "3120b244fb6ccbf5e91a53148ea1bd88",
        "422879e10f46682990de24d770e7f83d"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 3697,
      "estimated_customer_growth_2y": 5015
    },
    {
      "warehouse_id": 29,
      "latitude": -8.552410261561903,
      "longitude": -35.30198212858346,
      "customer_count": 1678,
      "density_ratio": 0.0169,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.54,
      "top_items": [
        "3dd2a17168ec895c781a9191c1e95ad7",
        "422879e10f46682990de24d770e7f83d",
        "3fbc0ef745950c7932d5f2a446189725",
        "d84339772d824505b7f19e647f373ec3",
        "e53e557d5a159f5aa2c5e995dfdf244b"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 2276,
      "estimated_customer_growth_2y": 3088
    },
    {
      "warehouse_id": 30,
      "latitude": -15.8845375733224,
      "longitude": -48.40249387294042,
      "customer_count": 3433,
      "density_ratio": 0.0346,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 15.19,
      "top_items": [
        "99a4788cb24856965c36a24e339b6058",
        "4c2394abfbac7ff59ec7a420918562fa",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "19c91ef95d509ea33eda93495c4d3481",
        "37eb69aca8718e843d897aa7b82f462d"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 4657,
      "estimated_customer_growth_2y": 6318
    },
    {
      "warehouse_id": 31,
      "latitude": -20.68903953234624,
      "longitude": -54.88207416932462,
      "customer_count": 546,
      "density_ratio": 0.0055,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.83,
      "top_items": [
        "9ecadb84c81da840dbf3564378b586e9",
        "56cdfe67fbda57c1dcc752f5f361f981",
        "216bb0e0cd43ffd832e0973d35e0377e",
        "c8cfa622661e047ea2499f8bce4731a5",
        "d1c427060a0f73f6b889a5c7c61f2ac4"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 740,
      "estimated_customer_growth_2y": 1004
    },
    {
      "warehouse_id": 32,
      "latitude": -15.789964129800119,
      "longitude": -39.988097836525434,
      "customer_count": 781,
      "density_ratio": 0.0079,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.18,
      "top_items": [
        "5f00c50de3d989194f0439e343480372",
        "3dd2a17168ec895c781a9191c1e95ad7",
        "909b87db6cb3a7ab26bd03cc59860136",
        "cdd68c0ef3e507db79631336cf9ec285",
        "517d4955ffcf9fbd2bb0beb193c81a42"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1059,
      "estimated_customer_growth_2y": 1437
    },
    {
      "warehouse_id": 33,
      "latitude": -21.234888797566327,
      "longitude": -45.77727545953211,
      "customer_count": 1208,
      "density_ratio": 0.0122,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.83,
      "top_items": [
        "c2c989ac5100e59a6c3d12b2c31a2c72",
        "4deb009c36a910076a023947a7929201",
        "3dd2a17168ec895c781a9191c1e95ad7",
        "16ce899c7af0c99f46948734a0d00f0f",
        "389d119b48cf3043d311335e499d9c6b"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1638,
      "estimated_customer_growth_2y": 2223
    },
    {
      "warehouse_id": 34,
      "latitude": -22.904427672570293,
      "longitude": -47.29170955218144,
      "customer_count": 7160,
      "density_ratio": 0.0722,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 20.83,
      "top_items": [
        "422879e10f46682990de24d770e7f83d",
        "99a4788cb24856965c36a24e339b6058",
        "42a2c92a0979a949ca4ea89ec5c7b934",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "53759a2ecddad2bb87a079a1f1519f73"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 9713,
      "estimated_customer_growth_2y": 13178
    },
    {
      "warehouse_id": 35,
      "latitude": -26.7546014626777,
      "longitude": -51.061176931714826,
      "customer_count": 827,
      "density_ratio": 0.0083,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.25,
      "top_items": [
        "89b190a046022486c635022524a974a8",
        "389d119b48cf3043d311335e499d9c6b",
        "d9f29c5e92ade1d2ed40235c56445b58",
        "08574b074924071f4e201e151b152b4e",
        "8db26005b17d1f7e2e8b3ab829051790"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1121,
      "estimated_customer_growth_2y": 1522
    },
    {
      "warehouse_id": 36,
      "latitude": -12.197220483644793,
      "longitude": -56.3940308394851,
      "customer_count": 270,
      "density_ratio": 0.0027,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.41,
      "top_items": [
        "4e53a453045707bbc5febcf5f32097ac",
        "0504d5c0f9b71510b2b0bee952e380fa",
        "79366d6a24de9351b7ca6e3cf75a68ec",
        "f9f899bf492ac59cf645a6c93eb91e05",
        "dbb4ce89c8ed5fb6fd901e2e51093179"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 366,
      "estimated_customer_growth_2y": 496
    },
    {
      "warehouse_id": 37,
      "latitude": -19.316947242318758,
      "longitude": -42.6068590028381,
      "customer_count": 1219,
      "density_ratio": 0.0123,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.84,
      "top_items": [
        "002af88741ba70c7b5cf4e4a0ad7ef85",
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "422879e10f46682990de24d770e7f83d",
        "389d119b48cf3043d311335e499d9c6b",
        "42a2c92a0979a949ca4ea89ec5c7b934"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 1653,
      "estimated_customer_growth_2y": 2243
    },
    {
      "warehouse_id": 38,
      "latitude": -9.706083648418392,
      "longitude": -40.21199796233248,
      "customer_count": 723,
      "density_ratio": 0.0073,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.09,
      "top_items": [
        "acc444eb5ad26f79d5a11baa6a03c439",
        "2c4930c4b284c7b99db2a4c52071a45e",
        "bb50f2e236e5eea0100680137654686c",
        "53759a2ecddad2bb87a079a1f1519f73",
        "08574b074924071f4e201e151b152b4e"
      ],
      "note": "Cluster normal",
      "algorithm": "kmeans",
      "estimated_customer_growth_1y": 980,
      "estimated_customer_growth_2y": 1330
    }
  ];
const minibatchkmeansLocations: PredictiveWarehouse[] = [
    {
      "warehouse_id": 0,
      "latitude": -19.911510280601558,
      "longitude": -43.96566889822554,
      "customer_count": 4018,
      "density_ratio": 0.0405,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 16.08,
      "top_items": [
        "362b773250263786dd58670d2df42c3b",
        "368c6c730842d78016ad823897a372db",
        "389d119b48cf3043d311335e499d9c6b",
        "99a4788cb24856965c36a24e339b6058",
        "53b36df67ebb7c41585e8d54d6772e08"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 5451,
      "estimated_customer_growth_2y": 7395
    },
    {
      "warehouse_id": 1,
      "latitude": -22.86583507235561,
      "longitude": -49.12474534410378,
      "customer_count": 1320,
      "density_ratio": 0.0133,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 12,
      "top_items": [
        "eb8c629f70275fd1c4f809116cce1efc",
        "026b77b15418f2a8114dfb0026739be4",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "7248b99ff380f23a1094ff737a1112fb",
        "b008888e5e01a5c9da36306228e900d1"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1790,
      "estimated_customer_growth_2y": 2429
    },
    {
      "warehouse_id": 2,
      "latitude": -9.968023468373454,
      "longitude": -36.5701459779858,
      "customer_count": 947,
      "density_ratio": 0.0095,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.43,
      "top_items": [
        "3dd2a17168ec895c781a9191c1e95ad7",
        "6cdd53843498f92890544667809f1595",
        "606b5bf4a5c5ac2f72196afa18b77d3d",
        "3fbc0ef745950c7932d5f2a446189725",
        "53b36df67ebb7c41585e8d54d6772e08"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1284,
      "estimated_customer_growth_2y": 1743
    },
    {
      "warehouse_id": 3,
      "latitude": -2.4875351887278465,
      "longitude": -49.23791674258189,
      "customer_count": 1099,
      "density_ratio": 0.0111,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.66,
      "top_items": [
        "e8f7d2639ff8caa8b86e5973295898b7",
        "bb50f2e236e5eea0100680137654686c",
        "8d7372d1b5ad8302fee4eed7f8bb4d84",
        "acc444eb5ad26f79d5a11baa6a03c439",
        "ce066f4a83649651549d717c9b566816"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1491,
      "estimated_customer_growth_2y": 2022
    },
    {
      "warehouse_id": 4,
      "latitude": -29.7568827841724,
      "longitude": -51.15438620760567,
      "customer_count": 3607,
      "density_ratio": 0.0364,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 15.46,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "389d119b48cf3043d311335e499d9c6b",
        "53759a2ecddad2bb87a079a1f1519f73",
        "422879e10f46682990de24d770e7f83d",
        "99a4788cb24856965c36a24e339b6058"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 4893,
      "estimated_customer_growth_2y": 6639
    },
    {
      "warehouse_id": 5,
      "latitude": -21.758932703004103,
      "longitude": -46.75644168207129,
      "customer_count": 872,
      "density_ratio": 0.0088,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.32,
      "top_items": [
        "4deb009c36a910076a023947a7929201",
        "16ce899c7af0c99f46948734a0d00f0f",
        "0e5955fbbb16c3f92127ac470386ea88",
        "cc5c6bf704a4b642e8964b5b2dcdb0da",
        "aa0568a1b7093748a1922993f5817983"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1183,
      "estimated_customer_growth_2y": 1605
    },
    {
      "warehouse_id": 6,
      "latitude": -23.546513487873273,
      "longitude": -46.597641634674716,
      "customer_count": 13559,
      "density_ratio": 0.1367,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 25,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "99a4788cb24856965c36a24e339b6058",
        "389d119b48cf3043d311335e499d9c6b",
        "154e7e31ebfa092203795c972e5804a6",
        "e0cf79767c5b016251fe139915c59a26"
      ],
      "note": "Subcluster automático",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 18395,
      "estimated_customer_growth_2y": 24957
    },
    {
      "warehouse_id": 54,
      "latitude": -23.26602771114249,
      "longitude": -46.76232098520535,
      "customer_count": 1766,
      "density_ratio": 0.0178,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.67,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "99a4788cb24856965c36a24e339b6058",
        "389d119b48cf3043d311335e499d9c6b",
        "154e7e31ebfa092203795c972e5804a6",
        "e0cf79767c5b016251fe139915c59a26"
      ],
      "note": "Subcluster automático",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 2395,
      "estimated_customer_growth_2y": 3250
    },
    {
      "warehouse_id": 55,
      "latitude": -23.60354145677017,
      "longitude": -46.80314492663979,
      "customer_count": 7355,
      "density_ratio": 0.0742,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 21.13,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "99a4788cb24856965c36a24e339b6058",
        "389d119b48cf3043d311335e499d9c6b",
        "154e7e31ebfa092203795c972e5804a6",
        "e0cf79767c5b016251fe139915c59a26"
      ],
      "note": "Subcluster automático",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 9978,
      "estimated_customer_growth_2y": 13537
    },
    {
      "warehouse_id": 7,
      "latitude": -22.903012555881478,
      "longitude": -43.41609164409637,
      "customer_count": 5584,
      "density_ratio": 0.0563,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 18.45,
      "top_items": [
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "53759a2ecddad2bb87a079a1f1519f73",
        "53b36df67ebb7c41585e8d54d6772e08",
        "422879e10f46682990de24d770e7f83d",
        "aca2eb7d00ea1a7b8ebd4e68314663af"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 7575,
      "estimated_customer_growth_2y": 10278
    },
    {
      "warehouse_id": 8,
      "latitude": -14.427063310199669,
      "longitude": -55.794907388012405,
      "customer_count": 823,
      "density_ratio": 0.0083,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.24,
      "top_items": [
        "43267ceb81c34b7d49decd624671ccfa",
        "4e53a453045707bbc5febcf5f32097ac",
        "90b58782fdd04cb829667fcc41fb65f5",
        "33202a8e7a645388c41ed714203d7131",
        "0504d5c0f9b71510b2b0bee952e380fa"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1116,
      "estimated_customer_growth_2y": 1514
    },
    {
      "warehouse_id": 9,
      "latitude": -15.997116386856014,
      "longitude": -48.176768285684346,
      "customer_count": 3556,
      "density_ratio": 0.0359,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 15.38,
      "top_items": [
        "99a4788cb24856965c36a24e339b6058",
        "c4baedd846ed09b85f78a781b522f126",
        "154e7e31ebfa092203795c972e5804a6",
        "dd0dcee76f9c12fff4bc0eb641d57c7f",
        "4c2394abfbac7ff59ec7a420918562fa"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 4824,
      "estimated_customer_growth_2y": 6545
    },
    {
      "warehouse_id": 10,
      "latitude": -9.657147495982665,
      "longitude": -40.4515829864721,
      "customer_count": 592,
      "density_ratio": 0.006,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.9,
      "top_items": [
        "acc444eb5ad26f79d5a11baa6a03c439",
        "2c4930c4b284c7b99db2a4c52071a45e",
        "bb50f2e236e5eea0100680137654686c",
        "53759a2ecddad2bb87a079a1f1519f73",
        "08574b074924071f4e201e151b152b4e"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 803,
      "estimated_customer_growth_2y": 1089
    },
    {
      "warehouse_id": 11,
      "latitude": -18.80277205207705,
      "longitude": -48.36083285386394,
      "customer_count": 716,
      "density_ratio": 0.0072,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.08,
      "top_items": [
        "6e835aea84ae8eb68b8c14878dd43b30",
        "652ab2a1bee7f7f0ab475b06cd290865",
        "e932008cf0ea7c93a077dd8d7e5f49eb",
        "368c6c730842d78016ad823897a372db",
        "99a4788cb24856965c36a24e339b6058"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 971,
      "estimated_customer_growth_2y": 1317
    },
    {
      "warehouse_id": 12,
      "latitude": -25.59154744915071,
      "longitude": -49.31474707311852,
      "customer_count": 2972,
      "density_ratio": 0.03,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 14.5,
      "top_items": [
        "a62e25e09e05e6faf31d90c6ec1aa3d1",
        "53759a2ecddad2bb87a079a1f1519f73",
        "154e7e31ebfa092203795c972e5804a6",
        "69ddf2dd08328f81e57bdaf72c4f3b03",
        "422879e10f46682990de24d770e7f83d"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 4032,
      "estimated_customer_growth_2y": 5470
    },
    {
      "warehouse_id": 13,
      "latitude": -21.890809467428266,
      "longitude": -50.15120928274447,
      "customer_count": 1091,
      "density_ratio": 0.011,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.65,
      "top_items": [
        "994ab76f0da3349fffcfe5d598e9babb",
        "422879e10f46682990de24d770e7f83d",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "4298b7e67dc399c200662b569563a2b2",
        "f8e75ec247fd97a5e1abcaa48e9e971d"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1480,
      "estimated_customer_growth_2y": 2008
    },
    {
      "warehouse_id": 14,
      "latitude": -25.04710800296134,
      "longitude": -53.62327103711341,
      "customer_count": 846,
      "density_ratio": 0.0085,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.28,
      "top_items": [
        "474bb6b54fc608ca71059a6c4f7ecda3",
        "c9c6fde711572c1ad99ca12728c6af00",
        "31c79131e883e5fd8c4c85fe9f7d2bb2",
        "2b4609f8948be18874494203496bc318",
        "3b10cf7d1e08c598428ad6eb7c59d09c"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1147,
      "estimated_customer_growth_2y": 1557
    },
    {
      "warehouse_id": 15,
      "latitude": -20.1500770179039,
      "longitude": -40.33776172023872,
      "customer_count": 1667,
      "density_ratio": 0.0168,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.52,
      "top_items": [
        "e0d64dcfaa3b6db5c54ca298ae101d05",
        "f713c90e84b1bf2e157637d63fe09a68",
        "2fea0f2cec6b6324a277d4a61c2ed2c6",
        "3fbc0ef745950c7932d5f2a446189725",
        "422879e10f46682990de24d770e7f83d"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 2261,
      "estimated_customer_growth_2y": 3068
    },
    {
      "warehouse_id": 16,
      "latitude": -18.49917876207301,
      "longitude": -44.20574837513885,
      "customer_count": 172,
      "density_ratio": 0.0017,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.26,
      "top_items": [
        "362b773250263786dd58670d2df42c3b",
        "905b384ac5667170689505bbf30f1d07",
        "422879e10f46682990de24d770e7f83d",
        "5d4259625c11acce3dcc39c169037a9a",
        "aca2eb7d00ea1a7b8ebd4e68314663af"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 233,
      "estimated_customer_growth_2y": 316
    },
    {
      "warehouse_id": 17,
      "latitude": -22.890076204338854,
      "longitude": -43.17468884187306,
      "customer_count": 6164,
      "density_ratio": 0.0622,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 19.32,
      "top_items": [
        "e53e557d5a159f5aa2c5e995dfdf244b",
        "53b36df67ebb7c41585e8d54d6772e08",
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "d2085f7e0f9533605386960fc7e987ec",
        "aca2eb7d00ea1a7b8ebd4e68314663af"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 8362,
      "estimated_customer_growth_2y": 11345
    },
    {
      "warehouse_id": 18,
      "latitude": -27.47259151575212,
      "longitude": -48.790295781977804,
      "customer_count": 2229,
      "density_ratio": 0.0225,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 13.37,
      "top_items": [
        "04c4a4b9c924494fcf82e0fba966f955",
        "a29c32ba19cb3a3a0a8184fd9f8cb6b7",
        "10717ff440b2320081989126e858b220",
        "368c6c730842d78016ad823897a372db",
        "154e7e31ebfa092203795c972e5804a6"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 3024,
      "estimated_customer_growth_2y": 4102
    },
    {
      "warehouse_id": 19,
      "latitude": -30.167295142866553,
      "longitude": -54.10339097098201,
      "customer_count": 455,
      "density_ratio": 0.0046,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.69,
      "top_items": [
        "f646af315b0f3a597f69213537ca2199",
        "adc48fd26eea311ca6856b58dfc3ca21",
        "422879e10f46682990de24d770e7f83d",
        "368c6c730842d78016ad823897a372db",
        "65650c84064ff1a79e4a05988f4c3e9f"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 617,
      "estimated_customer_growth_2y": 837
    },
    {
      "warehouse_id": 20,
      "latitude": -14.236317521647466,
      "longitude": -42.21011047946716,
      "customer_count": 416,
      "density_ratio": 0.0042,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.63,
      "top_items": [
        "2b4609f8948be18874494203496bc318",
        "99a4788cb24856965c36a24e339b6058",
        "517d4955ffcf9fbd2bb0beb193c81a42",
        "b2f15c23f560da3b247e1090d9d12be7",
        "a55b43b743437ab4a7ffcfc47d2927c7"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 564,
      "estimated_customer_growth_2y": 765
    },
    {
      "warehouse_id": 21,
      "latitude": -27.17758271593871,
      "longitude": -52.09363692467534,
      "customer_count": 1236,
      "density_ratio": 0.0125,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.87,
      "top_items": [
        "89b190a046022486c635022524a974a8",
        "389d119b48cf3043d311335e499d9c6b",
        "e53e557d5a159f5aa2c5e995dfdf244b",
        "cfd43c5e600d45ac029357406b05dd82",
        "99a4788cb24856965c36a24e339b6058"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1676,
      "estimated_customer_growth_2y": 2275
    },
    {
      "warehouse_id": 22,
      "latitude": -12.981420352109266,
      "longitude": -38.64101681505687,
      "customer_count": 2232,
      "density_ratio": 0.0225,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 13.38,
      "top_items": [
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "554e48b94bf084525ae0fb37b9ed7f84",
        "03d10117bf5dbd1e4f194566be73de5a",
        "1a080577618e7fe4d9ddd8fb2b47a964",
        "781afe929e3016a667f5f439afd55fce"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 3028,
      "estimated_customer_growth_2y": 4108
    },
    {
      "warehouse_id": 23,
      "latitude": -23.582721968968954,
      "longitude": -47.60474042518669,
      "customer_count": 1607,
      "density_ratio": 0.0162,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.43,
      "top_items": [
        "42a2c92a0979a949ca4ea89ec5c7b934",
        "cae79e3b5c787c231543fa415a20b5cc",
        "b532349fe46b38fbc7bb3914c1bdae07",
        "368c6c730842d78016ad823897a372db",
        "6d2fde7d12bb6ff367dbda120ba8828e"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 2180,
      "estimated_customer_growth_2y": 2957
    },
    {
      "warehouse_id": 24,
      "latitude": -20.420466907156708,
      "longitude": -47.49822131379114,
      "customer_count": 836,
      "density_ratio": 0.0084,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.26,
      "top_items": [
        "c7fd13b5e515bffdab855d0812842edb",
        "36f60d45225e60c7da4558b070ce4b60",
        "2b7aa376a6e728560bddb5558cc48e89",
        "e1da6ab77f4859eb17950e5df1c0f815",
        "422879e10f46682990de24d770e7f83d"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1134,
      "estimated_customer_growth_2y": 1538
    },
    {
      "warehouse_id": 25,
      "latitude": -19.56788276144254,
      "longitude": -42.343646254484774,
      "customer_count": 766,
      "density_ratio": 0.0077,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.16,
      "top_items": [
        "002af88741ba70c7b5cf4e4a0ad7ef85",
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "0ecaf0629e5e227413504f3892bd76ba",
        "42a2c92a0979a949ca4ea89ec5c7b934",
        "35afc973633aaeb6b877ff57b2793310"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1039,
      "estimated_customer_growth_2y": 1409
    },
    {
      "warehouse_id": 26,
      "latitude": -22.790011463749412,
      "longitude": -47.1845218728036,
      "customer_count": 4980,
      "density_ratio": 0.0502,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 17.53,
      "top_items": [
        "422879e10f46682990de24d770e7f83d",
        "99a4788cb24856965c36a24e339b6058",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "44a5d24dd383324a421569ca697b13c2",
        "42a2c92a0979a949ca4ea89ec5c7b934"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 6756,
      "estimated_customer_growth_2y": 9166
    },
    {
      "warehouse_id": 27,
      "latitude": -21.513579319976085,
      "longitude": -51.449344983538026,
      "customer_count": 663,
      "density_ratio": 0.0067,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11,
      "top_items": [
        "368c6c730842d78016ad823897a372db",
        "279d5c3589fceee2a1c236fbe5287975",
        "f919da4f716dc149cef4551a322001fd",
        "8dc3328a29da1f07e005157e22233f7b",
        "5e3e2d54c975cf95b62c112c4d1d935d"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 899,
      "estimated_customer_growth_2y": 1220
    },
    {
      "warehouse_id": 28,
      "latitude": -22.430381332038404,
      "longitude": -45.527538824262535,
      "customer_count": 786,
      "density_ratio": 0.0079,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.19,
      "top_items": [
        "3dd2a17168ec895c781a9191c1e95ad7",
        "29427de7f8a9ee983d9dbc51cec569b4",
        "880be32f4db1d9f6e2bec38fb6ac23ab",
        "44053ed0088d0655ed338810cd2d4d51",
        "8e35752c1597713f370e8e63cf0dd338"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1066,
      "estimated_customer_growth_2y": 1446
    },
    {
      "warehouse_id": 29,
      "latitude": -7.638192751238066,
      "longitude": -35.138591050741006,
      "customer_count": 2098,
      "density_ratio": 0.0212,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 13.17,
      "top_items": [
        "d84339772d824505b7f19e647f373ec3",
        "422879e10f46682990de24d770e7f83d",
        "6cdd53843498f92890544667809f1595",
        "73c5d3186138770b5ae53055adf10ad9",
        "bb50f2e236e5eea0100680137654686c"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 2846,
      "estimated_customer_growth_2y": 3861
    },
    {
      "warehouse_id": 30,
      "latitude": -16.719199199947948,
      "longitude": -43.91085682092596,
      "customer_count": 510,
      "density_ratio": 0.0051,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.77,
      "top_items": [
        "c4baedd846ed09b85f78a781b522f126",
        "24c66f106f642621e524291a895c9032",
        "16ce899c7af0c99f46948734a0d00f0f",
        "08574b074924071f4e201e151b152b4e",
        "b532349fe46b38fbc7bb3914c1bdae07"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 691,
      "estimated_customer_growth_2y": 938
    },
    {
      "warehouse_id": 31,
      "latitude": -22.643390379516585,
      "longitude": -42.17538433544997,
      "customer_count": 1068,
      "density_ratio": 0.0108,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.62,
      "top_items": [
        "99a4788cb24856965c36a24e339b6058",
        "3713f19c71c4be21ced80738e2fa49bc",
        "368c6c730842d78016ad823897a372db",
        "9d6dd55c4d66be7b7021bb471061ce16",
        "9d9734db712d5ab6c3ff4c33700eb34c"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1448,
      "estimated_customer_growth_2y": 1965
    },
    {
      "warehouse_id": 32,
      "latitude": -16.987541153945696,
      "longitude": -40.28496419482383,
      "customer_count": 563,
      "density_ratio": 0.0057,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.85,
      "top_items": [
        "5f00c50de3d989194f0439e343480372",
        "909b87db6cb3a7ab26bd03cc59860136",
        "3dd2a17168ec895c781a9191c1e95ad7",
        "aeb767ca82c5a6cca8bbac33c4e21579",
        "cdd68c0ef3e507db79631336cf9ec285"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 763,
      "estimated_customer_growth_2y": 1036
    },
    {
      "warehouse_id": 33,
      "latitude": -31.85990259233578,
      "longitude": -52.314775065710684,
      "customer_count": 406,
      "density_ratio": 0.0041,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.61,
      "top_items": [
        "d3c044bd42d84a79e3b0c42662806a48",
        "3ece1fcd5a64459a4e24143920178f42",
        "422879e10f46682990de24d770e7f83d",
        "b3b0bce74668bf355cbd94db1e4d17b9",
        "2b2d98d1e9b6f68a472c5ace64d704fa"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 550,
      "estimated_customer_growth_2y": 747
    },
    {
      "warehouse_id": 34,
      "latitude": -20.096807362626965,
      "longitude": -54.43319172087338,
      "customer_count": 622,
      "density_ratio": 0.0063,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.94,
      "top_items": [
        "9ecadb84c81da840dbf3564378b586e9",
        "56cdfe67fbda57c1dcc752f5f361f981",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "c6ea63369936552872ae890c82175b4b",
        "216bb0e0cd43ffd832e0973d35e0377e"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 843,
      "estimated_customer_growth_2y": 1144
    },
    {
      "warehouse_id": 35,
      "latitude": -21.38638197620773,
      "longitude": -48.16324070541987,
      "customer_count": 1925,
      "density_ratio": 0.0194,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.91,
      "top_items": [
        "ec3f8e78677c7e0395b155bc67417158",
        "42a2c92a0979a949ca4ea89ec5c7b934",
        "3dd2a17168ec895c781a9191c1e95ad7",
        "034abfb9b758233fd393bd361d4ec599",
        "99a4788cb24856965c36a24e339b6058"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 2611,
      "estimated_customer_growth_2y": 3543
    },
    {
      "warehouse_id": 36,
      "latitude": -28.472180950054742,
      "longitude": -54.385842727126885,
      "customer_count": 562,
      "density_ratio": 0.0057,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.85,
      "top_items": [
        "d581a9097bc2a13adf46bbd864ee0d08",
        "3a081630438070b86de554fac9edcc7a",
        "d6d73c1fe2e8c0e3e90e2421ffa4b963",
        "747152211829957938862c1c57a30f16",
        "a3a10562c9d134b92f04b8cce298d037"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 762,
      "estimated_customer_growth_2y": 1034
    },
    {
      "warehouse_id": 37,
      "latitude": -4.210538750068297,
      "longitude": -38.75389355102209,
      "customer_count": 1339,
      "density_ratio": 0.0135,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 12.03,
      "top_items": [
        "bb50f2e236e5eea0100680137654686c",
        "e6c30d6c9696ee10542e7e25dcdffa92",
        "6a1234a3847f4ef3090a02a8b07fa42f",
        "65266b2da20d04dbe00c5c2d3bb7859e",
        "a62e25e09e05e6faf31d90c6ec1aa3d1"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1816,
      "estimated_customer_growth_2y": 2464
    },
    {
      "warehouse_id": 38,
      "latitude": -20.6200928751634,
      "longitude": -43.72931901939209,
      "customer_count": 479,
      "density_ratio": 0.0048,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.72,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "92291ca5b617b6ee1259736eb5ad114f",
        "7e45ec6dc0a748b0a621654d23bfa768",
        "4fb75e72740ecb238efad0fbea708f3a",
        "cac9e5692471a0700418aa3400b9b2b1"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 649,
      "estimated_customer_growth_2y": 881
    },
    {
      "warehouse_id": 39,
      "latitude": -19.839774189427537,
      "longitude": -43.17263064521352,
      "customer_count": 342,
      "density_ratio": 0.0034,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.52,
      "top_items": [
        "389d119b48cf3043d311335e499d9c6b",
        "89321f94e35fc6d7903d36f74e351d40",
        "1cdc69add3346845cb008e938c7db9e0",
        "422879e10f46682990de24d770e7f83d",
        "95ae4833a7cd4f9f7f90c3b77a993c1b"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 463,
      "estimated_customer_growth_2y": 629
    },
    {
      "warehouse_id": 40,
      "latitude": -22.50312909645561,
      "longitude": -43.92461737389774,
      "customer_count": 1175,
      "density_ratio": 0.0118,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.78,
      "top_items": [
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "165f86fe8b799a708a20ee4ba125c289",
        "99a4788cb24856965c36a24e339b6058",
        "7e0dc102074f8285580c9777f79c90cf",
        "9ed0c78e13f71131885275746cc69687"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1594,
      "estimated_customer_growth_2y": 2162
    },
    {
      "warehouse_id": 41,
      "latitude": -23.394637970326645,
      "longitude": -51.641886692028365,
      "customer_count": 1294,
      "density_ratio": 0.013,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.96,
      "top_items": [
        "a9516a079e37a9c9c36b9b78b10169e8",
        "74437e600638a59559c5238c84805b76",
        "719d571299707561c34ba04ab867b32a",
        "422879e10f46682990de24d770e7f83d",
        "5a848e4ab52fd5445cdc07aab1c40e48"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1755,
      "estimated_customer_growth_2y": 2381
    },
    {
      "warehouse_id": 42,
      "latitude": -20.22022913668424,
      "longitude": -49.984404800926995,
      "customer_count": 1120,
      "density_ratio": 0.0113,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.69,
      "top_items": [
        "422879e10f46682990de24d770e7f83d",
        "84f456958365164420cfc80fbe4c7fab",
        "8c5876b1c7768217964f353bc7e64393",
        "7814c273ab16783d73a9863ebfa8b141",
        "99a4788cb24856965c36a24e339b6058"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1519,
      "estimated_customer_growth_2y": 2061
    },
    {
      "warehouse_id": 43,
      "latitude": -19.509005045005633,
      "longitude": -44.17049352579692,
      "customer_count": 317,
      "density_ratio": 0.0032,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.48,
      "top_items": [
        "389d119b48cf3043d311335e499d9c6b",
        "d1c427060a0f73f6b889a5c7c61f2ac4",
        "422879e10f46682990de24d770e7f83d",
        "c857b96593773e940454e76efa8eabb3",
        "9abb00920aae319ef9eba674b7d2e6ff"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 430,
      "estimated_customer_growth_2y": 583
    },
    {
      "warehouse_id": 44,
      "latitude": -3.6616331142165115,
      "longitude": -43.80847086622391,
      "customer_count": 1010,
      "density_ratio": 0.0102,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.53,
      "top_items": [
        "3fbc0ef745950c7932d5f2a446189725",
        "d9894482fba41f536a273ba2276d951f",
        "bb50f2e236e5eea0100680137654686c",
        "389d119b48cf3043d311335e499d9c6b",
        "b9ac7314894a193a11fd3150f8c69307"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1370,
      "estimated_customer_growth_2y": 1859
    },
    {
      "warehouse_id": 45,
      "latitude": -10.73070381717743,
      "longitude": -47.04929634550523,
      "customer_count": 449,
      "density_ratio": 0.0045,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.68,
      "top_items": [
        "b532349fe46b38fbc7bb3914c1bdae07",
        "1bfb290d7273a442c874dbe74b4abae6",
        "19936fa4f614ee0590d3b77ac83fd648",
        "a62e25e09e05e6faf31d90c6ec1aa3d1",
        "86b22a03cb72239dd53996a67df35c63"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 609,
      "estimated_customer_growth_2y": 826
    },
    {
      "warehouse_id": 46,
      "latitude": -17.895217137897962,
      "longitude": -46.746664876505285,
      "customer_count": 341,
      "density_ratio": 0.0034,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.52,
      "top_items": [
        "fce1a7007f115fe2b900a7592ee87c47",
        "53759a2ecddad2bb87a079a1f1519f73",
        "d9e7d13814ea50f9ae1f612ef6b3a1f1",
        "91472a5abca63bed91ade04c71c203ce",
        "8c591ab0ca519558779df02023177f44"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 462,
      "estimated_customer_growth_2y": 627
    },
    {
      "warehouse_id": 47,
      "latitude": -7.667097150646704,
      "longitude": -63.612271771411294,
      "customer_count": 539,
      "density_ratio": 0.0054,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.82,
      "top_items": [
        "b81a05d0dd312ece2140846909f5ef81",
        "84d0e98e468edffdfe4f1f5b178d4ecc",
        "6ff1fc9209c7854704a4f75c9fac41b4",
        "1a4f338579cef9360aa407e3d97b4c89",
        "63085bb4366ded27bcb63cbb59b4103a"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 731,
      "estimated_customer_growth_2y": 992
    },
    {
      "warehouse_id": 48,
      "latitude": -23.30656946951349,
      "longitude": -45.540821472610155,
      "customer_count": 1828,
      "density_ratio": 0.0184,
      "warehouse_size": "medium",
      "estimated_delivery_improvement_pct": 12.77,
      "top_items": [
        "99a4788cb24856965c36a24e339b6058",
        "3120b244fb6ccbf5e91a53148ea1bd88",
        "0521fe3eb04940304b489d0fb49a37dd",
        "389d119b48cf3043d311335e499d9c6b",
        "aca2eb7d00ea1a7b8ebd4e68314663af"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 2480,
      "estimated_customer_growth_2y": 3364
    },
    {
      "warehouse_id": 49,
      "latitude": -21.31735586470575,
      "longitude": -41.686751028271246,
      "customer_count": 1151,
      "density_ratio": 0.0116,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.74,
      "top_items": [
        "389d119b48cf3043d311335e499d9c6b",
        "84f456958365164420cfc80fbe4c7fab",
        "6a8631b72a2f8729b91514db87e771c0",
        "9c21e4a14d74098b5d4e1126e706dc3a",
        "7dad8823339023bc68054e62d1e9a761"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1561,
      "estimated_customer_growth_2y": 2118
    },
    {
      "warehouse_id": 50,
      "latitude": -21.351826061484633,
      "longitude": -43.068648989098776,
      "customer_count": 912,
      "density_ratio": 0.0092,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 11.38,
      "top_items": [
        "97f1396a5a1f7c07ba51784efdec44b8",
        "03e1c946c0ddfc58724ff262aef08dff",
        "53759a2ecddad2bb87a079a1f1519f73",
        "9cb2ed2f273027b8daa3b0863368105c",
        "42a2c92a0979a949ca4ea89ec5c7b934"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 1237,
      "estimated_customer_growth_2y": 1678
    },
    {
      "warehouse_id": 51,
      "latitude": -20.077239034412173,
      "longitude": -45.04616158740525,
      "customer_count": 642,
      "density_ratio": 0.0065,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.97,
      "top_items": [
        "edf219cab1d0e435e3e499287dca9a03",
        "fd9f8eff0fa910129e366594485e00dd",
        "1bb0f142789375f5709d08b2f2355c2b",
        "53b36df67ebb7c41585e8d54d6772e08",
        "c183fd5d2abf05873fa6e1014ed9e06c"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 871,
      "estimated_customer_growth_2y": 1181
    },
    {
      "warehouse_id": 52,
      "latitude": -21.352511593135,
      "longitude": -45.18714106392918,
      "customer_count": 490,
      "density_ratio": 0.0049,
      "warehouse_size": "small",
      "estimated_delivery_improvement_pct": 10.74,
      "top_items": [
        "c2c989ac5100e59a6c3d12b2c31a2c72",
        "584d0486add75aa0f5c0660a7cd8afba",
        "be0dbdc3d67d55727a65d4cd696ca73c",
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "d41dc2f2979f52d75d78714b378d4068"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 664,
      "estimated_customer_growth_2y": 901
    },
    {
      "warehouse_id": 53,
      "latitude": -23.787312688957332,
      "longitude": -46.45653441016369,
      "customer_count": 7187,
      "density_ratio": 0.0725,
      "warehouse_size": "large",
      "estimated_delivery_improvement_pct": 20.87,
      "top_items": [
        "aca2eb7d00ea1a7b8ebd4e68314663af",
        "9ecadb84c81da840dbf3564378b586e9",
        "422879e10f46682990de24d770e7f83d",
        "99a4788cb24856965c36a24e339b6058",
        "154e7e31ebfa092203795c972e5804a6"
      ],
      "note": "Cluster normal",
      "algorithm": "minibatchkmeans",
      "estimated_customer_growth_1y": 9750,
      "estimated_customer_growth_2y": 13228
    }
  ];
export const warehouseLocations: PredictiveWarehouse[] = [...gmmLocations, ...kmeansLocations, ...minibatchkmeansLocations];

export const algorithmOrder: AlgorithmType[] = ["gmm", "kmeans", "minibatchkmeans"];
