import {
  PayloadAction,
  SerializedError,
  asyncThunkCreator,
  buildCreateSlice,
} from "@reduxjs/toolkit";
import { getTrainsData } from "../../api";
import { TrainData, TrainModel } from "../../types/Train";

type TrainState = {
  trains: TrainModel[];
  currentTrain: TrainModel | null;
  error: SerializedError | null;
  loading: boolean;
  noValidDataCount: number;
};

const TrainInitState: TrainState = {
  trains: [],
  currentTrain: null,
  noValidDataCount: 0,
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
      addNoValidData: create.reducer((state) => {
        state.noValidDataCount += 1;
      }),
      removeNoValidData: create.reducer((state) => {
        if (state.noValidDataCount > 0) state.noValidDataCount -= 1;
      }),
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
            state.trains = action.payload.map(
              (el) =>
                ({
                  id: Math.trunc(Math.random() * 10 ** 5),
                  name: el.name,
                  description: el.description,
                  characteristics: el.characteristics.map((el) => ({
                    id: Math.trunc(Math.random() * 10 ** 5),
                    speed: el.speed,
                    force: el.force,
                    engineAmperage: el.engineAmperage,
                  })),
                } as TrainModel)
            );
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
  addNoValidData,
  removeNoValidData,
} = TrainSlice.actions;

export default TrainSlice.reducer;
