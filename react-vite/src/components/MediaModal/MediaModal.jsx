import './MediaModal.css'
import { useModal } from "../../context/Modal";

function MediaModal () {
    const { closeModal } = useModal();



    return (
        <>
            <img id="media-image"></img>
            <div className="media-btns-wrapper">
            <button className="media-btn">Save</button>
            <button className='media-btn' onClick={(e) => {
                e.preventDefault()
                closeModal()
            }}>Close</button>
            </div>

      </>
    )
}

export default MediaModal;
