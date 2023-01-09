import './style.scss';
import logo from './logo.png';

function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer-container py-2 container d-flex flex-column justify-content-center text-center align-items-center flex-lg-row justify-content-lg-between">
        <img src={logo} alt="VtorMall" style={{ width: '280px' }} />
        <h3 className="m-0 px-3"> © 2023 Copyright VtorMall. All rights reserved.</h3>
        <a href="mailto: contact@vtormall.com" className="m-0 link-light">
          contact@vtormall.com
        </a>
      </div>
    </footer>
  );
}
export default Footer;
