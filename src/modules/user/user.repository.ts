import { DataSource, FindOptionsWhere, Repository } from "typeorm";
import { User } from "../../entity/user";

export class UserRepository {
  private userRepo: Repository<User>;
  constructor(db: DataSource) {
    this.userRepo = db.getRepository(User);
  }

  createUser(user: User) {
    return this.userRepo.save(user);
  }

  fetchUser(opt: FindOptionsWhere<User>) {
    return this.userRepo.findOneBy(opt);
  }
}
