import {
  PayloadAction,
  SerializedError,
  asyncThunkCreator,
  buildCreateSlice,
} from "@reduxjs/toolkit";
import { getTrainsData } from "../../api";
import { TrainData, TrainModel } from "../../types/Train";
import { EditCharacteristicDto } from "../../types/EditCharacteristicDto";
import { TrainCharacteristic } from "../../types/TrainCharacteristic";

type TrainState = {
  trains: TrainModel[];
  currentTrain: TrainModel | null;
  error: SerializedError | null;
  loading: boolean;
};

const TrainInitState: TrainState = {
  trains: [],
  currentTrain: null,
  error: null,
  loading: false,
};

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const TrainSlice = createSliceWithThunks({
  name: "train",
  initialState: TrainInitState,
  reducers: (create) => {
    const createAThunk = create.asyncThunk.withTypes<{
      rejectValue: { error: string };
    }>();
    return {
      setCurrentTrain: create.reducer(
        (state, action: PayloadAction<TrainModel>) => {
          state.currentTrain = action.payload;
        }
      ),
      editCurrentTrainData: create.reducer(
        (state, action: PayloadAction<EditCharacteristicDto>) => {
          const { amount, charId, type } = action.payload;
          if (state.currentTrain) {
            const currentCharact = state.currentTrain.characteristics.find(
              (el) => el.id === charId
            );
            if (currentCharact) {
              const newCharact = {
                ...currentCharact,
                [type]: { amount, isValid: validateAmount(type, amount) },
              };
              state.currentTrain = {
                ...state.currentTrain,
                characteristics: state.currentTrain.characteristics.map((el) =>
                  el.id === charId ? newCharact : el
                ),
              };
            }
          }
        }
      ),
      fetchTrainsData: createAThunk<TrainData[]>(
        async (_, { rejectWithValue }) => {
          try {
            return await getTrainsData();
          } catch (error) {
            rejectWithValue({ error: "Error" });
          }
        },
        {
          pending: (state) => {
            state.error = null;
            state.loading = true;
          },
          fulfilled: (state, action) => {
            state.trains = normolizeData(action.payload);
          },
          rejected: (state, action) => {
            state.error = action.error;
          },
          settled: (state) => {
            state.loading = false;
          },
        }
      ),
    };
  },
});

export const {
  fetchTrainsData,
  setCurrentTrain,
  editCurrentTrainData,
} = TrainSlice.actions;

export default TrainSlice.reducer;

const normolizeData = (arr: TrainData[]): TrainModel[] => {
  return arr.map(
    (el) =>
      ({
        id: Math.trunc(Math.random() * 10 ** 5),
        name: el.name,
        description: el.description,
        characteristics: el.characteristics.map((el) => ({
          id: Math.trunc(Math.random() * 10 ** 5),
          speed: { amount: el.speed, isValid: true },
          force: { amount: el.force, isValid: true },
          engineAmperage: {
            amount: el.engineAmperage,
            isValid: true,
          },
        })),
      } as TrainModel)
  );
};

const validateAmount = (
  type: keyof TrainCharacteristic,
  amount: number
): boolean => {
  let flag = true;
  switch (type) {
    case "engineAmperage":
      !(Number.isInteger(amount) && amount > 0) && (flag = false);
      break;
    case "force":
      (Number.isInteger(amount) || amount < 1) && (flag = false);
      break;

    case "speed":
      !(Number.isInteger(amount) && amount >= 0) && (flag = false);
      break;
  }
  return flag;
};
