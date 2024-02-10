"use strict";

export class LoginJob {
  constructor(config) {
    this.#config = config;
  }

  #config;

  async run({ page }) {
    await page.goto(
      "https://grp01.id.rakuten.co.jp/rms/nid/vc?__event=login&service_id=top",
    );

    const id = await page.$("#loginInner_u");
    const pw = await page.$("#loginInner_p");
    await id.fill(this.#config.id);
    await pw.fill(this.#config.pw);

    const login = await page.$(".loginButton");
    await login.click();
    await page.waitForURL("https://www.rakuten.co.jp/?*");
  }
}
