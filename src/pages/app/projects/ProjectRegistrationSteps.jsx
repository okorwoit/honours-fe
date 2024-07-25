import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { RegisterProjectContext } from '../../../../context/context';

import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

mapboxgl.accessToken = 'pk.eyJ1IjoicGFjaWZpcXVlcnViYXNoYSIsImEiOiJjbGpyNW92YnIwMDVnM3RwbzB4d25namF5In0.7tu1hbi6-WgIxwiTP5QVeQ';


export function Step1(props) {

    const {projectFields, handleNormalInputChange, handleCustomInputsChange} = useContext(RegisterProjectContext)

    const fields = [
        {
            name:"projectName", label:"What is the name of your project?", placeholder:"ProjectX",
        },
        {
            name:"startDate", label:"When is | was the project start date?", placeholder:"Enter a date", type:"date" 
        },
        {
            name:"endDate", label:"When is | was the project end date?", placeholder:"Enter a date", type:"date" 
        },
       

    ];


    return (
        <>
            {
                fields.map((field, i)=>(
                    <div key={i} className="form__group flex py-3 w-full gap-3" data-aos="fade-up" data-aos-duration="1500">
                        <div className='text-lg opacity-5 spaced'>
                            0{i+1}
                        </div>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label htmlFor={field.name} className='text-lg capitalize'>{field.label}</label>
                            
                            <input 
                                aria-label={field.placeholder} 
                                type={field.type || "text"} 
                                name={field.name} 
                                id={field.name} 
                                placeholder={field.placeholder} 
                                required={true}
                                onChange={(e)=>handleNormalInputChange(e)}
                                defaultValue={projectFields[field.name]}
                                
                                />
                        </div>
                    </div>                            
                ))
            }
            
        </>
    );
}

export function Step2({skipTo}) {
    const {projectFields, handleNormalInputChange} = useContext(RegisterProjectContext)

    const fields = [
        {
            name:"numberOfTrees", label:"What is the number of trees planted ?", placeholder:"Enter a number", type:"number"
        },
        {
            name:"treeTypes", label:"what are the types of trees you planted ?", placeholder:"Enter the type of trees planted"
        },

    ];


    return (
        <>
            {
                fields.map((field, i)=>(
                    <div key={i} className="form__group flex py-3 w-full gap-3" data-aos="fade-up" data-aos-duration="1500">
                        <div className='text-lg opacity-5 spaced'>
                            0{i+3+1}
                        </div>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label htmlFor={field.name} className='text-lg capitalize'>{field.label}</label>
                            
                            <input 
                                aria-label={field.placeholder} 
                                type={field.type || "text"} 
                                name={field.name} 
                                id={field.name} 
                                placeholder={field.placeholder} 
                                required={true}
                                onChange={(e)=>handleNormalInputChange(e)}
                                defaultValue={projectFields[field.name]}
                                />
                        </div>
                    </div>                            
                ))
            }
            
        </>
    );
}

export function Step3(props) {
    const {projectFields, handleCustomInputsChange} = useContext(RegisterProjectContext)

    const statuses = [
        "Planning",
        "Ongoing",
        "Complete",
    ]

    const [selectedStatus, setSelectedStatus] = useState(0);

    const selectStatus = (index, status)=>{
        setSelectedStatus(index);
        handleCustomInputsChange("projectStatus", status)
    }

    return (
        <>
            <div className="form__group py-3">
                <div className='flex gap-3 items-center'>
                    <div className='text-lg opacity-5 spaced'>
                        0{6+1}
                    </div>
                    <span className='text-lg mb-1'>What's the status of your project? </span>
                </div>
                <div className='flex justify-between flex-wrap mt-2'>
                    {statuses.map((status, index) => {
                        return (
                            <div onClick={()=>selectStatus(index+1, status)} key={index} className={`relative p-2 mb-2 ${projectFields["projectStatus"] === status && "selected__type"} cursor-pointer company__type rounded-md bg-white color-main`}>
                                {status}

                                {projectFields["projectStatus"] === status &&
                                <span className='absolute text-xs bg-main text-white flex justify-center items-center rounded-full' >
                                    <i className='fas fa-check'></i>
                                </span>}
                            </div>
                        )
                    })}
                </div>

            </div>
            
        </>
    );
}


