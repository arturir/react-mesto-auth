import {useEffect, useState} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSomePopupOpen, setIsSomePopupOpen] = useState(false);

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

  return (
    <div className="page">
        <Header />
        <Main handleEditProfileClick={handleEditProfileClick}
              handleAddPlaceClick={handleAddPlaceClick} 
              handleEditAvatarClick={handleEditAvatarClick} 
              onCardClick={handleCardClick}/>
        <Footer />
        <PopupWithForm title={'Редактировать профиль'} 
                       name={'profile-editor'} 
                       isOpen={isEditProfilePopupOpen} 
                       onClose={closeAllPopups}>
          <input id="profile-form-name" type="text" className="form__text" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
          <span className="form__input-error profile-form-name-error"></span>
          <input id="profile-form-metier" type="text" className="form__text" name="metier" placeholder="Деятельность" minLength="2" maxLength="200" required />
          <span className="form__input-error profile-form-metier-error"></span>
        </PopupWithForm>   
        <PopupWithForm title={'Новое место'} 
                       name={'new-card'} 
                       isOpen={isAddPlacePopupOpen} 
                       onClose={closeAllPopups}>
          <input id="new-place-form-place" type="text" className="form__text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
          <span className="form__input-error new-place-form-place-error"></span>
          <input id="new-place-form-link" type="url" className="form__text" name="link" placeholder="Ссылка на картинку" required />
          <span className="form__input-error new-place-form-link-error"></span>
        </PopupWithForm>
        <PopupWithForm title={'Обновить аватар'} 
                       name={'avatar-editor'} 
                       isOpen={isEditAvatarPopupOpen} 
                       onClose={closeAllPopups}>
          <input id="new-place-form-place" type="url" className="form__text" name="avatar" placeholder="URL" minLength="2" maxLength="256" required />
          <span className="form__input-error new-place-form-place-error"></span>            
        </PopupWithForm>                
        <ImagePopup card={selectedCard} 
                    name={'image'} 
                    onClose={closeAllPopups}/>
    </div>
  );

}

export default App;
