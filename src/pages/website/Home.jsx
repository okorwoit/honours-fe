import React, {useState, useRef, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

import { NavLink, useNavigate } from 'react-router-dom';

import { heroSlides, supportSliderItems, whySliderItems } from '../../utils/content';
import Footer from '../../components/website/Footer';
import Header from '../../components/website/Header';

function Home(props) {

    const navigate = useNavigate();
 
    const headerRef = useRef(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: 0.25, 
        };
    
        const observer = new IntersectionObserver(handleIntersection, options);
    
        if (headerRef.current) {
          observer.observe(headerRef.current);
        }
    
        if (sliderRef.current) {
          observer.observe(sliderRef.current);
        }
    
        return () => {
          observer.disconnect();
        };
    }, []);

    const [isHeaderFixed, setIsHeaderFixed] = useState(false);

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            if (entry.target === headerRef.current) {
                window.scrollTo({ top: window.innerHeight - 50, behavior: 'smooth' });  
                setIsHeaderFixed(true);          
            } else if (entry.target === sliderRef.current) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsHeaderFixed(false);
            }
            }
        });
    };

    useEffect(()=>{
        document.title = 'Home | Treety'
        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            <section ref={sliderRef} className="hero">
                <Swiper 
                    speed={2000}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={true} 
                    keyboard={{
                        enabled: true,
                      }}
                    modules={[Keyboard, Pagination, Autoplay, EffectFade]} 
                    effect="fade"
                    className="heroSwiper">

                    {
                        heroSlides.map((slide, i)=>(
                            <SwiperSlide key={i}>
                                <img src={`/hero${i+1}.png`} alt="" className='h-full cover slide__bg' />
                                <div className="content full-center flex flex-col items-center">
                                    <img className='treety__logo' src="/logo.svg" alt="" />
                                    <h3 className='w-4/5 mt-2 mb-5 text-4xl capitalize font-700 text-center'>
                                        {slide.description}
                                    </h3>

                                    <button onClick={()=>navigate("/register")} className="content__item main__btn uppercase mx-auto flex items-center gap-2 spaced" data-aos="fade-up" data-aos-duration="1500">
                                        <p className="link link--leda" data-text="Get early access ">
                                            <span>Get early access </span>
                                        </p> 
                                        <i className='fas fa-arrow-right relative round__arrow transition-300 full-center rounded-full'></i>        
                                    </button>
                                
                                </div>
                            </SwiperSlide>
                        )
                        )
                    }

                </Swiper>
            </section>

            <Header headerRef={headerRef} isHeaderFixed={isHeaderFixed}/>

            <section className={`supporting py-5 flex ${isHeaderFixed ? "header__fixed--padding":""}`}>
                <div className='w-4/5 mx-auto text-center'>
                    <h3 className='text-4xl font-600 mb-4 capitalize' data-aos="fade-down" data-aos-duration="1500">
                        Supporting Forest Restoration<br/> Projects.
                    </h3>

                    <div className='text-lg supporting__desc flex flex-col w-3/4 mx-auto gap-2 capitalize spaced__lines'>
                        <p data-aos="fade-down" data-aos-duration="1500">
                            Companies are essential partners in <strong>restoring natural ecosystems</strong>, which is critical to addressing <strong>climate change</strong>, <strong>biodiversity loss</strong>, and <strong>land degradation</strong>.
                        </p>
                        <p data-aos="fade-up" data-aos-duration="1500">
                            At <strong>treety</strong> we provide solutions that <strong>support</strong> companies to achieve these global goals, building <strong>trust</strong> and <strong>confidence</strong> among all stakeholders
                        </p>
                    </div>

                    <div className='mt-5'>

                        <Swiper
                            spaceBetween={30}
                            slidesPerView={4}
                            speed={2000}
                            className="supportSwiper"
                            breakpoints={{
                                320: {
                                    slidesPerView: 1.25,
                                    spaceBetween:10
                                },
                                768: {
                                    slidesPerView: 2.25,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },   
                                1280: {
                                    slidesPerView: 4,
                                },                             
                            }}
                        >

                            {
                                supportSliderItems.map((slide, i) => (
                                    <SwiperSlide key={i} className=''>
                                        <div className='flex flex-col items-center relative rounded-lg overflow-hidden support__slide' data-aos={slide.fade} data-aos-duration="1500">
                                            <img src={slide.image} alt="" className='w-full cover' />
                                            
                                            <div className='absolute support__slide--content text-left px-2 flex flex-col justify-end text-white isolate w-full h-full'>
                                                <div className='hidden items-center sup__numbers justify-between'>
                                                    <div className='numbering font-600 bg-white rounded-full full-center'>
                                                        0{i+1}
                                                    </div>
                                                    <img src={`/sup${i+1}.svg`} alt="" className='sup__icon' />
                                                </div>
                                                
                                                <h3 className='transition-500 w-3/4 font-600 mt-3 mb-3 spaced'>
                                                    {slide.title}
                                                </h3>
                                                <p className='text-md font-300 capitalize'>
                                                    {slide.description}
                                                </p>

                                                <i className='fas fa-arrow-right round__arrow transition-300 full-center rounded-full'></i>
                                            </div>                                            
                                        </div>
                                    </SwiperSlide>
                                )
                                )
                            }   
                        </Swiper>

                    </div>

                </div>
            </section>

            <section className="flex py-5">
                <div className='w-4/5 mx-auto text-center'>
                    <h3 className='text-4xl font-600 mb-4 capitalize' data-aos="fade-down" data-aos-duration="1500">
                        Why support forest Restoration<br/>projects?
                    </h3>

                    <p className='text-lg w-3/4 mx-auto capitalize spaced__lines' data-aos="fade-down" data-aos-duration="1500">
                        By supporting forest restoration projects, you <strong>actively contribute </strong>
                         and <strong>amplify</strong> collective <strong>efforts</strong> that address 
                         <strong> environmental</strong>, <strong>social</strong>, and 
                         <strong> economic</strong> challenges, making a <strong>direct </strong>
                          and <strong>measurable impact</strong> on the health of our 
                          <strong> planet</strong> and its <strong>inhabitants</strong>.
                    </p>

                    <div className='my-5'>
                        <Swiper
                                spaceBetween={30}
                                slidesPerView={4}
                                speed={2000}
                                className="whySwiper"
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1.25,
                                        spaceBetween:10
                                    },
                                    768: {
                                        slidesPerView: 2.25,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                    },    
                                    1280: {
                                        slidesPerView: 4,
                                    },                            
                                }}
                            >

                                {
                                    whySliderItems.map((item, i) => (
                                        <SwiperSlide key={i} className=''>
                                            <div className='flex flex-col px-3 py-5 why__slide h-full items-center gap-2 relative rounded-lg overflow-hidden' data-aos={`fade-${i%2 == 0 ? "down" : "up"}`} data-aos-duration="1500">
                                                <div className="why__icon rounded-full full-center p-1">
                                                    <img src={`/why${i+1}.svg`} alt="" className='w-full' />
                                                </div>     
                                                <p className='text-md capitalize' dangerouslySetInnerHTML={{ __html: item }}>
                                                </p>                                    
                                            </div>
                                        </SwiperSlide>
                                    )
                                    )
                                }   
                        </Swiper>
                    </div>

                    <button onClick={()=>navigate("/register")} className="content__item main__btn mx-auto flex items-center gap-2 spaced" data-aos="fade-up" data-aos-duration="1000">
                        <p className="link link--leda" data-text="GET STARTED TODAY ">
                            <span>GET STARTED TODAY </span>
                        </p>   
                        <i className='fas fa-arrow-right relative round__arrow transition-300 full-center rounded-full'></i>        
                    </button>
                </div>
            </section>  

            <section className="flex flex-col py-5 launchpad ">
                <div className='w-4/5 py-5 mx-auto text-center flex flex-col items-center'>
                        <h3 className='text-4xl w-1/2 font-600 mb-4 capitalize' data-aos="fade-down" data-aos-duration="1500">
                            Treety at the 2023 Climate LaunchPad National finals, Mauritius.
                        </h3>                        

                        <div className='text-lg flex flex-col w-3/4 mx-auto gap-2 capitalize spaced__lines'>
                            <p data-aos="fade-down" data-aos-duration="1500">
                                <strong>The Climate launchpad's</strong> vibrant community <strong>enriched</strong> our perspective and provided a <strong>strong foundation</strong> that helped <strong>battle-proof</strong> treety. 
                            </p>
                            <p data-aos="fade-down" data-aos-duration="1500">
                                Their <strong>expertise</strong> and <strong>support</strong> shaped our <strong>vision</strong>, turning it into a <strong>tangible reality</strong>.
                            </p>
                        </div>
                </div>

                <div className='launchpad__galery flex gap-2 my-5 '>
                    <div className='flex flex-col flex-1 gap-2' data-aos="fade-right" data-aos-duration="1500">
                        <div className="flex-1 overflow-hidden">
                            <img src="/launchpad1.png" alt="" className='w-full h-full cover ' />
                        </div>
                        <div className="overflow-hidden">
                            <img src="/launchpad4.png" alt="" className='w-full h-full cover' />
                        </div>
                    </div>
                    <div className='flex flex-col flex-1 gap-2 galery__col--2' data-aos="fade-down" data-aos-duration="1500">
                        <div className="overflow-hidden">
                            <img src="/launchpad2.png" alt="" className='w-full h-full cover' />
                        </div>
                        <div className="overflow-hidden flex-1">
                            <img src="/launchpad5.png" alt="" className='w-full h-full cover' />
                        </div>
                    </div>
                    <div className='flex flex-col flex-2 gap-2' data-aos="fade-left" data-aos-duration="1500">
                        <div className="overflow-hidden">
                            <img src="/launchpad3.png" alt="" className='w-full h-full cover' />
                        </div>
                        <div className="overflow-hidden">
                            <img src="/launchpad6.png" alt="" className='w-full h-full cover' />
                        </div>
                        <div className="overflow-hidden">
                            <img src="/launchpad7.png" alt="" className='w-full h-full cover' />
                        </div>
                    </div>
                </div>

            </section>
            
            <section className="flex flex-col py-5">
                <div className='w-4/5 mx-auto text-center flex flex-col items-center'>
                    <h3 className='text-4xl w-1/2 font-600 mb-2 capitalize' data-aos="fade-down" data-aos-duration="2500">
                        Let's do this together!
                    </h3>  
                    <p className='text-lg capitalize' data-aos="fade-down" data-aos-duration="1500">One Step at a time, one day at a time</p>  

                    <div className='flex w-full gap-5 text-left capitalize justify-between mt-5'>
                       
                        <Swiper
                                spaceBetween={30}
                                slidesPerView={2}
                                speed={2000}
                                className="foundersSwiper"
                                pagination={true}
                                modules={[Pagination]} 
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                    },
                                    768: {
                                        slidesPerView: 1.5,
                                    },       
                                    1024: {
                                        slidesPerView: 2,
                                    },                        
                                }}
                        >
                            <SwiperSlide>
                                <div className='founder__word h-full p-3 flex flex-col justify-between' >
                                        <div className='word__content relative isolate text-lg px-2 py-3 spaced__lines' data-aos="zoom-in-down" data-aos-duration="1500">
                                            While the excitement of setting new records for tree planting is commendable, an Important aspect often gets Overshadowed in the process. 
                                            Growing trees and nurturing new forests go beyond just planting; It demands <strong>consistent attention</strong> and <strong>care</strong>. This is  why <strong>Treety</strong> Is pivotal in ensuring the <strong>long-term success</strong> and <strong>sustainability</strong> of tree-planting initiatives.
                                            <br/><br/>
                                            <strong>lets do this together!</strong>
                                        </div>  
                                        <div className='flex founder__repeated items-center px-2 gap-2 mt-1'>
                                            <img src="/letsdo1.png" alt="" className="user__round" />   
                                            <div className='flex flex-col gap-1'>
                                                <p className='uppercase font-600 spaced'>emmanuel okorwoit</p>
                                                <span className='capitalize'>Co-founder, treety</span>
                                            </div>                         
                                        </div>                              

                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='founder__word h-full p-3 flex flex-col justify-between' >
                                        <div className='word__content relative isolate text-lg px-2 py-3 spaced__lines' data-aos="zoom-in-up" data-aos-duration="1500">
                                            Tree planting initiatives have been undertaken by organizations, governments, individuals, and the private sector since time immemorial. However, the true challenge lies not just in planting trees, but in ensuring their <strong>sustained growth</strong> and <strong>longevity</strong> - the most pressing challenge of our time.
                                            <strong>Treety</strong> addresses this very challenge, aiming to combat <strong>green-washing</strong> and genuinely contribute to a more <strong>sustainable</strong> and <strong>greener</strong> future.

                                            <br/><br/>
                                            <strong>lets do this together!</strong>
                                        </div>  
                                        <div className='flex founder__repeated items-center px-2 gap-2 mt-1'>
                                            <img src="/abby.png" alt="" className="user__round" />   
                                            <div className='flex flex-col gap-1'>
                                                <p className='uppercase font-600 spaced'>ABBY MBUTHI</p>
                                                <span className='capitalize'>Co-founder, treety</span>
                                            </div>                         
                                        </div>                              

                                </div>
                            </SwiperSlide>
                        </Swiper>                     
                    </div> 
                </div>                
            </section>     

            <Footer/>  
        </>
    );
}

export default Home;