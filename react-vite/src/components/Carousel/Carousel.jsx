import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../../redux/brand";
import { getAllFoundations } from "../../redux/foundation";
import './Carousel.css';


function Carousel() {
    const dispatch = useDispatch();
    const [filterOption, setFilterOption] = useState('');
    const [makeupType, setMakeupType] = useState('');
    const [brand, setBrand] = useState('');
    const [collection, setCollection] = useState('');
    const [shade, setShade] = useState('');
    const [showFilter, setShowFilter] = useState('');
    const [showMakeUp, setShowMakeUp] = useState('');
    const [showBrand, setShowBrand] = useState('');
    const [showCollection, setShowCollection] = useState('')
    const [showClearButton, setShowClearButton] = useState('hidden')
    const [clearCurrentEffect, setClearCurrentEffect] = useState(false);
    const availableBrands = useSelector(state => state.brand.brands);
    const availableFoundations = useSelector(state => state.foundation.foundations);
    const deepAr = useSelector((store) => store.deepar.Sdk)
    const filterOptionsData = ['Skin', 'Eyes', 'Lips', 'Accessories'];

    useEffect(() => {
        dispatch(getAllFoundations())
        dispatch(getAllBrands())
    }, [dispatch]);

    useEffect(()=> {
        if(shade) {
            changeEffect()

        }

        if(clearCurrentEffect) {
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
        setShowFilter('hidden');



    };

    const handleMakeupChange = (e) => {
        e.stopPropagation();
        const selectedMakeup = e.target.innerText;
        setMakeupType(selectedMakeup);
        setBrand('')
        setCollection('');
        setShade('');
        setShowMakeUp('hidden');


    }

    const handleBrandChange = (e) => {
        e.stopPropagation();
        const selectedBrand = e.target.innerText;
        setBrand(selectedBrand);
        setCollection('');
        setShade('');
        setShowBrand('hidden');


    }

    const handleCollectionChange = (e) => {
        e.stopPropagation();
        const selectedCollection = e.target.innerText;
        setCollection(selectedCollection);
        setShade('');
        setShowCollection('hidden');
    }

    const handleShadeChange = (e) => {
        e.stopPropagation();
        const selectedShade = e.target.innerText;
        const slicedShade = selectedShade.slice(0, selectedShade.indexOf("#"))
        const fileFormat = slicedShade.toLowerCase().replace(/\s+/g, '-');
        setShade(fileFormat)
        setShowClearButton('clear-shade-btn');

    }

    const changeEffect = async () => {
        if(!shade) {
            await deepAr.clearEffect()
            setShowClearButton('hidden');
            setClearCurrentEffect(false);
            }
            else {
        await deepAr.switchEffect(`/deepar-resources/effects/${filterOption}/${makeupType}/${brand}/${collection}/${shade}.deepar`)
            }
    }



    const carouselStyle = {
        display: 'flex',
        transition: 'transform 0.3s ease-in-out',
        width: '100%',

    }



    return (
        <div className="carousel-container">
            <div className="carousel" style={carouselStyle}>
                {/*Filter Option Carousel */}
                <div className="carousel-item" id={showFilter}>
                    <h1>Filters</h1>
                    <div className="carousel-list">
                    {filterOptionsData.map((filterLabel) => (
                        <p onClick={handleFilterChange}>{filterLabel}</p>
                    ))}
                    </div>

                </div>
                {/*Makeup Type Carousel*/}
                {filterOption && (
                    <div className="carousel-item" id={showMakeUp}>
                        <h1>Makeup</h1>
                        <div className="carousel-list">
                        <p onClick={handleMakeupChange}>Foundation</p>

                        </div>
                    </div>
                )}
                {/*Brand Carousel*/}
                {makeupType && (
                    <div className="carousel-item" id={showBrand}>
                        <h1>Brand</h1>
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
                    <div className="carousel-item" id={showCollection}>
                        <h1>Collection</h1>
                        <div className="carousel-list">
                        <p onClick={handleCollectionChange}>Fit Me</p>

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

                        <h1>Shade</h1>
                        <div className="carousel-list">

                            {availableFoundations.map((shadeOption) => (
                                <p onClick={handleShadeChange}>{shadeOption.name}<span>#{shadeOption.shade_id}</span></p>
                            ))}
                        </div>
                    </div>
                )}
            </div>


        </div>
    )
}

export default Carousel;
