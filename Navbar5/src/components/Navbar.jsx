import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaShoppingBag,
  FaPizzaSlice,
  FaIceCream,
  FaLeaf,
  FaArrowRight,
  FaHamburger,
} from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuLinks = [
    {
      id: 1,
      label: "Pizzas",
      sub: "Cheesy Blast",
      icon: <FaPizzaSlice />,
      color: "bg-orange-100 text-orange-600",
      accent: "bg-orange-500",
    },
    {
      id: 2,
      label: "Burgers",
      sub: "Juicy Grill",
      icon: <FaHamburger />,
      color: "bg-yellow-100 text-yellow-600",
      accent: "bg-yellow-500",
    },
    {
      id: 3,
      label: "Vegan",
      sub: "Pure Roots",
      icon: <FaLeaf />,
      color: "bg-green-100 text-green-600",
      accent: "bg-green-500",
    },
    {
      id: 4,
      label: "Asian",
      sub: "Spicy Wok",
      icon: <GiNoodles />,
      color: "bg-red-100 text-red-600",
      accent: "bg-red-500",
    },
    {
      id: 5,
      label: "Desserts",
      sub: "Ice Creams",
      icon: <FaIceCream />,
      color: "bg-pink-100 text-pink-600",
      accent: "bg-pink-500",
    },
  ];

  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center pt-4 px-4">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`relative flex w-full max-w-4xl items-center justify-between rounded-2xl px-3 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-white/90 shadow-xl shadow-slate-200 border border-slate-200/50 backdrop-blur-md"
              : "bg-white shadow-lg shadow-slate-200/50 border border-slate-100"
          }`}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="group flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-800 border border-slate-100 hover:bg-black hover:text-white transition-all"
          >
            <HiOutlineMenuAlt4 className="text-xl transition-transform group-hover:rotate-180" />
          </button>

          <div className="flex items-center gap-1">
            <span className="text-xl font-black tracking-tighter text-slate-800">
              PUI<span className="text-orange-500">Foods</span>.
            </span>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20 transition-transform hover:scale-105 active:scale-95">
            <FaShoppingBag className="text-sm" />
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
            />

            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed inset-y-0 left-0 z-50 flex flex-col w-full max-w-[380px] bg-white shadow-2xl overflow-hidden md:rounded-r-[3rem]"
            >
              <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />

              <div className="relative flex items-center justify-between px-6 pt-8 pb-2 shrink-0">
                <div>
                  <h2 className="text-2xl font-black text-slate-800">
                    Discover
                  </h2>
                  <p className="text-sm font-medium text-slate-400">
                    PUIFoods Menu
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                {menuLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href="#"
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredItem(link.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="group relative flex items-center justify-between rounded-[2rem] bg-slate-50 p-2 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 border border-transparent hover:border-slate-100"
                  >
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl transition-all ${link.color}`}
                    >
                      {link.icon}
                    </div>

                    <div className="flex flex-1 flex-col px-4">
                      <span className="text-lg font-bold text-slate-700 group-hover:text-slate-900">
                        {link.label}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-orange-500 transition-colors">
                        {link.sub}
                      </span>
                    </div>

                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-slate-100 transition-all group-hover:ring-0">
                      <span
                        className={`absolute transition-all duration-300 ${
                          hoveredItem === link.id
                            ? "opacity-0 scale-50"
                            : "opacity-100 scale-100 text-slate-300"
                        }`}
                      >
                        <FaArrowRight />
                      </span>
                      <span
                        className={`absolute inset-0 flex items-center justify-center text-white font-bold transition-all duration-300 ${
                          link.accent
                        } ${
                          hoveredItem === link.id
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-50"
                        }`}
                      >
                        GO
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="p-6 shrink-0 z-10 bg-gradient-to-t from-white via-white to-transparent">
                <motion.div
                  variants={itemVariants}
                  className="rounded-[2rem] bg-black p-6 text-white shadow-xl shadow-black/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase">
                        My Cart
                      </span>
                      <span className="text-xl font-bold">2 Items</span>
                    </div>
                    <span className="text-xl font-bold text-orange-400">
                      $24.50
                    </span>
                  </div>
                  <button className="mt-4 w-full rounded-2xl bg-orange-500 py-3 font-bold text-white transition-transform hover:scale-[1.02] active:scale-95">
                    Checkout
                  </button>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
