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

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleNav = (id: string): void => {
    setIsNavOpen(!isNavOpen);
    handleScroll(id);
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
              <Link to="#events" onClick={() => toggleNav('events')}>
                Events
              </Link>
              <Link to="#creators" onClick={() => toggleNav('creators')}>
                Creators
              </Link>
              <Link to="#create-event" onClick={() => toggleNav('create-event')}>
                Create event
              </Link>
              <Link to="#about-us" onClick={() => toggleNav('about-us')}>
                About us
              </Link>
              <button onClick={handlePopupToggle} className="custom-button only-for-mobile">
                Become a member
              </button>
            </nav>
            <Link
              to="#become-a-member"
              className="custom-button btn--primary hidden lg:inline-flex hover:text-[#ee46bc]"
              onClick={() => toggleNav('become-a-member')}
            >
              Request access
            </Link>{" "}
            <button className="humberger" onClick={() => setIsNavOpen(!isNavOpen)}>
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
