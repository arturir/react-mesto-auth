import {useEffect} from "react";

export default function PopupWithForm ({title, name, isOpen, onClose, isAvatarForm}) {

    useEffect(() => {
        setTimeout(()=> {document.querySelector(`.popup_${name}`).classList.add(isOpen)}, 0)
        document.querySelector("body").classList.add("body_no-scroll");
        document.addEventListener("keydown", handleEscClose);
        return () => {
            document.querySelector("body").classList.remove("body_no-scroll");
            document.removeEventListener("keydown", handleEscClose)
        }
    }, [])

    const handleEscClose = (event) => {
        if (event.key === "Escape") {
            close();
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        close();
    }
    const close = () => {
        document.querySelector(`.popup_${name}`).classList.remove(isOpen);
        setTimeout(()=>{onClose()}, 400);
    }
    const handleOverlayClose = (event) => {
        if (event.target.classList.contains("popup")) {
            close();
        }
    }

    return (
        <div className={`popup popup_${name}`} onClick={handleOverlayClose}>
            <div className="popup__container popup__container_form ">
                <form className="form form_profile" name={name} noValidate>
                    <h2 className="form__title">{title}</h2>
                    <input id="profile-form-name" type="text" className="form__text" name="name" placeholder="Поле 1" minLength="2" maxLength="40" required />
                    <span className="form__input-error profile-form-name-error"></span>
                    {!isAvatarForm && (<>
                        <input id="profile-form-metier" type="text" className="form__text" name="metier" placeholder="Поле 2" minLength="2" maxLength="200" required />
                        <span className="form__input-error profile-form-metier-error"></span> 
                    </>)}
                    <button type="submit" className="form__submit" onClick={handleSubmit}>Ок</button>    
                </form>
                <button type="button" className="close-icon" onClick={close}></button> 
            </div>
        </div>
    )
}