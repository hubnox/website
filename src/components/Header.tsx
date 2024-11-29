import { useState } from "react";

interface HeaderProps {
  onRequestAccess: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRequestAccess }) => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const toggleNav = (): void => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="w-full">
      <div className=" max-w-[1266px] flex flex-row items-center justify-between pr-6 pl-6">
        <a href="/" className="w-[20%]">
          <img
            src="/assets/images/logo-main.svg"
            alt="main-logo"
            aria-hidden="true"
          />
        </a>
        <nav
          className={`flex  flex-row  items-center justify-center mr-10 text-center lg:w-[700px]   ${
            isNavOpen ? "active" : ""
          }`}
        >
          <a href="#events" onClick={toggleNav}>
            Events
          </a>
          <a href="#creators" onClick={toggleNav}>
            Creators
          </a>
          <a href="#our-creators" onClick={toggleNav}>
            Create event
          </a>
          <a href="#about-us" onClick={toggleNav}>
            About us
          </a>
          <button onClick={onRequestAccess} className="custom-button only-for-mobile">
            Become a member
          </button>
          {/* Add primary variant */}
        </nav>
        <a
          href="#become-a-member"
          className="custom-button btn--primary hidden lg:inline-flex"
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
      </div>
    </header>
  );
};

export default Header;
