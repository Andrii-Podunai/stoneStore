import './style.scss';
import logo from './logo.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="Footer navbar d-flex flex-column justify-content-center">
      <div className="Footer-container py-2 container d-flex flex-column justify-content-center text-center align-items-center flex-lg-row justify-content-lg-between">
        <Link to="/" className="navbar-brand m-0">
          <img src={logo} alt="Stone" className="card-img" style={{ width: '280px' }} />
        </Link>
        <div className="d-flex flex-column  flex-lg-row justify-content-lg-between">
          <Link to="/about" className="m-0 d-flex justify-content-start px-3">
            <h5 className="m-2">Про нас</h5>
          </Link>
          <Link to="/contacts" className="m-0 d-flex justify-content-start px-3">
            <h5 className="m-2">Контакти</h5>
          </Link>
          <Link to="/privacy-policy" className="m-0 d-flex justify-content-start px-3">
            <h5 className="m-2">Політика конфіденційності</h5>
          </Link>
        </div>
      </div>
      <h6 className="m-2 px-3"> © 2023 Copyright Stone. All rights reserved.</h6>
    </footer>
  );
}

export default Footer;
