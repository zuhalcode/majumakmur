"use client";

import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { toast } from "sonner";

import { Banknote, GalleryVerticalEnd } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useFetchGold } from "@/hooks/useGold";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormattedDate,
  FormattedNumber,
  FormattedTime,
  IntlProvider,
} from "react-intl";

const sidebarMenu = [
  {
    title: "Getting Started",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: "#",
        isActive: true,
      },
      {
        title: "Transaction",
        url: "#",
      },
      {
        title: "Customers",
        url: "#",
      },
      {
        title: "Sales",
        url: "#",
      },

      {
        title: "Gold Analytics",
        url: "#",
      },
      {
        title: "Capital Management",
        url: "#",
      },
      {
        title: "Buyback Analytics",
        url: "#",
      },
    ],
  },
];

export default function Page() {
  const { data, refetch } = useFetchGold();
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const [loading, setLoading] = useState<boolean>(false);

  const handleOnClick = async () => {
    setLoading(true);

    const scrapeResponse = await fetch("/api/scrape");
    const scrapeResponseJSON = await scrapeResponse.json();

    toast(scrapeResponseJSON.message, { duration: 1500 });

    refetch();

    setLoading(false);
  };

  const goldRates = [
    { karat: 6, exchange: 35, melt: 28, color: "#D0A25C" },
    { karat: 8, exchange: 45, melt: 36, color: "#F1C14B" },
    { karat: 9, exchange: 48.5, melt: 40, color: "#F9D44D" },
    { karat: 16, exchange: 77, melt: 68, color: "#F5C541" },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Logo</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {sidebarMenu.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          header
        </header>

        <IntlProvider locale="id-ID">
          <div className="w-full flex bg-red-500 flex-col gap-5 px-10 mt-5">
            {/* <Button
          onClick={handleOnClick}
          disabled={loading}
          variant="outline"
          className="mx-auto"
        >
          {loading ? <Loader className="animate-spin" /> : "Update Data"}
        </Button> */}

            <div className="w-full grid grid-cols-6 gap-5">
              <Card className="col-start-2 col-span-2">
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color: "#FFD700" }}>
                      24K <span className="text-white">Local Gold</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color: "#FFD700" }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      value={data[0]?.price}
                      style="currency"
                      currency="IDR"
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    +20.1% from last month
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="col-start-4 col-span-2">
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color: "#FFD700" }}>
                      24K <span className="text-white">Current Gold</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color: "#FFD700" }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      value={data[0]?.price - 16000}
                      style="currency"
                      currency="IDR"
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    +20.1% from last month
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="w-full grid grid-cols-4 gap-5">
              {goldRates.map(({ karat, exchange, color }, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      <p style={{ color }}>
                        {karat}K{" "}
                        <span className="text-white">Gold Wholesale</span>{" "}
                      </p>
                      <Banknote className="size-7" style={{ color }} />
                    </CardTitle>
                    <div className="text-2xl font-bold">
                      <FormattedNumber
                        value={(data[0]?.price * exchange) / 100}
                        style="currency"
                        currency="IDR"
                      />
                    </div>
                    <CardDescription className="flex flex-col">
                      +20.1% from last month
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="w-full grid grid-cols-4 gap-5">
              {goldRates.map(({ karat, melt, color }, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      <p style={{ color }}>
                        {karat}K <span className="text-white">Gold Melt</span>{" "}
                      </p>
                      <Banknote className="size-7" style={{ color }} />
                    </CardTitle>
                    <div className="text-2xl font-bold">
                      <FormattedNumber
                        value={(data[0]?.price * melt) / 100}
                        style="currency"
                        currency="IDR"
                      />
                    </div>
                    <CardDescription className="flex flex-col">
                      +20.1% from last month
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="w-full grid grid-cols-4 gap-5">
              {goldRates.map(({ karat, exchange, color }, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      <p style={{ color }}>
                        {karat}K{" "}
                        <span className="text-white">Gold Wholesale</span>{" "}
                      </p>
                      <Banknote className="size-7" style={{ color }} />
                    </CardTitle>
                    <div className="text-2xl font-bold">
                      <FormattedNumber
                        value={((data[0]?.price * exchange) / 100) * 1.1}
                        style="currency"
                        currency="IDR"
                      />
                    </div>
                    <CardDescription className="flex flex-col">
                      +20.1% from last month
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="flex gap-5">
              <div className="w-full space-y-3">
                <Table>
                  <TableCaption>
                    A list of your gold price changing.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((gold, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium ">
                          <FormattedDate
                            value={gold.created_at}
                            year="numeric"
                            month="long"
                            day="numeric"
                          />{" "}
                          <FormattedTime
                            value={gold.created_at}
                            hour="2-digit"
                            minute="2-digit"
                          />
                        </TableCell>
                        <TableCell>
                          <FormattedNumber
                            value={gold.price}
                            style="currency"
                            currency="IDR"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="w-full bg-red-500">zuhal</div>
            </div>

            <div className="flex">
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>

              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </IntlProvider>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
