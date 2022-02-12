import cron from 'node-cron';
import { LastRatingsService } from '../service/lastRatings.service';
import logger from '../logger';

const lastRatingsService = new LastRatingsService();

const cleanLastRatingsJob = () => {
  cron.schedule('0 0 * * MON', async () => {
    try {
      const result = await lastRatingsService.cleanRatings();

      if (result) {
        logger.info('Last ratings cleaned.');
      } else {
        logger.error('Failed to clean last ratings.');
      }
    } catch (err) {
      logger.error(err);
    }
  });
};

export default cleanLastRatingsJob;
