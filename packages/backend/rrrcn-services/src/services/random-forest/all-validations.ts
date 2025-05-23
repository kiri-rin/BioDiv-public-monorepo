import { evaluatePromisify } from "../../utils/ee-image";
import { getAcc, getAUCROC } from "./auc-roc-validation";
import { EEFeatureCollection, EEImage } from "../../types";
import regression from "regression";
import { omit } from "lodash";

export type classifierValidationType = {
  AUC: number;
  ROC: {
    features: {
      properties: {
        cutoff: number;
        TP: number;
        TN: number;
        FP: number;
        FN: number;
        TPR: number;
        TNR: number;
        FPR: number;
        Precision: number;
        SUMSS: number;
        ccr: number;
        kappa: number;
      };
    }[];
  };
  training_regression: { r2: number };
  validation_regression: { r2: number };
  explainedClassifier?: any;
};
export const validateClassifier = async (
  classified_image: EEImage,
  validationData: EEFeatureCollection,
  trainingData: EEFeatureCollection
) => {
  const predictedValidation = classified_image.sampleRegions({
    collection: validationData,
    geometries: true,
    scale: 100,
  });
  const predictedTraining = classified_image.sampleRegions({
    collection: trainingData,
    geometries: true,
    scale: 100,
  });
  console.log(await evaluatePromisify(classified_image), "trainingData!");

  const sampleTraining = await evaluatePromisify(
    predictedTraining.select(["Presence", "classification"])
  );
  const sampleValidation = await evaluatePromisify(
    predictedValidation.select(["Presence", "classification"])
  );
  const training_regression = regression.linear(
    //@ts-ignore
    sampleTraining.features.map(
      ({ properties: { Presence, classification } }: any) => [
        classification,
        Presence,
      ]
    )
  );
  const validation_regression = regression.linear(
    //@ts-ignore
    sampleValidation.features.map(
      ({ properties: { Presence, classification } }: any) => [
        classification,
        Presence,
      ]
    )
  );
  let ROC = getAcc(predictedValidation);
  // console.log(JSON.stringify(ROC));
  const AUC = await evaluatePromisify(getAUCROC(ROC));
  ROC = await evaluatePromisify(ROC);
  return {
    AUC,
    ROC,
    training_regression: omit(training_regression, "points"),
    validation_regression: omit(validation_regression, "points"),
  };
};

export const ROCTOCSV = (ROC: classifierValidationType["ROC"]) => {
  const columns = ["param", ...ROC.features.map((it) => it.properties.cutoff)];
  const rows = [
    "TP",
    "FP",
    "TN",
    "FN",
    "TNR",
    "TPR",
    "FPR",
    "Precision",
    "SUMSS",
    "ccr",
    "kappa",
  ].map((key) => [
    key,
    ...ROC.features.map(
      (it) => it.properties[key as keyof typeof it.properties]
    ),
  ]);
  return [columns, ...rows];
};
