import React, { FunctionComponent, HTMLAttributes } from "react";
import cx from "clsx";

const ScaleControl: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div
    {...props}
    className={cx("absolute left-0 padding-[10px] bottom-[36px]", className)}
  >
    {children}
  </div>
);

export default ScaleControl;
