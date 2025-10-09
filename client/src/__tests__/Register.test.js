import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Register from "../pages/register/Register";

// Mock axios
jest.mock("axios");

describe("Register Component", () => {
  test("renders all fields and buttons correctly", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Both title and button contain "Register"
    const titles = screen.getAllByText("Register");
    expect(titles[0]).toBeInTheDocument(); // Page title
    expect(titles[1]).toBeInTheDocument(); // Submit button

    // Input fields
    expect(screen.getByPlaceholderText(/Enter your Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();

    // Login button
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test("submits form successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    delete window.location;
    window.location = { replace: jest.fn() };

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Fill inputs
    fireEvent.change(screen.getByPlaceholderText(/Enter your Username/i), { target: { value: "Arya" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: "arya@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "123456" } });

    // Submit
    fireEvent.click(screen.getByRole("button", { name: /^Register$/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://ean-be-updated.vercel.app/api/auth/register",
        { username: "Arya", email: "arya@example.com", password: "123456" }
      );
      expect(window.location.replace).toHaveBeenCalledWith("/login");
    });
  });

  test("shows error message when registration fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("Registration failed"));

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter your Username/i), { target: { value: "Arya" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), { target: { value: "arya@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "123456" } });

    fireEvent.click(screen.getByRole("button", { name: /^Register$/i }));

    const errorMessage = await screen.findByText(/Something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
