import { useContext } from 'react';
import {CurrentUserContext} from './../contexts/CurrentUserContext';
export default function Card ({card, onCardClick}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `card__like ${isLiked && 'card__like_active'}` 
      );
    const {link, name, likes} = card;
    const handleClick = () => {
        onCardClick(card);
    } 
    return (
        <div className={`card`}>
            <img src={link} className="card__image" alt={name}  onClick={handleClick} />
            <div className="card__wrapper">
                <h2 className="card__title">{name}</h2>
                <div className="card__wrapper-like">
                    <button type="button" className={cardLikeButtonClassName}></button>
                    <p className="card__current-likes">{likes.length}</p>
                </div>
            </div>
            {isOwn && <button type="button" className="card__delete"></button> }
        </div>
    )

}
