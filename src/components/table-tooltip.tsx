import React, { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

const TableTooltip = ({
  icon,
  text,
  variant = "default",
}: {
  icon: ReactNode;
  text: string;
  variant?: "default" | "outline" | "destructive";
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={variant}>{icon}</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TableTooltip;
