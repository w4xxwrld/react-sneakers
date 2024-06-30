import React from "react";
import AppContext from "../context"

function CardItem({ id, name, imageUrl, price, onPlus, onAddToFavorite, liked = false }) {
    const { isItemAdded } = React.useContext(AppContext);
    const [isLiked, setIsLiked] = React.useState(liked);

    const onClickPlus = () => {
        onPlus({ id, name, price, imageUrl, parentId: id });
    };

    const onLike = () => {
        onAddToFavorite({ id, name, price, imageUrl, parentId: id });
        setIsLiked(!isLiked);
    };

    return (
        <div id={id} className="rounded-xl py-8 mx-auto relative px-auto w-[200px] h-[280px] bg-[#f6f6f6] text-center transition ease-in-out hover:-translate-y-4 hover:shadow-lg">
            <img src={imageUrl} alt="sneakers" className="w-44 mx-auto absolute inset-x-0 top-0" />
            <img src={isLiked ? "img/liked.png" : "img/unliked.png"} alt="add to favorites" className="cursor-pointer w-6 absolute top-6 left-6" onClick={onLike} />
            <div className="absolute top-36 left-6 text-[15px] text-left font-normal">{name}</div>
            <div className="absolute top-52 left-6 text-[15px] text-left font-normal">Цена:</div>
            <div className="absolute top-56 left-6 text-[15px] text-left font-bold">{price} руб.</div>
            <img src={isItemAdded(id) ? "img/tick.png" : "img/plus.png"} alt="add to cart" className="cursor-pointer w-6 absolute top-56 left-36" onClick={onClickPlus} />
        </div>
    );
};

export default CardItem;