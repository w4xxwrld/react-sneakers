# Miras Sneakers - Local FastAPI backend

This small FastAPI backend replicates the endpoints used by the React frontend so you can stop using the external mockapi service.

Features
- GET /api/v1/sneakers
- GET /api/v1/cart
- GET /api/v1/favorites
- POST /api/v1/cart
- DELETE /api/v1/cart/{id}
- POST /api/v1/favorites
- DELETE /api/v1/favorites/{id}

Setup (recommended)

1. Create and activate a Python virtual environment (macOS / Linux):

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Run the server (development):

```bash
uvicorn backend.main:app --reload --port 3001
```

The API will be available at `http://localhost:3001/api/v1/...`.

How to use with the frontend
- Update the three frontend URLs (in `src/App.js`) from the mockapi URLs to `http://localhost:3001/api/v1/...`.
  - Example: replace `https://667a5e42bd627f0dcc8e8fa3.mockapi.io/api/v1/sneakers` with `http://localhost:3001/api/v1/sneakers`.

Notes
- Data is persisted in `backend/db.json` using a simple file-based approach. This is fine for local development but not for production.
- The backend uses a simple lock for concurrent-safe file writes; it is not intended for heavy concurrent load.

If you want, I can patch the frontend `src/App.js` to use `http://localhost:3001` automatically.
