import React, { FunctionComponent, HTMLAttributes } from "react";
import cx from "clsx";

const FullscreenControl: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    {...props}
    className={cx("absolute left-0 padding-[10px] top-[36px]", className)}
  >
    {children}
  </div>
);

export default FullscreenControl;
