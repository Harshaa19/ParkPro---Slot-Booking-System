import React from 'react'
import Navbar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import Testimonial from '../components/Testimonal'
import WorkingSteps from '../components/WorkingSteps'
import Footer from '../components/Footer'
import BottomFooter from '../components/BottomFooter'
import FeaturedParkingSpots from '../components/FeaturedParkingSpots'

const HomePage = () => {
  return (
    <>
        <Navbar/>
        <HeroSection/>
        <FeaturedParkingSpots/>
        <Testimonial/>
        <WorkingSteps/>
        <Footer/>
        <BottomFooter/>
    </>
  )
}

export default HomePage
