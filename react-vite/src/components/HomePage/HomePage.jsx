import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import SignupFormModal from "../SignupFormModal";
import "./HomePage.css";

function HomePage() {


    const [showMenu, setShowMenu] = useState(false);
    const divRef = useRef();



    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (divRef.current && !divRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    return (
        <div className="hp-container">
            <div className="hp-top-container">

                <div id="hp-top-contents">

                    <div id="hp-title">
                        <h1>Mirror</h1>

                        <div id="cta-lower-text">
                            <h2 id="hp-headline">Discover Your Authentic Beauty</h2>
                            <h3 id="hp-subheadline">Empowering self-expression through personalized beauty insights.</h3>

                            <div id="hp-cta">
                                <NavLink to="/mirror">
                                    Take a look...
                                </NavLink>

                            </div>
                        </div>
                    </div>

                </div>
            </div>




            <div className="problem-container">
                <div id="problem-text-wrapper">
                    <h1>Tired of One-Size-Fits-All Beauty Standards?</h1>

                    <p>
                        The modern beauty industry has led to a homogenization of aesthetics, with unrelenting pressures to conform. Mirror helps you break free by celebrating what makes you unique.
                    </p>
                </div>

                <img id="collage-image" src="../../../Images/diverse-collage.jpg" alt="woman-collage"></img>
            </div>

            <div className="guide-container">
                <div id="guide-text-wrapper">
                    <h1>Meet Mirror </h1>
                    <h2>Your Personalized Beauty Assistant</h2>
                    <p>Mirror uses advanced facial scanning, AI, and AR to provide tailored recommendations for accessories, colors, and makeup that complement your natural features. We’re here to help you look and feel like your most authentic self.</p>
                </div>
                <div id="guide-video-container">
                    <iframe width="700" height="500" src="https://www.youtube.com/embed/mmLq9C5Di44?si=_9L2RkyMpMhVrA2Z" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen="allow"></iframe>1``
                </div>
            </div>

            <div className="achieve-container">
                    <div id="achieve-text-wrapper">

                        <h1>Don’t Let Outdated Beauty Standards Hold You Back</h1>
                        <p>Feeling like you have to fit a mold can take a toll on your confidence. Mirror is here to remind you that your uniqueness is your strength.</p>
                        <iframe width="700" height="500" src="https://www.youtube.com/embed/CaDb2VL3IXM?si=bMKuB7yCXbxDT-6A" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen="allow"></iframe>


                    </div>

                </div>

            <div className="plan-container">
                <div id="plan-text-wrapper">
                    <h1>Your Journey to Authentic Beauty in 3 Simple Steps</h1>
                    <h2>1. Scan Your Face:</h2>
                    <p>Let our app analyze your unique features.</p>
                    <h2>2. Get Recommendations:</h2>
                    <p>Discover colors, accessories, and makeup that suit you best. </p>
                    <h2>3. Embrace Your Style:</h2>
                    <p>Celebrate your individuality with confidence.</p>
                </div>
                <div id="af-text-wrapper">
                        <h1>Own Your Authenticity</h1>
                        <p>Join the growing community of empowered individuals using Mirror to embrace their beauty. Discover how self-expression can transform your confidence and mental well-being.</p>

                    <div id="plan-cta" ref={divRef}>
                            <OpenModalMenuItem
                                itemText="Start Your Journey"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </div>
                        </div>
            </div>

        </div>


    )
}

export default HomePage;
