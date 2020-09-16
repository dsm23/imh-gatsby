import tw, { styled, theme } from 'twin.macro';

interface Props {
  open: boolean;
}

const MobileMenu = styled.div<Props>(({ open }) => [
  tw`transition-all transform duration-500 ease-in-out h-0`,
  {
    maxHeight: `calc(100% - ${theme`height.20`})`,
  },
  open && {
    height: '32rem',
  },
]);

export default MobileMenu;
