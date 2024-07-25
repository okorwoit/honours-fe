import React, { useContext, useEffect, useState } from 'react';
import Modal from './Modal';
import ProjectRegistration from './projects/ProjectRegistration';
import { AppContext } from '../../AppContext';

function CollapsibleSection({setCurrentProject, setCurrentProjectId}) {
    const {projects} = useContext(AppContext);

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectsToShow, setProjectsToShow] = useState([]);
     
    useEffect(()=>{
        setProjectsToShow(projects);
    }, [projects])

    const handleSearch = (e)=>{
        const value = e.target.value;
        if(value === ''){
            setProjectsToShow(projects);
        }else{
            const filteredProjects = projects.filter(project => project?.projectName?.toLowerCase().includes(value.toLowerCase()));
            setProjectsToShow(filteredProjects);
        }
    }

    const [selectedProject, setSelectedProject] = useState(projects[0]);
    useEffect(()=>{
        setSelectedProject(projects[0]);
    }, [projects])
    
    useEffect(()=>{
        setCurrentProject(selectedProject);
    }, [selectedProject])


    return (

        <>
            <div className='collapsible__section transition-500 overflow-y-auto overflow-x-hidden flex flex-col items-center justify-between px-1 w-1/4 py-5 relative h-full'>
                <input type="checkbox" name="collapse" id="collapse" hidden/>
                <label htmlFor='collapse' className='collapse__btn bg-secondary absolute cursor-pointer transition-500'>
                    <i className='fas fa-angle-left text-white text-xl'></i>                        
                </label>

                <div className='w-full'>
                    <h3 className='spaced'>FOREST PROJECTS</h3>
                    <div className='my-2 flex items-center w-full dash__search bg-white rounded-sm gap-1 pr-2 pl-1'>
                        <i className='fas fa-search'></i>
                        <input type="search" placeholder='Search For Projects' className='border-none flex-1 no-focus py-1' onChange={handleSearch}/>
                        {/* <img src="/filter.svg" alt="" className='cursor-pointer' /> */}
                    </div>

                    <div className='flex flex-col gap-1 w-full'>
                        {projectsToShow.map((project, i)=>(
                            <div onClick={()=>{setSelectedProject(project); setCurrentProjectId(i)}} className={`p-1/2 w-full collapsible__proj--item cursor-pointer rounded-md ${selectedProject?.projectName === project.projectName && "bg-main text-white"}`}>{project.projectName}</div>
                        ))}
                    </div>

                </div>

                <button onClick={()=>setIsModalOpen(true)} className="app__btn flex items-center w-full justify-between">
                    <span>Add Project</span>
                    <i className='fas fa-plus full-center p-1/2 btn__icon bg-secondary rounded-full color-main'></i>
                </button>


            </div>

            <Modal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                
            >               

                <div className='project__modal h-full'>
                    <ProjectRegistration setIsModalOpen={setIsModalOpen}/>              
                </div>

            </Modal>
        
        </>
    );
}

export default CollapsibleSection;