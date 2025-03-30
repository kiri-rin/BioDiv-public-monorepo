const tickMinutes = 1; // Checking interval in minutes should be from 1 to 59

module.exports = {
  /**
   * Cron job with timezone example.
   * Every tickMinutes for Asia/Novosibirsk timezone.
   * List of valid timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
   */
  //Fix to every tickMinute
  // myJob: {
  //   task: async ({ strapi }, fireDate) => {
  //     await strapi.service("api::result.result").deleteExpiresResults();
  //   },
  //   options: {
  //     rule: `*/${tickMinutes} * * * *`,
  //     tz: "Asia/Novosibirsk",
  //   },
  // },
};

/**
Cron format:

 *    *    *    *    *    *
 ┬    ┬    ┬    ┬    ┬    ┬
 │    │    │    │    │    |
 │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
 │    │    │    │    └───── month (1 - 12)
 │    │    │    └────────── day of month (1 - 31)
 │    │    └─────────────── hour (0 - 23)
 │    └──────────────────── minute (0 - 59)
 └───────────────────────── second (0 - 59, OPTIONAL)

 */
