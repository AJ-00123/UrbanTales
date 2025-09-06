import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Bell,
  User as UserIcon,
  Search as SearchIcon,
  LogOut,
  UserCircle2,
  PackageSearch,
} from "lucide-react"; // lucide-react icons
import urbanTalesLogo from "../assets/UrbanTales.png"; // your logo path

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Fashion",
    href: "/category?cat=fashion",
    links: ["Men", "Women", "Kids", "Accessories", "Luggages"],
  },
  {
    label: "Electronics",
    href: "/category?cat=electronic",
    links: ["Laptops", "Tablets", "Cameras", "Headphones", "Smartwatches"],
  },
  {
    label: "Home & Furniture",
    href: "/category?cat=furniture",
    links: ["Living Room", "Bedroom", "Kitchen", "Office", "Outdoor"],
  },
  { label: "Appliances", href: "/category?cat=kitchen" },
  {
    label: "Toys",
    href: "/category?cat=toys",
    links: ["Action Figures", "Dolls", "Puzzles", "Board Games"],
  },
  { label: "Cosmetics", href: "/category?cat=cosmetic" },
  { label: "Kilos", href: "/category?cat=food" },
  { label: "Sports", href: "/category?cat=sports" },
];

// Helper
const getCatFromHref = (href = "") => {
  const m = href.match(/cat=([^&#]+)/i);
  return m ? decodeURIComponent(m[1]) : undefined;
};

// Utility
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ---- ProfileMenu ----
function ProfileMenu({ user, onLogin, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-2">
      {/* Show User Name */}
      {user && user.name && (
        <span className="text-gray-800 font-medium hidden sm:inline">
          Hi, {user.name}
        </span>
      )}

      {/* Avatar Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#070A52] hover:scale-105 transition overflow-hidden"
      >
        {user && user.profileImage ? (
          <img
            src={user.profileImage}
            alt="User avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <UserIcon className="w-5 h-5 text-white" strokeWidth={2} />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg p-1 text-sm text-gray-700 z-50">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <UserCircle2 className="w-4 h-4" /> Profile
              </Link>
              <Link
                to="/trackorder"
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <PackageSearch className="w-4 h-4" /> Orders
              </Link>
              <button
                type="button"
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-left"
                onClick={() => {
                  setOpen(false);
                  onLogout?.();
                }}
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-left"
              onClick={() => {
                setOpen(false);
                onLogin?.();
              }}
            >
              <UserCircle2 className="w-4 h-4" /> Login / Sign Up
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ---- DesktopCategory ----
function DesktopCategory({ item }) {
  const hasSubs = Array.isArray(item.links) && item.links.length > 0;
  const baseCat = getCatFromHref(item.href);

  return (
    <li className="relative group">
      <NavLink
        to={item.href || "#"}
        className={({ isActive }) =>
          cn(
            "px-1 py-0.5 transition-colors duration-150 flex items-center gap-1",
            isActive ? "text-yellow-300" : "text-white hover:text-yellow-300"
          )
        }
      >
        {item.label}
        {hasSubs && <span aria-hidden="true">▾</span>}
      </NavLink>
      {hasSubs && (
        <ul className="absolute left-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg z-50 py-2 px-3 min-w-[12rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {item.links.map((sub, subIdx) => (
            <li key={subIdx} className="py-1 px-1 rounded">
              <Link
                to={`/category?cat=${encodeURIComponent(
                  baseCat ?? ""
                )}&sub=${encodeURIComponent(sub)}`}
                className="block w-full rounded px-2 py-1 hover:bg-[#070A52] hover:text-white"
              >
                {sub}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

// ---- SearchBar ----
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    if (onSearch) onSearch(q);
    else navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={submit} className="relative w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products, categories, or ideas..."
        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#070A52] focus:border-[#070A52]"
      />
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-white bg-[#070A52] hover:bg-[#0A0F6D] px-3 py-1 rounded-full"
      >
        Go
      </button>
    </form>
  );
}

// ---- Badge ----
function Badge({ count }) {
  if (!count || count <= 0) return null;
  const display = count > 99 ? "99+" : String(count);
  return (
    <span className="absolute -top-1 -right-1 min-w-[1.125rem] h-4 px-1 rounded-full bg-red-600 text-[10px] leading-4 text-white text-center font-bold">
      {display}
    </span>
  );
}

// ---- Navbar ----
const Navbar = ({ cartCount, onSearch }) => { // Removed notificationCount from props as it's handled internally
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentNotificationCount, setCurrentNotificationCount] = useState(0); // Internal state for notification count

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (storedUser && token) setUser(storedUser);

    // --- NEW: Set up an interval to continuously check localStorage for notification updates ---
    const checkNotifications = () => {
      const storedCount = Number(localStorage.getItem("notificationCount") || 0);
      if (storedCount !== currentNotificationCount) {
        setCurrentNotificationCount(storedCount);
      }
    };

    // Run once immediately
    checkNotifications();

    // Set up interval to run every 1 second (1000ms)
    const intervalId = setInterval(checkNotifications, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, [currentNotificationCount]); // currentNotificationCount in dependency array ensures effect reruns if its value changes

  const cartQty = cartCount || Number(localStorage.getItem("cartCount") || 0);
  // Use the internal state for notification quantity
  const notifQty = currentNotificationCount;

  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md font-inter px-6">
      {/* Top Row */}
      <div className="h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <img
          src={urbanTalesLogo}
          alt="UrbanTales logo"
          className="h-16 w-auto object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Search */}
        <div className="flex-1 flex justify-center">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <ProfileMenu user={user} onLogin={handleLogin} onLogout={handleLogout} />

          {/* Cart */}
          <Link
            to="/cartpage"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-white bg-[#070A52] hover:scale-105 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <Badge count={cartQty} />
          </Link>

          {/* Notifications */}
          <Link
            to="/notifications"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-white bg-[#070A52] hover:scale-105 transition"
          >
            <Bell className="w-5 h-5" />
            <Badge count={notifQty} /> {/* Now uses the dynamically updated notifQty */}
          </Link>
        </div>
      </div>

      {/* Desktop Category Bar */}
      <div className="pb-3">
        <div className="bg-[#070A52] text-white text-center py-2 px-4 rounded-full font-semibold shadow-md">
          <ul className="flex flex-wrap justify-center items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <DesktopCategory key={item.label} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
