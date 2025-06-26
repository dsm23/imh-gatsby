import React, { FunctionComponent, SVGAttributes } from "react";
import { theme } from "twin.macro";

const Cross: FunctionComponent<SVGAttributes<SVGSVGElement>> = (props) => (
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
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default Cross;