export function Step4(props) {
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

    const {projectFields, handleNormalInputChange, handleCustomInputsChange} = useContext(RegisterProjectContext)

    const countries = ["Kenya", "Mauritius", "Tanzania"];

    const [isShowCountriesList, setIsShowCountriesList] = useState(false);
    const [isShowCitiesList, setIsShowCitiesList] = useState(false);
    const [isShowProvincesList, setIsShowProvincesList] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState(projectFields['country'] || null);
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);

    const handleSelectItems = (item, setValueState, setShowState)=>{
        setValueState(item);
        setShowState(false);
        handleCustomInputsChange("country", item)
    }

    const fields = [
        {
            name:"country", label:"What country is your Project in?", 
            placeholder:"Select a country", 
            states:[isShowCountriesList, setIsShowCountriesList, setSelectedCountry]
        },
    ];

    const inputFields = [
        {
            name:"province", label:"What province | Region | State is your Project in?", placeholder:"Enter a state",
        },
        {
            name:"city", label:"What City is your your Project in?", placeholder:"Enter a city"
        },

    ];

    return (
        <>

            {
                fields.map((field, i)=>(
                    <div ref={parent} key={i} className="form__group flex py-3 w-full gap-3" data-aos="fade-up" data-aos-duration="1500">
                        <div className='text-lg opacity-5 spaced'>
                            0{i+7+1}
                        </div>
                        <div className='flex flex-col gap-1 flex-1'>
                            <span className='text-lg mb-1'>{field.label}</span>
                            <div onClick={()=>field.states[1]((prev)=>!prev)} className="cursor-pointer rounded-md flex items-center">
                                <div className={`flex-1 ${!selectedCountry ? "opacity-5" : "font-700"}`}>{selectedCountry || field.placeholder}</div>
                                <i className={`fas fa-angle-${field.states[0] ? "up": "down"} text-lg`}></i>
                            </div>
                            {field.states[0] && 
                                <div className="form__group--list overflow-y-auto bg-white mt-1 p-1 rounded-md flex flex-col gap-1">
                                    {countries.map((item, key)=><span onClick={()=>handleSelectItems(item, field.states[2], field.states[1] )} key={key} className={` ${key+1 !== countries.length && "border-b-1"} p-1/2 cursor-pointer`} >{item}</span>)}
                                </div>
                            }
                        </div>
                    </div>                            
                ))
            }

            {
                inputFields.map((field, i)=>(
                    <div key={i} className="form__group flex py-3 w-full gap-3" data-aos="fade-up" data-aos-duration="1500">
                        <div className='text-lg opacity-5 spaced'>
                            0{i+7+1}
                        </div>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label htmlFor={field.name} className='text-lg capitalize'>{field.label}</label>
                            
                            <input 
                                aria-label={field.placeholder} 
                                type={field.type || "text"} 
                                name={field.name} 
                                id={field.name} 
                                placeholder={field.placeholder} 
                                required={true}
                                onChange={(e)=>handleNormalInputChange(e)}
                                defaultValue={projectFields[field.name]}
                                />
                        </div>
                    </div>                            
                ))
            }  
            
            
        </>
    );
}

export function Step5(props) {
    const {projectFields, handleNormalInputChange} = useContext(RegisterProjectContext)
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

    const fields = [
        {
            name:"coordinates", label:"Input the GPS Coordinates of your project", placeholder:"Enter a number", 
        },
        {
            name:"projectArea", label:"What is the area | size of your project In hectares?", placeholder:"Size of the area", type:"number"
        },

    ];
    
    return (
        <>
            <div className="form__group flex py-3 w-full gap-3" data-aos="fade-up" data-aos-duration="1500">
                <div className='text-lg opacity-5 spaced'>
                    {10+1}
                </div>
                <div className='flex flex-col gap-1 flex-1'>
                    <span className='text-lg mb-1'>{fields[0].label}</span>
                    <div className='flex items-center coordinates__container gap-2'>
                        <input 
                            type='text' 
                            placeholder='Latitude' name='latitude' 
                            onChange={(e)=>handleNormalInputChange(e)}
                            defaultValue={projectFields['latitude']}
                        />
                        <input 
                            type='text' 
                            placeholder='Longitude' 
                            name='longitude' 
                            onChange={(e)=>handleNormalInputChange(e)}
                            defaultValue={projectFields['longitude']}
                        />
                    </div>
                </div>
            </div>     

            <div className="form__group flex py-3 w-full gap-3" data-aos="fade-up" data-aos-duration="1500">
                <div className='text-lg opacity-5 spaced'>
                    {10+2}
                </div>
                <div className='flex flex-col gap-1 flex-1'>
                    <label htmlFor={fields[1].name} className='text-lg capitalize'>{fields[1].label}</label>
                    
                    <input 
                        aria-label={fields[1].placeholder} 
                        type={fields[1].type || "text"} 
                        name={fields[1].name} 
                        id={fields[1].name} 
                        placeholder={fields[1].placeholder} 
                        required={true}
                        onChange={(e)=>handleNormalInputChange(e)}
                        defaultValue={projectFields[fields[1].name]}
                        />
                </div>
            </div>             
        </>
    );
}


