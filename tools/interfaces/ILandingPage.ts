import { ReactNode } from "react";

export interface ILandingPage {
  title: string;
  links: { href: string; label: string }[];
  footer?: {
    links: { href: string; label: string }[];
    socialLinks?: { href: string; icon: ReactNode }[];
  };
}