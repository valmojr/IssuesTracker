import { Issue } from 'src/Util/entities';

interface Label {
  asset: string;
  priority: string;
  status: string;
}

export default ({ labels }: Issue) => {
  let asset = '';
  let priority = '';
  let status = '';

  labels.forEach((label) => {
    if (label.name.includes('Asset/')) {
      asset = asset.concat(label.name.replace('Asset/', ''));
    }
    if (label.name.includes('Prioridade/')) {
      priority = priority.concat(label.name.replace('Prioridade/', ''));
    }
    if (label.name.includes('Status/')) {
      status = status.concat(label.name.replace('Status/', ''));
    }
  });

  return {
    asset,
    priority,
    status,
  };
};

export const translateLabelToMessage = (labels: Label) => {
  let message = '';

  if (labels.asset !== '') {
    message += `Asset: ${labels.asset}\n`;
  }

  if (labels.priority !== '') {
    message += `Prioridade: ${labels.priority}\n`;
  }

  if (labels.status) {
    message += `Situação: ${labels.status}\n`;
  }

  return message;
};
