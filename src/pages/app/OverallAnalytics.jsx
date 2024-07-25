import React, { useState } from 'react';
import CollapsibleSection from './CollapsibleSection';
import Analytics from '../../components/app/Analytics';

function OverallAnalytics(props) {
    

    const [currentProject, setCurrentProject] = useState({});
    const [currentProjectId, setCurrentProjectId] = useState(0);
    

    return (
        <div className='flex h-full w-full main__section'>
            <CollapsibleSection setCurrentProject={setCurrentProject} setCurrentProjectId={setCurrentProjectId}/>

            <div className="w-4/5 flex flex-col gap-4 p-3 transition-500 bg__faded--pink">
                <Analytics isOverall={true}/>
            </div>
        </div>
    );
}

export default OverallAnalytics;