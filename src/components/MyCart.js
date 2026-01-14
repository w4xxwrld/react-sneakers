import React from "react";

function MyCart({ onClickCart, onRemove, items = [] }) {
  const [promoCode, setPromoCode] = React.useState('');
  const [discount, setDiscount] = React.useState(0);
  const [promoError, setPromoError] = React.useState('');

  const validPromoCodes = {
    'SAVE10': 10,
    'WELCOME': 15,
    'MIRAS20': 20
  };

  const subtotal = items.reduce((sum, obj) => Number(obj.price) * (obj.quantity || 1) + Number(sum), 0);
  const tax = subtotal * 0.05;
  const discountAmount = subtotal * (discount / 100);
  const totalPrice = subtotal + tax - discountAmount;

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase();
    if (validPromoCodes[code]) {
      setDiscount(validPromoCodes[code]);
      setPromoError('');
    } else {
      setPromoError('Неверный промокод');
      setDiscount(0);
    }
  };

  return (
    <>
      <div className="fixed left-0 top-0 bg-[#0000007e] w-screen h-screen z-10 animate-fadeIn" onClick={onClickCart}>
        <div 
          className="absolute h-screen w-1/4 right-0 bg-white flex flex-col animate-slideInRight shadow-2xl" 
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-3xl mt-8 ml-8 flex items-center justify-between pr-8">
            Корзина
            <span className="text-sm bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
              {items.length}
            </span>
          </h2>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold mb-2">Корзина пуста</h3>
              <p className="text-gray-500 mb-6">Добавьте кроссовки, чтобы начать покупки</p>
              <button 
                onClick={onClickCart}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Вернуться к покупкам
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-scroll px-4">
                {items.map((obj) => (
                  <div key={obj.id} className="rounded-xl py-2 mx-auto mt-8 relative px-auto w-[350px] min-h-[96px] bg-[#f6f6f6] text-center">
                    <img src={obj.imageUrl} alt="sneakers" className="rounded-xl w-24 absolute inset-x-0 top-0 left-0" />
                    <div className="absolute top-3 left-24 text-[15px] text-left font-normal text-balance w-40">{obj.name}</div>
                    {obj.size && <div className="absolute top-10 left-24 text-[13px] text-left font-semibold text-gray-600">Размер: {obj.size}</div>}
                    {obj.quantity && obj.quantity > 1 && (
                      <div className="absolute top-[46px] left-24 text-[13px] text-left font-semibold text-gray-600">Кол-во: {obj.quantity} шт.</div>
                    )}
                    <div className="absolute top-[62px] left-24 text-[15px] text-left font-normal">
                      Цена:<span className="text-[15px] font-bold">{obj.price * (obj.quantity || 1)} Тг.</span>
                    </div>
                    <img src="img/x-mark.png" alt="X" className="absolute cursor-pointer w-6 h-6 right-4 top-[37%]" onClick={() => onRemove(obj.id)} />
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mx-8 mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Промокод"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold"
                  >
                    Применить
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
                {discount > 0 && <p className="text-green-600 text-sm mt-1">✓ Скидка {discount}% применена!</p>}
              </div>

              {/* Price Summary */}
              <div className="flex flex-row justify-between mx-10 mt-2">
                <p>Сумма:</p><p>{subtotal.toFixed(0)} Тг.</p>
              </div>
              <div className="flex flex-row justify-between mx-10 mb-2">
                <p>Налог 5%:</p><p>{tax.toFixed(0)} Тг.</p>
              </div>
              {discount > 0 && (
                <div className="flex flex-row justify-between mx-10 mb-2 text-green-600">
                  <p>Скидка {discount}%:</p><p>-{discountAmount.toFixed(0)} Тг.</p>
                </div>
              )}
              <div className="flex flex-row justify-between mx-10 mb-4 text-lg font-bold">
                <p>Итого:</p><p>{totalPrice.toFixed(0)} Тг.</p>
              </div>

              <div className="w-10/12 h-16 mx-auto bg-[#779f45] rounded-2xl cursor-pointer text-center pt-[19px] mb-6 text-white ease-in duration-150 hover:bg-[#9dd05c]">
                Оформить заказ
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyCart;
