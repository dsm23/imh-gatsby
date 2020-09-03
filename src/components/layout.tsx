import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { PageRendererProps } from 'gatsby';
import CookieConsent from 'react-cookie-consent';
import Header from './header';

import styles from './layout.module.scss';

const Layout: FunctionComponent<PageRendererProps> = ({
  children,
  location,
}) => (
  <>
    <Header slug={location.pathname} />
    <main className={clsx('container-xl position-relative', styles.topMargin)}>
      {children}
    </main>
    <footer>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="imh-ga"
        buttonClasses={clsx('btn font-weight-bold', styles.accept)}
        declineButtonClasses={clsx('btn mr-3', styles.decline)}
        containerClasses="d-flex justify-content-between align-items-center alert bg-dark w-100 position-fixed bottom-0"
        contentClasses="text-dark"
        disableStyles
        enableDeclineButton
        acceptOnScroll
        acceptOnScrollPercentage={20}
      >
        <span className="text-white">
          This site uses cookies. Do you consent?
        </span>
      </CookieConsent>
    </footer>
  </>
);

export default Layout;
