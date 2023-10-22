import {useEffect, useState} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import AddPlacePopup from './components/AddPlacePopup';
import ImagePopup from './components/ImagePopup';
import api from './utils/Api';
import {CurrentUserContext} from './contexts/CurrentUserContext';

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false),
        [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false),
        [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false),
        [selectedCard, setSelectedCard] = useState({}),
        [isSomePopupOpen, setIsSomePopupOpen] = useState(false),
        [currentUser, setCurrentUser] = useState({}),
        [cards, setCards] = useState([]);

  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isSomePopupOpen) {
      document.addEventListener("keydown", handleEscClose);
      document.querySelector("body").classList.add("body_no-scroll");
      return () => {
        document.removeEventListener("keydown", handleEscClose);
        document.querySelector("body").classList.remove("body_no-scroll");
      };
    }
  }, [isSomePopupOpen]);
  useEffect(() => {
    api.getUserInfo()
    .then((data) => {setCurrentUser(data)})
    .catch((error) => {handleResponseError(error, "Ошибка получения информации о пользователе")});
  }, []);
  useEffect(()=> {
    api.getCards()
    .then(data => {setCards(data)})
    .catch((error) => {handleResponseError(error, "Ошибка получения карточек мест")});
  }, []);

  function handleResponseError (error, textError) {
    console.log(error, " ", textError);
  }
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
    setIsSomePopupOpen(true);
  }
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
    setIsSomePopupOpen(true);
  }
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
    setIsSomePopupOpen(true);
  }
  function handleCardClick (card) {
    setSelectedCard(card);
    setIsSomePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsSomePopupOpen(false);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
       .then((newCard) => {setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c))});
  } 
  function handleCardDelete (card) {
    api.deleteCard(card._id)
       .then(() => {setCards((cards) => cards.filter(c => c !== card ))});
  }
  function handleUpdateUser ({name, about}) {
    return (api.editProfile(name, about)
       .then((data) => {setCurrentUser(data)}))
  }
  function handleUpdateAvatar (url) {
    return (api.editAvatar(url)
       .then((url) => {setCurrentUser(url)}))
  }
  function handleAddNewCard ({name, link}) {
    return (api.addNewCard(name, link)
       .then((data) => {setCards([data, ...cards])}))
  }

  return (
    <CurrentUserContext.Provider value={{currentUser, handleCardLike, handleCardDelete, cards}}>
      <div className="page">
          <Header />
          <Main handleEditProfileClick={handleEditProfileClick}
                handleAddPlaceClick={handleAddPlaceClick} 
                handleEditAvatarClick={handleEditAvatarClick} 
                onCardClick={handleCardClick}/>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddNewCard} />
          <ImagePopup card={selectedCard} 
                      name={'image'} 
                      onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );

}