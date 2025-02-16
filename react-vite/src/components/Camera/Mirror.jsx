import { useEffect, useRef } from "react"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeDeepAr, reloadDeepAr } from "../../redux/deepar";
import Carousel from "../Carousel";
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


    }, []);




    //loads an effect using switchEffect method taking in the target value
    //*Important: all values must match file path to function properly else 404

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
                <Carousel/>

                </div>

             </div>
        </div>
    )
}

export default Mirror;
