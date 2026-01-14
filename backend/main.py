from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from pathlib import Path

from utils import load_db, save_db, _next_id

app = FastAPI(title="Miras Sneakers - Local API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    id: Optional[int] = None
    parentId: Optional[int] = None
    name: str
    imageUrl: str
    price: int
    size: Optional[int] = None
    quantity: Optional[int] = 1


@app.get("/api/v1/sneakers")
def get_sneakers():
    db = load_db()
    return db.get("sneakers", [])


@app.get("/api/v1/cart")
def get_cart():
    db = load_db()
    return db.get("cart", [])


@app.get("/api/v1/favorites")
def get_favorites():
    db = load_db()
    return db.get("favorites", [])


@app.post("/api/v1/cart")
def add_to_cart(item: Item):
    db = load_db()
    cart = db.setdefault("cart", [])
    new_id = _next_id(cart)
    obj = item.dict()
    obj["id"] = new_id
    cart.append(obj)
    save_db(db)
    return obj


@app.delete("/api/v1/cart/{item_id}")
def delete_cart_item(item_id: int):
    db = load_db()
    cart = db.get("cart", [])
    before = len(cart)
    cart = [c for c in cart if int(c.get("id")) != int(item_id)]
    if len(cart) == before:
        raise HTTPException(status_code=404, detail="Cart item not found")
    db["cart"] = cart
    save_db(db)
    return {"status": "deleted"}


@app.post("/api/v1/favorites")
def add_favorite(item: Item):
    db = load_db()
    fav = db.setdefault("favorites", [])
    new_id = _next_id(fav)
    obj = item.dict()
    obj["id"] = new_id
    fav.append(obj)
    save_db(db)
    return obj


@app.delete("/api/v1/favorites/{item_id}")
def delete_favorite(item_id: int):
    db = load_db()
    fav = db.get("favorites", [])
    before = len(fav)
    fav = [f for f in fav if int(f.get("id")) != int(item_id)]
    if len(fav) == before:
        raise HTTPException(status_code=404, detail="Favorite item not found")
    db["favorites"] = fav
    save_db(db)
    return {"status": "deleted"}
