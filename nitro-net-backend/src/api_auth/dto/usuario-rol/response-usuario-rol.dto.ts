export class UsuarioDto {
  id: number;
  username: string;
}

export class RolDto {
  id: number;
  tipo: string;
}

export class ResponseUsuarioRolDto {
  id: number;
  usuario: UsuarioDto;
  rol: RolDto;
  created_at: Date;
  updated_at: Date;
}
