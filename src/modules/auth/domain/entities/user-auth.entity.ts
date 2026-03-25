export class UserAuthEntity {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly profileImage: string,
    public readonly savedBooks: string[],
  ) {}
}
