import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo-main.svg";

interface HeaderProps {
  handlePopupToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handlePopupToggle }) => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const location = useLocation();
  const path = location.pathname.toString();
  const [showNav, setShowNav] = useState(path.includes('event') || path.includes('terms') || path.includes('privacy'));

  const toggleNav = (): void => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    setShowNav(path.includes('event') || path.includes('terms') || path.includes('privacy'));
  }, [location]);

  console.log('path', location.pathname, showNav);

  return (
    <header className="w-full">
      <div className=" max-w-[1216px] mx-auto flex flex-row items-center justify-between pr-6 pl-6">
        <Link to="/" className="w-[20%]">
          <img
            src={logo}
            alt="main-logo"
            aria-hidden="true"
          />
        </Link>
        {!showNav && (
          <>
            <nav
              className={`flex  items-center justify-center mr-10 text-center lg:w-[700px]   ${isNavOpen ? "active" : ""
                }`}
            >
              <a href="#events" onClick={toggleNav}>
                Events
              </a>
              <a href="#creators" onClick={toggleNav}>
                Creators
              </a>
              <a href="#create-event" onClick={toggleNav}>
                Create event
              </a>
              <a href="#about-us" onClick={toggleNav}>
                About us
              </a>
              <button onClick={handlePopupToggle} className="custom-button only-for-mobile">
                Become a member
              </button>
            </nav>
            <a
              href="#become-a-member"
              className="custom-button btn--primary hidden lg:inline-flex hover:text-[#ee46bc]"
            >
              Request access
            </a>{" "}
            <button className="humberger" onClick={toggleNav}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="white"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
