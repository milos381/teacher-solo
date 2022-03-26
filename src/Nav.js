import React from 'react';
  import { Link } from 'react-router';

  export default class Nav extends React.Component {
    render() {    
      return (
        <nav className="Nav">
          <div className="Nav__container">
            <Link to="/" className="Nav__brand">
              <img src="logo.svg" className="Nav__logo" />
            </Link>

            <div className="Nav__right">
              <ul className="Nav__item-wrapper">
                <li className="Nav__item">
                  <Link className="Nav__link" to="/class">Class</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/teacher">Teacher</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
  }