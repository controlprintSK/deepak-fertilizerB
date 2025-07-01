import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "@/app/components/login/LoginForm";
import { postAPI } from "@/utils/apiRequest";
import * as reactRedux from "react-redux";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  redirect: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn((selector) => selector()),
}));

jest.mock("next-auth/react", () => ({
  getSession: () => ({
    data: { user: { name: "Test User" } },
    status: "authenticated",
  }),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("@/utils/apiRequest", () => ({
  postAPI: jest.fn(),
}));

jest.mock("@/utils/common", () => ({
  displayMessage: jest.fn(),
  fetchCompanyList: jest.fn(() => Promise.resolve([])),
  fetchUserRoleList: jest.fn(() => Promise.resolve([])),
  createRightMaster: jest.fn(() => Promise.resolve({})),
}));

jest.mock("jsonwebtoken", () => ({
  decode: () => ({ role: "admin", company: "Company A" }),
}));

jest.spyOn(reactRedux, "useSelector").mockImplementation((selector) =>
  selector({
    userInfo: {
      user: { name: "Test User", email: "test@example.com" },
    },
  })
);

// Fix for Ant Design's use of matchMedia
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // for older browsers
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("LoginForm Component", () => {
  it('renders "Login" text', () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("heading", { level: 1, name: /login/i })
    ).toBeInTheDocument();
  });

  it("fills in username and password, and submits the form", async () => {
    const { container } = render(<LoginForm />);
    const CompanyCodeInput = container.querySelector(
      'input[name="PlantCode"]'
    );
    const usernameInput = container.querySelector('input[name="UserName"]');
    const passwordInput = container.querySelector('input[name="Password"]');
    const submitButton = screen.getByRole("button", { name: /login/i });

    await act(async () => {
      fireEvent.change(CompanyCodeInput, { target: { value: "TEST" } });
      fireEvent.change(usernameInput, { target: { value: "TestUser" } });
      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.click(submitButton);
    });

    expect(CompanyCodeInput).toHaveValue("TEST");
    expect(usernameInput).toHaveValue("TestUser");
    expect(passwordInput).toHaveValue("123456");
  });

  it("returns success for valid credentials", async () => {
    const mockResponse = {
      status: 200,
      data: { message: "Success" },
    };
    postAPI.mockResolvedValueOnce(mockResponse);
    const req = {
      json: async () => ({
        CompanyCode: "TEST",
        username: "admin",
        password: "secret",
      }),
    };

    const res = await postAPI(req);

    expect(res?.status).toBe(200);
    expect(res?.data).toEqual({ message: "Success" });
  });

  it("returns error for invalid credentials", async () => {
    const mockResponse = {
      status: 401,
      data: { message: "Error" },
    };
    postAPI.mockResolvedValueOnce(mockResponse);
    const req = {
      CompanyCode: "TEST",
      username: "wronguser",
      password: "wrongpass",
    };

    const res = await postAPI(req);

    expect(res.status).toBe(401);
    expect(res.data).toEqual({ message: "Error" });
  });
});
