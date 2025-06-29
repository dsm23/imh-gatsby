import type { FunctionComponent, SVGAttributes } from "react";
import cx from "clsx";

const Hamburger: FunctionComponent<SVGAttributes<SVGSVGElement>> = ({
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
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

export default Hamburger;
