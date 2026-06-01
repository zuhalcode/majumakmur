interface Capital {
  id?: number;
  capital: number;
  purchase: number;
  sell: number;
  date: Date;
  created_at?: Date;
  updated_at?: Date;
}

interface CapitalFilters {
  year?: number;
  month?: number;
}

export type { Capital, CapitalFilters };
