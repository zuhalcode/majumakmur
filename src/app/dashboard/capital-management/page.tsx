"use client";

import { ChartConfig } from "@/components/ui/chart";

import { Banknote, Loader, MoveDown, MoveUp, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFetchCapital } from "@/hooks/use-capital";
import { cn } from "@/lib/utils";
import { AreaConfig, BuyAndSell, CashFlow } from "@/types/chart";
import CustomAreaChart from "@/components/charts/area";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  capital: z.string().min(0).optional(),
  purchase: z.string().min(0).optional(),
  sell: z.string().min(0).optional(),
});

type Form = z.infer<typeof formSchema>;

type Capital = {
  id?: number;
  capital: number;
  purchase: number;
  sell: number;
  date: Date;
  created_at?: Date;
  updated_at?: Date;
};

type CardInfo = {
  title: string;
  value: number;
  desc?: string;
  percent: number;
  active: boolean;
};

const buyAndSellChartConfig = {
  buy: {
    label: "Buy",
    color: "hsl(var(--chart-1))",
  },
  sell: {
    label: "Sell",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const buyAndSellAreas: AreaConfig[] = [
  {
    dataKey: "buy",
    label: "Buy",
    fill: "url(#fillDesktop)",
    stroke: "hsl(var(--chart-1))",
  },
  {
    dataKey: "sell",
    label: "Sell",
    fill: "url(#fillMobile)",
    stroke: "hsl(var(--chart-2))",
  },
];

const cashFlowChartConfig = {
  cashFlow: {
    label: "Cash Flow",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const cashFlowAreas: AreaConfig[] = [
  {
    dataKey: "cashFlow",
    label: "Cash Flow",
    fill: "url()",
    stroke: "hsl(var(--chart-1))",
  },
];

export default function Page() {
  const { data, refetch, loading, insertData } = useFetchCapital();

  const buyAndSells: BuyAndSell[] = data
    .map(({ date, purchase, sell }) => ({
      date,
      buy: purchase,
      sell,
    }))
    .reverse();

  const cashFlows: CashFlow[] = data
    .map(({ date, purchase, sell }) => ({
      date,
      cashFlow: purchase - sell,
    }))
    .reverse();

  const today = new Date().toISOString().split("T")[0]; // Hitung di luar komponen

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: today,
      capital: "",
      purchase: "",
      sell: "",
    },
  });

  const { handleSubmit, control } = form;

  const handleOnSubmit = handleSubmit(async (values) => {
    try {
      const transactionData: Capital = {
        capital: Number(values.capital),
        purchase: Number(values.purchase),
        sell: Number(values.sell),
        date: new Date(values.date),
      };

      await insertData(transactionData);

      refetch();
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  });

  const { totalPurchase, totalSell } = data?.reduce(
    (totals, item) => {
      totals.totalPurchase += item.purchase;
      totals.totalSell += item.sell;
      return totals;
    },
    { totalPurchase: 0, totalSell: 0 }
  ) || { totalPurchase: 0, totalSell: 0 };

  const totalCashFlow = data.reduce(
    (total, item) => total + (item.purchase - item.sell),
    0
  );

  const lastPurchaseDay = new Date(data[0]?.date).getTime();
  const firstPurchaseDay = new Date(data[data.length - 1]?.date).getTime();
  const lastDateAfter1Year = new Date(
    new Date(data[data.length - 1]?.date).setFullYear(
      new Date(data[data.length - 1]?.date).getFullYear() + 1
    )
  ).toLocaleDateString("en-GB");

  const purchaseDays = (lastPurchaseDay - firstPurchaseDay) / 86400000;

  const cardInfos: CardInfo[] = [
    {
      title: "Cash Flow",
      value: totalCashFlow,
      desc: `From last ${purchaseDays} days`,
      percent: parseFloat(
        ((totalCashFlow / (totalPurchase + totalSell)) * 100).toFixed(2)
      ),
      active: true,
    },
    {
      title: "Total Customer Purchase",
      value: totalPurchase,
      desc: `From last ${purchaseDays} days`,
      percent: 0,
      active: false,
    },
    {
      title: "Total Customer Sell",
      value: totalSell,
      percent: 0,
      active: false,
    },
    {
      title: "Sell Ratio",
      value: (totalSell / totalPurchase) * 100,
      percent: 0,
      active: false,
    },
    {
      title: "Buy Ratio",
      value: (totalPurchase / totalSell) * 100,
      percent: 0,
      active: false,
    },
    {
      title: "Cash Needs",
      value: totalPurchase * 0.9,
      desc: `Until ${lastDateAfter1Year} `,
      percent: 0,
      active: false,
    },
  ];

  const columns = [
    { header: "Date", accessor: "date" },
    { header: "Capital", accessor: "capital" },
    { header: "Purchase", accessor: "purchase" },
    { header: "Sell", accessor: "sell" },
  ];

  return (
    <IntlProvider locale="id-ID">
      <div className="w-full flex flex-col gap-5 px-5 lg:px-10 mt-5">
        <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-2">
          {cardInfos.map(({ title, desc, value, percent, active }, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <p>{title}</p>
                  <Banknote className="size-7" />
                </CardTitle>

                <div className={cn("text-2xl font-bold")}>
                  {title.includes("Ratio") ? (
                    <>
                      <p>{value.toFixed(2)} %</p>
                    </>
                  ) : (
                    <p
                      className={
                        title.includes("Cash Flow")
                          ? value < 0
                            ? "text-red-500"
                            : "text-green-500"
                          : "text-white"
                      }
                    >
                      <FormattedNumber
                        value={value}
                        style="currency"
                        currency="IDR"
                        minimumFractionDigits={0}
                      />
                    </p>
                  )}
                </div>

                <CardDescription className="flex justify-between items-center">
                  <p className="">{desc || "Last 2 months"}</p>
                  {active &&
                    (percent > 0 ? (
                      <p className="text-green-500 flex">
                        <MoveUp className="size-5 text-blue-500" />
                        {percent}
                      </p>
                    ) : (
                      <p className="flex items-center text-red-500">
                        <MoveDown className="size-5" />
                        {percent}
                      </p>
                    ))}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="flex gap-5 flex-col">
          <CustomAreaChart
            data={cashFlows}
            chartConfig={cashFlowChartConfig}
            areas={cashFlowAreas}
          />
          <CustomAreaChart
            data={buyAndSells}
            chartConfig={buyAndSellChartConfig}
            areas={buyAndSellAreas}
          />
        </div>

        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Capital Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={handleOnSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
                >
                  <FormField
                    control={control}
                    name="date"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={loading} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={control}
                    name="capital"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Capital</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              type="number"
                              placeholder="Amount"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={control}
                    name="purchase"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Purchase</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              type="number"
                              placeholder="Amount"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={control}
                    name="sell"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Sell</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              type="number"
                              placeholder="Amount"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <Button className="w-32" disabled={loading}>
                    <Plus className="w-4 h-4" />
                    {loading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Insert Data"
                    )}
                  </Button>
                </form>
              </Form>
              {/* Form */}

              <ScrollArea>
                <DashboardTable
                  columns={columns}
                  data={data}
                  // handleOnDelete={handleOnDelete}
                />
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </IntlProvider>
  );
}
