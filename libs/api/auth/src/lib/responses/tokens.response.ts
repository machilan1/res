export class Tokens {
  at!: string;
  rt!: string;

  constructor(data: Tokens) {
    Object.assign(this, data);
  }
}
