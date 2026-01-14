import json
import threading
from pathlib import Path

_lock = threading.Lock()

DB_PATH = Path(__file__).resolve().parent / "db.json"

def load_db():
    """Load and return the DB as a dict. If file missing, initialize default structure."""
    with _lock:
        if not DB_PATH.exists():
            data = {"sneakers": [], "cart": [], "favorites": []}
            save_db(data)
            return data
        with open(DB_PATH, "r", encoding="utf-8") as f:
            return json.load(f)

def save_db(data):
    """Write DB dict back to file atomically."""
    with _lock:
        tmp = DB_PATH.with_suffix(".tmp")
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        tmp.replace(DB_PATH)

def _next_id(collection):
    if not collection:
        return 1
    max_id = max((int(item.get("id", 0)) for item in collection), default=0)
    return max_id + 1
