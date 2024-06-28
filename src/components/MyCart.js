import React from "react";

function MyCart({ onClickCart, onRemove, items = [] }) {
  const totalPrice = items.reduce((sum, obj) => Number(obj.price) + Number(sum), 0)
  return (
    <>
      <div className="fixed left-0 top-0 bg-[#0000007e] w-screen h-screen z-10" onClick={onClickCart} >
        <div className="absolute h-screen w-1/4 right-0 bg-white flex flex-col" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-3xl mt-8 ml-8">Корзина</h2>
          <div className="flex-1 overflow-y-scroll">
            {items.map((obj) => (
              <div className="rounded-xl py-2 mx-auto mt-8 relative px-auto w-[350px] h-[96px] bg-[#f6f6f6] text-center">
              <img src={obj.imageUrl} alt="sneakers" className="rounded-xl w-24 absolute inset-x-0 top-0 left-0" />
              <div className="absolute top-3 left-24 text-[15px] text-left font-normal text-balance w-40">{obj.name}</div>
              <div className="absolute top-[62px] left-24 text-[15px] text-left font-normal">Цена:<span className="text-[15px] font-bold">{obj.price} руб.</span></div>
              <img src="img/x-mark.png" alt="X" className="absolute cursor-pointer w-6 h-6 right-4 top-[37%]" onClick={() => onRemove(obj.id)}/>
          </div>
            ))}
          </div>
          <div className="flex flex-row justify-between mx-10 mt-10">
            <p>Сумма:</p><p>{totalPrice} руб.</p>
          </div>
          <div className="flex flex-row justify-between mx-10 mb-2">
            <p>Налог 5%:</p><p>{totalPrice * 0.05} руб.</p>
          </div>
          <div className="w-10/12 h-16 mx-auto bg-[#779f45] rounded-2xl cursor-pointer text-center pt-[19px] mb-6 text-white ease-in duration-150 hover:bg-[#9dd05c]">
            Оформить заказ
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCart;
