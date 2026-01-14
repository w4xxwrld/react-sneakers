import React from "react";
import CardItem from "../components/CardItem";
import ProductModal from "../components/ProductModal";
import LoadingSkeletons from "../components/LoadingSkeletons";
import AppContext from "../context";

function Home({
  items,
  onAddToCart,
  onFavorite
}) {
  const [sortType, setSortType] = React.useState('default');
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [priceRange, setPriceRange] = React.useState({ min: 0, max: 100000 });
  const { isItemAdded, isLoading } = React.useContext(AppContext);

  // Calculate min and max prices from items
  React.useEffect(() => {
    if (items.length > 0) {
      const prices = items.map(item => item.price);
      setPriceRange({
        min: Math.min(...prices),
        max: Math.max(...prices)
      });
    }
  }, [items]);

  const [filterPriceRange, setFilterPriceRange] = React.useState({ min: 0, max: 100000 });

  React.useEffect(() => {
    setFilterPriceRange(priceRange);
  }, [priceRange]);

  const getFilteredAndSortedItems = () => {
    let filtered = [...items];
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(item => 
      item.price >= filterPriceRange.min && item.price <= filterPriceRange.max
    );
    
    // Sort
    switch(sortType) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const filteredItems = getFilteredAndSortedItems();

  return (
    <>
      <div className="mt-4">
        <h1 className="text-3xl font-bold mb-6">Все Кроссовки</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Поиск кроссовок..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition"
          />
        </div>

        {/* Filters Row */}
        <div className="flex justify-between items-start mb-6 gap-6">
          {/* Price Range Filter */}
          <div className="flex-1">
            <label className="text-sm font-semibold mb-2 block">Цена: {filterPriceRange.min} - {filterPriceRange.max} Тг.</label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-8">Мин</span>
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={filterPriceRange.min}
                  onChange={(e) => setFilterPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-8">Макс</span>
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={filterPriceRange.max}
                  onChange={(e) => setFilterPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Sort Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => setSortType('default')}
              className={`px-4 py-2 rounded-lg transition text-sm ${sortType === 'default' ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              По умолчанию
            </button>
            <button 
              onClick={() => setSortType('price-asc')}
              className={`px-4 py-2 rounded-lg transition text-sm ${sortType === 'price-asc' ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Цена ↑
            </button>
            <button 
              onClick={() => setSortType('price-desc')}
              className={`px-4 py-2 rounded-lg transition text-sm ${sortType === 'price-desc' ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Цена ↓
            </button>
            <button 
              onClick={() => setSortType('name')}
              className={`px-4 py-2 rounded-lg transition text-sm ${sortType === 'name' ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              По названию
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 mb-4">
          Найдено: {filteredItems.length} {filteredItems.length === 1 ? 'товар' : 'товаров'}
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <LoadingSkeletons count={8} />
      ) : (
        <div className="grid grid-cols-4 gap-y-12 mt-[25px]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <CardItem
                key={index}
                onPlus={onAddToCart}
                onAddToFavorite={onFavorite}
                onCardClick={handleCardClick}
                {...item}
              />
            ))
          ) : (
            <div className="col-span-4 text-center py-20">
              <p className="text-2xl text-gray-400">Ничего не найдено 😔</p>
              <p className="text-gray-500 mt-2">Попробуйте изменить фильтры</p>
            </div>
          )}
        </div>
      )}
      
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={onAddToCart}
        isInCart={selectedProduct ? isItemAdded(selectedProduct.id) : false}
      />
    </>
  );
}

export default Home;