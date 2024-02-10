"use strict";

export class EMagazineRakutenJob {
  async run({ crawler, page, nickname }) {
    await page.goto(
      "https://emagazine.rakuten.co.jp/ns?act=chg_news&l=ja&f=member",
    );

    const checkboxes = await page.$$("input[type='checkbox'][name='sid[]'][checked]");
    if (checkboxes.length < 1) {
      crawler.infoSync(`${nickname}: nothing to do`);
      return;
    }

    const allUncheck = page.locator("#allUncheck").first();
    await allUncheck.click();

    const commit = page.locator("#btnRegister");
    await commit.click();

    crawler.infoSync(`${nickname}: #unsubscribed all.`);
  }
}

export class EMagazineShopJob {
  async run({ crawler, page, nickname }) {
    await page.goto(
      "https://emagazine.rakuten.co.jp/ns?act=chg_rmail&f=member",
    );

    const checkboxes = await page.$$("input[type='checkbox'][name='sid[]'][checked]");
    if (checkboxes.length < 1) {
      crawler.infoSync(`${nickname}: nothing to do`);
      return;
    }

    const allUncheck = page.locator("#allUncheck").first();
    await allUncheck.click();

    const confirm = page.locator(
      "div#rmail_container >> form >> input[type='submit']",
    ).first();
    await confirm.click();

    await page.waitForURL("https://emagazine.rakuten.co.jp/ns");

    const commit = page.locator("body >> form >> input[type='submit']").first();
    await commit.click();

    crawler.infoSync(`${ nickname }: unsubscribed all.`);
  }
}
