import { NavItem } from "@/types/NavItem";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Find Job",
    href: "/deal"
  },
  {
    label: "Your Deal",
    href: "/yourdeal"
  }
];

export const SIDEBAR_ITEM: NavItem[] = [
  {
    label: "Profile",
    href: "/mypage",
    subLabel: "Set your profile!"
  },
  {
    label: "Deals",
    href: "/mypage/deal",
    subLabel: "Check your deals"
  }
];
