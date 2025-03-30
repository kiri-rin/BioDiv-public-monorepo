const ee = require("@google/earthengine");
const key = require("./.local/ee-key.json");
declare global {
  //@ts-ignore
  let ee: any;
  //@ts-ignore
  let strapiLogger: (...log: any) => any;
}
//@ts-ignore
globalThis.ee = ee;
//@ts-ignore
globalThis.strapiLogger = () => {};

export const withGEE = async (callback: () => any, _key?: any) => {
  return new Promise((resolve) => {
    //@ts-ignore
    ee.data.authenticateViaPrivateKey(
      _key || key,
      async () => {
        ee.initialize(null, null, async () => {
          await callback();
          resolve(true);
        });
      },
      (r: string) => {
        // console.log(r);
      }
    );
  });
};
