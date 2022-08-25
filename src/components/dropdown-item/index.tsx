import React, {
  ElementType,
  FunctionComponent,
  useEffect,
  useRef,
} from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';
// import { useKey } from 'react-use';
import tw, { styled } from 'twin.macro';

interface StyleProps {
  $isActive?: boolean;
  as?: ElementType | keyof JSX.IntrinsicAttributes;
}

type Props = GatsbyLinkProps<{}> & StyleProps;

const StyledAnchor = styled.a<StyleProps>(({ $isActive }) => [
  tw`block text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:(outline-none bg-gray-100) transition duration-150 ease-in-out`,
  $isActive &&
    tw`text-white bg-indigo-700 hover:bg-indigo-500 focus:(outline-none bg-indigo-600)`,
]);

const handleKeyDown = (node: HTMLAnchorElement) => (event: KeyboardEvent) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
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

    if (event.key === 'ArrowDown') {
      (node.nextElementSibling as HTMLAnchorElement).focus();
    }
    if (event.key === 'ArrowUp') {
      (node.previousSibling as HTMLAnchorElement).focus();
    }
  }
};

const DropdownItem: FunctionComponent<Props> = props => {
  const refLink = useRef<HTMLAnchorElement>(null);

  return (
    <StyledAnchor
      as={Link}
      ref={refLink}
      onKeyDown={handleKeyDown(refLink?.current as HTMLAnchorElement)}
      {...props}
    />
  );
};

export default DropdownItem;
