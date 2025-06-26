/// <reference types="jest" />

import React from "react";
import { render } from "@testing-library/react";

import Pin from ".";

jest.mock("react-map-gl", () => ({
  Marker: () => <div />,
}));

const geo = {
  latitude: 1,
  longitude: 1,
};

const renderable = <Pin {...geo} />;

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
