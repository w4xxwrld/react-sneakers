import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../context"

function Header(props) {
  const {CartItems} = React.useContext(AppContext);
  const totalPrice = CartItems.reduce((sum, obj) => Number(obj.price) + Number(sum), 0)
  return (
    <>
      <header className="mx-auto px-auto w-11/12 h-[100px] bg-white text-center">
        <div className="relative w-11/12">
          <Link to="/"><img className="w-16 h-16 absolute left-1" src="img/images.png" alt="logo" />
          <h1 className="text-3xl absolute left-20">Miras Sneakers</h1>
          <p className="text-md text-gray-400 absolute left-20 top-8">Best sneaker shop</p></Link>
          <div onClick={props.onClickCart} className="cursor-pointer"><img className="w-7 h-7 absolute top-6 left-[86%]" src="img/cart.png" alt="cart" />
          <span className="text-sm self-center text-bold absolute top-7 left-[90%]">{totalPrice} Тг.</span></div>
          <Link to="/favorites"><img className="w-7 h-7 absolute top-6 left-[103%]" src="img/unliked.png" alt="favorites" /></Link>
          <img className="w-7 h-7 absolute top-6 left-[108%]" src="img/user.png" alt="user" />
        </div>
      </header>
      
    </>
  );
}

export default Header;
