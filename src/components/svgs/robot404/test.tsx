/// <reference types="jest" />

import React from 'react';
import { render } from '@testing-library/react';

import Robot404 from '.';

const renderable = <Robot404 />;

describe(`SVG Robot404`, () => {
  it(`it renders`, () => {
    const { baseElement } = render(renderable);

    expect(baseElement).toBeTruthy();
  });

  it(`matches snapshot`, () => {
    const { asFragment } = render(renderable);

    expect(asFragment()).toMatchSnapshot();
  });
});
