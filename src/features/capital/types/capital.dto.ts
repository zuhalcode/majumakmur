interface CapitalResponse {
  id: string;
  date: string;

  capital: number;
  purchase: number;
  sell: number;

  created_at: string;
  updated_at: string;
}

interface CreateCapitalDTO {
  date: string;
  capital: number;
  purchase: number;
  sell: number;
}

interface UpdateCapitalDTO {
  id: string;
  date?: string;
  capital?: number;
  purchase?: number;
  sell?: number;
}

export type { CapitalResponse, CreateCapitalDTO, UpdateCapitalDTO };
