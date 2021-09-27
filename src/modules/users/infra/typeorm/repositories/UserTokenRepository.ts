import ITokenRepository from '@modules/users/domain/repositories/ITokenRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export default class UserTokenRepository implements ITokenRepository {
  private ormRespository: Repository<UserToken>;
  constructor() {
    this.ormRespository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRespository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRespository.create({
      user_id,
    });

    await this.ormRespository.save(userToken);

    return userToken;
  }
}
