import React from 'react';
import { NavLink } from 'react-router-dom';

function Login(props) {

    const loginFields = [
        {
            label: 'Email',
            name: 'email',
            placeholder: 'Enter your email',
            type: 'email'
        },
        {
            label: 'Password',
            name: 'password',
            placeholder: 'Enter your password',
            type: 'password'
        }
    ]


    return (
        <div className='flex px-2 py-2 h-screen overflow-hidden'>
            <div className="w-1/2 flex flex-col full-center">
                <NavLink to="/">
                    <img src="/logodark.svg" alt="" className='header__logo'/>
                </NavLink>
                <div className='word__content  w-1/2 capitalize text-center mb-2 relative isolate text-lg px-2 py-3 spaced__lines'>
                        <p data-aos="fade-up" data-aos-duration="1500">
                            Your <strong>Efforts</strong> Today Seed Tomorrow's <strong>Sustainable</strong> Forests!
                        </p>
                </div> 

                <form className='flex flex-col items-start w-3/5'>
                    {
                        loginFields.map((field, i)=>(
                            <div key={i} className="form__group flex py-2 w-full gap-3">
                                <div className='text-lg opacity-5 spaced'>
                                    0{i+1}
                                </div>
                                <div className='flex flex-col gap-1 flex-1'>
                                    <label htmlFor={field.name} className='text-xl capitalize'>{field.label}</label>
                                    <input aria-label={field.placeholder} type={field.type} name={field.name} id={field.name} placeholder={field.placeholder}  required/>
                                    
                                </div>
                            </div>                            
                        ))
                    }

                    <button className="content__item main__btn uppercase mx-auto flex items-center gap-2 spaced mt-3 mb-4">
                        
                        <p className="link link--leda" data-text="LOGIN">
                            <span>LOGIN </span>
                        </p> 
                        <i className='fas fa-arrow-right relative round__arrow transition-300 full-center rounded-full'></i>        
                    </button>

                </form>
                <p>
                    Forgot password? <NavLink to="/forgot-password" className="link link--leda font-700">Reset</NavLink>
                </p>

            </div>
            <div className="w-1/2 rounded-lg overflow-hidden relative">
                <img src="/login.jpg" alt="" className='h-full cover' />
                
                <div className='login__addon text-white flex flex-col items-start'>
                    <div className='flex rounded-md items-center gap-1 login__addon--content'>
                        <div className='login__addon--icon full-center'>
                            <img src="/measure.svg" alt="" className='w-1/2'/>
                        </div>
                        <span className='text-lg'>Measure</span>
                    </div>
                    <div className='flex flex-col items-center ml-2'>
                        <span className='addon__line'></span>
                        <div className='addon__circle full-center'>
                            <span></span>
                        </div>
                    </div>
                </div>

                <div className='login__addon text-white flex flex-col items-start'>
                    <div className='flex rounded-md items-center gap-1 login__addon--content'>
                        <div className='login__addon--icon full-center'>
                            <img src="/verify.svg" alt="" className='w-1/2'/>
                        </div>
                        <span className='text-lg'>Verify</span>
                    </div>
                    <div className='flex flex-col items-center ml-2'>
                        <span className='addon__line'></span>
                        <div className='addon__circle full-center'>
                            <span></span>
                        </div>
                    </div>
                </div>

                <div className='login__addon text-white flex flex-col-reverse items-start'>
                    <div className='flex rounded-md items-center gap-1 login__addon--content'>
                        <div className='login__addon--icon full-center'>
                            <img src="/report.svg" alt="" className='w-1/2'/>
                        </div>
                        <span className='text-lg'>Report</span>
                    </div>
                    <div className='flex flex-col-reverse items-center ml-2'>
                        <span className='addon__line'></span>
                        <div className='addon__circle full-center'>
                            <span></span>
                        </div>
                    </div>
                </div>

                <p className="addon__text spaced font-700">
                    SUPPORTING FOREST RESTORATION PROJECTS
                </p>
            </div>
        </div>
    );
}

export default Login;