import { useEffect } from 'react'
import AOS from 'aos'
// import HeroSection from './HeroSection'
// import MiningVehiclesSection from './MiningVehiclesSection'
// import GpsTrackingSection from './GpsTrackingSection'
// import EPermitSection from './EPermitSection'
// import WhyChooseUsSection from './WhyChooseUsSection'
// import SolutionsSection from './SolutionsSection'
// import FeaturesSection from './FeaturesSection'
// import FooterBanner from './FooterBanner'
import Mining from './Mining'
import './Landingpage2.css'

function App({data}) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false
    })
  }, [])

  return (
    <div className="app-container">
      {/* <HeroSection stateData={data}/>
      <MiningVehiclesSection stateData={data}/>
      <GpsTrackingSection stateData={data}/>
      <EPermitSection stateData={data}/>
      <WhyChooseUsSection stateData={data}/>
      <SolutionsSection stateData={data}/>
      <FeaturesSection stateData={data}/>
      <FooterBanner stateData={data}/> */}
      <Mining />
    </div>
  )
}

export default App