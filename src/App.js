import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import Header from "./components/Header";
import PhotoHolder from "./components/PhotoHolder";
import MyCart from "./components/MyCart";
import Toast from "./components/Toast";
import Footer from "./components/Footer";
import axios from "axios";
import Home from './screens/Home';
import Favorites from './screens/Favorites';
import AppContext from './context';

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3001/api/v1";

function App() {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [isFavorited, setIsFavorited] = React.useState([]);
  const [CartItems, setCartItems] = React.useState([]);
  const [toast, setToast] = React.useState({ isVisible: false, message: '', type: 'success' });
  const [isLoading, setIsLoading] = React.useState(true);

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
  };

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const favRes = await axios.get(`${API_BASE}/favorites`)
      const cartRes = await axios.get(`${API_BASE}/cart`)
      const itemsRes = await axios.get(`${API_BASE}/sneakers`)
      setIsFavorited(favRes.data)
      setCartItems(cartRes.data)
      setItems(itemsRes.data)
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = CartItems.find(cartObj => Number(cartObj.parentId) === Number(obj.id))
    if (findItem) {
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
      axios.delete(`${API_BASE}/cart/${findItem.id}`)
      showToast('Удалено из корзины', 'info');
    } else {
      console.log(obj)
      const { data } = await axios.post(`${API_BASE}/cart`, obj);
      setCartItems((prev) => [...prev, data]);
      showToast('Добавлено в корзину!', 'success');
    }
  };

  const onRemoveItem = (id) => {
    console.log(id)
    axios.delete(`${API_BASE}/cart/${id}`);
    setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    showToast('Удалено из корзины', 'info');
  };

  const onFavorite = async (obj) => {
    if (isFavorited.find(favObj => Number(favObj.id) === Number(obj.id))) {
      setIsFavorited((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
      axios.delete(`${API_BASE}/favorites/${obj.id}`);
      showToast('Удалено из избранного', 'info');
    } else {
      console.log(obj)
      const { data } = await axios.post(`${API_BASE}/favorites`, obj);
      setIsFavorited((prev) => [...prev, data]);
      showToast('Добавлено в избранное!', 'success');
    };
  };

  const isItemAdded = (id) => {
    return CartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{ isCartOpen, items, isFavorited, CartItems, onFavorite, isItemAdded, isLoading }}>
      <BrowserRouter>
        <div className="bg-white rounded-xl mx-auto my-[50px] px-[25px] py-[25px] max-w-[1100px]">
          <Header onClickCart={() => setIsCartOpen(true)} />
          {isCartOpen ? <MyCart items={CartItems} onClickCart={() => setIsCartOpen(false)} onRemove={onRemoveItem} /> : null}
          <PhotoHolder />
          <Routes>
            <Route path="/" element={<Home items={items} onFavorite={onFavorite} CartItems={CartItems} onAddToCart={onAddToCart} />} />
            <Route path='/favorites' element={<Favorites />}></Route>
          </Routes>
        </div>
        <Footer />
        <Toast 
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
        />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;