interface CapitalResponse {
  id: string;
  date: string;

  capital: number;
  purchase: number;
  sell: number;

  created_at: string;
  updated_at: string;
}

interface CreateCapitalPayload {
  date: string;
  capital: number;
  purchase: number;
  sell: number;
}

interface UpdateCapitalPayload {
  id: string;
  date?: string;
  capital?: number;
  purchase?: number;
  sell?: number;
}

export type { CapitalResponse, CreateCapitalPayload, UpdateCapitalPayload };
