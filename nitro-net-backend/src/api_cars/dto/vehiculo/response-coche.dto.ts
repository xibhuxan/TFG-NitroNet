export class ResponseCocheDto {
  id: number;
  nombre: string;
  modelo?: string;
  cc?: number;
  id_escala?: number | null;
  created_at: Date;
  updated_at: Date;
}