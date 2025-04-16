import { NavLink, useLocation } from "react-router-dom";
import { PagesEnum } from "../../routes";
import "./index.css";
import Avatar from "../Avatar/Avatar";
import { Container, Nav, NavItem } from "react-bootstrap";

const Nav2 = () => {
  const location = useLocation();

  const navItems = [
    { path: PagesEnum.Orders, label: "Orders" },
    { path: PagesEnum.Products, label: "Products" },
  ];

  const isActive = (path: string) => {
    console.log("path", path);
    console.log("location.pathname", location.pathname);
    console.log("location.pathname == path; ", location.pathname == path);
    return location.pathname == path;
  };

  return (
    <Container className="sidebar-container">
      <Avatar />

      <Nav className="mt-3 d-flex justify-content-center">
        {navItems.map((page) => (
          <NavItem className="mt-2" key={page.path}>
            <NavLink
              to={page.path}
              className={`nav-link ${
                isActive(page.path) ? "nav-link-active" : ""
              }`}
            >
              {page.label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Container>
  );
};

export default Nav2;
