import {useState} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup'

function App() {

  const [isEditProfilePopupOpen, setStateEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setStateAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setStateEditAvatarPopup] = useState(false);
  const [selectedCard, setStateCard] = useState(false)

  function handleEditAvatarClick () {
    setStateEditAvatarPopup(true);
  }
  function handleEditProfileClick () {
    setStateEditProfilePopup(true);
  }
  function handleAddPlaceClick () {
    setStateAddPlacePopup(true);
  }
  function handleCardClick (card) {
    setStateCard(card);
  }
  function closeAllPopups() {
    setStateEditAvatarPopup(false);
    setStateEditProfilePopup(false);
    setStateAddPlacePopup(false);
    handleCardClick(false);
  }

  return (
    <div className="page">
        <Header />
        <Main handleEditProfileClick={handleEditProfileClick} handleAddPlaceClick={handleAddPlaceClick} handleEditAvatarClick={handleEditAvatarClick} onCardClick={handleCardClick}/>
        <Footer />
        {isEditProfilePopupOpen && <PopupWithForm title={'Редактировать профиль'} name={'profile-editor'} isOpen={"popup_active"} onClose={closeAllPopups}/>}
        {isAddPlacePopupOpen && <PopupWithForm title={'Новое место'} name={'new-card'} isOpen={"popup_active"} onClose={closeAllPopups}/>}
        {isEditAvatarPopupOpen && <PopupWithForm title={'Обновить аватар'} name={'avatar-editor'} isOpen={"popup_active"} onClose={closeAllPopups} isAvatarForm={true} /** Props isAvatarForm - решение для ПР10*//>}
        {selectedCard && <ImagePopup card={selectedCard} name={'image'} isOpen={"popup_active"} onClose={closeAllPopups}/>}
    </div>
  );

}

export default App;
