import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import Header from "./components/Header";
import PhotoHolder from "./components/PhotoHolder";
import MyCart from "./components/MyCart";
import axios from "axios";
import Home from './screens/Home';
import Favorites from './screens/Favorites';
import AppContext from './context';

function App() {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [isFavorited, setIsFavorited] = React.useState([]);
  const [CartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const favRes = await axios.get('https://667c029c3c30891b865aed77.mockapi.io/api/v1/favorites')
      const cartRes = await axios.get('https://667a5e42bd627f0dcc8e8fa3.mockapi.io/api/v1/cart')
      const itemsRes = await axios.get('https://667a5e42bd627f0dcc8e8fa3.mockapi.io/api/v1/sneakers')
      setIsFavorited(favRes.data)
      setCartItems(cartRes.data)
      setItems(itemsRes.data)
    };
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = CartItems.find(cartObj => Number(cartObj.parentId) === Number(obj.id))
    if (findItem) {
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
      axios.delete(`https://667a5e42bd627f0dcc8e8fa3.mockapi.io/api/v1/cart/${findItem.id}`)
    } else {
      console.log(obj)
      const { data } = await axios.post('https://667a5e42bd627f0dcc8e8fa3.mockapi.io/api/v1/cart', obj);
      setCartItems((prev) => [...prev, data]);
    }
  };

  const onRemoveItem = (id) => {
    console.log(id)
    axios.delete(`https://667a5e42bd627f0dcc8e8fa3.mockapi.io/api/v1/cart/${id}`);
    setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
  };

  const onFavorite = async (obj) => {
    if (isFavorited.find(favObj => Number(favObj.id) === Number(obj.id))) {
      setIsFavorited((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
      axios.delete(`https://667c029c3c30891b865aed77.mockapi.io/api/v1/favorites/${obj.id}`);
    } else {
      console.log(obj)
      const { data } = await axios.post('https://667c029c3c30891b865aed77.mockapi.io/api/v1/favorites', obj);
      setIsFavorited((prev) => [...prev, data]);
    };
  };

  const isItemAdded = (id) => {
    return CartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{ isCartOpen, items, isFavorited, CartItems, onFavorite, isItemAdded }}>
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
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;