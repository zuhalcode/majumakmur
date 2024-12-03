"use client";

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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { toast } from "sonner";

import { Banknote, Loader } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useFetchGold } from "@/hooks/use-gold";
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
import { Button } from "@/components/ui/button";

export default function Page() {
  const { data, refetch } = useFetchGold();

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
    <>
      <IntlProvider locale="id-ID">
        <div className="w-full flex flex-col gap-5 px-5 pb-10 mt-5">
          <Button
            onClick={handleOnClick}
            disabled={loading}
            variant="outline"
            className="mx-auto"
          >
            {loading ? <Loader className="animate-spin" /> : "Update Data"}
          </Button>

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
                    maximumFractionDigits={0}
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
                    maximumFractionDigits={0}
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
                      maximumFractionDigits={0}
                      value={(data[0]?.price * exchange) / 100}
                      style="currency"
                      currency="IDR"
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    {exchange} % from 24K Gold
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
                      maximumFractionDigits={0}
                      value={(data[0]?.price * melt) / 100}
                      style="currency"
                      currency="IDR"
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    {melt} % from 24K Gold
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
                      <span className="text-white">Gold Sale Price</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      value={((data[0]?.price * exchange) / 100) * 1.1}
                      style="currency"
                      currency="IDR"
                      maximumFractionDigits={0}
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    +20.1% from last month
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </IntlProvider>
    </>
  );
}
