import React, { FunctionComponent, HTMLAttributes } from "react";
import cx from "clsx";

const Card: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div {...props} className={cx("flex flex-wrap", className)}>
    {children}
  </div>
);

export default Card;
