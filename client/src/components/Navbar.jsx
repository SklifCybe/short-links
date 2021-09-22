import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../store/actions/auth';

export const Navbar = () => {
  const dispatch = useDispatch();

  const exitHandler = (event) => {
    event.preventDefault();

    dispatch(logout());
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-4">
        <span className="brand-logo">Short Link</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={exitHandler}>
              Exit
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
