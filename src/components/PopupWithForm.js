export default function PopupWithForm ({title, name, isOpen, onClose, children}) {

    const handleSubmit = (event) => {
        event.preventDefault();
        close();
    }
    const close = () => {
        onClose();
    }
    const handleOverlayClose = (event) => {
        if (event.target.classList.contains("popup")) {
            close();
        }
    }

    return (
        <div className={`popup popup_${name}  ${isOpen ? "popup_active" : ""}`} onClick={handleOverlayClose}>
            <div className="popup__container popup__container_form ">
                <form className="form form_profile" name={name} noValidate>
                    <h2 className="form__title">{title}</h2>
                    {children}
                    <button type="submit" className="form__submit" onClick={handleSubmit}>Сохранить</button>    
                </form>
                <button type="button" className="close-icon" onClick={close}></button> 
            </div>
        </div>
    )
}