export function Step6({currentStep, steps, handlePrev, handleNext}) {

    const {handleCustomInputsChange} = useContext(RegisterProjectContext)

    const mapContainer = useRef(null);
    const drawRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [selectedCoords, setSelectedCoords] = useState([36.817223, -1.286389]);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: selectedCoords,
            zoom: 10,
        });

        map.addControl(new mapboxgl.NavigationControl());

        drawRef.current = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true,
            },
        });

        map.addControl(drawRef.current);

        map.on('draw.create', handleDraw);
        map.on('draw.delete', handleDraw);
        map.on('draw.update', handleDraw);

        return () => map.remove();
    }, [selectedCoords]);

    const handleDraw = () => {
        const data = drawRef.current.getAll();
        if (data.features.length > 0) {
            const polygonCoordinates = data.features[0].geometry.coordinates[0];
            handleCustomInputsChange("polygonCoordinates", polygonCoordinates)
        }
    };

    const [showList, setShowList] = useState(false);
    const handleSearch = async (searchValue) => {
        
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${mapboxgl.accessToken}`
          );
          console.log(response.data.features);
          setSearchResults(response.data.features);
          if(response.data.features.length > 0){
            setShowList(true);
          }

        } catch (error) {
          console.error('Error searching location:', error);
        }
    };

    useEffect(()=>{
        const timer = setTimeout(() => {
          handleSearch(searchValue);
        } ,500);
        return () => clearTimeout(timer);
    }, [searchValue])


    const selectLocation = (coords) => {
        setSelectedCoords(coords);
        setShowList(false);
    }

    const selectRef = useRef(null);

    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setShowList(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex flex-col w-full h-full'>
            <div className='flex gap-3'>
                <i onClick={handlePrev} className='fas fa-arrow-left back__btn icon__bg cursor-pointer'></i>
                <div className={``}>
                    <span className='text-md opacity-5 mb-2 block'>STEP {currentStep+1} OF {steps.length}</span>
                    <h3 className='text-2xl font-500'>{steps[currentStep]}</h3>
                </div>
                <div className="flex flex-col gap-1 ml-5 w-1/3">
                    <div className='flex gap-1 bg-white p-1/2 rounded-md relative'>
                        <i className="fas fa-map-marker rounded__bg-sec icon__bg"></i>
                        <input onChange={(e)=>setSearchValue(e.target.value)} type="text" className='flex-1 border-none text-md' placeholder='Location' />
                        {showList &&
                        <ul ref={selectRef} className='absolute locations-list shadow-1'>
                            {searchResults.map((result) => (
                                <li key={result.id} className='locitem' onClick={()=>selectLocation(result.center)}>{result.place_name}</li>
                            ))}
                        </ul>}
                    </div>
                    {/* <div className='flex gap-1 bg-white p-1/2 rounded-md'>
                        <i className="fas fa-map rounded__bg-sec icon__bg"></i>
                        <input type="text" className='flex-1 border-none text-md' placeholder='Coordinates' />
                    </div> */}
                </div>
            </div>
            <div className='flex-1 map__marker relative'>
                <div ref={mapContainer} className="map-container" />                
               <button type='submit' className={`${currentStep === steps.length-1 && "hidden"} main__btn uppercase flex items-center gap-2 spaced absolute`} onClick={handleNext} >
                    DONE
                    <i className='fas fa-arrow-right relative round__arrow transition-300 full-center rounded-full'></i>        
                </button> 
            </div>
        </div>
    );
}

export function Step7(props) {
    const {projectFields, handleCustomInputsChange} = useContext(RegisterProjectContext)

    

    return (
        <div>
            <div className='flex flex-col items-center capitalize bg-white rounded-lg py-2 px-5 text-center gap-2'>
                <img src="/register__done.svg" alt="" className='w-1/2' />
                <p>
                    Congratulations and thank you for entrusting us with your forest restoration project details!  
                    <br/><br/>We have successfully received your information :)                
                </p>
                <h3>WHAT'S NEXT?</h3>
                <p>
                    Your project is now queued for our initial review. We will begin by analyzing the provided data, assessing the project site through satellite imagery, and initiating the near-real-time tracking setup. You can expect to see preliminary insights and metrics on your dashboard soon.
                    <br/><br/>Should you have any questions or need further assistance, our support team is just a click away!</p>
            </div>
            
        </div>
    );
}

export function Step8(props) {
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

    const {projectFields, handleNormalInputChange, handleCustomInputsChange} = useContext(RegisterProjectContext)

    const partners = [
        "Airtel",
        "Apache",
        "Apple",
        "Aramco",
        "AT&T",
        "Berkshire Hathaway",
        "BHP",
    ]

    const [isShowList, setIsShowList] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState("");
    const handleSelectPartner = (partner)=>{
        setSelectedPartner(partner);
        handleCustomInputsChange("projectPartner", partner)
        setIsShowList(false);
    }


    return (
        <>
            <div ref={parent}>
                <span>Information on organizations or companies supporting the project.</span>
                
                <div onClick={()=>setIsShowList((prev)=>!prev)} className="form__group cursor-pointer bg-white mt-3 p-1 rounded-md flex items-center">
                    <div className='flex-1'>{projectFields["projectPartner"] || selectedPartner || "Search company" }</div>
                    <i className={`fas fa-angle-${isShowList ? "up": "down"} text-2xl`}></i>
                </div>
                {isShowList && 
                    <div className="form__group--list bg-white mt-1 p-1 rounded-md flex flex-col gap-1">
                        {partners.map((partner, key)=><span onClick={()=>handleSelectPartner(partner)} key={key} className={` ${key+1 !== partners.length && "border-b-1"} p-1/2 cursor-pointer`} >{partner}</span>)}
                    </div>
                }
            </div>
        </>
    );
}

export function Step9(props) {
    const {projectFields, handleNormalInputChange, handleCustomInputsChange} = useContext(RegisterProjectContext)

    const userContributions = [
        "Sponsor a Tree",
        "Donations",
        "Corporate Partnership",
        "Share Expertise",
        "Awareness & Advocacy",
        "Volunteer",
        "Educational Programs",
        "Adopt a Plot",
        "Provide seedlings",
        "Community Engagement",
        "Remote Assistance",
        "Fundraising Events",
        "Crowdsourcing Data",
        "Feedback & Ideas",
        "Join Forums & discussions"
    ]


    const [selectedContribs, setSelectedContribs] = useState([]);

    const handleSelectContribution = (contrib)=>{

        if(selectedContribs.includes(contrib)){
            const temp = selectedContribs.filter((item)=>item !== contrib)
            setSelectedContribs(temp);
            handleCustomInputsChange("projectContributions", temp)

        }else{
            const temp = [...selectedContribs, contrib];
            setSelectedContribs(temp);
            handleCustomInputsChange("projectContributions", temp)
        }
    }

    useEffect(()=>{
        if(projectFields["projectContributions"]){
            setSelectedContribs(projectFields["projectContributions"])
        }

    }, [])
    return (
        <>
            <span className='text-lg mb-1'>Information on how users can contribute or participate in the project.</span>
            <div className='flex justify-between flex-wrap'>
                {userContributions.map((contrib, index) => {
                    return (
                        <div onClick={()=>handleSelectContribution(contrib)} key={index} className={`relative p-2 mb-2 ${selectedContribs.includes(contrib) && "selected__type"} cursor-pointer company__type rounded-md bg-white color-main`}>
                            {contrib}

                            {selectedContribs.includes(contrib) &&
                            <span className='absolute text-xs bg-main text-white flex justify-center items-center rounded-full' >
                                <i className='fas fa-check'></i>
                            </span>}
                        </div>
                    )
                })}
            </div>

            
        </>
    );
}