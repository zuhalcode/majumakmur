import { Banknote } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { FormattedNumber } from "react-intl";

export default function PriceCard({ title, value, color }: PriceCardProps) {
  return (
    <Card className="bg-[#0D0F00]">
      <CardHeader>
        <CardTitle className="flex justify-between text-base">
          <p style={{ color }}>{title}</p>

          <Banknote className="size-7 md:hidden" style={{ color }} />
        </CardTitle>

        <div className="text-2xl md:text-xl font-bold">
          <FormattedNumber
            value={value}
            style="currency"
            currency="IDR"
            minimumFractionDigits={0}
          />
        </div>
      </CardHeader>
    </Card>
  );
}
