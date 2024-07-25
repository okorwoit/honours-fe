import React from 'react';
import { menuItems } from '../../utils/content';
import { NavLink } from 'react-router-dom';

function Header({headerRef, isHeaderFixed}) {
    return (
        <header ref={headerRef} className={`flex transition-300 ${isHeaderFixed ? "header__fixed":"" }`}>
            <div className='flex justify-between items-center w-4/5 mx-auto pt-1'>
                <NavLink to="/">
                    <img src="/logodark.svg" alt="" className='header__logo'/>
                </NavLink>
                <p className="hidden moto uppercase text-sm spaced px-1">Supporting forest restoration projects</p>
                <nav className='h-full'>
                    <label htmlFor="toggle__menu" className='toggle__container' >
                        <img src="/close.svg" alt="" className="close__menu" />
                    </label>
                    <ul className='flex items-center gap-2 h-full'>
                        {menuItems.map((item, i)=>(
                            <li key={i} className='px-1 text-lg h-full full-center site__menu--item'>
                                {/* <NavLink to={item.link} className={`font-300`}>
                                    <span className='opacity-5 item__number hidden'>0{i+1}</span>
                                    <span>
                                        {item.name}
                                    </span>
                                </NavLink> */}
                                <NavLink to={item.link} className={`font-300 ${i=== menuItems.length -1 ?"login__btn spaced font-500 uppercase main__btn" :""}`}>
                                    <span className='opacity-5 item__number hidden'>0{i+1}</span>
                                    <span>
                                        {item.name}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>  
                <div className='toggle__container'>
                    <input type="checkbox" className="toggle__menu" id="toggle__menu" hidden />
                    <label htmlFor="toggle__menu">
                        <img src="/toggle.svg" alt="" className="toggle__menu" />                 
                    </label>
                </div>
            </div>
        </header>
    );
}

export default Header;