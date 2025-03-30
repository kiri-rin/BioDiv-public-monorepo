import path from "path";
import { normalTestController } from "../../normal";

it("ttest", async () => {
  await normalTestController({
    outputs: __dirname,
    data: path.join(__dirname, "../ttest/AC present.csv"),
  });
});
