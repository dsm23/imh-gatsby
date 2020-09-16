import React, { FunctionComponent, SVGAttributes } from 'react';
import { theme } from 'twin.macro';

const Hamburger: FunctionComponent<SVGAttributes<SVGSVGElement>> = props => (
  <svg
    {...props}
    fill={`${theme`colors.gray.100`}`}
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

export default Hamburger;
