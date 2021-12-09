import StarWarsIcon from './StarWarsIcon';
import { Link } from 'react-router-dom';

const MainNavigation = () => {
  // return (
  //   <div className='container'>
  //     {' '}
  //     <nav class='level'>
  //       <p class='level-item has-text-centered'>
  //         <a class='link is-info'>Home</a>
  //       </p>
  //       <p class='level-item has-text-centered'>
  //         <a class='link is-info'>Menu</a>
  //       </p>
  //       <p class='level-item has-text-centered'>
  //         <img
  //           src='https://bulma.io/images/bulma-type.png'
  //           alt=''
  //           style={{ height: '30px' }}
  //         />
  //       </p>
  //       <p class='level-item has-text-centered'>
  //         <a class='link is-info'>Reservations</a>
  //       </p>
  //       <p class='level-item has-text-centered'>
  //         <a class='link is-info'>Contact</a>
  //       </p>
  //     </nav>
  //   </div>
  // );
  return (
    <nav className='navbar'>
      <div className='container'>
        <div className='navbar-brand'>
          <Link className='navbar-item' to='/home'>
            <StarWarsIcon />
          </Link>
          <button
            className='navbar-burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarMenu'
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </button>
        </div>
        <div id='navbarMenu' className='navbar-menu'>
          <div className='navbar-end'>
            <Link className='navbar-item is-active' to='/home'>
              Home
            </Link>
            <Link className='navbar-item ' to='/future-books'>
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
};

export default MainNavigation;
