import IToken from '../models/IToken';

export default interface ITokenRepository {
  findByToken(token: string): Promise<IToken | undefined>;
  generate(user_id: string): Promise<IToken>;
}
