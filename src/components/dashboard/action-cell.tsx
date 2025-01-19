"use client";

import React, { useRef } from "react";
import { TooltipProvider } from "../ui/tooltip";
import TableTooltip from "../table-tooltip";
import { PencilLine, Trash } from "lucide-react";
import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { TableCell } from "../ui/table";
import CustomAlertDialog from "../custom-alert-dialog";
import { Input } from "../ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { FormMessage } from "../form-message";

type EditFormSchema = {
  header: string; // Nama header kolom
  accessor: string;
  type: string;
};

type CurrentData = {
  [key: string]: any;
};

type ActionCellProps = {
  id: number;
  handleOnDelete: (id: number) => void;
  handleOnEdit: (id: number, updatedData: Record<string, any>) => void;
  editFormSchema: EditFormSchema[];
  data: CurrentData;
};

// Membuat skema dinamis berdasarkan editFormSchema
const generateFormSchema = (editFormSchema: EditFormSchema[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  editFormSchema.forEach(({ accessor, type }) => {
    switch (type) {
      case "date":
        schemaFields[accessor] = z
          .string()
          .min(1, { message: `${accessor} is required` })
          .refine((val) => !isNaN(Date.parse(val)), {
            message: `${accessor} must be a valid date`,
          });
        break;

      case "number":
        schemaFields[accessor] = z
          .number({ invalid_type_error: `${accessor} must be a number` })
          .min(0, { message: `${accessor} must be at least 0` });
        break;

      case "text":
      default:
        schemaFields[accessor] = z
          .string()
          .min(1, { message: `${accessor} is required` });
    }
  });

  return z.object(schemaFields);
};

const ActionCell = ({
  id,
  editFormSchema,
  data,
  handleOnDelete,
  handleOnEdit,
}: ActionCellProps) => {
  const formSchema = generateFormSchema(editFormSchema);

  type Form = z.infer<typeof formSchema>;

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: editFormSchema?.reduce((acc, { accessor }) => {
      acc[accessor] = data[accessor];
      return acc;
    }, {} as Form),
  });

  const { handleSubmit, control } = form;

  const handleOnSubmit = handleSubmit(async (values) => {
    handleOnEdit(id, values);
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <TableCell>
      <TooltipProvider>
        <div className="flex gap-2">
          <CustomAlertDialog
            trigger={
              <TableTooltip
                text="Edit Data"
                icon={<PencilLine />}
                variant="default"
              />
            }
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Data</AlertDialogTitle>
              <AlertDialogDescription>
                Please ensure that all the information you entered is correct
                before proceeding.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <Form {...form}>
              <form
                ref={formRef}
                onSubmit={handleOnSubmit}
                className="grid grid-cols-2 gap-4 py-4"
              >
                {editFormSchema?.map(({ header, accessor, type }, i) => (
                  <FormField
                    key={i}
                    control={control}
                    name={accessor}
                    render={({ field }) => {
                      return (
                        <FormItem className="space-y-2">
                          <FormLabel>{header}</FormLabel>
                          <FormControl>
                            <Input {...field} type={type} />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </form>
            </Form>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  formRef.current?.requestSubmit();
                }}
              >
                Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </CustomAlertDialog>

          <CustomAlertDialog
            trigger={
              <TableTooltip
                text="Delete Data"
                icon={<Trash />}
                variant="destructive"
              />
            }
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                data with ID {id}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleOnDelete(id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </CustomAlertDialog>
        </div>
      </TooltipProvider>
    </TableCell>
  );
};

export default ActionCell;
