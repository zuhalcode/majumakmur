"use client";
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

import DashboardTable from "@/components/dashboard/dashboard-table";
import { CapitalForm, capitalFormSchema } from "@/schemas/capital.schema";
import { Capital, CardInfo, ColumnConfig } from "@/types/ui/dashboard/capital";

export default function CapitalManagementPage({
  data,
  cardInfos,
  columns,
  refetch,
  createData,
  deleteData,
  loading,
}: {
  data: Capital[];
  cardInfos: CardInfo[];
  columns: ColumnConfig[];
  refetch: () => Promise<void>;
  createData: (capital: Capital) => Promise<void>;
  deleteData: (id: number) => Promise<void>;
  loading: boolean;
}) {
  const today = new Date().toISOString().split("T")[0]; // Hitung di luar komponen

  const form = useForm<CapitalForm>({
    resolver: zodResolver(capitalFormSchema),
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

      await createData(transactionData);

      refetch();
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  });

  const handleOnDelete = async (id: number) => {
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

        {/* <div className="flex gap-5 flex-col">
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
        </div> */}

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

              <DashboardTable
                columns={columns}
                data={data}
                handleOnDelete={handleOnDelete}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </IntlProvider>
  );
}
