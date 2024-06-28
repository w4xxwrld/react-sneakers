import React from "react";
import CardItem from "../components/CardItem";
function Home({
  items,
  onAddToCart,
  onFavorite
}) {
  return (
    <>
      <h1 className="text-3xl font-bold mt-4">Все Кроссовки</h1>
      <div className="grid grid-cols-4 gap-y-12 mt-[25px]">
        {items.map((item, index) => (
          <CardItem
            key={index}
            onPlus={onAddToCart}
            onAddToFavorite={onFavorite}
            {...item}
          />
        ))}
      </div>
    </>
  );
}

export default Home;