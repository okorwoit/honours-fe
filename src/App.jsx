import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './Media.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "@fortawesome/fontawesome-free/css/all.min.css";
import AOS from 'aos';
import 'aos/dist/aos.css';



import { BrowserRouter, Route, Routes } from 'react-router-dom'

//---- WEBSITE PAGES
import Home from './pages/website/Home'
import About from './pages/website/About';
import Register from './pages/website/Register';
import ContactUs from './pages/website/ContactUs';
import MainApp from './components/app/MainApp';
import Monitoring from './pages/app/Monitoring';
import ProjectAnalytics from './pages/app/ProjectAnalytics';
import OverallAnalytics from './pages/app/OverallAnalytics';
import Login from './pages/app/Login';
import { AppContext } from './AppContext';

function App() {

  useEffect(() => {
    AOS.init();
  }, [])

  const [projects, setProjects] = useState([]);

  const values = {
    projects,
    setProjects
  }
  


  
  return (
    <AppContext.Provider value={values}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />        
          <Route path='/about' element={<About/>} />        
          <Route path='/register' element={<Register/>} />        
          <Route path='/contact' element={<ContactUs/>} /> 

          <Route path="/login" element={<Login/>}/>

          <Route path='' element={<MainApp/>}>
            <Route path='/monitoring' element={<Monitoring/>}/>
            <Route path='/analytics' element={<ProjectAnalytics/>}/>
            <Route path='/overall-analytics' element={<OverallAnalytics/>}/>
          </Route>       

        </Routes>
        
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
