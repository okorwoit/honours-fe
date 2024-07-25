import React, { useEffect, useState } from 'react';
import Footer from '../../components/website/Footer';
import Header from '../../components/website/Header';
import { contactUsFormFields } from '../../utils/content';

function ContactUs(props) {
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
            // e.target.reset();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        })
          .catch((error) => alert("An error occurred. Please try again"));
      };


    useEffect(()=>{
        document.title = 'Contact | Treety'
        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            <Header isHeaderFixed={true}/>
            <section className={`flex px-5 header__fixed--padding mb-5 flex register__container`}>
                <div className='register__left pr-5 flex-1 pt-5 text-lg'>
                    <div className='register__left--intro'>
                        <img src="/contact.svg" alt="" className='w-3/4' data-aos="zoom-in" data-aos-duration="1500"/>
                        <p className='capitalize px-2 text-2xl my-3 font-500' data-aos="fade-down" data-aos-duration="1500">eager to know more? <br/>Let's connect!</p>
                    </div>

                    <div className='word__content capitalize relative isolate text-lg px-2 py-3 spaced__lines'>
                        <p data-aos="fade-up" data-aos-duration="1500">
                            Your <strong>queries</strong>, <strong>suggestions</strong>, and feedback <strong>light</strong> the way <strong>forward</strong> for us ! 
                        </p>
                        <div data-aos="fade-up" data-aos-duration="1500">
                            Whether you have questions about our <strong>upcoming release</strong>, <strong>feedback</strong>, or just want to say <strong>hello</strong>, we're here to listen.
                        </div>

                    </div> 

                    <div className='px-2 flex flex-col pt-2 relative'>
                        <div className='spaced uppercase font-600 mb-2' data-aos="fade-down" data-aos-duration="1500">CONTACT DETAILS</div>
                        <div className="flex flex-col gap-2">
                            <div className='flex gap-2 items-center' data-aos="fade-up" data-aos-duration="1500">
                                <div className="rounded-full contact__icon full-center">
                                    <img src="/email.svg" alt="" className='' />
                                </div>
                                <a href='mailto:treetyinfo@gmail.com' className='text-lg'>treetyinfo@gmail.com</a>
                            </div>
                            <div className='flex gap-2 items-center' data-aos="fade-up" data-aos-duration="1500">
                                <div className="rounded-full contact__icon full-center">
                                    <img src="/phone.svg" alt="" className='' />
                                </div>
                                <a href='tel:+ (230) 54726257' className='text-lg'>+ (230) 54726257</a>
                            </div>
                            <div className='flex gap-2 items-center' data-aos="fade-up" data-aos-duration="1500">
                                <div className="rounded-full contact__icon full-center">
                                    <img src="/location.svg" alt="" className='' />
                                </div>
                                <span className='text-lg text-left'>Powder Mill Road, <br/>Pamplemousses, Mauritius</span>
                            </div>
                        </div>
                        
                    </div>

                </div>
                <form 
                onSubmit={handleSubmit} 
                name="contact" 
                method='POST' 
                data-netlify="true"
                className='w-3/5 pt-5 px-5 flex flex-col items-start'>
                    <div className='form__title spaced uppercase font-600 mb-3 bg__gray px-3 py-1 rounded-md' data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
                        get in touch with us
                    </div>
                    <input type="hidden" name="form-name" value="contact" />


                    <div className='w-full mb-5'>
                        {success && (
                            <p className='success__message text-lg'>Thanks for your message! </p>
                        )}
                        {
                            contactUsFormFields.map((field, i)=>(
                                <div key={i} className="form__group flex py-3 w-full gap-3" data-aos="fade-up" data-aos-duration="1500">
                                    <div className='text-lg opacity-5 spaced'>
                                        0{i+1}
                                    </div>
                                    <div className='flex flex-col gap-1 flex-1'>
                                        <label htmlFor={field.name} className='text-xl capitalize'>{field.label}</label>
                                        {!field.isTextarea ?
                                            <input 
                                                aria-label={field.placeholder} 
                                                type={field.type || "text"} 
                                                name={field.name} 
                                                id={field.name} 
                                                placeholder={field.placeholder} 
                                                required={true}
                                                
                                                />

                                                :

                                            <textarea 
                                                name={field.name} 
                                                id={field.name} 
                                                cols="30" 
                                                rows="10" 
                                                placeholder={field.placeholder}
                                                
                                                ></textarea>
                                        }
                                    </div>
                                </div>                            
                            ))
                        }
                    </div>

                    <button className="content__item main__btn uppercase mx-auto flex items-center gap-2 spaced" data-aos="fade-up" data-aos-duration="1500">
                        
                        <p className="link link--leda" data-text="let's chat">
                            <span>let's chat</span>
                        </p>
                        <i className='fas fa-arrow-right relative round__arrow transition-300 full-center rounded-full'></i>        
                    </button>    

                </form>

            </section>

            <Footer/>
            
        </>
    );
}

export default ContactUs;