import './style.scss';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import logo from './logo.png';

function Header() {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  return (
    <header className="Header">
      <div className="Header-container">
        <div className="Header-logo">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="logo" className="card-img" />
          </Link>
        </div>
        <div className="Header-nav d-flex align-items-center">
          <form className="d-flex me-5" role="search">
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
          {isAuthenticated === true ? (
            <>
              <span className="me-1">{user.name}</span>
              <button onClick={logout} type="button" className="btn btn-outline-success">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="linkLog me-1">
                <button
                  onClick={loginWithRedirect}
                  type="button"
                  className="btn btn-outline-success">
                  Log in
                </button>
              </Link>
              <Link to="/" className="linkLog me-2">
                <button
                  onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                  type="button"
                  className="btn btn-outline-success">
                  Registration
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
