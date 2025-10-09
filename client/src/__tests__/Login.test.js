import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Context } from "../context/Context";
import Login from "../pages/login/Login";

describe("Login Component", () => {
  
  test("renders all inputs and buttons correctly", () => {
    render(
      <BrowserRouter>
        <Context.Provider value={{ dispatch: jest.fn() }}>
          <Login />
        </Context.Provider>
      </BrowserRouter>
    );

    // Inputs
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    // Buttons
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Register")).toBeInTheDocument();

    // Title check using getByText with exact=false
    expect(screen.getByText(/login/i, { selector: "span" })).toBeInTheDocument();
  });

  test("allows user to type in inputs", () => {
    render(
      <BrowserRouter>
        <Context.Provider value={{ dispatch: jest.fn() }}>
          <Login />
        </Context.Provider>
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(usernameInput, { target: { value: "arya" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(usernameInput.value).toBe("arya");
    expect(passwordInput.value).toBe("123456");
  });
});
