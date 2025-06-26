/// <reference types="jest" />

import React from "react";
import { render } from "@testing-library/react";

import Anchor from ".";

const renderable = <Anchor href="/foo">This is an anchor tag </Anchor>;

describe(`Anchor`, () => {
  it(`it renders`, () => {
    const { baseElement } = render(renderable);

    expect(baseElement).toBeTruthy();
  });

  it(`matches snapshot`, () => {
    const { asFragment } = render(renderable);

    expect(asFragment()).toMatchSnapshot();
  });
});
