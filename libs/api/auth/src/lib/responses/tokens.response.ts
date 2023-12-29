export class Tokens {
  accessToken!: string;
  refreshToken?: string;

  constructor(data: Tokens) {
    const { accessToken } = data;
    this.accessToken = accessToken;
  }
}
