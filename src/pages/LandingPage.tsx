import { useState } from 'react';
import { Link } from 'react-router-dom';
import adventLogo from '@/assets/advent-logo.png';
import { Phone, Mail } from 'lucide-react';
import AuthDialog from '@/components/AuthDialog';

const LandingPage = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');

  const openLogin = () => { setAuthTab('login'); setAuthOpen(true); };
  const openSignup = () => { setAuthTab('signup'); setAuthOpen(true); };

  return (
    <>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} defaultTab={authTab} />
      <div className="min-h-screen bg-[#f0f0f0] flex flex-col overflow-hidden">
        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 md:px-12 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <img src={adventLogo} alt="Advent Management & Consulting Services" className="h-10 w-10 sm:h-14 sm:w-14 object-contain" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={openLogin}
              className="px-3 sm:px-6 py-1.5 sm:py-2 rounded border border-[#5b6abf] text-[#5b6abf] text-xs sm:text-sm font-medium hover:bg-[#5b6abf] hover:text-white transition-colors">
              Log in
            </button>
            <button
              onClick={openSignup}
              className="px-3 sm:px-6 py-1.5 sm:py-2 rounded border border-[#5b6abf] text-[#5b6abf] text-xs sm:text-sm font-medium hover:bg-[#5b6abf] hover:text-white transition-colors">
              Register
            </button>
          </div>
        </header>

      {/* Hero Section */}
      <main className="relative flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)] md:min-h-0 md:py-[240px] px-4">
        {/* Decorative Circles */}
        <div className="absolute top-[-20px] sm:top-[-40px] left-[10%] sm:left-[15%] w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-[#5b6abf] opacity-80" />
        <div className="absolute top-[10%] right-[3%] sm:right-[5%] w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#5b6abf] opacity-60" />
        <div className="absolute bottom-[15%] right-[15%] sm:right-[25%] w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-[#5b6abf] opacity-70" />
        <div className="absolute bottom-[5%] left-[5%] sm:left-[10%] w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-[#5b6abf] opacity-50" />
        <div className="hidden sm:block absolute top-[40%] left-[-20px] w-12 h-12 rounded-full bg-[#5b6abf] opacity-40" />

        <h1 className="relative z-10 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#333] text-center leading-tight italic font-serif">
          Smarter Dashboards<br />Faster Decisions
        </h1>
        <Link
          to="/dashboard"
          className="relative z-10 mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#5b6abf] text-white text-sm sm:text-base font-medium hover:bg-[#4a59ae] transition-colors">
          Get Started
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-[#4a4a4a] text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-8 px-4 sm:px-6 md:px-16 py-4 sm:py-6 md:py-10">
          {/* About Us */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-xs sm:text-sm md:text-lg font-bold mb-1.5 sm:mb-2 md:mb-4 underline underline-offset-4">About Us</h3>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-300 leading-relaxed">
              Advent is an HR solutions providing company that enjoys a long list of satisfied clients across the country. We home a competent team of professionals, which include retired senior government officials, chartered accountants, company secretaries, senior advocates, and industry experts.
            </p>
            <div className="flex items-center gap-2 mt-2 sm:mt-3 md:mt-5">
              <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 underline underline-offset-4">Support</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 underline underline-offset-4">Contact Us</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 8838658389</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>support@adventmcs.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-3 text-xs sm:text-sm text-white border-white bg-[#454545]">
          Copyrights @2026 Advent. All Rights Reserved
        </div>
      </footer>
      </div>
    </>
  );
};

export default LandingPage;