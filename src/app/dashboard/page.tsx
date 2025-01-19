"use client";

import { Banknote } from "lucide-react";
import { useFetchGold } from "@/hooks/use-gold";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormattedNumber, IntlProvider } from "react-intl";

export default function Page() {
  const { data } = useFetchGold();

  const goldRates = [
    { karat: 6, exchange: 35, melt: 28, color: "#D0A25C" },
    { karat: 8, exchange: 45, melt: 36, color: "#F1C14B" },
    { karat: 9, exchange: 48.5, melt: 40, color: "#F9D44D" },
    { karat: 16, exchange: 77, melt: 68, color: "#F5C541" },
  ];

  return (
    <>
      <IntlProvider locale="id-ID">
        <div className="w-full flex flex-col gap-5 p-10 ">
          <div className="w-full grid grid-cols-6 gap-5">
            <Card className="col-start-2 col-span-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <p style={{ color: "#FFD700" }}>
                    24K <span className="text-white">Local Gold</span>{" "}
                  </p>
                  <Banknote className="size-7" style={{ color: "#FFD700" }} />
                </CardTitle>
                <div className="text-2xl font-bold">
                  <FormattedNumber
                    value={data[0]?.price}
                    style="currency"
                    currency="IDR"
                  />
                </div>
                <CardDescription className="flex flex-col">
                  +20.1% from last month
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="col-start-4 col-span-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <p style={{ color: "#FFD700" }}>
                    24K <span className="text-white">Current Gold</span>{" "}
                  </p>
                  <Banknote className="size-7" style={{ color: "#FFD700" }} />
                </CardTitle>
                <div className="text-2xl font-bold">
                  <FormattedNumber
                    value={data[0]?.price - 16000}
                    style="currency"
                    currency="IDR"
                  />
                </div>
                <CardDescription className="flex flex-col">
                  +20.1% from last month
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="w-full grid grid-cols-4 gap-5">
            {goldRates.map(({ karat, exchange, color }, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K{" "}
                      <span className="text-white">Gold Wholesale</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      value={(data[0]?.price * exchange) / 100}
                      style="currency"
                      currency="IDR"
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    +20.1% from last month
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="w-full grid grid-cols-4 gap-5">
            {goldRates.map(({ karat, melt, color }, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K <span className="text-white">Gold Melt</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      value={(data[0]?.price * melt) / 100}
                      style="currency"
                      currency="IDR"
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    +20.1% from last month
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="w-full grid grid-cols-4 gap-5">
            {goldRates.map(({ karat, exchange, color }, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K{" "}
                      <span className="text-white">Gold Wholesale</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      value={((data[0]?.price * exchange) / 100) * 1.1}
                      style="currency"
                      currency="IDR"
                    />
                  </div>
                  <CardDescription className="flex flex-col">
                    +20.1% from last month
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </IntlProvider>
    </>
  );
}
