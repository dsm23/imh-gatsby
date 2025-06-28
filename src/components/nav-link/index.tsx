import type { AnchorHTMLAttributes, FunctionComponent } from "react";
import cx from "clsx";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean;
  as?: any;
};

const NavLink: FunctionComponent<Props> = ({
  children,
  className,
  isActive,
  as: Comp = "a",
  ...props
}) => (
  <Comp
    {...props}
    className={cx(
      "mt-1 block px-3 py-2 cursor-pointer rounded-md text-base font-medium text-gray-300 hover:text-white hover:no-underline focus:outline-hidden focus:text-white focus:bg-indigo-700 transition duration-150 ease-in-out",
      "md:px-3 md:py-2 md:rounded-md md:text-gray-300 md:text-sm md:font-semibold md:leading-5 md:uppercase",
      {
        "text-white bg-indigo-700": isActive,
      },
    )}
  >
    {children}
  </Comp>
);

export default NavLink;
