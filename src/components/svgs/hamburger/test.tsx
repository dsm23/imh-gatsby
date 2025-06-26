/// <reference types="jest" />

import React from "react";
import { render } from "@testing-library/react";

import Hamburger from ".";

const renderable = <Hamburger />;

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
