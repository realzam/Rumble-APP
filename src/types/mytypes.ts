export interface IJWTPayload {
  sala: string | null;
  role: string | null;
  nick: string | null;
  iat: number | null;
  exp: number | null;
  game: string | null;
}
