import React, { FunctionComponent, ButtonHTMLAttributes } from "react";
import cx from "clsx";
import { PageRendererProps } from "gatsby";
import CookieConsent from "react-cookie-consent";
import Nav from "../nav";

const Button: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  style,
  ...props
}) => (
  <span className="m-2 sm:m-0 inline-flex rounded-md shadow-sm">
    <button
      {...props}
      style={style}
      type="button"
      className={cx(
        "inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-gray-700 transition ease-in-out duration-150",
        className,
      )}
    >
      {children}
    </button>
  </span>
);

const Layout: FunctionComponent<PageRendererProps> = ({
  children,
  location,
}) => (
  <>
    <header className="font-sans">
      <Nav slug={location.pathname} />
    </header>
    <main className="px-4 container max-w-7xl mx-auto relative mt-32 font-sans">
      {children}
    </main>
    <footer className="font-sans">
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="imh-ga"
        buttonClasses="font-semibold bg-green-300 hover:bg-teal-100 focus:outline-none focus:border-teal-500 focus:shadow-outline-teal active:bg-teal-500"
        declineButtonClasses="mr-2 bg-red-300"
        containerClasses="flex justify-between items-center bg-gray-700 w-full fixed bottom-0 p-3"
        buttonWrapperClasses="flex flex-col-reverse sm:flex-row flex-wrap justify-end"
        contentClasses="bg-gray-700"
        disableStyles
        enableDeclineButton
        ButtonComponent={Button}
      >
        <span className="text-white">
          This site uses cookies. Do you consent?
        </span>
      </CookieConsent>
    </footer>
  </>
);

export default Layout;
