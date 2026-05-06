import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import TopNav from './components/site/TopNav'
import HeroVideo from './components/site/HeroVideo'
import Pillars from './components/site/Pillars'
import Process from './components/site/Process'
import DarkContext from './components/site/DarkContext'
import Stats from './components/site/Stats'
import Footer from './components/site/Footer'
import RecallTicker from './components/site/RecallTicker'

import AlternatorsPage from './pages/AlternatorsPage'
import BoostersPage from './pages/BoostersPage'
import BrakePadsRotorsPage from './pages/BrakePadsRotorsPage'
import CalipersPage from './pages/CalipersPage'
import MasterCylindersPage from './pages/MasterCylindersPage'
import StartersPage from './pages/StartersPage'
import WheelHubsPage from './pages/WheelHubsPage'
import SearchPage from './pages/SearchPage'

function HomePage() {
  return (
    <div className="min-h-screen bg-black font-sans text-white selection:bg-[#ff8a4a]/30 selection:text-white">
      <TopNav />
      <main>
        <HeroVideo />
        <Pillars />
        <Process />
        <DarkContext />
        <Stats />
        <RecallTicker />
      </main>
      <Footer />
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/alternators" element={<AlternatorsPage />} />
      <Route path="/starters" element={<StartersPage />} />
      <Route path="/calipers" element={<CalipersPage />} />
      <Route path="/master-cylinders" element={<MasterCylindersPage />} />
      <Route path="/brake-pads-rotors" element={<BrakePadsRotorsPage />} />
      <Route path="/boosters" element={<BoostersPage />} />
      <Route path="/wheel-hubs" element={<WheelHubsPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
    </>
  )
}

export default App
