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
import { Gold, useFetchGoldType } from "@/hooks/use-gold-type";

const formSchema = z.object({
  karat: z.string().min(0).optional(),
  exchange_percent: z.string().min(0).optional(),
  melting_percent: z.string().min(0).optional(),
});

type Form = z.infer<typeof formSchema>;

export default function Page() {
  const { data, refetch, loading, insertData } = useFetchGoldType();

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      karat: "",
      exchange_percent: "",
      melting_percent: "",
    },
  });

  const { handleSubmit, control } = form;

  const handleOnSubmit = handleSubmit(async (values) => {
    try {
      const goldTypeData: Gold = {
        karat: Number(values.karat),
        exchange_percent: Number(values.exchange_percent) / 100,
        melting_percent: Number(values.melting_percent) / 100,
      };

      await insertData(goldTypeData);

      refetch();
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  });

  return (
    <IntlProvider locale="id-ID">
      <div className="w-full flex flex-col gap-5 px-10 mt-5">
        <Card className="w-full mx-auto">
          <CardHeader>
            <CardTitle>Gold Type Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={handleOnSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
                >
                  <FormField
                    control={control}
                    name="karat"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Karat</FormLabel>
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
                    name="exchange_percent"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Exchange Percent</FormLabel>
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
                    name="melting_percent"
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>Melting Percent</FormLabel>
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
                    <TableHead>Karat</TableHead>
                    <TableHead>Exchange Percent</TableHead>
                    <TableHead>Melting Percent</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map(
                    ({ id, karat, exchange_percent, melting_percent }, i) => (
                      <TableRow key={id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{karat}</TableCell>
                        <TableCell>
                          <FormattedNumber
                            value={exchange_percent}
                            currency="IDR"
                            minimumFractionDigits={0}
                          />
                        </TableCell>
                        <TableCell>
                          <FormattedNumber
                            value={melting_percent}
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
                              <TableTooltip
                                text="Delete Data"
                                icon={<Trash />}
                                variant="destructive"
                              />
                            </div>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    )
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
