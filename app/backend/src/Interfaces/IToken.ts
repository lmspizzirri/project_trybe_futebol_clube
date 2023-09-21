export default interface IToken {
  decode(token: string): string;
  generate(email: string): string;
  verify(token: string): boolean;
}
