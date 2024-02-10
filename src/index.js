"use strict";

import { Crawler } from "../../node-playwright-crawler-core/src/crawler.js";
import dotenv from "dotenv";

import { EMagazineRakutenJob, EMagazineShopJob } from "./job/emagazine.js";
import { LoginJob } from "./job/login.js";

dotenv.config();

const config = {
  crawler: {
    playwright: {
      channel: process.env.PLAYWRIGHT_CHANNEL,
      headless: process.env.PLAYWRIGHT_HEADLESS === "true",
    },
  },
  job: {
    login: {
      id: process.env.LOGIN_JOB_ID,
      pw: process.env.LOGIN_JOB_PW,
    },
  },
};

const crawler = new Crawler(config.crawler, {
  login: new LoginJob(config.job.login),
  "emagazine/rakuten": new EMagazineRakutenJob(),
  "emagazine/shop": new EMagazineShopJob(),
});

(async () => await crawler.run(process.argv.slice(2)))();
