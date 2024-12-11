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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Prefix, useFetchPrefix } from "@/hooks/use-prefix";
import { useEffect } from "react";
import CustomDialog from "@/components/custom-alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import CustomAlertDialog from "@/components/custom-alert-dialog";
import EditDialog from "@/components/edit-dialog";
import DashboardTable from "@/components/dashboard/dashboard-table";

const formSchema = z.object({
  id: z.number().min(0).optional(),
  code: z.string().min(2).max(2),
  desc: z.string().min(0).optional(),
});

type Form = z.infer<typeof formSchema>;

export default function Page() {
  const { data, loading, error, refetch, insertData, editData, deleteData } =
    useFetchPrefix();

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      desc: "",
    },
  });

  const { handleSubmit, control, setError } = form;

  const editForm = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      code: "",
      desc: "",
    },
  });

  const {
    control: controlEdit,
    handleSubmit: handleSubmitEdit,
    control: editControl,
    reset: resetEdit,
  } = editForm;

  const handleOnSubmit = handleSubmit(async ({ code, desc }) => {
    try {
      const prefixData: Prefix = {
        code: code.toUpperCase(),
        desc,
      };

      await insertData(prefixData);

      refetch();
    } catch (err) {
      console.error("Error inserting data:", error);
    }
  });

  const handleOnSubmitEdit = handleSubmitEdit(async ({ code, desc, id }) => {
    const prefixId = Number(id);

    try {
      const prefixData: Prefix = {
        code: code.toUpperCase(),
        desc,
      };

      await editData(prefixId, prefixData);
      console.log(error);

      refetch();
    } catch (err) {
      console.error("Error updating data:", err);
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

  useEffect(() => {
    if (error) {
      setError("code", {
        type: "manual",
        message: error, // Memperbarui error di form
      });
    }
  }, [error, form]);

  const columns = [
    { header: "Code", accessor: "code" },
    { header: "Description", accessor: "desc" },
  ];

  return (
    <div className="w-full flex flex-col gap-5 px-10 mt-5 pb-10">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Codes</CardTitle>
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
                  name="code"
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-2">
                        <FormLabel>Unique Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={loading}
                            placeholder="Code"
                            maxLength={2}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={control}
                  name="desc"
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={loading}
                            placeholder="Description"
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
  );
}
