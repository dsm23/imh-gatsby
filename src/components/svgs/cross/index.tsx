import React, { FunctionComponent, SVGAttributes } from "react";
import cx from "clsx";

const Cross: FunctionComponent<SVGAttributes<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    {...props}
    className={cx("color-gray-100", className)}
    fill="currentColor"
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
