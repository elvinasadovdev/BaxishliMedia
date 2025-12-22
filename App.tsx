
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlatformBar } from './components/PlatformBar';
import { About } from './components/About';
import { Services } from './components/Services';
import { Partners } from './components/Partners';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CMSProvider } from './components/CMSContext';
import { AdminPanel } from './components/AdminPanel';
import { ScrollToTop } from './components/ScrollToTop';
import { ModalProvider } from './components/ModalContext';
import { ContactModal } from './components/ContactModal';

// Landing Page Component: Renders all sections
const LandingPage = () => (
  <>
    <Hero />
    <About />
    <Services />
    <Blog />
    <PlatformBar />
  </>
);

const App: React.FC = () => {
  return (
    <CMSProvider>
      <ModalProvider>
        <Router>
          <ScrollToTop />
          <div className="bg-white min-h-screen text-gray-800 flex flex-col">
            <Navbar />
            <ContactModal />
            <main className="flex-grow">
              <Routes>
                {/* Home route renders everything */}
                <Route path="/" element={<LandingPage />} />

                {/* Individual routes render specific sections with extra padding for navbar */}
                <Route path="/about" element={<div className="pt-20"><About /></div>} />
                <Route path="/services" element={<div className="pt-20"><Services /></div>} />
                <Route path="/partners" element={<div className="pt-20"><Partners /></div>} />
                <Route path="/blog" element={<div className="pt-20"><Blog /></div>} />
                <Route path="/contact" element={<div className="pt-20"><Contact /></div>} />

                {/* Admin CMS Panel Route */}
                <Route path="/admin" element={<div />} />
              </Routes>
            </main>
            <Footer />
            <AdminPanel />
          </div>
        </Router>
      </ModalProvider>
    </CMSProvider>
  );
};

export default App;
