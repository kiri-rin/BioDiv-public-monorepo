import Strapi from "@strapi/strapi";
import * as fs from "fs";
import tsUtils from "@strapi/typescript-utils";
import { buildTypeScript } from "@strapi/strapi/lib/commands/builders";
let instance;

async function setupStrapi() {
  const appDir = process.cwd();

  const isTSProject = await tsUtils.isUsingTypeScript(appDir);
  const outDir = await tsUtils.resolveOutDir(appDir);
  const distDir = isTSProject ? outDir : appDir;

  if (!instance) {
    await buildTypeScript({ srcDir: appDir, distDir, watch: false });

    await Strapi({ distDir }).load(); // very important, this tells
    // where to find the transpiled code from typescript
    instance = strapi;
    await instance.server.mount();
  }
  return instance;
}

async function cleanupStrapi() {
  const dbSettings = strapi.config.get("database.connection") as any;
  console.log(dbSettings); // confirm that we are pointing to sqlite
  // with the tmp file residing in /myprojectname/.tmp/test.db'
  //close server to release the db-file
  await strapi.server.httpServer.close();
  await strapi.db.connection.destroy();

  //delete test database after all tests have completed

  if (dbSettings && dbSettings.connection && dbSettings.connection.filename) {
    const tmpDbFile = dbSettings.connection.filename;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
}
export { setupStrapi, cleanupStrapi };
