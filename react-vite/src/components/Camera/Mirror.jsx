import { useEffect, useRef } from "react"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeDeepAr, reloadDeepAr } from "../../redux/deepar";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import MediaModal from "../MediaModal";
import { FaCamera } from "react-icons/fa";


import './Mirror.css';

function Mirror() {
    const dispatch = useDispatch();
    const deepARElement = useRef();
    const deepAr = useSelector((store) => store.deepar.Sdk)


    //deep ar can only initialize once, on redirect will track state and shut down to reinitialize
    useEffect(() => {
        if (deepARElement.current) {
            if (deepAr) {
                dispatch(reloadDeepAr(deepAr)).then(
                    dispatch(initializeDeepAr(deepARElement.current))
                )
            }
            else {
                dispatch(initializeDeepAr(deepARElement.current))
            }
        }


    }, [])


    //loads an effect using switchEffect method taking in the target value
    //*Important: all values must match file path to function properly else 404
    const changeEffect = async (effect) => {
        if(effect === "") {
        await deepAr.clearEffect()
        }
        else {
            await deepAr.switchEffect(`/deepar-resources/effects/${effect}.deepar`)
-``
        }
    }
    // takes screenshot and returns a data url
    const captureImage = async () => {
        const imageData= await deepAr.takeScreenshot();
        const imageElement = document.getElementById('media-image');
        imageElement.src = imageData;


    }

    
    return (

        <div className="deepar-container">
            <div id="home-nav">
                <NavLink to="/">Return Home</NavLink>
            </div>

            <div id="screen-container">
                <div id="ar-screen" ref={deepARElement}>
                    <div className="ar-btn-wrapper">
                        <OpenModalButton
                        modalComponent={<MediaModal/>}
                        onButtonClick={captureImage}
                        buttonText={<FaCamera />}

                        />
                    </div>

                </div>
                <div id="ar-options">
                    <div className="effect-option">
                        <label>Skin</label>
                        <select name="skin" id="skin-options" onChange={(e) => {
                            e.stopPropagation()
                            changeEffect(e.target.value)
                        }}>
                            <option value=""></option>
                            <option value="foundation">Foundation</option>
                            <option value="blush">Blush</option>
                        </select>
                    </div>
                    <div className="effect-option">
                        <label>Eyes</label>
                        <select name="eye" id="eye-options" onChange={(e) => {
                            e.stopPropagation()
                            changeEffect(e.target.value)
                        }}>
                            <option value=""></option>
                            <option value="eyeshadow">Eye Shadow</option>
                            <option value="eyeliner">Eye Liner</option>
                            <option value="mascara">Mascara</option>
                        </select>
                    </div>
                    <div className="effect-option">
                        <label>Lips</label>

                        <select name="lips" id="lip-options" onChange={(e) => {
                            e.stopPropagation()
                            changeEffect(e.target.value)
                        }}>
                            <option value=""></option>
                            <option value="lipstick">Lipstick</option>
                        </select>
                    </div>
                    <div className="effect-option">
                        <label>Add Ons</label>
                        <select name="add-on" id="add-on-options" onChange={(e) => {
                            e.stopPropagation()
                            changeEffect(e.target.value)
                        }}>
                            <option value=""></option>
                            <option value="eyelashes">Eyelashes</option>
                            <option value="glitter">Glitter</option>
                            <option value="gloss">Lip Gloss</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Mirror;
