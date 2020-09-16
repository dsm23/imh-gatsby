import tw, { styled } from 'twin.macro';

const FullscreenControl = styled.div([
  tw`absolute left-0`,
  {
    top: 36,
    padding: 10,
  },
]);

export default FullscreenControl;
