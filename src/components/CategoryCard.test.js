import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CategoryCard from "./CategoryCard";
import "@testing-library/jest-dom/extend-expect";

let testCategory = {
  name: "test",
  adjacents: [
    {
      name: "Pants",
      value: 12,
      root: "Mens",
      adjacents: [],
    },
    {
      name: "Jeans",
      value: 35,
      root: "Mens",
      adjacents: [],
    },
  ],
};
test("Category card renders correctly", () => {
  const component = render(<CategoryCard category={testCategory} />);
  const cardHeader = component.getByTestId("cardheader");

  console.log(cardHeader.textContent);
  expect(cardHeader.textContent).toBe("testSales: ");
});
