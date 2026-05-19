import { capitalService } from "@/services/capital.service";
import { Capital, CapitalFilters } from "@/types/data/capital";

import { useCallback, useEffect, useState } from "react";

export function useCapitalAPI() {
  const [data, setData] = useState<Capital[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (filters?: CapitalFilters) => {
    try {
      setLoading(true);
      const { data } = await capitalService.findAll(filters);
      setData(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createData = useCallback(async (capital: Capital) => {
    setLoading(true);
    await capitalService.create(capital);
    setLoading(false);
  }, []);

  const deleteData = useCallback(async (id: number) => {
    setLoading(true);
    await capitalService.remove(id);
    setLoading(false);
  }, []);

  const groupDataByMonth = (year: string = "2026") => {
    // get only data year 2025
    const grouped: {
      date: string;
      data: Capital[];
      totalPurchase: number;
      totalSell: number;
    }[] = [];

    const filteredData =
      year === "0000"
        ? data
        : data.filter(
            (item) => new Date(item.date).getFullYear().toString() === year,
          );

    filteredData.forEach((item) => {
      const date = new Date(item.date).toLocaleString("default", {
        month: "2-digit",
        year: "2-digit",
      });

      // Cek apakah bulan sudah ada dalam grouped
      const existingGroup = grouped.find((group) => group.date === date);

      if (existingGroup) {
        existingGroup.data.push(item); // Tambahkan transaksi ke bulan yang ada
        existingGroup.totalPurchase += item.purchase; // Tambahkan purchase ke total untuk bulan ini
        existingGroup.totalSell += item.sell; // Tambahkan purchase ke total untuk bulan ini
      } else {
        // Jika belum ada, buat grup baru untuk bulan ini
        grouped.push({
          date,
          data: [item],
          totalPurchase: item.purchase,
          totalSell: item.sell,
        });
      }
    });

    return grouped;
  };

  const groupedData = groupDataByMonth();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    dataByMonth: groupedData,
    refetch: fetchData,
    fetchData,
    createData,
    deleteData,
    loading,
  };
}
