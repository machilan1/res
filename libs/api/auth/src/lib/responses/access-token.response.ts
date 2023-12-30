export class AccessToken {
  accessToken!: string;
  constructor(data: AccessToken) {
    Object.assign(this, data);
  }
}
