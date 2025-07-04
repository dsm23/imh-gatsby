/// <reference types="jest" />

import React from "react";
import { render } from "@testing-library/react";

import Card from ".";

const renderable = <Card>Card content</Card>;

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
