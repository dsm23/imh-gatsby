import type { FunctionComponent, HTMLAttributes } from "react";
import cx from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  isAnimating: boolean;
}

const DropdownContainer: FunctionComponent<
  HTMLAttributes<HTMLDivElement> & { isOpen: boolean }
> = ({ children, className, isOpen, ...props }) => (
  <div
    {...props}
    className={cx(
      "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg transform transition ease-out duration-200 opacity-0 scale-95",
      {
        "opacity-100 scale-100 ease-in duration-75": isOpen,
      },
      className,
    )}
  >
    {children}
  </div>
);

/* <!--
              Profile dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */

const Dropdown: FunctionComponent<Props> = ({
  children,
  isAnimating,
  isOpen,
  onTransitionEnd,
  ...props
}) =>
  !(isOpen || isAnimating) ? null : (
    <DropdownContainer
      {...props}
      // TODO: fix this specificity prod bug
      className="w-full"
      isOpen={isOpen || isAnimating}
      onTransitionEnd={onTransitionEnd}
    >
      <div
        className="py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
      >
        {children}
      </div>
    </DropdownContainer>
  );

export default Dropdown;
