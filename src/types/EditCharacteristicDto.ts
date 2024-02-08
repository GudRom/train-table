import { TrainCharacteristicModelNoId } from "./TrainCharacteristic";

export type EditCharacteristicDto = {
  charId: number;
  type: keyof TrainCharacteristicModelNoId;
  amount: number;
};
