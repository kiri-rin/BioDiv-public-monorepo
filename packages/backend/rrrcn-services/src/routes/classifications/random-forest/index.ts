import { RequestHandler } from "express-serve-static-core";
import { ClassificationApi } from "@rrrcn/common-types/services/api/classifications";
import { randomForest } from "../../../controllers/classifications/random-forest/random-forest";

export const classificationsRandomForestRoute: RequestHandler<
  any,
  ClassificationApi.PostRandomForest.Response,
  ClassificationApi.PostRandomForest.Body
> = async (req, res, next) => {
  const response = await randomForest(req.body);
  res.send(response);
};
