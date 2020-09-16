import React, {
  ElementType,
  FunctionComponent,
  useEffect,
  useRef,
} from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';
// import { useKey } from 'react-use';
import tw, { styled } from 'twin.macro';

interface Props {
  active?: boolean;
  as?: ElementType | keyof JSX.IntrinsicAttributes;
}

const StyledAnchor = styled.a<Props>(({ active }) => [
  tw`block text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:(outline-none bg-gray-100) transition duration-150 ease-in-out`,
  active &&
    tw`text-white bg-indigo-700 hover:bg-indigo-500 focus:(outline-none bg-indigo-600)`,
]);

const func = (node: HTMLAnchorElement) => (event: KeyboardEvent) => {
  event.preventDefault();
  if (document.activeElement === node) {
    const linkSiblings = [...node.parentNode.children].filter(
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

const DropdownItem: FunctionComponent<GatsbyLinkProps<{}>> = props => {
  const refLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const node = refLink?.current as HTMLAnchorElement;

    node.addEventListener('keydown', func(node));

    return () => {
      node.removeEventListener('keyup', func(node));
    };
  });

  // useKey('ArrowDown', )

  return <StyledAnchor as={Link} ref={refLink} {...props} />;
};

export default DropdownItem;
