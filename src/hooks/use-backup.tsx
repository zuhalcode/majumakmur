import { createClient } from "@/app/utils/supabase/client";

const supabase = createClient();

// Tipe data untuk item di dalam array tables
type BackupTable = {
  table_name: string;
  data: any[];
};

export const useBackup = () => {
  const backupTables = async () => {
    // Deklarasikan tipe eksplisit untuk backupData
    const backupData: { tables: BackupTable[] } = { tables: [] };

    // Daftar tabel yang ingin di-backup
    const tableNames = ["capitals", "daily_transactions", "global_golds"];

    for (const tableName of tableNames) {
      try {
        const { data, error } = await supabase.from(tableName).select("*");

        if (error) {
          console.error(
            `Error fetching data from ${tableName}:`,
            error.message
          );
          continue;
        }

        // Tambahkan data tabel ke backupData
        backupData.tables.push({
          table_name: tableName,
          data: data || [],
        });
      } catch (err) {
        console.error(`Unexpected error while processing ${tableName}:`, err);
      }
    }

    // Simpan backup data ke file JSON di client
    try {
      const jsonBlob = new Blob([JSON.stringify(backupData, null, 2)], {
        type: "application/json",
      });

      // Buat link untuk mengunduh file
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(jsonBlob);
      downloadLink.download = "backup.json";

      // Trigger pengunduhan
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      console.log("Backup successfully created and ready for download.");
    } catch (err) {
      console.error("Error creating backup file:", err);
    }
  };

  return { backupTables };
};
