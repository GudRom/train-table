import {
  TrainCharacteristic,
  TrainCharacteristicModel,
} from "./TrainCharacteristic";

export type TrainData = {
  name: string;
  description: string;
  characteristics: TrainCharacteristic[];
};

export type TrainModel = {
  id: number;
  name: string;
  description: string;
  characteristics: TrainCharacteristicModel[];
};
