"use client";

import {
  Table,
  TableBody,
  TableCell,
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

import { FormattedDate, FormattedNumber, IntlProvider } from "react-intl";
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
import { cn } from "@/lib/utils";
import { useFetchDailyTransaction } from "@/hooks/use-daily-transaction";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CustomAlert from "@/components/custom-alert-dialog";
import { useEffect, useState } from "react";

const formSchema = z.object({
  buy_date: z.string().min(1, { message: "Date is required" }),
  buy_price: z.string().min(0).optional(),
  sell_date: z.string().min(1, { message: "Date is required" }),
  sell_price: z.string().min(0).optional(),
});

type Form = z.infer<typeof formSchema>;

type DailyTransaction = {
  buy_date: Date;
  buy_price: number;
  sell_date: Date;
  sell_price: number;
};

type CardInfo = {
  title: string;
  value: number;
  desc?: string;
  percent: number;
  active: boolean;
};

export default function Page() {
  const { data, loading, refetch, insertData, deleteData } =
    useFetchDailyTransaction();

  const today = new Date().toISOString().split("T")[0];

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buy_date: today,
      buy_price: "",
      sell_date: today,
      sell_price: "",
    },
  });

  const { handleSubmit, control } = form;

  const handleOnSubmit = handleSubmit(async (values) => {
    try {
      const transactionData: DailyTransaction = {
        buy_date: new Date(values.buy_date),
        buy_price: Number(values.buy_price),
        sell_date: new Date(values.sell_date),
        sell_price: Number(values.sell_price),
      };

      await insertData(transactionData);

      refetch();
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  });

  const handleOnDelete = async (id: number | undefined) => {
    if (!id) {
      console.error("ID is not Valid");
      return;
    }

    try {
      await deleteData(id);
      refetch();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const totalSurplusIncome = data.reduce((total, { sell_price, buy_price }) => {
    const surplus = buy_price - sell_price;
    return surplus > 0 ? total + surplus : total;
  }, 0);

  const totalDeficitIncome = data.reduce((total, { sell_price, buy_price }) => {
    const deficit = sell_price - buy_price;
    return deficit > 0 ? total + deficit : total;
  }, 0);

  const totalIncome = totalSurplusIncome - totalDeficitIncome;

  const firstDateSell = new Date(data[data.length - 1]?.sell_date).getTime();
  const lastDateSell = new Date(data[0]?.sell_date).getTime();

  const sellDays = Math.abs(
    Math.ceil(firstDateSell - lastDateSell) / (1000 * 60 * 60 * 24)
  );

  const cardInfos: CardInfo[] = [
    {
      title: "Total Sell Income",
      value: totalIncome,
      desc: `From last ${sellDays} days`,
      percent: Number(((totalIncome / totalSurplusIncome) * 100).toFixed(2)),
      active: true,
    },
    {
      title: "Total Surplus",
      value: totalSurplusIncome,
      desc: `From last ${sellDays} days`,
      percent: 0,
      active: false,
    },
    {
      title: "Total Deficit",
      value: totalDeficitIncome,
      desc: `From last ${sellDays} days`,
      percent: 0,
      active: false,
    },
  ];

  const [dateDifferences, setDateDifferences] = useState<number[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const differences = data.map(({ sell_date, buy_date }) => {
        const sellDate = new Date(sell_date);
        const buyDate = new Date(buy_date);

        // Pastikan kedua tanggal valid
        if (isNaN(sellDate.getTime()) || isNaN(buyDate.getTime())) {
          return 0; // Jika ada tanggal yang invalid, kembalikan 0
        }

        // Menghitung selisih dalam milidetik
        const diffInMilliseconds = sellDate.getTime() - buyDate.getTime();

        // Mengonversi milidetik menjadi hari
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

        return diffInDays;
      });
      setDateDifferences(differences);
    }
  }, [data]);

  const columns = [
    { header: "Buy Date", accessor: "buy_date", type: "date" },
    { header: "Sell Date", accessor: "sell_date", type: "date" },
    { header: "Buy Price", accessor: "buy_price", type: "number" },
    { header: "Sell Price", accessor: "sell_price", type: "number" },
  ];

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
                        {percent} %
                      </p>
                    ) : (
                      <p className="flex items-center text-red-500">
                        <MoveDown className="size-5" />
                        {percent} %
                      </p>
                    ))}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Sell Transaction</CardTitle>
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
                    name="sell_date"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Sell Date</FormLabel>
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
                    name="buy_date"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Buy Date</FormLabel>
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
                    name="buy_price"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Buy Price</FormLabel>
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
                    name="sell_price"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Sell Price</FormLabel>
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

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Buy Date</TableHead>
                    <TableHead>Sell Date</TableHead>
                    <TableHead>Buy Price</TableHead>
                    <TableHead>Sell Price</TableHead>
                    <TableHead>Income</TableHead>
                    <TableHead>In Days</TableHead>
                    <TableHead>Salary/mo</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map(
                    ({ id, buy_date, sell_date, buy_price, sell_price }, i) => {
                      const sellDate = new Date(sell_date);
                      const buyDate = new Date(buy_date);
                      return (
                        <TableRow key={id}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>
                            <FormattedDate
                              value={buyDate}
                              year="numeric"
                              month="2-digit"
                              day="2-digit"
                            />
                          </TableCell>

                          <TableCell>
                            <FormattedDate
                              value={sellDate}
                              year="numeric"
                              month="2-digit"
                              day="2-digit"
                            />
                          </TableCell>

                          <TableCell>
                            <FormattedNumber
                              value={buy_price}
                              style="currency"
                              currency="IDR"
                              minimumFractionDigits={0}
                            />
                          </TableCell>

                          <TableCell>
                            <FormattedNumber
                              value={sell_price}
                              style="currency"
                              currency="IDR"
                              minimumFractionDigits={0}
                            />
                          </TableCell>

                          <TableCell>
                            <FormattedNumber
                              value={buy_price - sell_price}
                              style="currency"
                              currency="IDR"
                              minimumFractionDigits={0}
                            />
                          </TableCell>

                          <TableCell>
                            <FormattedNumber
                              value={dateDifferences[i]}
                              currency="IDR"
                              minimumFractionDigits={0}
                            />
                          </TableCell>

                          <TableCell>
                            <FormattedNumber
                              value={Math.floor(
                                ((buy_price - sell_price) /
                                  dateDifferences[i]) *
                                  12
                              )}
                              style="currency"
                              currency="IDR"
                              minimumFractionDigits={0}
                            />
                          </TableCell>

                          <TableCell>
                            <TooltipProvider>
                              <div className="flex gap-2">
                                <TableTooltip
                                  text="Edit Data"
                                  icon={<PencilLine />}
                                />

                                <CustomAlert
                                  trigger={
                                    <TableTooltip
                                      text="Delete Data"
                                      icon={<Trash />}
                                      variant="destructive"
                                    />
                                  }
                                >
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete the data with id {id}.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleOnDelete(id)}
                                    >
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </CustomAlert>
                              </div>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </IntlProvider>
  );
}
