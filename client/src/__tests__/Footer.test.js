import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Footer from "../components/footer/Footer";

test("renders footer text correctly", () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  const textElement = screen.getByText(/All Rights Reserved/i);
  expect(textElement).toBeInTheDocument();
});
