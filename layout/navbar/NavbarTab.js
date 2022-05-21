const NavbarTab = ({ children, extraClass, isActive }) => (
  <div
    className={`c-navbar-tab c-navbar-tab--${extraClass} ${
      isActive ? "c-navbar-tab--active" : ""
    }`}
  >
    {children}
  </div>
);

export default NavbarTab;
