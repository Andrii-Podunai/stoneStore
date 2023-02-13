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
            <div className="header-nav navbar">
              <Link to="/create" className="create-btn btn btn-warning me-4">
                Створити оголошення
              </Link>
              {user.sub === process.env.REACT_APP_ADMIN && (
                <Link to="/admin" className="create-btn btn btn-warning me-4">
                  Адмін панель
                </Link>
              )}

              <Link to="/profile" className="linkLog me-1">
                <img
                  src={user.picture}
                  alt={user.given_name}
                  className="rounded-circle"
                  width="45"
                />
              </Link>

              <button onClick={logout} type="button" className="btn btn-outline-success">
                Вийти
              </button>
            </div>
          ) : (
            <div className="header-nav navbar">
              <Link to="/create" className="create-btn btn btn-warning me-4">
                Створити оголошення
              </Link>
              <button
                onClick={loginWithRedirect}
                type="button"
                className="btn btn-outline-success me-1">
                Логін
              </button>
              <button
                onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                type="button"
                className="btn btn-outline-success ms-1">
                Реєстрація
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
