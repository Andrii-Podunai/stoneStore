import './style.scss';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import logo from './logo.png';

function Header() {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  return (
    <header className="Header">
      <div className="Header-container container d-flex flex-column navbar flex-md-row justify-content-md-between">
        <Link to="/" className="navbar-brand m-0">
          <img src={logo} alt="VtorMall" className="card-img" style={{ width: '280px' }} />
        </Link>
        <div className="Header-nav">
          {isAuthenticated === true ? (
            <div className="navbar">
              <Link to="/create" className="btn btn-warning me-4">
                Створити оголошення
              </Link>
              <span className="me-1">{user.name}</span>
              <button onClick={logout} type="button" className="btn btn-outline-success">
                Log Out
              </button>
            </div>
          ) : (
            <div className="navbar">
              <Link to="/create" className="btn btn-warning me-4">
                Створити оголошення
              </Link>
              <button
                onClick={loginWithRedirect}
                type="button"
                className="btn btn-outline-success me-1">
                Log in
              </button>
              <button
                onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                type="button"
                className="btn btn-outline-success ms-1">
                Registration
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
