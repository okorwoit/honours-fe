import React from 'react';
import { menuItems, socials, legals } from '../../utils/content';
import { NavLink } from 'react-router-dom';

function Footer(props) {
    
    return (
        <footer className='flex flex-col py-5 mt-5'>
            <div className='w-4/5 flex items-start mx-auto'>
                <div className='flex flex-col items-center gap-5' data-aos="fade-right" data-aos-duration="1500">
                    <div className='flex flex-col items-center gap-1' >
                        <img src="/logodark.svg" alt="" className='footer__logo'/>
                        <p className='uppercase spaced text-sm text-center'>SUPPORTING FOREST restoration PROJECTS</p>
                    </div>
                </div>

                <div className='flex-1 flex justify-between' data-aos="fade-left" data-aos-duration="1500">
                    <div className='flex flex-col gap-2 footer__links--repeated'>
                        <strong className='spaced font-900'>NAVIGATION</strong>
                        <ul className='flex flex-col gap-1 items-start'>
                            {menuItems.map((item, i)=>(
                                <li key={i} className=' h-full full-center'>
                                    <NavLink to={item.link} className={`font-300 ${i=== menuItems.length -1 ?"hidden" :""}`}>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='flex flex-col gap-2 footer__links--repeated'>
                        <strong className='spaced font-900'>SOCIALS</strong>
                        <ul className='flex flex-col gap-1 items-start'>
                            {socials.map((item, i)=>(
                                <li key={i}>
                                    <NavLink to={item.link} className={`font-300`}>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}

                        </ul>
                    </div>

                    <div className='flex flex-col gap-2 footer__links--repeated' >
                        <strong className='spaced font-900'>LEGAL</strong>
                        <ul className='flex flex-col gap-1 items-start'>
                            {legals.map((item, i)=>(
                                <li key={i}>
                                    <NavLink to={item.link} className={`font-300`}>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}

                        </ul>
                    </div>

                </div>

            </div>

            <div className='w-4/5 mx-auto mt-3 copyright'>&copy;&nbsp;{new Date().getFullYear()} treety. All rights reserved</div>    
        </footer>   
    );
}

export default Footer;