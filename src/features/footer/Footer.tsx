import Button from "../../components/Button/Button";
import { useAuth } from "../../auth/hooks/useAuth";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo/Logo";

export const Footer: React.FC = () => {
  const { user } = useAuth();

  return (
    <footer className="relative isolate bg-[url('@/assets/bg3.png')] bg-cover bg-center text-white py-8">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/85"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          <div className="flex flex-col justify-center items-center">
            <Logo width="w-28 lg:w-34 mt-1 cursor-pointer" styles="mb-6" />
            <Link to={user ? "/movies" : "/login"}>
              <Button variant="primary" styles="hover:text-black">
                {user ? (
                  <p>
                    Hello,{" "}
                    {user.displayName?.split(" ")[0] ||
                      (user.email ? user.email.split("@")[0] : "")}
                  </p>
                ) : (
                  <p>Get Started</p>
                )}
              </Button>
            </Link>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">The Basics</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#" className="hover:text-white ">
                  About MovieHorizon
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white ">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white ">
                  Support Forums
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white ">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#" className="hover:text-white ">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white ">
                  API Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white ">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white ">
                  DMCA Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="mr-7 md:mr-0">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#" className="hover:text-white ">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white ">
                  Movies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white ">
                  TV Shows
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white ">
                  About us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 w-full border-t border-white/15 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            © {new Date().getFullYear()} MovieHorizon. Juan Luis Rodriguez
            Chavarria.
          </p>
          <p className="tracking-widest uppercase text-[10px]">
            Explore • Discover • Enjoy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
