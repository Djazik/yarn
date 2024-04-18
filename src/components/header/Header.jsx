import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-info py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/create-user">
            CreateUser
          </NavLink>
          <NavLink className="nav-link" to="/all-user">
            All User
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
