"use client";

import { Banknote } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function Page() {
  const [state, setState] = useState<{ goldPrice: number }>({
    goldPrice: 1591000,
  });

  const goldRates = [
    { karat: 16, exchange: 77, melt: 68, color: "#F5C541" },
    { karat: 9, exchange: 49, melt: 40, color: "#F9D44D" },
    { karat: 8, exchange: 45, melt: 36, color: "#F1C14B" },
    { karat: 6, exchange: 36, melt: 28, color: "#D0A25C" },
  ];

  const calculateGoldPrice = (goldPrice: number, rate: number) => {
    const exchange = goldPrice * (rate / 100);
    const price5 = exchange + exchange * (5 / 100);
    const price10 = exchange + exchange * (10 / 100);
    const price12 = exchange + exchange * (12 / 100);
    return { exchange, price5, price10, price12 };
  };

  const goldPrices = goldRates.map((rate) => ({
    karat: rate.karat,
    ...calculateGoldPrice(state.goldPrice, rate.exchange),
  }));

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const goldPrice = formData.get("gold") as string;

    setState({
      ...state,
      goldPrice: parseInt(goldPrice),
    });
  };

  return (
    <>
      <IntlProvider locale="id-ID">
        <div className="w-full flex items-center mx-auto justify-center py-5 px-5 sm:px-0">
          <form
            onSubmit={handleOnSubmit}
            className="flex w-full max-w-sm items-center space-x-2"
          >
            <Input
              type="text"
              name="gold"
              placeholder="1591000"
              onKeyDown={(e) => {
                if (/^[a-zA-Z]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <Button type="submit">Update</Button>
          </form>
        </div>

        <div className="w-full flex flex-col gap-5 px-10 pb-10">
          {/* 24 Karat */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-5">
            <Card className="col-start-1  md:col-start-2 lg:col-start-3 col-span-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  <p style={{ color: "#FFD700" }}>
                    24K <span className="text-white">Emas Murni</span>{" "}
                  </p>
                  <Banknote className="size-7" style={{ color: "#FFD700" }} />
                </CardTitle>
                <div className="text-2xl font-bold">
                  <FormattedNumber
                    value={state.goldPrice}
                    style="currency"
                    currency="IDR"
                    minimumFractionDigits={0}
                  />
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Grosir */}
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            {goldRates.map(({ karat, color }, i) => (
              <Card key={i} className="bg-[#0D0F00]">
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K <span className="text-white">Grosir Emas</span>{" "}
                    </p>
                    <Banknote className="size-7 md:hidden" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl md:text-xl font-bold">
                    <FormattedNumber
                      value={Math.ceil(goldPrices[i]?.exchange)}
                      style="currency"
                      currency="IDR"
                      minimumFractionDigits={0}
                    />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Sell +5 % */}
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            {goldRates.map(({ karat, color }, i) => (
              <Card key={i} className="bg-[#1A1F00]">
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K <span className="text-white">Jual + 5%</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      value={Math.ceil(goldPrices[i]?.price5)}
                      style="currency"
                      currency="IDR"
                      minimumFractionDigits={0}
                    />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Sell +10 % */}
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            {goldRates.map(({ karat, color }, i) => (
              <Card key={i} className="bg-[#1A1F00]">
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K <span className="text-white">Jual + 10%</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      value={Math.ceil(goldPrices[i]?.price10)}
                      style="currency"
                      currency="IDR"
                      minimumFractionDigits={0}
                    />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Sell +12 % */}
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            {goldRates.map(({ karat, color }, i) => (
              <Card key={i} className="bg-[#4D3F00]">
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    <p style={{ color }}>
                      {karat}K <span className="text-white">Jual + 12%</span>{" "}
                    </p>
                    <Banknote className="size-7" style={{ color }} />
                  </CardTitle>
                  <div className="text-2xl font-bold">
                    <FormattedNumber
                      value={Math.ceil(goldPrices[i]?.price12)}
                      style="currency"
                      currency="IDR"
                      minimumFractionDigits={0}
                    />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </IntlProvider>
    </>
  );
}
