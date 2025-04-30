import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

it("renders the welcome message and button", () => {
  render(<Home />);

  const heading = screen.getByRole("heading", {
    level: 1,
    name: "Turborepo, NextJS, Supabase, Tailwind Boiler plate",
  });
  expect(heading).toBeDefined();

  const button = screen.getByRole("link", { name: "Go to Account Page" });
  expect(button).toBeDefined();
});
