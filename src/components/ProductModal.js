import React from "react";

function ProductModal({ product, isOpen, onClose, onAddToCart, isInCart }) {
  const [selectedSize, setSelectedSize] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46];

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }
    onAddToCart({ ...product, size: selectedSize, quantity, parentId: product.id });
    onClose();
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-8 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          <img src="img/x-mark.png" alt="close" className="w-4 h-4" />
        </button>

        <div className="flex gap-8">
          {/* Product Image with Zoom */}
          <div className="flex-shrink-0 relative">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className={`w-80 h-80 object-contain rounded-xl bg-gray-50 cursor-zoom-in transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            />
            {!isZoomed && (
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                Наведите для увеличения
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">Артикул: #{product.id}</p>
            
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">Цена:</div>
              <div className="text-4xl font-bold">{product.price} Тг.</div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="text-lg font-semibold mb-3">Выберите размер:</div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border-2 font-semibold transition ${
                      selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <div className="text-lg font-semibold mb-3">Количество:</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-black transition flex items-center justify-center font-bold text-xl"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-black transition flex items-center justify-center font-bold text-xl"
                  disabled={quantity >= 10}
                >
                  +
                </button>
                <span className="text-sm text-gray-500">(макс. 10 пар)</span>
              </div>
            </div>

            {/* Product Description */}
            <div className="mb-6 flex-1">
              <div className="text-sm text-gray-600">
                <p className="mb-2">Премиальные кроссовки с высоким уровнем комфорта и современным дизайном.</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Дышащий материал верха</li>
                  <li>Амортизирующая подошва</li>
                  <li>Оригинальная продукция</li>
                  <li>Гарантия качества</li>
                </ul>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                isInCart
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isInCart ? 'Уже в корзине' : 'Добавить в корзину'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
