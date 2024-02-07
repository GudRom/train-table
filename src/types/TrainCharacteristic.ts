export type TrainCharacteristic = {
  speed: number;
  force: number;
  engineAmperage: number;
};

export type TrainCharacteristicModel = TrainCharacteristic & {
  id: number;
};
