import React, { useContext, useEffect, useState } from 'react';
import { Select } from './CustomElements';
import { Chart } from "react-google-charts";
import { sampleHistoricalData } from '../../utils/testData';
import { calculateCarbonSequestered, formatBigNumbers, fillMissingValues } from '../../utils/utils';
import { AppContext } from '../../AppContext';

function Analytics() {
    const {projects} = useContext(AppContext);

    const indicators = [
        "Number of Trees Planted",
        "Number of Trees Survived",
        "Number of Trees Lost",
    ]

    const years = [
        "All",
        "2019",
        "2020",
        "2021",
    ]

    const [isOverall, setIsOverall] = useState(false);

    const [currentProjectId, setCurrentProjectId] = useState(0);
    const lineData = [
        ["Year", "Total Trees"],
        ...(sampleHistoricalData[currentProjectId].map((item) => {
            return [`${item.year}`, item.totalTrees]
        }))
    ]
    const lineOptions = {
        title: "Tree Growth",
        curveType: "function",
        legend: { position: "bottom" },
    };


      
    const barOptions = {
        title: "Tree Type Distribution",
        chartArea: { width: "50%" },
        isStacked: true,
        xAxis: {
          title: "Trees",
          minValue: 0,
        },
        hAxis: {
          title: "Year",
        },
    };

    
    const trees = [...new Set( (sampleHistoricalData[currentProjectId].map((item) => Object.keys(item.treeTypes))).flat() )]
    const barLabels = ['Year', ...trees]
    const barValues = sampleHistoricalData[currentProjectId].map((item)=>{
        return [`${item.year}`, ...(Object.values(item.treeTypes))]
    })
    const barData = [
        barLabels,
        ...barValues
    ]

    const yearlyCarbonSequestrated = calculateCarbonSequestered(currentProjectId);
    const totalCarbonSequestrated = Object.values(yearlyCarbonSequestrated).reduce((acc, val) => acc + val, 0)?.toFixed(2);


    
    return (
        <>
        {
            projects?.length > 0 ?
            <>
                <div className='flex justify-between items-center'>

                    <div className="flex gap-3 items-center">
                        <Select label="Project" options={projects.map((proj)=>proj.projectName)} selectedValue={projects[0]?.projectName} setState={setCurrentProjectId}/>
                        {false && <Select label="Years" options={years}/>}
                    </div>
                    <div className='flex items-center gap-2'>
                        <button className='bg-none p-1 px-2  btn__border flex items-center gap-1'><i className="fas fa-share text-lg"></i><span>Share</span></button>
                        <button className='bg-none p-1 px-2  btn__border flex items-center gap-1'><i className="fas fa-print text-lg"></i><span>Print</span></button>
                        <button className='bg-main p-1 px-2  flex items-center gap-1'><i className="fas fa-download text-lg"></i><span>Export</span></button>

                    </div>

                </div>

                <div className='px-2 py-4 bg-white rounded-mg flex rounded-lg'>
                    {isOverall ? 
                        <>
                            <div className='flex-1 flex gap-1 items-center'>
                                <p>Total number of projects</p>
                                <span className='text-3xl font-500'>30</span>
                            </div>
                            <span className='border mx-3 opacity-5'></span>
                        </> : null
                    
                    }
                    <div className='flex-1 flex gap-1 items-center'>
                        <p>Number of trees planted</p>
                        <span className='text-3xl font-500'>{formatBigNumbers(sampleHistoricalData[currentProjectId].at(-1).totalTrees)}</span>
                    </div>
                    <span className='border mx-3 opacity-5'></span>
                    <div className='flex-1 flex gap-1 items-center'>
                        <p>Average survival rate</p>
                        <span className='text-3xl font-500'>{sampleHistoricalData[currentProjectId].at(-1).survivalRate}%</span>
                    </div>
                    <span className='border mx-3 opacity-5'></span>
                    <div className='flex-1 flex gap-1 items-center'>
                        <p>Carbon sequestered<br/>
                        (Tones annually)
                        </p>
                        <span className='text-3xl font-500'>{totalCarbonSequestrated}</span>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='w-2/5'>
                        <Chart
                            chartType="LineChart"
                            width="100%"
                            height="500px"
                            data={lineData}
                            options={lineOptions}
                        />
                    </div>
                    <div className='flex-1'>
                        <Chart
                            chartType="ColumnChart"
                            width="100%"
                            height="500px"
                            data={fillMissingValues(barData)}
                            options={barOptions}
                        />
                    </div>


                </div>
            </>

            :
            <div className='full-center'>
                <i className='fas fa-circle-notch fa-spin text-3xl text-secondary'></i>
            </div>

        }
        </>
    );
}

export default Analytics;