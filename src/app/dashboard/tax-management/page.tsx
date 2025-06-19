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
  const { refetch, insertData, dataByMonth } = useFetchCapital();

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      capital: "",
      purchase: "",
      sell: "",
    },
  });

  const { handleSubmit } = form;

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
      title: "Total Tax",
      value: totalTax,
      desc: `From last ${monthLength} Months`,
      percent: 0,
      active: false,
    },
    {
      title: "Total Purchase",
      value: totalPurchase,
      desc: `From last ${monthLength} Months`,
      percent: 0,
      active: false,
    },
  ];

  const calculateZakat = (value: number): number => {
    const ppn = value * 0.01; // Menghitung ppn 1%
    const bruto = value - ppn; // Total setelah ppn
    const profit = (bruto * 9) / 100; // keuntungan 9%
    return (profit * 3) / 100; // Zakat Bruto 3%
  };

  const handleYearChange = (value: string) => {
    const year = value;
    setSelectedYear(year); // Mengupdate tahun yang dipilih
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

        <Select value={selectedYear} onValueChange={handleYearChange}>
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
        </Select>

        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Tax Management Zuhal Ganteng Pol Pol an 12345</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Purchase</TableHead>
                    <TableHead>PPh</TableHead>
                    <TableHead>PPn 1%</TableHead>
                    <TableHead>Zakat Bruto 3%</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataByMonth.map(({ date, totalPurchase }, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{date.toString()}</TableCell>

                      <TableCell>
                        <FormattedNumber
                          value={totalPurchase}
                          style="currency"
                          currency="IDR"
                          minimumFractionDigits={0}
                        />
                      </TableCell>

                      <TableCell>
                        <FormattedNumber
                          value={(totalPurchase * 0.5) / 100}
                          style="currency"
                          currency="IDR"
                          minimumFractionDigits={0}
                        />
                      </TableCell>

                      <TableCell>
                        <FormattedNumber
                          value={(totalPurchase * 1) / 100}
                          style="currency"
                          currency="IDR"
                          minimumFractionDigits={0}
                        />
                      </TableCell>

                      <TableCell>
                        <FormattedNumber
                          value={calculateZakat(totalPurchase)}
                          style="currency"
                          currency="IDR"
                          maximumFractionDigits={0}
                        />
                      </TableCell>

                      <TableCell>
                        <TooltipProvider>
                          <div className="flex gap-2">
                            <TableTooltip
                              text="Edit Data"
                              icon={<PencilLine />}
                            />
                            <TableTooltip
                              text="Delete Data"
                              icon={<Trash />}
                              variant="destructive"
                            />
                          </div>
                        </TooltipProvider>
                      </TableCell>
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
