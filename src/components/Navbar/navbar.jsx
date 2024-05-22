import React, { useState } from 'react';
import './navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { IconMenu2, IconX } from "@tabler/icons-react";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setNav(!nav);
  };

  const navItems = ["Dashboard", "Important", "Completed", "In Progress"];

  const isActive = (path) => {
    return location.pathname === `/${path.toLowerCase().replace(" ", "")}`;
  };

  const isAuthenticated = false; // Example: replace this with your authentication logic

  return (
    <>
      <nav>
        {/* Mobile Navigation */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={toggleNav} className="mobile-navbar__close">
            <IconX width={30} height={30} />
          </div>
          <ul className="mobile-navbar__links">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  onClick={toggleNav}
                  to={`/${item.toLowerCase().replace(" ", "")}`}
                  className={isActive(item) ? "active-link" : ""}
                >
                  {item}
                </Link>
              </li>
            ))}
            {!isAuthenticated && (
              <li>
                <Link to="/login" onClick={toggleNav}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Desktop Navigation */}
        <div className='nav'>
          <div className="navbar">
            <div className="navbar__logo">
              <Link to="/dashboard" onClick={() => window.scrollTo(0, 0)}>
                <p>Task<span>manager</span></p>
              </Link>
            </div>
            <ul className="navbar__links">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "")}`}
                    className={isActive(item) ? "active-link" : ""}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="navbar__buttons">
              {isAuthenticated ? (
                <Link className="navbar__buttons__Logout" to="/">
                  Logout
                </Link>
              ) : (
                <Link className="navbar__buttons__Login" to="/login">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Icon */}
            <div className="mobile-hamb" onClick={toggleNav}>
              <IconMenu2 width={30} height={30} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;