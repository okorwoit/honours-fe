import React, {useContext, useEffect, useState} from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9} from "./ProjectRegistrationSteps.jsx"

import { RegisterProjectContext } from '../../../../context/context';
import { retrieveFromSessionStorage, saveToSessionStorage, removeFromSessionStorage, retrieveFromLocalStorage, saveToLocalStorage } from '../../../utils/utils.js';
import { AppContext } from '../../../AppContext.js';


function ProjectRegistration({setIsModalOpen}) {

    const {setProjects} = useContext(AppContext);


    const [parent] = useAutoAnimate(/* optional config */)
    const [stepsParent] = useAutoAnimate(/* optional config */)
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        "Project Fundamentals",
        "Planting Detailss",
        "Status",
        "Basic Location Details",
        "Precise Geographical Location",
        "Mark Your Project",
        "Track Your Project",
    ]

    const [projectFields, setProjectFields] = useState({})

    const StepToShow = (step)=>{

        const handleNormalInputChange = (e)=>{    
            setProjectFields((prev)=>{
                return {...prev, [e.target.name]: e.target.value}
            })
        }    

        const handleCustomInputsChange = (key, value)=>{
            setProjectFields((prev)=>{
                return {...prev, [key]: value}
            })
        }      
        
        const contextValue = {
            projectFields, 
            setProjectFields,
            handleNormalInputChange, 
            handleCustomInputsChange,
        }

        let currentStep;

        switch(step){
            case 0:
                currentStep = <Step1/>
                break;
            case 1:
                currentStep = <Step2/>
                break;
            case 2:
                currentStep = <Step3/>
                break;
            case 3:
                currentStep = <Step4/>
                break;
            case 4:
                currentStep = <Step5 handleNext={handleNext}/>
                break;
            case 5:
                currentStep = <Step6 currentStep={step} steps={steps} handlePrev={handlePrev} handleNext={handleRegisterProject}/>
                break;
            case 6:
                currentStep = <Step7/>
                break;
            default:
                currentStep = <Step1/>
        }

        return (
            <RegisterProjectContext.Provider value={contextValue}>
                {currentStep}
            </RegisterProjectContext.Provider>
        )

    }

    const handleJumpToStep = (step)=>{
        setCurrentStep(step)
        saveToSessionStorage("tty_proj--step", step)
        saveToSessionStorage("tty_proj--data", JSON.stringify(projectFields))
    }

    const handlePrev = ()=>{
        if(currentStep > 0){
            setCurrentStep(currentStep - 1)
            saveToSessionStorage("tty_proj--step", currentStep-1)
            saveToSessionStorage("tty_proj--data", JSON.stringify(projectFields))
        }

    }

    const handleNext = ()=>{
        if(currentStep < steps.length){
            setCurrentStep(currentStep + 1)
            saveToSessionStorage("tty_proj--step", currentStep+1)
            saveToSessionStorage("tty_proj--data", JSON.stringify(projectFields))
        }
    }

    useEffect(()=>{
        const tempStep = Number(retrieveFromSessionStorage("tty_proj--step"));
        if(tempStep){
            setCurrentStep(tempStep)
        }

        const tempData = retrieveFromSessionStorage("tty_proj--data");
        if(tempData){
            setProjectFields(JSON.parse(tempData))
        }


    }, [])

    const handleRegisterProject = (e)=>{
        e.preventDefault();

        const allProjects = JSON.parse(retrieveFromLocalStorage("tty-projects-all")) || [];
        allProjects.push(projectFields)
        saveToLocalStorage("tty-projects-all", JSON.stringify(allProjects))  
        setProjects(allProjects)
          
        removeFromSessionStorage("tty_proj--data");
        removeFromSessionStorage("tty_proj--step");

        setCurrentStep(5)
        
    }

    const lastStep = currentStep === steps.length-1;

    const handleCloseModal = ()=>{
        removeFromSessionStorage("tty_proj--data");
        removeFromSessionStorage("tty_proj--step");
        setIsModalOpen(false)
    }

    return (
        <div className='project__registration flex w-full h-full mx-auto items-center pt-2 '>
            {currentStep !== 5 ?
            <>            
                <div className={`signup__field--left z-2 gap-1 flex items-center transition-500 ${currentStep !== 8 ? "w-1/5" : "w-auto"} justify-end`}>
                    <div className='flex flex-col w-3/4 gap-3'>
                        {steps.map((step, key)=><p key={key} className={`registration__timeline--text text-right justify-end ellipsis ${currentStep === key ? "font-700":""} ${currentStep < key ? `opacity-${(steps.length - (key-currentStep)) % 10}`:""}`} >{step}</p>)}                      
                    </div>
                    <div className='flex flex-col gap-3 relative timeline'>
                        {steps.map((step, key)=><span onClick={()=>handleJumpToStep(key)} key={key} className={`${currentStep === key ? "current__step--check":"" } text-sm cursor-pointer `} ><i className='fas fa-check'></i></span>)}
                    </div>

                </div>

                <div ref={parent} className={` h-full overflow-y-auto rounded-lg z-1 relative ${currentStep !== 8 ? "w-4/5" : "w-full"} px-5`}>
                    
                    <div className={``}>
                        <span className='text-md opacity-5 mb-2 block'>STEP {currentStep+1} OF {steps.length}</span>
                        <h3 className='text-2xl font-500'>{steps[currentStep]}</h3>
                    </div>
                    
                    <form ref={stepsParent} className={`flex flex-col mt-2 w-full`}>

                        {StepToShow(currentStep)}

                        <div className={`controls flex ${lastStep ? "justify-end" :"justify-between"} mt-3`}>
                            <button type="button" className={`${lastStep && "hidden"} ${currentStep === 0 && "opacity-5 cursor-default"} bg-white ck__btn color-main`} onClick={handlePrev} disabled={currentStep === 0}>
                                <i className='fas fa-arrow-left'></i>
                            </button>

                            <button type='button' className={`${lastStep && "hidden"} main__btn flex uppercase  items-center gap-2 spaced`} onClick={handleNext} >
                                NEXT
                                <i className='fas fa-arrow-right relative round__arrow transition-300 full-center rounded-full'></i>        
                            </button>    

                            {lastStep && 
                            <button onClick={handleCloseModal} type="button" className=' main__btn uppercase flex items-center gap-2 spaced'>
                                TRACK
                                <i className='fas fa-arrow-right relative round__arrow transition-300 full-center rounded-full'></i> 
                            </button>
                            }
                        </div>

                    </form>

                </div>                
            </>
            :
            <>
                {StepToShow(currentStep)}
            </>            
            }
        </div>
    );
}

export default ProjectRegistration;