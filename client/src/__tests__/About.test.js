import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Context } from "../context/Context";
import About from "../pages/about/About";

// Helper to render with context and router
const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <Context.Provider {...providerProps}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Context.Provider>,
    renderOptions
  );
};

describe("About Component", () => {
  test("renders About Me paragraph", () => {
    renderWithContext(<About />, { providerProps: { value: { user: null } } });
    expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument();
  });

  test("shows user image if user exists", () => {
    const user = { profilePic: "test.jpg" };
    renderWithContext(<About />, { providerProps: { value: { user } } });
    expect(screen.getByRole("img")).toHaveAttribute("src", "test.jpg");
  });

  test("shows fallback image if user does not exist", () => {
    renderWithContext(<About />, { providerProps: { value: { user: null } } });
    const fallbackImg = screen.getByRole("img");
    expect(fallbackImg).toHaveAttribute("src", expect.stringContaining("https://encrypted-tbn0.gstatic.com"));
  });

  test("renders social icons", () => {
    renderWithContext(<About />, { providerProps: { value: { user: null } } });
    const svgs = screen.getAllByRole("img", { hidden: true });
    // SVGs don’t have role img, so optional: we can check by class name
    expect(document.querySelectorAll(".sidebarIcon").length).toBe(4);
  });
});
