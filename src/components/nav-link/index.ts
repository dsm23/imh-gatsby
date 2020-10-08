import { ElementType } from 'react';
import tw, { styled } from 'twin.macro';

interface Props {
  isActive?: boolean;
}

const NavLink = styled.a<Props>(({ isActive = false }) => [
  tw`mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:(text-white no-underline) focus:(outline-none text-white bg-indigo-700) transition duration-150 ease-in-out`,

  tw`md:(px-3 py-2 rounded-md text-gray-300 text-sm font-semibold leading-5 uppercase)`,
  isActive && tw`text-white bg-indigo-700`,
]);

export default NavLink;
