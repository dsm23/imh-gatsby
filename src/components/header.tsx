import React, { FunctionComponent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'gatsby';
import { useClickAway } from 'react-use';
import { WindowLocation } from '@reach/router';

import styles from './header.module.scss';

interface Props {
  slug: WindowLocation['pathname'];
}

const Header: FunctionComponent<Props> = ({ slug }) => {
  const [isNavOpen, setNavOpen] = useState<boolean>(false);
  const [isDropDownOpen, setDropDownOpen] = useState<boolean>(false);

  const refDropDown = useRef<HTMLLIElement>(null);

  useClickAway(refDropDown, () => {
    setDropDownOpen(false);
  });

  const toggleNav = () => setNavOpen(isOpen => !isOpen);

  const toggleDropDown = () => setDropDownOpen(isOpen => !isOpen);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <Link className="navbar-brand" to="/">
          IMH
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
          aria-controls="fixedNavBar"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={clsx('navbar-collapse', { collapse: !isNavOpen })}
          id="fixedNavBar"
        >
          <ul className="navbar-nav ml-auto">
            {[
              {
                href: '/about/',
                text: 'About',
              },
              {
                href: '/contact/',
                text: 'Contact',
              },
              {
                href: '/technical-help/',
                text: 'Technical Help',
              },
            ].map(({ href, text }) => (
              <li
                className={clsx('nav-item', { active: slug === href })}
                key={text}
              >
                <Link className="nav-link" to={href}>
                  {text}
                  {slug === href && <span className="sr-only">(current)</span>}
                </Link>
              </li>
            ))}

            <li className="nav-item dropdown" ref={refDropDown}>
              <a
                className="nav-link dropdown-toggle"
                onClick={toggleDropDown}
                role="button"
                aria-haspopup="true"
                aria-expanded={isDropDownOpen}
              >
                Products and Services
              </a>
              <div className={clsx('dropdown-menu', { show: isDropDownOpen })}>
                <h6 className={clsx('dropdown-header', styles.brightBlue)}>
                  Products
                </h6>
                {[
                  {
                    href: '/dent/',
                    text: 'Dent Instruments',
                  },
                  {
                    href: '/dranetz/',
                    text: 'Dranetz',
                  },
                  {
                    href: '/electrotek/',
                    text: 'Electrotek Systems',
                  },
                  {
                    href: '/powerside/',
                    text: 'Powerside',
                  },
                ].map(({ href, text }) => (
                  <Link
                    className={clsx('dropdown-item', { active: slug === href })}
                    key={text}
                    href={href}
                  >
                    {text}
                  </Link>
                ))}

                <div className="dropdown-divider" />
                <h6 className={clsx('dropdown-header', styles.brightBlue)}>
                  Services
                </h6>
                <Link
                  className={clsx('dropdown-item', {
                    active: slug === '/consulting-from-imh/',
                  })}
                  to="/consulting-from-imh/"
                >
                  Consultancy from IMH
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
