import * as jwt from 'jsonwebtoken';
import IToken from '../Interfaces/IToken';

export default class JWT implements IToken {
  private jwt = jwt;
  private secret: string = process.env.JWT_SECRET || 'secret';

  generate(email: string): string {
    const token = this.jwt.sign({ email }, this.secret);
    return token;
  }

  decode(token: string): string {
    const decodedToken = this.jwt.decode(token, { complete: true });
    if (!decodedToken) return 'false';
    return decodedToken.payload.email;
  }

  verify(token: string): boolean {
    try {
      this.jwt.verify(token, this.secret);
      return true;
    } catch (error) {
      return false;
    }
  }
}