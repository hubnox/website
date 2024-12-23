import { Link } from "react-router-dom";
import logo from '../assets/images/logo-main.svg';
import tiktok from '../assets/icons/icon-tiktok.webp';
import instagram from "../assets/icons/icon-insta.svg";

const Footer: React.FC = () => {
  return (
    <footer className="section-padding-sm">
      <div className="custom-container flex flex-col justify-between items-start gap-[20px] blg:flex-row blg:items-center">
        <div>
          <Link to="/" className="brand">
            <img
              src={logo}
              alt="logo"
              aria-hidden="true"
            />
          </Link>
          <p>Follow us on social media</p>
          <div className="social-links">
            <a href="https://www.instagram.com/hubnoxusa/?hl=en" target="_blank" rel="noopener noreferrer">
              <img
                src={instagram}
                alt="Instagram"
                aria-hidden="true"
              />
            </a>
            <a href="https://www.tiktok.com/@hubnox" target="_blank" rel="noopener noreferrer">
              <img
                src={tiktok}
                alt="TikTok"
                aria-hidden="true"
                style={{ maxWidth: "40px" }}
              />
            </a>
          </div>
        </div>

        <div>
          <nav>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms">Terms of use</Link>
          </nav>
        </div>

        <div className="newsletter">
          <h4 className="h4">Subscribe to our newsletter</h4>
          <p>
            Subscribe to our daily newsletter to receive news and promos about
            our platform.
          </p>
          <form action="https://hubnox.us17.list-manage.com/subscribe/post?u=b08dfd24a25c13eff59b2c620&amp;id=2af77422b6&amp;f_id=00c52ce1f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_self" className="validate">
            <input
              className="text-black"
              type="email"
              placeholder="Enter your email address"
              required
            />
            <button type="submit" className="custom-button">
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
