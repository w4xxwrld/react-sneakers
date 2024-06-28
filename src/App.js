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
    if (CartItems.find(cartObj => Number(cartObj.parentId) === Number(obj.parentId))) {
      axios.delete(`https://667a5e42bd627f0dcc8e8fa3.mockapi.io/api/v1/cart/${Number(obj.parentId)}`)
      setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.parentId)));
    } else {
      const { data } = await axios.post('https://667a5e42bd627f0dcc8e8fa3.mockapi.io/api/v1/cart', obj);
      setCartItems((prev) => [...prev, data]);
    }
  };

  const onRemoveItem = (parentId) => {
    axios.delete(`https://667a5e42bd627f0dcc8e8fa3.mockapi.io/api/v1/cart/${parentId}`);
    setCartItems((prev) => prev.filter(item => item.parentId !== parentId));
  };

  const onFavorite = (obj) => {
    if (isFavorited.find(favObj => favObj.parentId === obj.parentId)) {
      axios.delete(`https://667c029c3c30891b865aed77.mockapi.io/api/v1/favorites/${Number(obj.parentId)}`);
      setIsFavorited((prev) => prev.filter(item => item.parentId !== obj.parentId));
    } else {
      console.log(obj)
      axios.post('https://667c029c3c30891b865aed77.mockapi.io/api/v1/favorites', obj);
      setIsFavorited((prev) => [...prev, obj]);
    };
  };

  const isItemAdded = (parentId) => {
    return CartItems.some((obj) => Number(obj.parentId) === Number(parentId));
  };

  const isItemLiked = (parentId) => {
    return isFavorited.some((obj) => Number(obj.parentId) === Number(parentId));
  };

  return (
    <AppContext.Provider value={{ isCartOpen, items, isItemLiked, isFavorited, CartItems, isItemAdded }}>
      <BrowserRouter>
        <div className="bg-white rounded-xl mx-auto my-[50px] px-[25px] py-[25px] max-w-[1100px]">
          <Header onClickCart={() => setIsCartOpen(true)} />
          {isCartOpen ? <MyCart items={CartItems} onClickCart={() => setIsCartOpen(false)} onRemove={onRemoveItem} /> : null}
          <PhotoHolder />
          <Routes>
            <Route path="/" element={<Home items={items} onFavorite={onFavorite} CartItems={CartItems} onAddToCart={onAddToCart} />} />
            <Route path='/favorites' element={<Favorites onFavorite={onFavorite} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;