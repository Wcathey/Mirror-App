import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../../redux/brand";
import { getAllFoundations } from "../../redux/foundation";
import { getAllCollections } from "../../redux/collection";
import { getAllEyeshadows } from "../../redux/eyeshadow";
import { getAllLipsticks } from "../../redux/lipstick";
import { CiStar } from "react-icons/ci";

import './Carousel-redo.css';


function Carousel() {
    const dispatch = useDispatch();
    const [filterOption, setFilterOption] = useState('');
    const [makeupType, setMakeupType] = useState('');
    const [brand, setBrand] = useState('');
    const [collection, setCollection] = useState('');
    const [shade, setShade] = useState('');
    const [showClearButton, setShowClearButton] = useState('hidden')
    const [clearCurrentEffect, setClearCurrentEffect] = useState(false);
    const availableBrands = useSelector(state => state.brand.brands);
    const availableFoundations = useSelector(state => state.foundation.foundations);
    const availableEyeshadows = useSelector(state => state.eyeshadow.eyeshadows);
    const availableLipsticks = useSelector(state => state.lipstick.lipsticks);
    const availableCollections = useSelector(state => state.collection.collections);
    const deepAr = useSelector((store) => store.deepar.Sdk)
    const filterOptionsData = ['Skin', 'Eyes', 'Lips', 'Accessories'];

    useEffect(() => {
        dispatch(getAllFoundations())
        dispatch(getAllCollections())
        dispatch(getAllEyeshadows())
        dispatch(getAllLipsticks())
        dispatch(getAllBrands())
    }, [dispatch]);

    useEffect(() => {
        if (shade) {
            changeEffect()

        }

        if (clearCurrentEffect) {
            changeEffect()
        }
    }, [shade])


    const handleFilterChange = (e) => {
        e.stopPropagation();
        const selectedFilter = e.target.innerText;
        setFilterOption(selectedFilter);
        setMakeupType('');
        setBrand('');
        setCollection('');
        setShade('');



    };

    const handleMakeupChange = (e) => {
        e.stopPropagation();
        const selectedMakeup = e.target.innerText;
        setMakeupType(selectedMakeup);
        setBrand('')
        setCollection('');
        setShade('');


    }

    const handleBrandChange = (e) => {
        e.stopPropagation();
        const selectedBrand = e.target.innerText;
        setBrand(selectedBrand);
        setCollection('');
        setShade('');


    }

    const handleCollectionChange = (e) => {
        e.stopPropagation();
        const selectedCollection = e.target.innerText;
        setCollection(selectedCollection);
        setShade('');
    }

    const handleShadeChange = (e) => {
        e.stopPropagation();
        let startingShade;
        const selectedShade = e.target.innerText;
        if (makeupType === 'Foundation') {
            startingShade = selectedShade.slice(0, selectedShade.indexOf("#"))
        }
        else {
            startingShade = selectedShade;

        }
        const fileFormat = startingShade.toLowerCase().replace(/\s+/g, '-');

        setShade(fileFormat)
        setShowClearButton('clear-shade-btn');

    }

    const changeEffect = async () => {
        if (!shade) {
            await deepAr.clearEffect()
            setShowClearButton('hidden');
            setClearCurrentEffect(false);
        }
        else {
            await deepAr.switchEffect(`/deepar-resources/effects/${filterOption}/${makeupType}/${brand}/${collection}/${shade}.deepar`)
        }
    }







    return (
        <div className="carousel-container">

            <div className="carousel">


                {/*Filter Option Carousel */}
                <div className="carousel-item">
                    <div className="carousel-header">
                        <h2>Category</h2>
                        <div id="star-icon"><CiStar />
                        </div>
                    </div>
                    <div className="carousel-list">
                        {filterOptionsData.map((filterLabel) => (
                            <p onClick={handleFilterChange}>{filterLabel}</p>
                        ))}
                    </div>

                </div>
                {/*Makeup Type Carousel*/}
                {filterOption && (
                    <div className="carousel-item" >
                        <div className="carousel-header">
                            <h2>Makeup</h2>
                            <div id="star-icon"><CiStar />
                            </div>
                        </div>
                        <div className="carousel-list">
                            {filterOption === 'Skin' &&
                                <p onClick={handleMakeupChange}>Foundation</p>
                            }
                            {filterOption === 'Lips' &&
                                <p onClick={handleMakeupChange}>Lipstick</p>
                            }
                            {filterOption === 'Eyes' &&
                                <p onClick={handleMakeupChange}>Eyeshadow</p>
                            }
                        </div>
                    </div>
                )}
                {/*Brand Carousel*/}
                {makeupType && (
                    <div className="carousel-item">
                        <div className="carousel-header">
                            <h2>Brand</h2>
                            <div id="star-icon"><CiStar />
                            </div>
                        </div>
                        <div className="carousel-list">
                            {availableBrands.map((brandOption) => (
                                <p key={brandOption.id} value={brandOption.name} onClick={handleBrandChange}>

                                    {brandOption.name}
                                </p>
                            ))}
                        </div>


                    </div>
                )}
                {/*Collection Carousel*/}
                {brand && (
                    <div className="carousel-item">
                        <div className="carousel-header">
                            <h2>Collection</h2>
                            <div id="star-icon"><CiStar />
                            </div>
                        </div>                        <div className="carousel-list">
                            {availableCollections.map((collectionOption) => (
                                <p key={collectionOption.id} value={collectionOption.name} onClick={handleCollectionChange}>

                                    {collectionOption.name}
                                </p>
                            ))}

                        </div>
                    </div>
                )}
                {/*Shade Carousel*/}
                {collection && (
                    <div className="carousel-item">
                        <button id={showClearButton} onClick={(e) => {
                            e.preventDefault();
                            setShade('')
                            setClearCurrentEffect(true);
                        }}>clear effect</button>

                        <div className="carousel-header">
                            <h2>Shade</h2>
                            <div id="star-icon"><CiStar />
                            </div>
                        </div>
                        <div className="carousel-list">
                            {makeupType === 'Foundation' &&
                                availableFoundations.map((shadeOption) => (
                                    <p onClick={handleShadeChange}>{shadeOption.name}<span>#{shadeOption.shade_id}</span></p>
                                ))}
                            {makeupType === 'Eyeshadow' &&
                                availableEyeshadows.map((shadeOption) => (
                                    <p onClick={handleShadeChange}>{shadeOption.name}</p>

                                ))}
                            {makeupType === 'Lipstick' &&
                                availableLipsticks.map((shadeOption) => (
                                    <p onClick={handleShadeChange}>{shadeOption.name}</p>

                                ))}


                        </div>
                    </div>
                )}
            </div>


        </div>
    )
}

export default Carousel;
