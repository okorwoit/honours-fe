import React, { useEffect } from 'react';
import Header from '../../components/website/Header';
import Footer from '../../components/website/Footer';
import { amplifyImpactItems, teamInfo } from '../../utils/content';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { NavLink } from 'react-router-dom';

function About(props) {

    useEffect(()=>{
        document.title = 'About | Treety'
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header isHeaderFixed={true}/>
            <section className={`flex header__fixed--padding bg__gray mb-5`}>
                <div className='w-4/5 py-5 mx-auto text-center'>                
                    <h1 className='capitalize section__title' data-aos="fade-down" data-aos-duration="1500">Who are we?</h1>
                    <div className='capitalize we__sec w-3/4 mx-auto  items-center gap-1 text-2xl leading-4' data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500">                        
                        Treety is a digital solution that provides &nbsp;<strong>actionable data</strong> insights on <strong>forest and biodiversity change overtime</strong>, <strong>(de)reforestation monitoring</strong> and 
                        <strong> carbon sequestration</strong>. We harness <strong>satellite imagery</strong> to monitor <strong>forest Restoration projects</strong>, 
                        &nbsp;<strong>analysing activities</strong> taking place within them to measure their <strong>progress</strong> and overall <strong>impact</strong>.
                    </div>

                    <div className='about__hero--images flex justify-between mt-5'>
                        <img src="/hero3.png" alt="" data-aos="fade-right" data-aos-duration="1500"/>
                        <img src="/hero5.png" alt="" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500"/>
                        <img src="/who1.png" alt="" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500"/>
                        <img src="/who2.png" alt="" data-aos="fade-left" data-aos-duration="1500"/>
                    </div>
                </div>
            </section>

            <section>
                <div className='w-4/5 py-5 mx-auto text-center'>                
                    <h3 className='capitalize section__title w-1/2 mx-auto mb-3 capitalize' data-aos="fade-down" data-aos-duration="1500">How do we amplify the impact of sustainable forestry?</h3>
                    <p className='text-lg capitalize' data-aos="fade-down" data-aos-duration="1500" >We provide <strong>data-driven</strong> insights to bridge the gap between <strong>intention</strong> and <strong>results</strong></p>
                    <div className='flex gap-5 mt-5 text-left'>
                        <Swiper
                                spaceBetween={30}
                                slidesPerView={3}
                                speed={2000}
                                className="amplifySwiper"
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1.25,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                    },                                
                                }}
                        >
                        
                            {
                                amplifyImpactItems.map((impact, i)=>(
                                    <SwiperSlide key={i}>
                                        <div key={i} className='flex amplify__repeated flex-col bg__gray h-full rounded-md px-4 py-3' data-aos={`fade-${i%2 == 0 ? "down" : "up"}`} data-aos-duration="1500">
                                            <div className='flex justify-end'>
                                                <div className='numbering spaced font-600 bg-white mb-3 rounded-full full-center'>
                                                    0{i+1}
                                                </div>
                                            </div>
                                            <span className='font-600 uppercase w-1/2 leading-4 spaced'>{impact.title}</span>
                                            <p className='mt-2 text-md capitalize' dangerouslySetInnerHTML={{ __html: impact.description }}>
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }

                        </Swiper>
                        
                    </div>
                
                </div>
            </section>

            <section>
                <div className='w-4/5 py-5 mx-auto text-center'>                
                    <h3 className='capitalize section__title w-1/2 mx-auto mb-3' data-aos="fade-down" data-aos-duration="1500">Brand Identity</h3>
                    <p className='capitalize text-lg' data-aos="fade-down" data-aos-duration="1500">Advancing <strong>Sustainable forest restoration</strong> Through Technology.</p>
                    <div className='flex mt-5 identity__section'>
                        <div className='flex-1 identity__box'>
                            <div className='flex flex-col bg__gray justify-center items-end gap-2 text-right'>
                                <span className='text-lg spaced font-600' data-aos="fade-down" data-aos-duration="1500">OUR MISSION</span>
                                <p className='text-lg capitalize' data-aos="fade-down" data-aos-duration="1500">
                                    Treety's mission is to facilitate <strong>management</strong> of <strong>sustainable forest 
                                    restoration</strong> projects, by <strong>providing</strong>  organizations with <strong>data</strong> to 
                                    implement <strong>definitive</strong>, <strong>long-term</strong> forest <strong>conservation</strong> and
                                    <strong> restoration</strong> strategies.
                                </p>
                            </div>
                            <div className='identity__images--left relative' data-aos="zoom-in-right" data-aos-duration="1500">
                                <img src="/mission1.jpg" alt="" />
                                <img src="/mission2.png" alt="" />
                            </div>
                        </div>

                        <div className='identity__separator relative' data-aos="flip-left" data-aos-duration="1500">
                            <img src="/check.svg" alt="" />  
                            <img src="/check.svg" alt="" />                            
                        </div>

                        <div className='flex-1 identity__box'>
                            <div className='identity__images--right relative' data-aos="zoom-in-left" data-aos-duration="1500">
                                <img src="/hero5.png" alt="" />
                                <img src="/vision2.jpeg" alt="" />
                            </div>
                            <div className='flex flex-col bg__gray justify-center items-start gap-2 text-left'>
                                <span className='text-lg spaced font-600' data-aos="fade-up" data-aos-duration="1500">OUR VISION</span>
                                <p className='text-lg capitalize' data-aos="fade-up" data-aos-duration="1500">
                                    Our vision is to <strong>develop</strong> technologies required to <strong>modernize forest
                                     restoration initiatives</strong> and create a future where <strong>high-integrity</strong>, 
                                     <strong>transparent forest initiatives</strong> can <strong>scale</strong> at the speed our planet's 
                                     <strong> demands</strong>. 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg__gray section__together pb-5'>
                <div className='w-4/5 py-5 mx-auto text-center'>                
                    <h3 className='capitalize section__title mb-2' data-aos="fade-down" data-aos-duration="1500">We are Treety</h3>
                    <p className='capitalize text-lg' data-aos="fade-down" data-aos-duration="1500">let's work together</p>
                </div>
                <div className='flex flex-wrap members w-3/4 justify-center gap-3 mx-auto'>
                    {
                        teamInfo.map((member, i)=>(
                            <a href={member.url} target='_blank' key={i} className="team__member w-1/4 overflow-hidden rounded-md bg-white" data-aos="fade-up" data-aos-duration="1500">
                                <div className='member__img relative'>
                                    <img src={member.image} alt="" className='cover h-full' />
                                    <div className='member__link--icon'>
                                        <i className='fas fa-arrow-right round__arrow relative transition-300 full-center rounded-full'></i>
                                    </div>
                                </div>
                                <div className='px-2 py-3 text-center'>
                                    <p className='uppercase font-600 mb-1 spaced'>{member.name}</p>
                                    <div className='mx-auto capitalize'>
                                        {member.role}
                                    </div>
                                </div>
                            </a>
                        ))
                    }
                </div>
            </section>

            <section className='section__bepart'>
                <div className='relative isolate text-white overflow-hidden' data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="1500">
                    <h3 className='text-3xl capitalize'>Be part of the change</h3>
                    <p className='text-lg capitalize mt-3 mb-2 w-1/2'>
                        By joining Treety, you become part of a community dedicated to <strong>restoring our planet's vital ecosystem</strong>. Your contribution has the power to create a lasting impact.
                    </p>
                    <p className='mb-3 text-lg capitalize'>Let us plant <strong>the seeds of change</strong> together</p>

                    <NavLink to="/register" className='bepart__cta cursor-pointer font-700 spaced font-400 flex items-center gap-2 content__item'>
                        
                        <p className="link link--leda" data-text="GET INVOLVED TODAY">
                            <span>GET INVOLVED TODAY</span>
                        </p>                        
                        <i className='fas fa-arrow-right round__arrow relative transition-300 full-center rounded-full'></i>
                    </NavLink>
                </div>
            </section>

            <Footer/>
            
        </>
    );
}

export default About;