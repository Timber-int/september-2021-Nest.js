export class CreateUserDto {
    public name: string;
    public username: string;
    public age: number;
    public email: string;
    readonly password: string;
}
