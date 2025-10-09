import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import TopBar from "../components/topbar/TopBar";
import { Context } from "../context/Context";
import avatar from "../avatar/avatar.jpg"

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <Context.Provider {...providerProps}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Context.Provider>,
    renderOptions
  );
};

describe("TopBar Component", () => {
  test("renders top nav links", () => {
    renderWithContext(<TopBar />, { providerProps: { value: { user: null, dispatch: jest.fn() } } });
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Write/i)).toBeInTheDocument();
  });

  test("shows login/register when no user", () => {
    renderWithContext(<TopBar />, { providerProps: { value: { user: null, dispatch: jest.fn() } } });
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test("shows profile image and logout when user exists", () => {
    const user = { profilePic: "test.jpg" };
    renderWithContext(<TopBar />, { providerProps: { value: { user, dispatch: jest.fn() } } });
    expect(screen.getByAltText("User Avatar")).toHaveAttribute("src", "test.jpg");
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test("calls dispatch on logout click", () => {
    const dispatch = jest.fn();
    const user = { profilePic: "test.jpg" };
    renderWithContext(<TopBar />, { providerProps: { value: { user, dispatch } } });
    fireEvent.click(screen.getByText(/Logout/i));
    expect(dispatch).toHaveBeenCalledWith({ type: "LOGOUT" });
  });

  test("displays fallback avatar when image fails to load", () => {
    const user = { profilePic: "wrong.jpg" };
    renderWithContext(<TopBar />, { providerProps: { value: { user, dispatch: jest.fn() } } });
    const img = screen.getByAltText("User Avatar");
    fireEvent.error(img);
    expect(screen.getByAltText("Default Avatar")).toHaveAttribute("src", avatar);
  });
});
