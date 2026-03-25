export class AdminEntity {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string,
    public readonly permissions: Record<string, boolean>,
    public readonly isActive: boolean,
  ) {}
}
