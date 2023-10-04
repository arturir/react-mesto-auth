import {useState, useEffect} from 'react';
import api from '../utils/Api'
import Card from './Card';
import addButton from '../images/add.svg';
import avatar from '../images/avatar.jpg';
export default function Main ({handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, onCardClick}) {

    const [userName, setUserName] = useState("Жак-ив Кусто"),
          [userDescription , setuserDescription] = useState("Исследователь Океана"),
          [userAvatar, setUserAvatar] = useState(avatar),
          [cards, setCards] = useState([]);

    useEffect(()=> {
        api.getUserInfo()
        .then(({name, about, avatar}) => {
            setUserName(name);
            setuserDescription(about); 
            setUserAvatar(avatar);});
        }, [userName, userDescription, userAvatar]);
    useEffect(()=> {
        api.getCards()
        .then(data => {
            setCards(data)
        })
    }, []);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__left-column">
                    <div className="profile__avatar" onClick={handleEditAvatarClick} style={{ backgroundImage: `url(${userAvatar})` }} > 
                    </div>
                    <div className="profile__info">
                        <div className="profile__wrapper-name">
                            <h1 className="profile__name">{userName}</h1>
                            <button type="button" className="profile__edit" onClick={handleEditProfileClick}></button>
                        </div>
                        <h2 className="profile__metier">{userDescription}</h2>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={handleAddPlaceClick}>
                    <img src={addButton} className="profile__add" alt="Добавить" />
                </button>
            </section>
            <section className="cards">
                {cards.map((card)=> (
                    <Card card={card} onCardClick={onCardClick} key={card._id}/>
                ))}
            </section>
        </main>
    )
    
}