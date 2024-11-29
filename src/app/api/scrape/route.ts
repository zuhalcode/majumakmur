import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

export const GET = async () => {
  const url = "https://harga-emas.org/1-gram/";
  const executableChrome =
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

  try {
    const browser = await puppeteer.launch({
      executablePath: executableChrome,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const rowData = await page.$eval(
      "table.in_table tr:nth-child(5)",
      (row) => {
        const columns = row.querySelectorAll("td");
        return Array.from(columns).map((column) => column.innerText.trim());
      }
    );

    const rawGoldPrice = rowData[1];

    const currentGoldPrice = parseFloat(
      rawGoldPrice.replace(/[^\d,]/g, "").replace(",", ".")
    );

    await browser.close();

    const supabase = await createClient();

    const { data: latestData, error: fetchError } = await supabase
      .from("global_golds")
      .select("price")
      .order("created_at", { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error("Error fetching latest data:", fetchError);
      return;
    }

    if (latestData[0].price === currentGoldPrice) {
      return NextResponse.json(
        {
          message: "Data already up to date",
        },
        { status: 200 }
      );
    }

    const { data: newGoldData, error: insertError } = await supabase
      .from("golds")
      .insert([
        {
          price: currentGoldPrice,
        },
      ]);

    if (insertError) {
      return NextResponse.json({
        message: "Error inserting new data",
        error: insertError,
      });
    }

    return NextResponse.json(
      {
        message: "Update data successfully",
        data: newGoldData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Scrape Failed",
        error,
      },
      { status: 500 }
    );
  }
};
