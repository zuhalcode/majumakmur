"use client";

//#region-imports

import { Banknote } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo, useRef, useState } from "react";
import { GOLD_RATES, SECTIONS } from "@/constants/dashboard.constant";
import PriceCard from "@/components/dashboard/price-card";
import { calculateGoldPrices } from "@/utils/dashboard.util";

import * as htmlToImage from "html-to-image";

//#endregion

export default function Page() {
  const [goldPrice, setGoldPrice] = useState<number>(2380000);
  const exportRef = useRef<HTMLDivElement>(null);

  const goldPrices = useMemo(
    () => calculateGoldPrices(goldPrice, GOLD_RATES),
    [goldPrice],
  );

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const goldPrice = formData.get("gold") as string;

    setGoldPrice(Number(goldPrice));
  };

  const handleDownload = async () => {
    if (!exportRef.current) return;

    const dataUrl = await htmlToImage.toPng(exportRef.current, {
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: "#09090B",
    });

    const link = document.createElement("a");
    link.download = `gold-price-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <>
      <IntlProvider locale="id-ID">
        <div className="w-full flex space-x-2 items-center mx-auto justify-center py-5 px-5 sm:px-0">
          <form
            onSubmit={handleOnSubmit}
            className="flex w-full max-w-sm items-center space-x-2"
          >
            <Input
              type="text"
              name="gold"
              placeholder="2380000"
              onKeyDown={(e) => {
                if (/^[a-zA-Z]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <Button type="submit">Update</Button>
          </form>

          <Button type="button" variant="secondary" onClick={handleDownload}>
            Download PNG
          </Button>
        </div>

        <div
          className="w-full flex flex-col gap-5 px-10 pb-10 mt-2"
          ref={exportRef}
        >
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
                    value={goldPrice}
                    style="currency"
                    currency="IDR"
                    minimumFractionDigits={0}
                  />
                </div>
              </CardHeader>
            </Card>
          </div>

          {SECTIONS.map(({ field, title }) => (
            <div
              key={field}
              className="w-full grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-5"
            >
              {goldPrices.map((gold) => {
                const value = gold[field];

                if (value == null) return null;

                return (
                  <PriceCard
                    key={`${field}-${gold.karat}`}
                    title={`${gold.karat}K ${title}`}
                    value={value}
                    color={gold.color}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </IntlProvider>
    </>
  );
}
