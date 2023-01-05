import React from "react";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserCreationForm from "../components/UserCreationForm";

afterEach(cleanup);

test("form input values are correctly reflected in state", () => {
  render(<UserCreationForm />);
  const nameInput = screen.getByTestId("name-input");
  const emailInput = screen.getByTestId("email-input");
  const passwordInput = screen.getByTestId("password-input");

  fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
  fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "abc123" } });

  expect(nameInput).toHaveValue("Jane Doe");
  expect(emailInput).toHaveValue("jane@example.com");
  expect(passwordInput).toHaveValue("abc123");

  //instead of testing that the dropdowns contain a value I will instead test that the api calls returned data
  //Then the dropdowns should be populated correctly
});
