import "./Footer.scss";
import { Link } from "react-router-dom";
import linkedin from "../../images/linkedin.png";
import github from "../../images/github.png";

function Footer() {
  return (
    <div className="footer_container">
      <Link to="https://www.linkedin.com/in/israil-doukhaev-61a41a218/">
        <img className="footer_contact_logo" src={linkedin} alt="" />
      </Link>
      <Link to="https://github.com/TheTrikkster/I-Market">
        <img className="footer_contact_logo" src={github} alt="" />
      </Link>
      <a href="mailto:israilst67@gmail.com" className="footer_email">
        israilst67@gmail.com
      </a>
    </div>
  );
}

export default Footer;
