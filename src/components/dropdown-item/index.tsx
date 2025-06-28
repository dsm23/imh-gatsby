import { useRef } from "react";
import type { AnchorHTMLAttributes, FunctionComponent } from "react";
import cx from "clsx";
// import { Link, GatsbyLinkProps } from "gatsby";
// import { useKey } from 'react-use';

interface StyleProps {
  isActive?: boolean;
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps;

const handleKeyDown = (node: HTMLAnchorElement) => (event: KeyboardEvent) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
  }
  if (document.activeElement === node) {
    const parentNode = node.parentNode as HTMLDivElement;

    const linkSiblings = Array.from(parentNode.children).filter(
      (child, index, cur) =>
        child !== node &&
        (child as HTMLAnchorElement) &&
        index > cur.indexOf(node),
    );

    if (event.key === "ArrowDown") {
      (node.nextElementSibling as HTMLAnchorElement).focus();
    }
    if (event.key === "ArrowUp") {
      (node.previousSibling as HTMLAnchorElement).focus();
    }
  }
};

const DropdownItem: FunctionComponent<Props> = ({
  children,
  className,
  isActive,
  ...props
}) => {
  const refLink = useRef<HTMLAnchorElement>(null);

  return (
    <a
      {...props}
      className={cx(
        "block text-sm leading-5 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 transition duration-150 ease-in-out",
        {
          "text-gray-700": !isActive,
          "text-white bg-indigo-700 hover:bg-indigo-500 focus:bg-indigo-600":
            isActive,
        },
        className,
      )}
      ref={refLink}
      onKeyDown={handleKeyDown(refLink?.current as HTMLAnchorElement)}
    >
      {children}
    </a>
  );
};

export default DropdownItem;
