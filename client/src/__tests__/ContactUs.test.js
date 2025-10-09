import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import emailjs from "@emailjs/browser";
import { ContactUs } from "../components/contact/Contact";

jest.mock("@emailjs/browser", () => ({
  sendForm: jest.fn(() => Promise.resolve({ text: "OK" })),
}));

describe("ContactUs Component", () => {
  test("renders all form fields correctly", () => {
    render(<ContactUs />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Is there any issue with Events and News app/i)
    ).toBeInTheDocument();
  });

  test("success message is not visible initially", () => {
    render(<ContactUs />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("submits the form and shows success message", async () => {
    render(<ContactUs />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Arya" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "arya@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello!" },
    });

    fireEvent.submit(screen.getByTestId("contact-form"));

    // Wait for success message to appear after React update
    await waitFor(() =>
      expect(screen.getByText(/Response has been sent/i)).toBeInTheDocument()
    );

    expect(emailjs.sendForm).toHaveBeenCalled();
  });
});
