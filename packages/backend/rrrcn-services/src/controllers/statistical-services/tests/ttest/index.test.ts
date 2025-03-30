import { tTestController } from "../../ttest";
import path from "path";

it("ttest", async () => {
  await tTestController({
    outputs: path.join(__dirname, "./ttest"),
    data: {
      type: "split",
      absence: path.join(__dirname, "./Random-points.csv"),
      presence: path.join(__dirname, "./AC present.csv"),
    },
  });
});
