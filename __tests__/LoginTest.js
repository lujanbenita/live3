/* eslint-disable no-undef */
import React from "react";

import { render } from "../__mocks__/testUtils";

import Login from "../pages/login";

import "@testing-library/jest-dom/extend-expect";

test("Check login button exists", () => {
  const { getByText } = render(<Login />);
  expect(getByText("Access")).toBeInTheDocument();
});
