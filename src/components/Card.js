export default function Card ({card, onCardClick}) {

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
                    <button type="button" className="card__like"></button>
                    <p className="card__current-likes">{likes.length}</p>
                </div>
            </div>
            <button type="button" className="card__delete"></button>
        </div>
    )

}
