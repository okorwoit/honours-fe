import { sampleHistoricalData } from "./testData";


export const formatUrlParm = (param)=>param.toLowerCase().split(" ").join("-");
export const saveToLocalStorage = (key, value)=> localStorage.setItem(key, value);
export const retrieveFromLocalStorage = (key)=> localStorage.getItem(key);

export const saveToSessionStorage = (key, value)=> sessionStorage.setItem(key, value);
export const retrieveFromSessionStorage = (key)=> sessionStorage.getItem(key);
export const removeFromSessionStorage = (key)=>sessionStorage.removeItem(key)

export const formatBigNumbers = (num)=>{
    if(num >= 1000000){
        return `${(num/1000000).toFixed(1)}M`
    }else if(num >= 1000){
        return `${(num/1000).toFixed(1)}K`
    }else{
        return num
    }

}

const carbonSequestrationRates = {
    oak: 0.022, 
    maple: 0.018, 
    pine: 0.015, 
    cedar: 0.020, 
    palm: 0.025, 
    birch: 0.021, 
    willow: 0.017, 
    fir: 0.019, 
    ash: 0.016, 
  };
  
export const calculateCarbonSequestered = (projectId = null) => {
    const carbonSequesteredPerYear = {};
  
    sampleHistoricalData.forEach((projectData, index) => {
      const isTargetProject = projectId !== null ? projectId === index : true; 
  
      if (isTargetProject) {
        projectData.forEach((yearData) => {
          const { year, treeTypes } = yearData;
          let carbonSequestered = 0;
  
          Object.entries(treeTypes).forEach(([treeType, count]) => {
            const sequestrationRate = carbonSequestrationRates[treeType];
            if (sequestrationRate) {
              carbonSequestered += sequestrationRate * count;
            }
          });
  
          if (carbonSequesteredPerYear[year]) {
            carbonSequesteredPerYear[year] += carbonSequestered;
          } else {
            carbonSequesteredPerYear[year] = carbonSequestered;
          }
        });
      }
    });
  
    return carbonSequesteredPerYear;
  };


export const fillMissingValues = (data) => {
    const headers = data[0];
    const filledData = [headers]; 
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const filledRow = [];

        for (let j = 1; j < headers.length; j++) {
            const value = row[j] !== undefined ? row[j] : 0;
            filledRow.push(value);
        }

        filledData.push([row[0], ...filledRow]); 
    }

    return filledData;
};