import React, { useEffect, useState } from 'react';
import Header from '../../components/website/Header';
import Footer from '../../components/website/Footer';
import { registerFormFields } from '../../utils/content';

function Register(props) {

    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        })
          .then(() =>{
            setSuccess(true);
            e.target.reset();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
          })
          .catch((error) => alert("An error occurred. Please try again"));
      };

    useEffect(()=>{
        document.title = 'Register | Treety'
        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            <Header isHeaderFixed={true}/>
            <section className={`flex px-5 header__fixed--padding mb-5 flex register__container`}>
                <div className='register__left pr-5 flex-1 pt-5 text-lg'>
                    <div className='register__left--intro'>
                        <img src="/welcomeAboard.svg" alt="" className='w-3/4' data-aos="zoom-in" data-aos-duration="1500" />
                        <p className='capitalize px-2 text-2xl my-3 font-500' data-aos="fade-down" data-aos-duration="1500">welcome <br/>aboard!</p>
                    </div>

                    <div className='word__content capitalize relative isolate text-lg px-2 py-3 spaced__lines'>
                        <p data-aos="fade-up" data-aos-duration="1500">
                            We're genuinely thrilled that you are taking the <strong>first step</strong> in joining our journey towards <strong>sustainable forestry</strong>. 
                        </p>
                        <p data-aos="fade-up" data-aos-duration="1500">
                            Your <strong>interest</strong> and <strong>initiative</strong> mean a lot to us !
                        </p>
                        <p data-aos="fade-up" data-aos-duration="1500">
                            Once you fill in the form, one of our <strong>co-founders</strong> will personally <strong>reach out</strong> to you to discuss how we can <strong>align our mission</strong> with <strong>your goals and aspirations</strong>. 
                        </p>

                        <div data-aos="fade-up" data-aos-duration="1500">
                            <strong>Gratitude from the Heart of Treety!</strong>
                        </div>

                    </div> 
                    
                    <div className='px-2 flex flex-col pt-2 relative message__signature capitalize' data-aos="fade-up" data-aos-duration="1500">
                        Best,
                        <img src="/logodark.svg" alt="" className='header__logo' />

                        <div className='treety__sign'>
                            the Treety Team
                        </div>
                    </div>

                </div>

                <form 
                onSubmit={handleSubmit} 
                method='POST' 
                name="registration" 
                data-netlify="true"
                className='w-3/5 pt-5 px-5 flex flex-col items-start register__form'>
                    <div className='uppercase spaced form__title font-600 mb-3 bg__gray px-3 py-1 rounded-md' data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
                        let's work together
                    </div>
                    <input type="hidden" name="form-name" value="registration" />

                    <div className='w-full mb-5'>
                        {success && (
                            <p className='success__message text-lg'>Thanks for your message! </p>
                        )}
                        {
                            registerFormFields.map((field, i)=>(
                                <div key={i} className="form__group flex py-3 w-full gap-3" data-aos="fade-up" data-aos-duration="1500">
                                    <div className='text-lg opacity-5 spaced'>
                                        0{i+1}
                                    </div>
                                    <div className='flex flex-col gap-1 flex-1'>
                                        <label htmlFor={field.name} className='text-xl capitalize'>{field.label}</label>
                                        {!field.isTextarea ?
                                            <input aria-label={field.placeholder} type={field.type || "text"} name={field.name} id={field.name} placeholder={field.placeholder}  required/>:
                                            <textarea name={field.name} id={field.name} cols="30" rows="10" placeholder={field.placeholder}></textarea>
                                        }
                                    </div>
                                </div>                            
                            ))
                        }
                    </div>

                    <button className="content__item main__btn uppercase mx-auto flex items-center gap-2 spaced" data-aos="fade-up" data-aos-duration="1500">
                        
                        <p className="link link--leda" data-text="Get early access ">
                            <span>Get early access </span>
                        </p> 
                        <i className='fas fa-arrow-right relative round__arrow transition-300 full-center rounded-full'></i>        
                    </button>                   

                </form>

            </section>

            <Footer/>
            
        </>
    );
}

export default Register;