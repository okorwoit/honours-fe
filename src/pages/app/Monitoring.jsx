import React, { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css/effect-fade';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import CollapsibleSection from './CollapsibleSection';


import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Map from '../../components/app/Map';
import { AppContext } from '../../AppContext';
import { retrieveFromLocalStorage } from '../../utils/utils';
import { sampleHistoricalData } from '../../utils/testData';

mapboxgl.accessToken = 'pk.eyJ1IjoicGFjaWZpcXVlcnViYXNoYSIsImEiOiJjbGpyNW92YnIwMDVnM3RwbzB4d25namF5In0.7tu1hbi6-WgIxwiTP5QVeQ';


function Monitoring(props) {

    const {projects} = useContext(AppContext);


    const [currentProject, setCurrentProject] = useState({});
    const [currentProjectId, setCurrentProjectId] = useState(0);

    const [zoom, setZoom] = useState(15);
    
    const [years, setYears] = useState([2019, 2020, 2021, 2022, 2023, 2024])

    const [currentYear, setCurrentYear] = useState(2018);

    const handleNext = () => {
        if(currentYear < years[years.length - 1]){
            setCurrentYear(currentYear + 1);
        }
    }

    const handlePrevious = () => {
        if(currentYear > [years[0]]){
            setCurrentYear(currentYear - 1);
        }
    }

    useEffect(() => {
        console.log("currentProjectId", currentProjectId)
        const data = sampleHistoricalData[currentProjectId].map(data => data.year);
        setYears(data)        
        setCurrentYear(data[0] - 1)
    }, [currentProjectId])



    return (
        <div className='flex h-full w-full main__section'>
            
            
            <CollapsibleSection setCurrentProject={setCurrentProject} setCurrentProjectId={setCurrentProjectId}/>
            
            <div className="w-4/5 flex flex-col transition-500">
                <div className='w-full relative'>

                    <div className='h-screen '>
                        <Map id={'rtvz'} 
                            currentYear={currentYear} 
                            polygonCoordinates={currentProject?.polygonCoordinates} 
                            latitude={currentProject?.latitude} longitude={currentProject?.longitude} 
                            zoom={zoom}
                            location={currentProject?.city}
                            projectId={currentProjectId}
                        />

                        <div className='flex justify-center gap-2 pagination pt-4'>
                            {
                                years.map((year, index) => {
                                    return (
                                        <span class={`bullet__value ${currentYear ===  year && "active"} cursor-pointer`} onClick={() => setCurrentYear(year)}>{year}</span>
                                    )
                                })
                            }
                        </div>
                        <div onClick={handlePrevious} className={`navigation__map full-center nav__left cursor-pointer ${currentYear === years[0] && "opacity-5"}`}><i className='fas fa-arrow-left'></i></div>
                        <div onClick={handleNext} className={`navigation__map full-center nav__right cursor-pointer ${currentYear === years[years.length - 1] && "opacity-5"}`}><i className='fas fa-arrow-right'></i></div>
                    </div>

                </div>
                <div className='text-center mt-1 font-500'>TIME IN YEARS</div>

            </div>

        </div>
    );
}

export default Monitoring;