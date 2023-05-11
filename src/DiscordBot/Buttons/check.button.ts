import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (issueId: number) => {
  const { GITEA_URL, GITEA_REPO_OWNER, GITEA_REPO_NAME } = process.env;

  return new ButtonBuilder()
    .setLabel('👀 INTEL')
    .setStyle(ButtonStyle.Link)
    .setURL(
      `http://${GITEA_URL}/${GITEA_REPO_OWNER}/${GITEA_REPO_NAME}/issues/${issueId}`,
    );
};
