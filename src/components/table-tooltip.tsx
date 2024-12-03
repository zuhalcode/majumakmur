import React, { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

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
      <TooltipTrigger asChild className="flex items-center cursor-pointer">
        <Badge variant={variant}>{icon}</Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TableTooltip;
