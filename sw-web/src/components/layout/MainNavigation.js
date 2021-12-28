import { useState } from 'react';
import { Link } from 'react-router-dom';
import StarWarsIcon from './StarWarsIcon';

const MainNavigation = () => {
  const [isMenuActiveMobile, setIsMenuActiveMobile] = useState(false);

  const burgerClickHandler = () => {
    setIsMenuActiveMobile(!isMenuActiveMobile);
  };

  return (
    <nav className="navbar" style={{ minHeight: 'unset' }}>
      <div className="container">
        <div className="navbar-brand " style={{ height: '9vh' }}>
          <Link className="navbar-item" to="/">
            <StarWarsIcon width="100%" height="9vh" />
          </Link>
          <button
            type="button"
            onClick={burgerClickHandler}
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMenu"
            style={{ height: '100%' }}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <div id="navbarMenu" className={`navbar-menu ${isMenuActiveMobile ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link className="navbar-item " to="/upcoming-books">
              Upcoming books
            </Link>
            {/* <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Account</a>
              <div class="navbar-dropdown">
                <a class="navbar-item">Dashboard</a>
                <a class="navbar-item">Profile</a>
                <a class="navbar-item">Settings</a>
                <hr class="navbar-divider"/>
                <div class="navbar-item">Logout</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default MainNavigation;
