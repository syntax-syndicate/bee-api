import { Migration } from '@mikro-orm/migrations-mongodb';
import { Ref, ref } from '@mikro-orm/core';

import { User } from '@/users/entities/user.entity';
import { UserPrincipal } from '@/administration/entities/principals/user-principal.entity';
import { ProjectPrincipal } from '@/administration/entities/project-principal.entity';
import { ProjectRole } from '@/administration/entities/constants';
import { Project, ProjectVisiblity } from '@/administration/entities/project.entity';
import { Organization } from '@/administration/entities/organization.entity';
import { OrganizationUser } from '@/administration/entities/organization-user.entity';
import { IBM_ORGANIZATION_OWNER_ID } from '@/config';

type BaseDocument = { _id: string; createdAt: Date; updatedAt: Date; [key: string]: any };

export class Migration20241126122701 extends Migration {
  async up(): Promise<void> {
    const orgOwner = await this.getCollection<BaseDocument>(OrganizationUser).findOne(
      { _id: IBM_ORGANIZATION_OWNER_ID },
      { session: this.ctx }
    );

    if (!orgOwner) {
      throw new Error('IBM organization owner not found.');
    }

    const defaultOrganization = orgOwner.organization;

    await this.getCollection(User).updateMany(
      {},
      {
        $set: {
          defaultOrganization
        }
      },
      { session: this.ctx }
    );

    const users = this.getCollection<BaseDocument>(User).find({}, { session: this.ctx });

    const promises = (await users.toArray()).map(async (user) => {
      const organizationUser = await this.getCollection<BaseDocument>(OrganizationUser).findOne(
        {
          user: user._id,
          organization: defaultOrganization
        },
        { session: this.ctx }
      );

      if (!organizationUser) {
        // eslint-disable-next-line no-console
        console.log('User not part of Default org.');
        return;
      }

      const project = new Project({
        name: `${user.name}'s project`,
        organization: ref(Organization, defaultOrganization),
        createdBy: ref(organizationUser._id),
        visibility: ProjectVisiblity.PRIVATE
      });
      await this.getCollection<BaseDocument>(Project).insertOne(
        {
          _id: project.id,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          organization: project.organization.id,
          createdBy: project.createdBy.id,
          name: project.name,
          visibility: project.visibility,
          status: project.status
        },
        { session: this.ctx }
      );

      const userPrincipal = new UserPrincipal({ user: ref(organizationUser._id) });
      const projectPrincipal = new ProjectPrincipal({
        project: ref(project),
        createdBy: {
          id: 'placeholder'
        } as unknown as Ref<ProjectPrincipal>,
        principal: userPrincipal,
        role: ProjectRole.ADMIN
      });
      projectPrincipal.createdBy = ref(projectPrincipal);
      await this.getCollection<BaseDocument>(ProjectPrincipal).insertOne(
        {
          _id: projectPrincipal.id,
          createdAt: projectPrincipal.createdAt,
          updatedAt: projectPrincipal.updatedAt,
          project: projectPrincipal.project.id,
          createdBy: projectPrincipal.createdBy.id,
          principal: {
            type: userPrincipal.type,
            user: userPrincipal.user.id
          },
          role: projectPrincipal.role
        },
        { session: this.ctx }
      );
    });

    await Promise.all(promises);
  }
}
