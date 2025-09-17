"use client";

import { ChartConfig } from "@/components/ui/chart";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Banknote,
  Loader,
  MoveDown,
  MoveUp,
  PencilLine,
  Plus,
  Trash,
} from "lucide-react";
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
import { TooltipProvider } from "@/components/ui/tooltip";
import TableTooltip from "@/components/table-tooltip";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

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

export default function Page() {
  const { dataByMonth } = useFetchCapital();

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      capital: "",
      purchase: "",
      sell: "",
    },
  });

  const [selectedYear, setSelectedYear] = useState<string>(""); // State untuk menyimpan tahun yang dipilih

  const totalTax = dataByMonth.reduce(
    (total, item) => total + (item.totalPurchase * 0.5) / 100,
    0
  );

  const totalPurchase = dataByMonth.reduce(
    (total, item) => total + item.totalPurchase,
    0
  );

  const monthLength = dataByMonth.length;

  const cardInfos: CardInfo[] = [
    {
      title: "Total Purchase",
      value: totalPurchase,
      desc: `From last ${monthLength} Months`,
      percent: 0,
      active: false,
    },
    {
      title: "Total Tax PPh",
      value: (totalPurchase - 500000000) * 0.005,
      desc: `From last ${monthLength} Months`,
      percent: 0,
      active: false,
    },
  ];

  const calculateZakat = (value: number): number => {
    if (value <= 0) return 0;

    const ppn = value * 0.01; // Menghitung ppn 1%
    const bruto = value - ppn; // Total setelah ppn
    const profit = (bruto * 9) / 100; // keuntungan 9%
    return (profit * 2.5) / 100; // Zakat Bruto 3%
  };

  // const handleYearChange = (value: string) => {
  //   const year = value;
  //   setSelectedYear(year);
  // };

  function formatShortCurrency(num: number): string {
    const isNegative = num < 0;
    const abs = Math.abs(num);

    let formatted = "";

    if (abs >= 1_000_000) formatted = (abs / 1_000_000).toFixed(3) + " M";
    else if (abs >= 1_000) formatted = (abs / 1_000).toFixed(0) + " K";
    else formatted = abs.toString();

    return (isNegative ? "-" : "") + formatted;
  }

  return (
    <IntlProvider locale="id-ID">
      <div className="w-full flex flex-col gap-5 px-10 mt-5 pb-10">
        <div className="w-full grid grid-cols-3 gap-2">
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

        {/* <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger className="w-[180px] border-slate-800">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select year</SelectLabel>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}

        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Tax Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Purchase</TableHead>
                    <TableHead>Sell</TableHead>
                    <TableHead>Gross</TableHead>
                    <TableHead>PPh</TableHead>
                    <TableHead>PPn 1%</TableHead>
                    <TableHead>Zakat 2.5%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataByMonth.map(({ date, totalPurchase, totalSell }, i) => {
                    const pph = totalPurchase * 0.005;
                    const ppn = totalPurchase * 0.01;
                    const zakat = calculateZakat(totalPurchase);
                    const grossProfit = totalPurchase - totalSell;

                    const invest =
                      grossProfit <= 0
                        ? 0
                        : (grossProfit - pph - ppn - zakat) * 0.01;

                    const allPrice = [
                      totalPurchase,
                      totalSell,
                      grossProfit,
                      pph,
                      ppn,
                      zakat,
                    ];

                    return (
                      <TableRow key={i}>
                        <TableCell>{date.toString()}</TableCell>

                        {allPrice.map((price, i) => (
                          <TableCell key={i}>
                            <FormattedNumber
                              value={price}
                              style="currency"
                              currency="IDR"
                              minimumFractionDigits={0}
                              maximumFractionDigits={0}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Tax Management Syariah</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Purchase</TableHead>
                    <TableHead>Sell</TableHead>
                    <TableHead>Gross</TableHead>
                    <TableHead>PPn 1%</TableHead>
                    <TableHead>Zakat 2.5%</TableHead>
                    <TableHead>Netto</TableHead>
                    <TableHead>Invest 20%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataByMonth.map(({ date, totalPurchase, totalSell }, i) => {
                    const ppn = totalPurchase * 0.01;
                    const grossProfit = totalPurchase - totalSell;

                    const grossAfterPPN = grossProfit - ppn;

                    const zakat =
                      grossAfterPPN > 0 ? ((grossProfit - ppn) * 2.5) / 100 : 0;

                    const netProfit =
                      grossAfterPPN <= 0 ? 0 : grossProfit - ppn - zakat;

                    const invest20 =
                      grossAfterPPN <= 0
                        ? 0
                        : (grossProfit - ppn - zakat) * 0.2;

                    const allPrice = [
                      totalPurchase,
                      totalSell,
                      grossProfit,
                      ppn,
                      zakat,
                      netProfit,
                      invest20,
                    ];

                    return (
                      <TableRow key={i}>
                        <TableCell>{date.toString()}</TableCell>

                        {allPrice.map((price, i) => (
                          <TableCell key={i}>
                            <FormattedNumber
                              value={price}
                              style="currency"
                              currency="IDR"
                              minimumFractionDigits={0}
                              maximumFractionDigits={0}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </IntlProvider>
  );
}
