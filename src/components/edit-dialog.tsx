import { ReactNode } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import TableTooltip from "./table-tooltip";
import { PencilLine } from "lucide-react";

type Props = {
  trigger?: ReactNode;
  children?: ReactNode;
  reset: any;
  code?: string;
  desc?: string;
};

const EditDialog = ({ trigger, children, reset, code, desc }: Props) => {
  const handleOnClick = () => reset({ code, desc });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="outline-none" onClick={handleOnClick}>
          {trigger}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
};

export default EditDialog;
