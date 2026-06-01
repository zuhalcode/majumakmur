"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Banknote, Loader, MoveDown, MoveUp, RefreshCcw } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FormattedNumber, IntlProvider } from "react-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Tax } from "@/types/data/tax";
import { CardInfo, ColumnConfig } from "@/types/ui/dashboard/capital";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useState } from "react";

export default function TaxManagementPage({
  data,
  cardInfos,
  columns,
  loading,
}: {
  data: Tax[];
  cardInfos: CardInfo[];
  columns: ColumnConfig[];
  loading: boolean;
}) {
  const [year, setYear] = useState<string>("year");

  const handleYearOnValueChange = (value: string) => setYear(value);
  const disabledInvalidFiltering = year === "year" ? true : false;

  const handleFilterOnClick = async () => {
    console.log(data);
    // if (year === "year" ) return;
    // await fetchData({ year });
  };

  // const handleRefresh = async () => {
  //   setYear("year");
  //   await refetch();
  // };

  const calculateZakat = (value: number): number => {
    if (value <= 0) return 0;

    const ppn = value * 0.01; // Menghitung ppn 1%
    const bruto = value - ppn; // Total setelah ppn
    const profit = (bruto * 9) / 100; // keuntungan 9%
    return (profit * 2.5) / 100; // Zakat Bruto 3%
  };

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

        <div className="flex gap-2">
          <Select value={year} onValueChange={handleYearOnValueChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="year">Year</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Button variant="outline" size="icon">
              <RefreshCcw />
            </Button>
            <Button
              variant="outline"
              onClick={handleFilterOnClick}
              disabled={disabledInvalidFiltering}
            >
              {loading ? <Loader /> : "Filter"}
            </Button>
          </div>
        </div>

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
                  {data.map(({ date, totalPurchase, totalSell }, i) => {
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
                  {data.map(({ date, totalPurchase, totalSell }, i) => {
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
