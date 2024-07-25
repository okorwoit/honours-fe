import React, { useContext, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { retrieveFromLocalStorage, saveToLocalStorage } from '../../utils/utils';

function MainApp(props) {

    const {setProjects} = useContext(AppContext);


    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        const projects = JSON.parse(retrieveFromLocalStorage('tty-projects-all'));
        console.log("projects", projects)
        if(!projects){
            saveToLocalStorage('tty-projects-all', JSON.stringify([
                {
                    "projectName": "Masai",
                    "startDate": "2026-12-01",
                    "endDate": "2026-12-19",
                    "numberOfTrees": "200",
                    "treeTypes": "Baobab",
                    "projectStatus": "Ongoing",
                    "country": "Kenya",
                    "province": "Kisumu",
                    "city": "Kisumu",
                    "polygonCoordinates": [
                        [
                            "34.7660",
                            "-0.0900"
                        ],
                        [
                            "34.7700",
                            "-0.0900"
                        ],
                        [
                            "34.7700",
                            "-0.0935"
                        ],
                        [
                            "34.7660",
                            "-0.0935"
                        ],
                        [
                            "34.7660",
                            "-0.0900"
                        ]
                    ],
                    "latitude": "-0.0917",
                    "longitude": "34.7680",
                    "projectArea": "200"
                },
                {
                    "polygonCoordinates": [
                        [
                            "39.6660",
                            "-4.0420"
                        ],
                        [
                            "39.6700",
                            "-4.0420"
                        ],
                        [
                            "39.6700",
                            "-4.0450"
                        ],
                        [
                            "39.6660",
                            "-4.0450"
                        ],
                        [
                            "39.6660",
                            "-4.0420"
                        ]
                    ],
                    "projectName": "Kenya Eco-Grove Restoration",
                    "startDate": "2024-01-01",
                    "endDate": "2027-12-19",
                    "numberOfTrees": "200",
                    "treeTypes": "Oak Trees",
                    "projectStatus": "Ongoing",
                    "country": "Kenya",
                    "province": "Coast",
                    "city": "Mombasa",
                    "latitude": "-4.0435",
                    "longitude": "39.6682",
                    "projectArea": "100"
                }
            ])
            )        
        }
        
        else{
            setProjects(projects || []);
            setLoading(false)
        }
        
    }, [])


    return (
        <div className='flex h-screen overflow-hidden'>
            <Sidebar/>
            <main className="w-4/5 h-full">
                {
                    loading ? 
                    <div className='w-full h-full full-center'><i className='fas fa-circle-notch fa-spin text-3xl text-secondary'></i></div>
                    :
                    <Outlet/>
               }
            </main>
            
        </div>
    );
}

export default MainApp;