import React, {useState, useEffect, useRef} from "react";

export function Select({label, options, selectedValue, setState, icon}){

    const [selectValue, setSelectValue] = useState(selectedValue || "");
    const [showList, setShowList] = useState(false);

    const handleSelectOption = (e, index)=>{
        setSelectValue(e.target.textContent)
        
        const key = label.toLowerCase();
        const value = e.target.textContent;
        setState(index);
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

    

    return(
        <div ref={selectRef} onClick={()=>setShowList((prev)=>!prev)} className='relative bg-white cursor-pointer rounded-md select__input'>
            
            {!icon ?
            <div className='flex items-center justify-between gap-1 bg-white p-1 pl-2 cursor-pointer'>
                <p className="ellipsis">{selectValue || `${label}`}</p>
                <i className='fas fa-angle-down icon__bg select__icon'></i>
            </div>
            :
            <div className={`flex items-center justify-between gap-1 p-1/2 px-1 bg__btn--hover cursor-pointer rounded-md`}>
                <div className='icon__bg bg-white notif__filter--icon opacity-5'>
                    <img src={icon} alt="" />
                </div>
                <p className="ellipsis font-500">{label}</p>
                <i className='fas fa-angle-down '></i>
            </div>
            }      

            {showList &&
            <div className="select__list bg-white absolute flex flex-col p-1 rounded-md">
                {options.map((option, index)=><span onClick={(e)=>handleSelectOption(e, index)} key={index}>{option}</span>)

                }
            </div>}
        </div>
    )
}