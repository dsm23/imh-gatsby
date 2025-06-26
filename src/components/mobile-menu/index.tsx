import React, { FunctionComponent, HTMLAttributes } from "react";
import cx from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

const MobileMenu: FunctionComponent<Props> = ({
  children,
  className,
  open,
  ...props
}) => (
  <div
    {...props}
    className={cx(
      "transition-all overflow-auto transform duration-500 ease-in-out max-h-[90dvh]",
      className,
    )}
    style={{
      height: open ? "32rem" : 0,
    }}
  >
    {children}
  </div>
);

export default MobileMenu;
