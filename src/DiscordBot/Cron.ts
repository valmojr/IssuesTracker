import * as cron from 'cron';

export class CronService {
  private readonly job: cron.CronJob;

  constructor(interval: string, callbackfn: () => void) {
    this.job = new cron.CronJob(interval, () => {
      callbackfn();
    });
    this.job.start();
  }
}
