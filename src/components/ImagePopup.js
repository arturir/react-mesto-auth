import {useEffect} from "react";

export default function ImagePopup ({name, card, onClose, isOpen}) {

    useEffect(() => {
        setTimeout(()=> {document.querySelector(`.popup_${name}`).classList.add(isOpen)}, 0)
        document.querySelector("body").classList.add("body_no-scroll");
        document.addEventListener("keydown", handleEscClose);
        return () => {
            document.querySelector("body").classList.remove("body_no-scroll");
            document.removeEventListener("keydown", handleEscClose)
        }
    }, [])

    const close = () => {
        document.querySelector(`.popup_${name}`).classList.remove(isOpen);
        setTimeout(()=>{onClose()}, 400);
    }
    const handleOverlayClose = (event) => {
        if (event.target.classList.contains("popup")) {
            close();
        }
    }
    const handleEscClose = (event) => {
        if (event.key === "Escape") {
            close();
        }
    }

    return (
        <div className={`popup popup_${name}`} onClick={handleOverlayClose}>
            <div className="popup__container">
                <div className="gallery">
                    <img src={card.link} className="gallery__image" alt={card.name} />
                    <p className="gallery__title">{card.name}</p>
                </div>
                <button type="button" className="close-icon" onClick={close}></button> 
            </div>
        </div>
    )

}