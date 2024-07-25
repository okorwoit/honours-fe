import React from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../../pages/app/Modal';
import { Select } from './CustomElements';

function Sidebar(props) {

    const menuItems = [
        {
            name:"Real Time Monitoring",
            icon:"fas fa-chart-bar",
            link:"/monitoring"
        },
        // {
        //     name:"Analytics",
        //     icon:"fas fa-chart-line",
        //     link:"/analytics"
        // },
        // {
        //     name:"Overall Projects",
        //     icon:"fas fa-bullseye",
        //     link:"/overall-analytics"
        // }

        {
            name:"Analytics & Reports",
            icon:"fas fa-chart-line",
            subItems:[
                {
                    name:"Specific Project",
                    icon:"fas fa-sun",
                    link:"/analytics"
                },
                {
                    name:"Overall Projects",
                    icon:"fas fa-bullseye",
                    link:"/overall-analytics"
                }
            ]            
        },
        {
            name:"Notifications",
            icon:"fas fa-bell",
            link:"/notifications"
        },
        {
            name:"Chat",
            icon:"fas fa-comments",
            link:"/chat"
        },
    ]

    const [showNotifs, setShowNotifs] = React.useState(false);

    const renderMenu = (item, i)=>{
        if(item.subItems){
            return (
                <div className='w-9/10 flex flex-col items-end container__with--subitem'>
                    <input type="checkbox" name="subItem" id="subItem" hidden/>
                    <label htmlFor='subItem' key={i} className='dash__nav--item pl-2 color-secondary relative flex items-center gap-2 py-1 w-full cursor-pointer'>
                        <i className={`${item.icon}`}></i>
                        <span className=''>{item.name}</span>

                        <div className='absolute right-1 sub__item--show full-center bg-white rounded-full color-main'>
                            <i className='fas fa-chevron-down text-sm'></i>
                        </div>
                    </label>
                    <div className='flex flex-col w-3/4 menu__subitems '>
                        {
                            item.subItems.map((subItem, i)=>(
                                <NavLink to={subItem.link} key={i} className='color-secondary relative flex items-center gap-1 p-1/2 sub__item w-full'>
                                    <i className={`${subItem.icon}`}></i>
                                    <span className=''>{subItem.name}</span>
                                </NavLink>
                            ))
                        }

                    </div>

                </div>
            )
        }

        else if(item.name === 'Notifications'){
            return (
                <div onClick={()=>setShowNotifs((prev)=>!prev)} key={i} className='w-9/10 dash__nav--item pl-2 color-secondary relative flex items-center gap-2 py-1 w-full cursor-pointer'>
                    <i className={`${item.icon}`}></i>
                    <span className=''>{item.name}</span>
                </div>
            )
        }

        return (
            <NavLink to={item.link} key={i} className='dash__nav--item w-9/10 pl-2 color-secondary relative flex items-center gap-2 py-1 w-full'>
                <i className={`${item.icon}`}></i>
                <span className=''>{item.name}</span>
            </NavLink>
        )

    }


    const [selectedFilter, setSelectedFilter] = React.useState('All');

    function handleSelectFilter(value){
        setSelectedFilter(value);
    }


    return (
        <div className="sidebar w-1/5 bg-main flex flex-col items-center pt-2 justify-between">
            <img src="/logo.svg" alt="" className='w-2/5' />

            <div className='flex flex-col items-end w-full gap-1 flex-1 pt-2'>
                {menuItems.map((item, i)=>{
                    return (
                        renderMenu(item, i)
                    )
                })}

            </div>
            <div className='py-5 full-center border-top w-3/4'>
                <img src="/safaricom.svg" alt="" className='w-2/5' />
            </div>h

            <Modal
                isOpen={showNotifs}
                setIsOpen={setShowNotifs}
            >
                <div className='notifs__modal'>
                    <span className='font-600'>NOTIFICATIONS</span>

                    <div className='flex mt-3 gap-2'>
                        <div onClick={()=>handleSelectFilter("All")} className={`flex items-center justify-between gap-1 ${selectedFilter === "All" ? "bg-main text-white" : "bg__btn--hover"} p-1/2 px-1 pr-2 cursor-pointer rounded-md`}>
                            <div className='icon__bg bg-white notif__filter--icon opacity-5'>
                                <img src="/all__proj.svg" alt="" />
                            </div>
                            <p className="ellipsis font-500">All</p>
                        </div>

                        <Select label="Sort per Project" options={[]} icon="/proj__icon.svg"/>

                        <div onClick={()=>handleSelectFilter("Treety")} className={`flex items-center justify-between gap-1 ${selectedFilter === "Treety" ? "bg-main text-white" : "bg__btn--hover"} p-1/2 px-1 cursor-pointer rounded-md`}>
                            <div className='icon__bg bg-white notif__filter--icon opacity-5'>
                                <img src={"/logo__leaf.svg"} alt="" />
                            </div>
                            <p className="ellipsis font-500">Treety Updates</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 mt-2'>
                        {new Array(5).fill(0).map((_, i)=>(
                            <div className='relative flex gap-1 items-center notif__repeated p-1 rounded-md'>
                                <div className='icon__bg bg-white notif__repeated--icon'>
                                    <img src={"/logo__leaf.svg"} alt="" />
                                </div>
                                <div className='flex-1 notif__content'>
                                    <h5 className='uppercase spaced'>Maasai mara project</h5>
                                    <p className='pr-4'>There has been a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac pharetra arcu, quis malesuada sapien....</p>
                                </div>
                                <div className='flex notif__time items-center'>
                                    <div className="rounded-full notif__time--icon bg-secondary"></div>&nbsp;
                                    <span>13H</span>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </Modal>

        </div>
    );
}

export default Sidebar;