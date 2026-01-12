import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  FiBox,
  FiGrid,
  FiLayers,
  FiZap,
  FiCommand,
  FiGithub,
  FiArrowRight,
} from "react-icons/fi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("components");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const desktopNavItems = [
    { id: "docs", label: "Docs", href: "#" },
    { id: "components", label: "Components", href: "#" },
    { id: "templates", label: "Templates", href: "#" },
    { id: "pricing", label: "Pricing", href: "#" },
  ];

  const mobileNavItems = [
    { id: "home", icon: <FiGrid />, label: "Home" },
    { id: "components", icon: <FiLayers />, label: "UI" },
    { id: "actions", icon: <FiZap />, label: "Actions" },
    { id: "menu", icon: <FiCommand />, label: "Menu" },
  ];

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center pt-6 pointer-events-none">
        <motion.header
          className={`pointer-events-auto relative flex items-center justify-between px-2 py-2 rounded-full border border-white/10 shadow-[0_0_40px_-10px_rgba(124,58,237,0.3)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            scrolled
              ? "w-150 bg-[#0A0A0F]/90 backdrop-blur-xl"
              : "w-212.5 bg-[#0A0A0F]/70 backdrop-blur-lg"
          }`}
          layout
        >
          <div className="flex items-center gap-3 pl-4 pr-6 border-r border-white/5">
            <div className="relative flex items-center justify-center w-8 h-8 bg-linear-to-br from-violet-600 to-indigo-600 rounded-lg shadow-[0_0_15px_rgba(124,58,237,0.4)]">
              <FiBox className="text-white text-lg" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white font-sans">
              PUI
            </span>
          </div>

          <nav className="flex items-center gap-1">
            {desktopNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="relative px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors z-10"
                onMouseEnter={() => setActiveTab(item.id)}
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="desktop-nav-highlight"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 pl-6">
            <motion.button
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <FiGithub size={18} />
            </motion.button>
            <motion.button
              className="group relative px-5 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wide overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-violet-300 via-purple-300 to-violet-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-size-[200%_100%] animate-[gradient_3s_ease_infinite]" />
              <span className="relative z-10 flex items-center gap-1">
                Install{" "}
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </div>
        </motion.header>
      </motion.div>

      <div className="fixed top-4 left-4 right-4 z-50 md:hidden flex justify-between items-center">
        <motion.div
          className="flex items-center gap-3 px-3 py-2 bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-lg shadow-black/20"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-1.5 bg-linear-to-tr from-violet-600 to-indigo-600 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]">
            <FiBox className="text-white text-xs" />
          </div>
          <span className="font-bold text-white text-sm tracking-wide pr-1">
            PUI
          </span>
        </motion.div>

        <motion.div
          className="flex gap-2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button className="p-2.5 bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-full text-slate-400 hover:text-white shadow-lg">
            <FiGithub size={18} />
          </button>
          <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full shadow-lg shadow-white/10">
            Get Started
          </button>
        </motion.div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-auto">
        <motion.nav
          className="flex items-center gap-1 px-2 py-2 rounded-2xl bg-[#0F0F16]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/5"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {mobileNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative group"
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`relative p-3.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-dock-active"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/5 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10 text-xl">{item.icon}</span>

                  {isActive && (
                    <span className="absolute -top-1 right-0 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.nav>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
