import React, { useState } from 'react';
import CollapsibleSection from './CollapsibleSection';
import { Select } from '../../components/app/CustomElements';
import Analytics from '../../components/app/Analytics';

function ProjectAnalytics(props) {

    const [currentProject, setCurrentProject] = useState({});
    const [currentProjectId, setCurrentProjectId] = useState(0);
    
     

    return (
        <div className='flex h-full w-full main__section'>
            <div className="w-full flex flex-col gap-4 p-3 transition-500 bg__faded--pink">
                <Analytics/>
            </div>
        </div>
    );
}

export default ProjectAnalytics;