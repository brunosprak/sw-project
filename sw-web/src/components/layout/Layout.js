import MainNavigation from './MainNavigation';

const Layout = (props) => (
  <>
    <MainNavigation />
    <main>{props.children}</main>
  </>
);

export default Layout;
