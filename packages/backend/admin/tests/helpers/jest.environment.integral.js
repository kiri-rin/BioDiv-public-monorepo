// my-custom-environment
const { setupStrapi, cleanupStrapi } = require("./strapi");
const NodeEnvironment = require("jest-environment-node").TestEnvironment;

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
  }

  async setup() {
    await super.setup();
    require("dotenv").config({
      path: ".env.test",
    });
    const strapi = await setupStrapi();
    console.log("SETUP CUSTOM ENV SUCCESS");

    this.global.strapi = strapi;
  }

  async teardown() {
    try {
      await cleanupStrapi();
    } catch (e) {
      console.log(e);
    }
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = CustomEnvironment;
