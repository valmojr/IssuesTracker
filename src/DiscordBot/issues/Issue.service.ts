import { Injectable } from '@nestjs/common';
import { URLSearchParams } from 'url';
import * as dotenv from 'dotenv';
import { Issue, User } from 'src/Util/entities';
import { GuildMemberService } from 'src/GuildMember/GuildMember.service';

@Injectable()
export class IssueService {
  constructor(private readonly guildMemberService: GuildMemberService) {
    dotenv.config();
  }

  public async fetchAllIssues(): Promise<Issue[]> {
    const { GITEA_URL, GITEA_REPO_OWNER, GITEA_REPO_NAME, GITEA_AUTH_TOKEN } =
      process.env;
    const url = new URL(
      `http://${GITEA_URL}/api/v1/repos/${GITEA_REPO_OWNER}/${GITEA_REPO_NAME}/issues`,
    );

    const params = new URLSearchParams();
    params.append('state', 'all');
    params.append('token', GITEA_AUTH_TOKEN);

    url.search = params.toString();

    const issues = await fetch(url);

    return await issues.json();
  }

  public async fetchOpenIssues(): Promise<Issue[]> {
    const { GITEA_URL, GITEA_REPO_OWNER, GITEA_REPO_NAME, GITEA_AUTH_TOKEN } =
      process.env;
    const url = new URL(
      `http://${GITEA_URL}/api/v1/repos/${GITEA_REPO_OWNER}/${GITEA_REPO_NAME}/issues`,
    );

    const params = new URLSearchParams();
    params.append('state', 'open');
    params.append('token', GITEA_AUTH_TOKEN);

    url.search = params.toString();

    const issues = await fetch(url);

    return await issues.json();
  }

  public async fetchDevelopers(): Promise<User[]> {
    const { GITEA_URL, GITEA_AUTH_TOKEN, GITEA_DEV_TEAM_ID } = process.env;
    const url = new URL(
      `http://${GITEA_URL}/api/v1/teams/${GITEA_DEV_TEAM_ID}/members`,
    );

    const params = new URLSearchParams();
    params.append('state', 'open');
    params.append('token', GITEA_AUTH_TOKEN);

    url.search = params.toString();

    const fetchDevs = await fetch(url);

    const developers: User[] = await fetchDevs.json();

    developers.forEach(async (developer) => {
      const { id, username } = developer;

      const devOnDiscord = await this.guildMemberService.findOrCreate({
        id,
        username,
        discordId: null,
      });

      if (devOnDiscord.discordId) developer.discordId = devOnDiscord.discordId;
    });

    return developers;
  }
}
