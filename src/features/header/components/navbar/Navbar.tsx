import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../auth/hooks/useAuth";
import { auth } from "../../../../auth/firebase";
import { signOut } from "firebase/auth";

interface NavbarProps {
  logo: string;
  bgColor?: string;
}

export default function Navbar({ logo, bgColor }: NavbarProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  // Disable scroll when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const heroLinkBase =
    "relative group uppercase tracking-wider font-medium transition-colors";
  const heroUnderline =
    "absolute left-0 -bottom-1 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full";

  const baseLinks: { label: string; to: string }[] = [
    { label: "Movies", to: "/journey" },
    { label: "TV Shows", to: "/stories" },
    { label: "Actors", to: "/about" },
  ];

  const handleNav = (to: string) => {
    navigate(to);
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.warn("Logout failed", err);
    }
  };

  return (
    <nav className={`w-full z-40 text-white ${bgColor} font-medium tracking-wide`}>
      <div className="relative w-full py-6 px-6 sm:px-10 lg:px-14">
        <div className="hidden md:grid grid-cols-5 items-center mx-auto w-full">
          <div className="flex justify-center">
            <button onClick={() => handleNav("/movies")} className={heroLinkBase}>
              <span className="group-hover:text-white/80 cursor-pointer">MOVIES</span>
              <span className={heroUnderline} />
            </button>
          </div>
          <div className="flex justify-center">
            <button onClick={() => handleNav("/movies")} className={heroLinkBase}>
              <span className="group-hover:text-white/80 cursor-pointer">TV SHOWS</span>
              <span className={heroUnderline} />
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => handleNav("/")}
              className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-md"
            >
              <img
                src={logo}
                alt="Logo"
                className="w-18 lg:w-26 h-auto drop-shadow-[0_0_10px_rgba(0,0,0,0.35)] hover:scale-[1.1] transition-transform ease-in-out duration-500"
              />
            </button>
          </div>
          <div className="flex justify-center">
            <button onClick={() => handleNav("/movies")} className={heroLinkBase}>
              <span className="group-hover:text-white/80 cursor-pointer">ACTORS</span>
              <span className={heroUnderline} />
            </button>
          </div>
            <div className="flex justify-center">
              {user ? (
                <button onClick={handleLogout} className={heroLinkBase}>
                  <span className="group-hover:text-white/80 cursor-pointer">LOGOUT</span>
                  <span className={heroUnderline} />
                </button>
              ) : (
                <button onClick={() => handleNav("/register")} className={heroLinkBase}>
                  <span className="group-hover:text-white/80 cursor-pointer">REGISTER</span>
                  <span className={heroUnderline} />
                </button>
              )}
            </div>
        </div>

        {/* Mobile / small screens (under md) */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Hamburger */}
          <button
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="flex flex-col w-9 h-9 items-center justify-center gap-[6px] group"
            onClick={() => setOpen(o => !o)}
          >
            <span
              className={`h-0.5 w-7 bg-white transition-all duration-300 origin-left ${
                open ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`h-0.5 w-7 bg-white transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-7 bg-white transition-all duration-300 origin-left ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
          {/* Logo */}
          <button onClick={() => handleNav("/")}> 
            <img src={logo} alt="Logo" className="w-18 h-auto" />
          </button>
          {/* Placeholder to keep symmetry with hamburger width */}
          <div className="w-9" />
        </div>

        {/* Mobile fullscreen menu */}
        <div
          className={`md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!open}
        >
          <div
            className={`absolute top-0 left-0 h-full w-3/4 max-w-xs bg-gradient-to-b from-[#0d253f]/95 via-[#121e2c]/95 to-black/90 shadow-xl transform transition-transform duration-300 ease-out ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between pl-8 px-6 pt-6 pb-4">
              <img
                src={logo}
                alt="Logo"
                className="w-18 cursor-pointer"
                onClick={() => handleNav("/")}
              />
              <button
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M6 18L18 6"
                  />
                </svg>
              </button>
            </div>
            <ul className="mt-2 flex flex-col gap-2 px-4">
              {baseLinks.map(l => (
                <li key={l.label}>
                  <button
                    onClick={() => handleNav(l.to)}
                    className="w-full text-left px-4 py-3 rounded-lg uppercase tracking-widest text-sm font-medium text-white/85 hover:bg-white/10 active:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 transition"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-lg uppercase tracking-widest text-sm font-semibold text-red-300 hover:bg-red-500/10 active:bg-red-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => handleNav("/register")}
                    className="w-full text-left px-4 py-3 rounded-lg uppercase tracking-widest text-sm font-semibold text-cyan-300 hover:bg-cyan-500/10 active:bg-cyan-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 transition"
                  >
                    Register
                  </button>
                )}
              </li>
            </ul>
            <div className="mt-auto absolute bottom-0 left-0 right-0 p-6 text-[10px] tracking-widest text-white/40">
              <p>© {new Date().getFullYear()} MovieApp</p>
            </div>
          </div>
        </div>

       
      </div>
    </nav>
  );
}
