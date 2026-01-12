import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserMd,
  FaRegCalendarAlt,
  FaPhoneAlt,
  FaBars,
  FaTimes,
  FaHeartbeat,
} from "react-icons/fa";
import { HiOutlineHome, HiOutlineDocumentText } from "react-icons/hi";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", icon: <HiOutlineHome /> },
    { name: "Doctors", icon: <FaUserMd /> },
    { name: "Services", icon: <FaHeartbeat /> },
    { name: "Blog", icon: <HiOutlineDocumentText /> },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-center transition-all duration-300 ${
          scrolled ? "pt-2" : "pt-4 md:pt-6"
        }`}
      >
        <nav className="relative flex w-full max-w-7xl items-center justify-between px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/70 px-3 py-2 shadow-lg backdrop-blur-md transition-all md:px-5 md:py-2.5 ${
              scrolled ? "bg-white/90" : ""
            }`}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white md:h-8 md:w-8">
              <FaHeartbeat className="text-sm md:text-lg animate-pulse" />
            </div>

            <span className="text-base font-bold tracking-tight text-slate-800 sm:text-xl">
              PUI<span className="text-indigo-600">care</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden md:flex items-center gap-1 rounded-full border border-white/20 bg-white/60 p-1.5 shadow-xl backdrop-blur-xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors lg:px-5 lg:py-2.5 ${
                  activeTab === link.name
                    ? "text-white"
                    : "text-slate-600 hover:text-indigo-600"
                }`}
              >
                {activeTab === link.name && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 z-[-1] rounded-full bg-indigo-600 shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="z-10 text-lg">{link.icon}</span>
                <span className="z-10 hidden lg:block">{link.name}</span>

                <span className="z-10 md:block lg:hidden">{link.name}</span>
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex shrink-0 items-center gap-2 md:gap-3"
          >
            <button className="hidden lg:flex items-center justify-center h-11 w-11 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors shadow-sm">
              <FaPhoneAlt className="text-sm" />
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all md:px-5 md:py-3"
            >
              <FaRegCalendarAlt />

              <span className="hidden min-[380px]:block lg:hidden">Book</span>
              <span className="hidden lg:block">Book Appointment</span>
            </motion.button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-slate-800 md:hidden"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </motion.div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-2 top-20 z-40 overflow-hidden rounded-3xl bg-white/95 border border-white/20 p-2 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center gap-4 rounded-2xl p-4 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl">
                    {link.icon}
                  </div>
                  <span className="font-bold">{link.name}</span>
                </a>
              ))}
              <div className="mt-2 h-px w-full bg-slate-100"></div>
              <button className="mt-2 w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white shadow-lg">
                Access Patient Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
