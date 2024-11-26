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
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { createClient } from "../utils/supabase/client";
import {
  FormattedDate,
  FormattedNumber,
  FormattedTime,
  IntlProvider,
} from "react-intl";

type Gold = {
  created_at: number;
  price: number;
};

export default function ProtectedPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [golds, setGolds] = useState<Gold[]>([]);

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

  const supabase = createClient();

  const getGoldData = async () => {
    const { data, error } = await supabase.from("golds").select("*");

    if (error) {
      console.error("Gagal mengambil data:", error);
      return [];
    }

    return data;
  };

  const handleOnClick = async () => {
    setIsLoading(true);

    const scrapeResponse = await fetch("/api/scrape");

    if (scrapeResponse.ok) fetchInitialData();

    setIsLoading(false);
  };

  const fetchInitialData = async () => {
    const initialData = await getGoldData();
    console.log(initialData);
    setGolds(initialData);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const locale = "id-ID"; // Bahasa Indonesia

  return (
    <IntlProvider locale={locale}>
      <div className="w-full flex flex-col gap-12 px-10 mt-5">
        <Button onClick={handleOnClick} variant="outline">
          {isLoading ? <Loader className="animate-spin" /> : "Refresh Data"}
        </Button>

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {golds.map((gold, i) => (
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

        <div className="flex">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>

          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
  );
}
