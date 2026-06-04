"use client";

//#regionimports
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

import { TaxReport } from "@/types/data/tax";
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

//#endregion

export default function TaxManagementPage({
  data,
  cardInfos,
  columns,
  loading,
}: {
  data: TaxReport[];
  cardInfos: CardInfo[];
  columns: ColumnConfig[];
  loading: boolean;
}) {
  // const handleYearOnValueChange = (value: string) => setYear(value);
  // const disabledInvalidFiltering = year === 0 ? true : false;

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

  const CurrencyCell = ({ value }: { value: number }) => (
    <TableCell>
      <FormattedNumber
        value={value}
        style="currency"
        currency="IDR"
        minimumFractionDigits={0}
        maximumFractionDigits={0}
      />
    </TableCell>
  );

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
          <Select
          // value={year.toString()}
          // onValueChange={handleYearOnValueChange}
          >
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
              // disabled={disabledInvalidFiltering}
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
                    <TableHead>Invest 20%</TableHead>
                    <TableHead>Zakat 2.5%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell>{row.date}</TableCell>
                      <CurrencyCell value={row.totalPurchase} />
                      <CurrencyCell value={row.totalSell} />
                      <CurrencyCell value={row.grossProfit} />
                      <CurrencyCell value={row.pph} />
                      <CurrencyCell value={row.ppn} />
                      <CurrencyCell value={row.invest20} />
                      <CurrencyCell value={row.zakat} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </IntlProvider>
  );
}
