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

  const pureGoldPrice = data[0]?.price;
  const goldPriceReference = Math.floor(pureGoldPrice / 100000) * 100000;

  const pureGolds = [
    { title: "Emas Lokal", desc: "", value: pureGoldPrice },
    {
      title: "Harga Acuan",
      value: goldPriceReference,
    },
  ];

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

          {/* Local Gold */}
          <div className="w-full grid grid-cols-4 gap-5">
            {pureGolds.map(({ title, value, desc }, i) => (
              <Card className="col-span-2" key={i}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color: "#FFD700" }}>
                      24K <span className="text-white">{title}</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color: "#FFD700" }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      maximumFractionDigits={0}
                      value={value}
                      style="currency"
                      currency="IDR"
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    {desc || ""}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          {/* Local Gold */}

          <Separator orientation="horizontal" className="bg-yellow-300" />

          {/* Grosir from local gold */}
          <div className="w-full grid grid-cols-4 gap-5">
            {goldRates.map(({ karat, exchange, color }, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K <span className="text-white">Harga Grosir</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      maximumFractionDigits={0}
                      value={(pureGoldPrice * exchange) / 100}
                      style="currency"
                      currency="IDR"
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    {exchange}% dari Emas Lokal
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          {/* Grosir from local gold */}

          {/* Melt from local gold */}
          <div className="w-full grid grid-cols-4 gap-5">
            {goldRates.map(({ karat, melt, color }, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K <span className="text-white">Emas Lebur</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      maximumFractionDigits={0}
                      value={(pureGoldPrice * melt) / 100}
                      style="currency"
                      currency="IDR"
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    {melt}% dari 24 Karat
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          {/* Melt from local gold */}

          {/* Sell Price */}
          <div className="w-full grid grid-cols-4 gap-5">
            {goldRates.map(({ karat, exchange, color }, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K <span className="text-white">Harga Jual</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      value={((pureGoldPrice * exchange) / 100) * 1.1}
                      style="currency"
                      currency="IDR"
                      maximumFractionDigits={0}
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    +10% dari grosir Lokal
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          {/* Sell Price */}

          <Separator orientation="horizontal" className="bg-yellow-500" />

          {/* Grosir from gold price reference */}
          <div className="w-full grid grid-cols-4 gap-5">
            {goldRates.map(({ karat, exchange, color }, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K <span className="text-white">Harga Grosir</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      maximumFractionDigits={0}
                      value={(goldPriceReference * exchange) / 100}
                      style="currency"
                      currency="IDR"
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    {exchange}% dari harga acuan
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          {/* Grosir from gold price reference */}

          {/* Melt from gold price reference */}
          <div className="w-full grid grid-cols-4 gap-5">
            {goldRates.map(({ karat, melt, color }, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K <span className="text-white">Emas Lebur</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      maximumFractionDigits={0}
                      value={(goldPriceReference * melt) / 100}
                      style="currency"
                      currency="IDR"
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    {melt}% dari harga acuan
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          {/* Melt from gold price reference */}

          {/* Sell Price */}
          <div className="w-full grid grid-cols-4 gap-5">
            {goldRates.map(({ karat, exchange, color }, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K <span className="text-white">Harga Jual</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      value={((goldPriceReference * exchange) / 100) * 1.1}
                      style="currency"
                      currency="IDR"
                      maximumFractionDigits={0}
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    +10% grosir harga acuan
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          {/* Sell Price */}
        </div>
      </IntlProvider>
    </>
  );
}
