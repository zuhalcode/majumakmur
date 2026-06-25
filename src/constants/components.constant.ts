export const SIDEBAR_MENU = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "Assets",
    url: "/dashboard/asset-management",
    items: [
      {
        title: "Transactions",
        url: "/dashboard/asset-transaction",
        isActive: true,
      },
    ],
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
