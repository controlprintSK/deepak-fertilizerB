// page.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomerAdd from "./page";

jest.mock("@/store/index", () => ({
  __esModule: true,
  default: {}, // or your mock store
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => "",
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("redux-persist", () => ({
  ...jest.requireActual("redux-persist"),
  persistReducer: jest.fn(),
  persistStore: jest.fn(),
  persistCombineReducers: jest.fn(),
  FLUSH: "FLUSH",
  REHYDRATE: "REHYDRATE",
  PAUSE: "PAUSE",
  PERSIST: "PERSIST",
  PURGE: "PURGE",
  REGISTER: "REGISTER",
}));

describe("CustomerAdd Component", () => {
  it("renders Add Customer items", () => {
    render(
      <CustomerAdd items={[{ title: "Add Customer", href: "/master" }]} />
    );

    expect(screen.getByText("Add Customer")).toBeInTheDocument();
  });
});
