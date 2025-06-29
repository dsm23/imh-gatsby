import type { AnchorHTMLAttributes, FunctionComponent } from "react";
import cx from "clsx";

const Anchor: FunctionComponent<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  className,
  ...props
}) => (
  <a
    {...props}
    className={cx(
      "text-purple-800 font-semibold rounded-sm px-1 -mx-1 hover:bg-yellow-300",
      className,
    )}
  >
    {children}
  </a>
);

export default Anchor;
