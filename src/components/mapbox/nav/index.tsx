import React, { FunctionComponent, HTMLAttributes } from "react";
import cx from "clsx";

const Nav: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    {...props}
    className={cx("absolute left-0 padding-[10px] top-[72px]", className)}
  >
    {children}
  </div>
);

export default Nav;
