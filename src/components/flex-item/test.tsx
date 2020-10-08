import React, { CSSProperties } from 'react';
import { render } from '@testing-library/react';

import 'jest-styled-components';

import 'twin.macro';

import FlexItem from '.';

const renderable = (width: CSSProperties['flexBasis']) => (
  <div tw="flex">
    <FlexItem data-testid="target" basis={width}>
      flex item {width}
    </FlexItem>
  </div>
);

describe(`FlexItem`, () => {
  it.each([['25%', '50%', '75%', '100%']])('test width (%s)', width => {
    const { getByTestId } = render(renderable(width));

    expect(getByTestId('target')).toHaveStyleRule('flex-basis', width);
  });

  // it(`it renders`, () => {
  //   const { baseElement } = render(renderable);

  //   expect(baseElement).toBeTruthy();
  // });

  // it(`matches snapshot`, () => {
  //   const { asFragment } = render(renderable);

  //   expect(asFragment()).toMatchSnapshot();
  // });
});
