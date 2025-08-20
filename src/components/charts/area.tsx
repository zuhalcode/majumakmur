"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, Brush, CartesianGrid, XAxis } from "recharts";
import { SVGProps, useState } from "react";

type Props = {
  chartConfig: ChartConfig;
  areas?: AreaConfig[];
  data: any[];
  defs?: SVGProps<SVGDefsElement>;
};

const CustomAreaChart = ({ chartConfig, areas, data, defs }: Props) => {
  const tickFormatter = (value: string) => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  };

  const [brushDomain, setBrushDomain] = useState<[number, number]>([0, 7]); // Initial view of 7 days

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-screen w-full"
    >
      <AreaChart data={data}>
        {defs || (
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="10%"
                stopColor="hsl(var(--chart-1))"
                stopOpacity={0.8}
              />
              <stop
                offset="90%"
                stopColor="hsl(var(--chart-1))"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--chart-2))"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--chart-2))"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
        )}

        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="date"
          tickMargin={8}
          minTickGap={32}
          tickFormatter={tickFormatter}
        />

        <ChartTooltip
          cursor={false}
          label="Cash Flow"
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                });
              }}
              indicator="dot"
            />
          }
        />

        {areas?.map(({ dataKey, fill, stroke }, i) => (
          <Area
            key={i}
            dataKey={dataKey}
            type="natural"
            fill={fill}
            stroke={stroke}
          />
        ))}

        <ChartLegend content={<ChartLegendContent />} />
        <Brush
          dataKey="date"
          height={30}
          stroke="green"
          startIndex={brushDomain[0]}
          endIndex={brushDomain[1]}
          onChange={(domain) => setBrushDomain(domain as [number, number])}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default CustomAreaChart;
