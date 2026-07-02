export const SIDEBAR_MENU = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "Assets Management",
    url: "/dashboard/assets",
  },
  {
    title: "Transactions",
    url: "#",
    items: [
      {
        title: "Capital Management",
        url: "/dashboard/capital-management",
        isActive: true,
      },
      {
        title: "Tax Management",
        url: "/dashboard/tax-management",
        isActive: true,
      },
    ],
  },
];
