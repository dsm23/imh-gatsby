import React, { FunctionComponent, useRef, useState } from "react";
import { Link } from "gatsby";
import { useClickAway, useKey } from "react-use";
import { WindowLocation } from "@reach/router";

import Caret from "../svgs/caret-down";
import Cross from "../svgs/cross";
import Dropdown from "../dropdown";
import DropdownLink from "../dropdown-item";
import Hamburger from "../svgs/hamburger";
import MobileMenu from "../mobile-menu";
import NavLink from "../nav-link";

interface Props {
  slug: WindowLocation["pathname"];
}

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

const Header: FunctionComponent<Props> = ({ slug }) => {
  const [isNavOpen, setNavOpen] = useState<boolean>(false);
  const [isAnimating, setAnimating] = useState<boolean>(false);
  const [isDropDownOpen, setDropDownOpen] = useState<boolean>(false);

  const refDropDown = useRef<HTMLLIElement>(null);
  const refDivDropdown = useRef<HTMLDivElement>(null);

  useClickAway(refDropDown, () => {
    setDropDownOpen(false);
  });

  useClickAway(refDivDropdown, () => {
    setDropDownOpen(false);
  });

  useKey("Escape", () => setDropDownOpen(false));

  const toggleNav = () => setNavOpen((isOpen) => !isOpen);

  const toggleDropDown = async () => {
    setAnimating(true);
    await wait(100);
    setDropDownOpen((isOpen) => !isOpen);
  };

  const endAnimating = () => setAnimating(false);

  const navArr = [
    {
      href: "/about",
      text: "About",
    },
    {
      href: "/contact",
      text: "Contact",
    },
    {
      href: "/technical-help",
      text: "Technical Help",
    },
  ];

  const dropdownArr = [
    {
      href: "/dent",
      text: "Dent Instruments",
    },
    {
      href: "/dranetz",
      text: "Dranetz",
    },
    {
      href: "/electrotek",
      text: "Electrotek Systems",
    },
    {
      href: "/powerside",
      text: "Powerside",
    },
  ];

  return (
    <nav className="bg-linear-to-r from-purple-700 via-purple-800 to-purple-900 fixed w-full max-h-full top-0 z-10 opacity-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="shrink-0 flex items-center">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-white text-xl tracking-widest font-semibold leading-5 hover:text-white hover:font-bold hover:no-underline focus:outline-hidden focus:text-white focus:bg-indigo-700"
            >
              IMH
            </Link>
          </div>
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              {/* <!-- Mobile menu button --> */}
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-700 focus:outline-hidden focus:bg-indigo-700 focus:text-white transition duration-150 ease-in-out"
                onClick={toggleNav}
                aria-label="Main menu"
                aria-expanded="false"
              >
                {!isNavOpen && <Hamburger className="h-6 w-6" />}

                {isNavOpen && <Cross className="h-6 w-6" />}
              </button>
            </div>

            <div className="hidden md:ml-6 md:flex md:items-center">
              {navArr.map(({ href, text }) => (
                <NavLink
                  as={Link}
                  key={text}
                  to={href}
                  isActive={slug === href}
                >
                  {text}
                  {slug === href && <span className="sr-only">(current)</span>}
                </NavLink>
              ))}
              <div className="relative" ref={refDivDropdown}>
                <NavLink
                  as="button"
                  className="inline-flex justify-center"
                  onClick={toggleDropDown}
                  aria-haspopup="true"
                >
                  Products, Policies and Services{" "}
                  <Caret className="inline h-5 w-5" />
                </NavLink>
                {/* <!--
              Profile dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
                <Dropdown
                  className="w-full"
                  isOpen={isDropDownOpen}
                  isAnimating={isAnimating}
                  aria-expanded={isDropDownOpen}
                  onTransitionEnd={endAnimating}
                >
                  <h6 className="mx-4 mt-3 text-yellow-500 font-medium">
                    Products
                  </h6>
                  {dropdownArr.map(({ href, text }) => (
                    <DropdownLink
                      className="px-4 py-2"
                      key={text}
                      to={href}
                      isActive={slug === href}
                      role="menuitem"
                    >
                      {text}{" "}
                      {slug === href && (
                        <span className="sr-only">(current)</span>
                      )}
                    </DropdownLink>
                  ))}

                  <div className="mt-1 mx-4 border-t border-gray-200" />
                  <h6 className="mt-4 mx-4 text-yellow-500 font-medium">
                    Services
                  </h6>
                  <DropdownLink
                    className="px-4 py-2"
                    to="/consulting-from-imh"
                    role="menuitem"
                  >
                    Consultancy from IMH
                    {slug === "/consulting-from-imh" && (
                      <span className="sr-only">(current)</span>
                    )}
                  </DropdownLink>
                  <div className="mt-1 mx-4 border-t border-gray-200" />
                  <h6 className="mt-4 mx-4 text-yellow-500 font-medium">
                    Policies
                  </h6>
                  <DropdownLink
                    className="px-4 py-2"
                    to="/inclusion-policy"
                    role="menuitem"
                  >
                    Inclusion Policy
                    {slug === "/inclusion-policy" && (
                      <span className="sr-only">(current)</span>
                    )}
                  </DropdownLink>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  --> */}
      <MobileMenu className="overflow-y-auto md:hidden" open={isNavOpen}>
        <div className="mx-3 py-3 border-t border-gray-500" />
        <div className="px-2 pt-2 pb-3 sm:px-3">
          {navArr.map(({ href, text }) => (
            <NavLink
              as={Link}
              key={`${text}-mobile`}
              to={href}
              isActive={slug === href}
            >
              {text}
              {slug === href && <span className="sr-only">(current)</span>}
            </NavLink>
          ))}
        </div>
        <div className="mx-3 pt-4 pb-3 border-t border-gray-500" />
        <div className="mt-3 px-2 sm:px-3">
          <div className="px-3 text-yellow-500 font-medium">Products</div>
          {dropdownArr.map(({ href, text }) => (
            <NavLink
              as={Link}
              to={href}
              key={`${text}-mobile`}
              isActive={slug === href}
            >
              {text}
              {slug === href && <span className="sr-only">(current)</span>}
            </NavLink>
          ))}
        </div>
        <div className="mx-3 pt-4 pb-3 border-t border-gray-500" />
        <div className="mt-3 px-2 sm:px-3">
          <div className="px-3 text-yellow-500 font-medium">Services</div>
          <NavLink
            as={Link}
            to="/consulting-from-imh"
            isActive={slug === "/consulting-from-imh"}
          >
            Consultancy from IMH
            {slug === "/consulting-from-imh/" && (
              <span className="sr-only">(current)</span>
            )}
          </NavLink>
          <div className="mx-3 pt-4 pb-3 border-t border-gray-500" />
        </div>
        <div className="mt-3 px-2 sm:px-3">
          <div className="px-3 text-yellow-500 font-medium">Policies</div>
          <NavLink
            as={Link}
            to="/inclusion-policy"
            isActive={slug === "/inclusion-policy"}
          >
            Inclusion Policy
            {slug === "/inclusion-policy" && (
              <span className="sr-only">(current)</span>
            )}
          </NavLink>
        </div>
      </MobileMenu>
    </nav>
  );
};

export default Header;
