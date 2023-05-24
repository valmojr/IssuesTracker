import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/Database/Database.service';
import { GuildMember } from '@prisma/client';

@Injectable()
export class GuildMemberService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(data: GuildMember): Promise<GuildMember> {
    return this.databaseService.guildMember.create({ data });
  }

  async findAll() {
    return this.databaseService.guildMember.findMany();
  }

  async findById(id: number) {
    return this.databaseService.guildMember.findUnique({
      where: { id },
    });
  }

  async findByDiscordId(discordId: string) {
    return this.databaseService.guildMember.findUnique({
      where: { discordId },
    });
  }

  async findByUsername(username: string) {
    return this.databaseService.guildMember.findUnique({
      where: { username },
    });
  }

  async update(guildMember: GuildMember) {
    const { id, ...data } = guildMember;
    return this.databaseService.guildMember.update({
      data,
      where: { id },
    });
  }

  async delete({ id }: GuildMember) {
    return this.databaseService.guildMember.delete({ where: { id } });
  }

  async findOrCreate(guildMember: GuildMember) {
    const findUser = await this.findById(guildMember.id);

    if (!!findUser) {
      return findUser;
    } else {
      console.log(guildMember);
      if (!guildMember.username) throw new Error('no username provided');
      return this.create(guildMember);
    }
  }
}
