import React from "react";
import CardItem from "../components/CardItem";
import AppContext from "../context";
function Favorites( ) {
  const {isFavorited, onFavorite} = React.useContext(AppContext);
  return (
    <>
      <h1 className="text-3xl font-bold mt-4">Понравившиеся товары</h1>
      <div className="grid grid-cols-4 gap-y-12 mt-[25px]">
        {isFavorited.map((item, index) => (
          <CardItem
            key={index}
            onAddToFavorite={onFavorite}
            liked={true}
            {...item}
          />
        ))}
      </div>
    </>
  );
}

export default Favorites;