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
import { BuyAndSell } from "@/types/chart";
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
                    <TableHead>No</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Purchase</TableHead>
                    <TableHead>Sell</TableHead>
                    <TableHead>Gross</TableHead>
                    <TableHead>PPh</TableHead>
                    <TableHead>PPn 1%</TableHead>
                    <TableHead>Zakat 2.5%</TableHead>
                    <TableHead>Invest</TableHead>
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

                    return (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{date.toString()}</TableCell>

                        {/* Purchase */}
                        <TableCell>
                          <FormattedNumber
                            value={totalPurchase}
                            style="currency"
                            currency="IDR"
                            minimumFractionDigits={0}
                          />
                        </TableCell>

                        {/* Sell */}
                        <TableCell>
                          <FormattedNumber
                            value={totalSell}
                            style="currency"
                            currency="IDR"
                            minimumFractionDigits={0}
                          />
                        </TableCell>

                        {/* Sell */}
                        <TableCell>
                          <FormattedNumber
                            value={grossProfit}
                            style="currency"
                            currency="IDR"
                            minimumFractionDigits={0}
                          />
                        </TableCell>

                        {/* PPh */}
                        <TableCell>
                          <FormattedNumber
                            value={pph}
                            style="currency"
                            currency="IDR"
                            minimumFractionDigits={0}
                          />
                        </TableCell>

                        {/* PPn */}
                        <TableCell>
                          <FormattedNumber
                            value={ppn}
                            style="currency"
                            currency="IDR"
                            minimumFractionDigits={0}
                          />
                        </TableCell>

                        {/* Zakat */}
                        <TableCell>
                          <FormattedNumber
                            value={zakat}
                            style="currency"
                            currency="IDR"
                            maximumFractionDigits={0}
                          />
                        </TableCell>

                        {/* Invest */}
                        <TableCell>
                          <FormattedNumber
                            value={invest}
                            style="currency"
                            currency="IDR"
                            maximumFractionDigits={0}
                          />
                        </TableCell>
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
                    <TableHead>Invest 1%</TableHead>
                    <TableHead>Invest 10%</TableHead>
                    <TableHead>Invest 20%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataByMonth.map(({ date, totalPurchase, totalSell }, i) => {
                    const ppn = totalPurchase * 0.01;
                    const grossProfit = totalPurchase - totalSell;

                    const zakat = calculateZakat(grossProfit);

                    const netProfit =
                      grossProfit <= 0 ? 0 : grossProfit - ppn - zakat;

                    const invest =
                      grossProfit <= 0 ? 0 : (grossProfit - ppn - zakat) * 0.01;
                    const invest10 =
                      grossProfit <= 0 ? 0 : (grossProfit - ppn - zakat) * 0.1;
                    const invest20 =
                      grossProfit <= 0 ? 0 : (grossProfit - ppn - zakat) * 0.2;

                    return (
                      <TableRow key={i}>
                        <TableCell>{date.toString()}</TableCell>

                        {/* Purchase */}
                        <TableCell>
                          <FormattedNumber
                            value={totalPurchase}
                            style="currency"
                            currency="IDR"
                            minimumFractionDigits={0}
                          />
                        </TableCell>

                        {/* Sell */}
                        <TableCell>
                          <FormattedNumber
                            value={totalSell}
                            style="currency"
                            currency="IDR"
                            minimumFractionDigits={0}
                          />
                        </TableCell>

                        {/* Gross Profit */}
                        <TableCell>
                          <FormattedNumber
                            value={grossProfit}
                            style="currency"
                            currency="IDR"
                            minimumFractionDigits={0}
                          />
                        </TableCell>

                        {/* PPn */}
                        <TableCell>
                          <FormattedNumber
                            value={ppn}
                            style="currency"
                            currency="IDR"
                            minimumFractionDigits={0}
                          />
                        </TableCell>

                        {/* Zakat */}
                        <TableCell>
                          <FormattedNumber
                            value={zakat}
                            style="currency"
                            currency="IDR"
                            maximumFractionDigits={0}
                          />
                        </TableCell>

                        {/* Net Profit */}
                        <TableCell>
                          <FormattedNumber
                            value={netProfit}
                            style="currency"
                            currency="IDR"
                            maximumFractionDigits={0}
                          />
                        </TableCell>

                        {/* Invest */}
                        <TableCell>
                          <FormattedNumber
                            value={invest}
                            style="currency"
                            currency="IDR"
                            maximumFractionDigits={0}
                          />
                        </TableCell>

                        {/* Invest 10% */}
                        <TableCell>
                          <FormattedNumber
                            value={invest10}
                            style="currency"
                            currency="IDR"
                            maximumFractionDigits={0}
                          />
                        </TableCell>

                        {/* Invest 20% */}
                        <TableCell>
                          <FormattedNumber
                            value={invest20}
                            style="currency"
                            currency="IDR"
                            maximumFractionDigits={0}
                          />
                        </TableCell>
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
