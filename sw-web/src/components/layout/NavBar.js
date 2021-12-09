import StarWarsIcon from "./StarWarsIcon";

const NavBar = () => {
  return (
    <div class='columns'>
      <div class='column is-three-fifths is-offset-one-fifth'>
        <nav className='navbar' role='navigation' aria-label='main navigation '>
          <div className='navbar-brand'>
            <a class='navbar-item' href='/'>
              <StarWarsIcon />
            </a>

            <button
              class='navbar-burger'
              aria-label='menu'
              aria-expanded='false'
            >
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
            </button>
          </div>
          <nav class='navbar' role='navigation' aria-label='main navigation'>
            <div class='navbar-brand'></div>
            <div id='navbarBasicExample' class='navbar-menu'>
              <div class='navbar-start'>
                <a class='navbar-item' href="/">Home</a>
                <a class='navbar-item'  href="#!">Future books</a>
              </div>

            </div>
          </nav>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
