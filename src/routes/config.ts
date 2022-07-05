import { RoutesConfigObject } from "routes/types";

export const nav: RoutesConfigObject = {
  contactUs: {
    id: 3,
    title: "Contact us",
    path: "contact-us",
    absolutePath: "/contact-us",
  },
  sendReport: {
    id: 4,
    title: "Send report",
    path: "send-report",
    absolutePath: "/send-report",
  },
  signIn: {
    id: 2,
    title: "Sign in",
    path: "sign-in",
    absolutePath: "/sign-in",
  },
  signUp: {
    id: 1,
    title: "Sign up",
    path: "sign-up",
    absolutePath: "/sign-up",
  },
};
