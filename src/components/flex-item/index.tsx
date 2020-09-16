import { CSSProperties, ElementType } from 'react';
import { styled } from 'twin.macro';

interface Props {
  as?: ElementType | keyof JSX.IntrinsicAttributes;
  basis: CSSProperties['flexBasis'];
}

const FlexItem = styled.div<Props>(({ basis }) => ({
  flexBasis: basis,
}));

export default FlexItem;
