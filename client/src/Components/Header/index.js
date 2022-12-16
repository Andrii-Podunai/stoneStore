import './style.scss';
import { Link } from 'react-router-dom';

import logo from './logo.png';

function Header() {
  return (
    <header className="Header">
      <div className="Header-logo">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" className="card-img" />
        </Link>
      </div>
      <div className="Header-nav">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <div className="Header-nav--btn">
          <Link to="/" className="linkLog">
            <button type="button" className="btn btn-outline-success">
              Log in
            </button>
          </Link>
          <Link to="/" className="linkReg">
            <button type="button" className="btn btn-outline-success">
              Registration
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
