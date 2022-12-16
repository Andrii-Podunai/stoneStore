import './style.scss';
import logo from './logo.png';
function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer-container">
        <img src={logo} alt="logo" />
        <h3>© 2022 Copyright VtorMall. All rights reserved.</h3>
        <h3>Contacts</h3>
      </div>
    </footer>
  );
}
export default Footer;
