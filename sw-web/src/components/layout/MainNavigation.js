import { Link } from 'react-router-dom';
import StarWarsIcon from './StarWarsIcon';

const MainNavigation = () => (
  <nav className="navbar" style={{ minHeight: 'unset', height: '12vh' }}>
    <div className="container">
      <div className="navbar-brand ">
        <Link className="navbar-item" to="/">
          <StarWarsIcon width="100%" height="15vh" />
        </Link>
        <button
          type="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div id="navbarMenu" className="navbar-menu">
        <div className="navbar-end">
          <Link className="navbar-item " to="/future-books">
            Future books
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
export default MainNavigation;
