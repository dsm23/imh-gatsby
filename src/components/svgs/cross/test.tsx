/// <reference types="jest" />

import React from 'react';
import { render } from '@testing-library/react';

import Cross from '.';

const renderable = <Cross />;

describe(`Cross`, () => {
  it(`it renders`, () => {
    const { baseElement } = render(renderable);

    expect(baseElement).toBeTruthy();
  });

  it(`matches snapshot`, () => {
    const { asFragment } = render(renderable);

    expect(asFragment()).toMatchSnapshot();
  });
});
