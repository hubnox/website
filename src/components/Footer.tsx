import { Link } from "react-router-dom";

interface Props {
  handlePopupToggle: () => void;
}

const Footer: React.FC<Props> = ({handlePopupToggle}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <footer className="section-padding-sm">
      <div className="custom-container flex flex-col justify-between items-start gap-[20px] blg:flex-row blg:items-center">
        <div>
          <Link to="/" className="brand">
            <img
              src="./assets/images/logo-main.svg"
              alt="logo"
              aria-hidden="true"
            />
          </Link>
          <p>Follow us on social media</p>
          <div className="social-links">
            <a href="https://www.instagram.com/hubnoxusa/?hl=en">
              <img
                src="./assets/icons/icon-insta.svg"
                alt="Instagram"
                aria-hidden="true"
              />
            </a>
            <a href="https://www.tiktok.com/@hubnox">
              <img
                src="./assets/icons/icon-tiktok.webp"
                alt="TikTok"
                aria-hidden="true"
                style={{ maxWidth: "40px" }}
              />
            </a>
          </div>
        </div>

        <div>
          <nav>
            <a href="/privacy">Privacy policy</a>
            <a href="/terms">Terms of use</a>
          </nav>
        </div>

        <div className="newsletter">
          <h4 className="h4">Subscribe to our newsletter</h4>
          <p>
            Subscribe to our daily newsletter to receive news and promos about
            our platform.
          </p>
          <form onSubmit={handleSubmit} className="validate">
            <input
              type="email"
              placeholder="Enter your email address"
              required
            />
            <button type="submit" className="custom-button" onClick={handlePopupToggle}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="custom-container copyright">
        <p>Hubnox 2024</p>
        <p>Copyright @2024</p>
      </div>
    </footer>
  );
};
export default Footer;
