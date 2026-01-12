import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiLayoutGridLine,
  RiBook3Line,
  RiSearchLine,
  RiUser3Line,
  RiNotification3Line,
  RiMenu4Line,
  RiCloseLine,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiArrowRightSLine,
  RiDownloadCloud2Line,
  RiCalendarEventLine,
  RiGroupLine,
} from "react-icons/ri";
import { IoSchoolOutline } from "react-icons/io5";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const primaryNav = [
    {
      id: "dashboard",
      label: "Dashboard",
      mobileLabel: "Home",
      icon: RiLayoutGridLine,
    },
    {
      id: "courses",
      label: "My Learning",
      mobileLabel: "Courses",
      icon: RiBook3Line,
      badge: true,
    },
  ];

  const secondaryNav = [
    { id: "resources", label: "Resources", icon: RiDownloadCloud2Line },
    { id: "community", label: "Community", icon: RiGroupLine },
    { id: "schedule", label: "Schedule", icon: RiCalendarEventLine },
  ];

  return (
    <>
      <nav className="hidden xl:flex fixed top-0 w-full z-50 bg-[#0f172a] border-b border-slate-800 h-20 items-center px-8 justify-between shadow-md">
        <div className="flex items-center gap-3 shrink-0 w-64">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <IoSchoolOutline className="text-white text-xl" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Learn<span className="text-indigo-400">Hub</span>
          </span>
        </div>

        <div className="flex items-center justify-center gap-1 flex-1 px-4">
          {[...primaryNav, ...secondaryNav].map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`flex items-center gap-2 text-sm font-medium transition-all px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === link.id
                  ? "text-white bg-slate-800"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4 shrink-0">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search..."
              className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-full pl-10 pr-4 py-2.5 w-64 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
            <RiSearchLine className="absolute left-3 top-3 text-slate-500 group-focus-within:text-indigo-400" />
          </div>

          <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full">
            <RiNotification3Line size={22} />
            <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-[#0f172a]" />
          </button>

          <div className="flex items-center gap-3 pl-2 border-l border-slate-700/50 cursor-pointer">
            <div className="text-right">
              <p className="text-sm font-medium text-white">Alex Johnson</p>
              <p className="text-xs text-slate-500">Student</p>
            </div>
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
              alt="User"
              className="h-10 w-10 bg-slate-800 rounded-full border border-slate-600"
            />
          </div>
        </div>
      </nav>

      <div className="xl:hidden fixed top-0 left-0 w-full h-16 bg-[#0f172a] border-b border-slate-800 z-50 flex items-center justify-between px-4 shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <IoSchoolOutline className="text-white text-sm" />
          </div>
          <span className="text-white font-bold text-lg">LearnHub</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:text-white hidden sm:block">
            <RiSearchLine size={22} />
          </button>

          <button className="p-2 text-slate-400 hover:text-white relative">
            <RiNotification3Line size={24} />
            <span className="absolute top-2 right-2.5 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-[#0f172a]" />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-white hover:bg-slate-800 rounded-lg"
          >
            <RiMenu4Line size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 xl:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-[85%] sm:w-87.5 bg-[#0B1120] border-l border-slate-800 z-70 xl:hidden flex flex-col shadow-2xl"
            >
              <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-[#0B1120]">
                <h2 className="text-white font-bold text-lg">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white"
                >
                  <RiCloseLine size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-8 bg-[#0B1120]">
                <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
                  <img
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
                    alt="User"
                    className="h-12 w-12 bg-slate-700 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-medium">Alex Johnson</h3>
                    <p className="text-xs text-slate-400">Student ID: 8821</p>
                  </div>
                </div>

                <div>
                  <div className="space-y-1">
                    {secondaryNav.map((item) => (
                      <button
                        key={item.id}
                        className="w-full flex items-center justify-between p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon
                            className="text-slate-500 group-hover:text-indigo-400"
                            size={20}
                          />
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </div>
                        <RiArrowRightSLine className="text-slate-600 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <button className="w-full flex items-center gap-3 p-3 text-slate-300 hover:bg-slate-800 rounded-lg">
                    <RiSettings4Line size={20} className="text-slate-500" />
                    <span className="text-sm font-medium">Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 text-rose-400 hover:bg-rose-500/10 rounded-lg mt-1">
                    <RiLogoutBoxRLine size={20} />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="xl:hidden">
        <div className="h-20" />
        <div className="fixed bottom-0 left-0 w-full bg-[#0f172a] border-t border-slate-800 z-40">
          <div className="flex justify-around items-center h-16 px-2">
            <MobileTab
              label="Home"
              icon={RiLayoutGridLine}
              isActive={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <MobileTab
              label="Courses"
              icon={RiBook3Line}
              badge
              isActive={activeTab === "courses"}
              onClick={() => setActiveTab("courses")}
            />
            <MobileTab
              label="Search"
              icon={RiSearchLine}
              isActive={activeTab === "search"}
              onClick={() => setActiveTab("search")}
            />
            <MobileTab
              label="Profile"
              icon={RiUser3Line}
              isActive={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const MobileTab = ({ label, icon: Icon, isActive, onClick, badge }) => (
  <button
    onClick={onClick}
    className="relative w-full h-full flex flex-col items-center justify-center gap-1 group"
  >
    {isActive && (
      <motion.div
        layoutId="activeTabMobile"
        className="absolute top-0 w-10 h-0.5 bg-indigo-500 rounded-b-full"
      />
    )}
    <div className="relative p-1 rounded-xl">
      <Icon
        size={24}
        className={isActive ? "text-indigo-400" : "text-slate-500"}
      />
      {badge && (
        <span className="absolute top-0 right-0 h-2 w-2 bg-emerald-500 rounded-full ring-2 ring-[#0f172a]" />
      )}
    </div>
    <span
      className={
        isActive
          ? "text-indigo-400 text-[10px]"
          : "text-slate-500 text-[10px] opacity-0 group-hover:opacity-100"
      }
    >
      {label}
    </span>
  </button>
);

export default Navbar;
