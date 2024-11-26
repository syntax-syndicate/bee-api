import { Migration } from '@mikro-orm/migrations-mongodb';

import { User } from '@/users/entities/user.entity';

export class Migration20241126122701 extends Migration {
  async up(): Promise<void> {
    await this.getCollection(User).updateMany(
      {},
      {
        $set: {
          defaultOrganization:
            process.env.ORGANIZATION_ID_DEFAULT ?? 'org_670cc04869ddffe24f4fd70d',
          defaultProject: process.env.PROJECT_ID_DEFAULT ?? 'proj_670cc04869ddffe24f4fd70f'
        }
      },
      { session: this.ctx }
    );
  }
}
