import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingBag,
  FiHeart,
  FiArrowRight,
  FiUser,
} from "react-icons/fi";

const NAV_LINKS = [
  { name: "New", href: "#" },
  { name: "Templates", href: "#" },
  { name: "Components", href: "#" },
  { name: "Accessories", href: "#" },
  { name: "Sale", href: "#", highlight: true },
];

const navVariants = {
  top: { borderRadius: "20px", padding: "0.75rem 1rem" },
  scrolled: { borderRadius: "0px", padding: "0.5rem 1rem" },
};

const sheetVariants = {
  hidden: { y: "100%" },
  show: { y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { y: "100%", transition: { duration: 0.3 } },
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }, [menuOpen]);

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-2 sm:px-4 pt-2">
        <motion.nav
          variants={navVariants}
          animate={scrolled ? "scrolled" : "top"}
          className="w-full max-w-7xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg flex items-center gap-3"
        >
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-bold">
              P
            </div>
            <span className="hidden sm:block font-semibold text-gray-900">
              PUI Shop
            </span>
          </div>

          <div className="hidden lg:flex flex-1 justify-center">
            <div className="relative flex bg-gray-100 rounded-full p-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.name)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full z-10 ${
                    link.highlight
                      ? "text-indigo-600"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {hovered === link.name && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 ml-auto">
            {mounted && (
              <motion.div
                initial={false}
                animate={{
                  width: searchOpen ? 180 : 0,
                  opacity: searchOpen ? 1 : 0,
                }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden hidden md:block"
              >
                <input
                  placeholder="Search"
                  className="w-full bg-gray-100 rounded-full px-3 py-2 text-sm outline-none"
                />
              </motion.div>
            )}

            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FiSearch />
            </button>

            <button className="hidden sm:flex p-2 rounded-full hover:bg-gray-100">
              <FiHeart />
            </button>

            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <FiShoppingBag />
              <span className="absolute top-1 right-1 w-3 h-3 bg-indigo-600 text-[8px] text-white rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 rounded-full bg-black text-white"
            >
              <FiMenu />
            </button>

            <button className="hidden lg:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
              Sign In
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={sheetVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-60 bg-white rounded-t-3xl pt-6 px-6"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 pointer-events-auto"
              >
                <FiX size={22} />
              </button>
            </div>

            <div className="space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 font-semibold"
                >
                  <span
                    className={
                      link.highlight ? "text-indigo-600" : "text-gray-900"
                    }
                  >
                    {link.name}
                  </span>
                  <FiArrowRight />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <FiUser /> Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
