import React, { FunctionComponent, SVGAttributes } from "react";
import cx from "clsx";

const Caret: FunctionComponent<SVGAttributes<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    {...props}
    className={cx("color-gray-100", className)}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export default Caret;
