export type TrainCharacteristic = {
  speed: number;
  force: number;
  engineAmperage: number;
};

type OptionsWithFlag<Type> = {
  [Property in keyof Type]: CharactrecticWithFlag;
};

export type TrainCharacteristicModelNoId = OptionsWithFlag<TrainCharacteristic>;

export type TrainCharacteristicModel = TrainCharacteristicModelNoId & {
  id: number;
};

export type CharactrecticWithFlag = {
  amount: number;
  isValid: boolean;
};
