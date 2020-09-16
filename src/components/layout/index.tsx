import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';
import { PageRendererProps } from 'gatsby';
import CookieConsent from 'react-cookie-consent';
import Nav from '../nav';

import tw from 'twin.macro';
import 'twin.macro';

const Button: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  style,
  ...props
}) => (
  <span tw="m-2 sm:m-0 inline-flex rounded-md shadow-sm">
    <button
      {...props}
      style={style}
      className={className}
      type="button"
      tw="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-gray-700 transition ease-in-out duration-150"
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
    <header tw="font-sans">
      <Nav slug={location.pathname} />
    </header>
    <main tw="px-4 container-md mx-auto relative mt-32 font-sans">
      {children}
    </main>
    <footer tw="font-sans">
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="imh-ga"
        // buttonStyle={tw`font-bold bg-teal-300`}
        buttonStyle={tw`font-semibold bg-teal-300 hover:bg-teal-100 focus:outline-none focus:border-teal-500 focus:shadow-outline-teal active:bg-teal-500`}
        declineButtonStyle={tw`mr-2 bg-red-300`}
        style={tw`flex justify-between items-center bg-gray-700 w-full fixed bottom-0 p-3`}
        contentStyle={tw`bg-gray-700`}
        disableStyles
        enableDeclineButton
        acceptOnScroll
        acceptOnScrollPercentage={20}
        ButtonComponent={Button}
      >
        <span tw="text-white">This site uses cookies. Do you consent?</span>
      </CookieConsent>
    </footer>
  </>
);

export default Layout;
