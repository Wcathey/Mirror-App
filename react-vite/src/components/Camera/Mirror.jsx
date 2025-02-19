import { useState, useEffect, useRef } from "react"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeDeepAr, reloadDeepAr } from "../../redux/deepar";
import Carousel from "../Carousel";
import { GiMirrorMirror } from "react-icons/gi";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './Mirror.css';

function Mirror() {
    const dispatch = useDispatch();
    const deepARElement = useRef();
    const ulRef = useRef();
    const [showEffectMenu, setShowEffectMenu] = useState(false);

    const deepAr = useSelector((store) => store.deepar.Sdk)

    const toggleEffectMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowEffectMenu(!showEffectMenu);
      };

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

    useEffect(() => {
        if (!showEffectMenu) return;
        const closeEffectMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
              setShowEffectMenu(false);
            }
          };

          document.addEventListener("click", closeEffectMenu);

          return () => document.removeEventListener("click", closeEffectMenu);


    }, [showEffectMenu]);

    const closeEffectMenu = () => setShowEffectMenu(false);


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
                <div className="effect-side-container">
                <div id="effect-header"><h1>Filters</h1></div>
                <div id="effect-dropdown"><GiMirrorMirror onClick={toggleEffectMenu}/></div>
                </div>
                {showEffectMenu && (
                    <ul className={"effect-carousel"} ref={ulRef}>
                        <Carousel/>
                    </ul>
                )}
            </div>

            <div id="screen-container">
                <div id="ar-screen" ref={deepARElement}>

                </div>

             </div>
        </div>
    )
}

export default Mirror;
