export class Tokens {
  accessToken!: string;
  refreshToken!: string;

  constructor(data: Tokens) {
    Object.assign(this, data);
  }
}
