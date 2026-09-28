import { render, screen } from "@testing-library/react";
import AppWrapper from "./AppWrapper";

// Firebase's Node build pulls in undici, which needs browser fetch globals
// jsdom's test environment doesn't provide — the app itself works fine in a
// real browser, so tests mock the Firebase layer instead of chasing polyfills.
jest.mock("./firebase/config", () => ({
  auth: {},
  db: {},
  storage: {},
  ADMIN_EMAIL: "",
}));
jest.mock("./firebase/auth", () => ({
  subscribeToAuth: (cb) => {
    cb(null);
    return () => {};
  },
  isOwner: () => false,
  signIn: jest.fn(),
  signOut: jest.fn(),
}));
jest.mock("./firebase/analytics", () => ({
  recordVisit: jest.fn(),
}));
jest.mock("./firebase/firestore", () => ({
  subscribeToCategories: (cb) => {
    cb([]);
    return () => {};
  },
  subscribeToPublishedResources: (_slug, cb) => {
    cb([]);
    return () => {};
  },
  subscribeToAllResources: (cb) => {
    cb([]);
    return () => {};
  },
  subscribeToMessages: (cb) => {
    cb([]);
    return () => {};
  },
  submitMessage: jest.fn(),
  addCategory: jest.fn(),
  deleteCategory: jest.fn(),
  addResource: jest.fn(),
  updateResource: jest.fn(),
  deleteResource: jest.fn(),
  markMessageRead: jest.fn(),
  deleteMessage: jest.fn(),
}));

test("renders the navbar", () => {
  render(<AppWrapper />);
  const logo = screen.getByAltText(/site logo/i);
  expect(logo).toBeInTheDocument();
});
