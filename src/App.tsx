import "./App.css";
import Header from "./components/Header";
import TrainTable from "./components/TrainTable";
import DataTable from "./components/DataTable";
import Box from "./components/Box";
import { useAppSelector } from "./store/hooks";
import { FormEvent } from "react";
import { TrainCharacteristicModel } from "./types/TrainCharacteristic";

function App() {
  const currentTrain = useAppSelector(
    (state) => state.trainReducer.currentTrain
  );
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    const sortSpeed = currentTrain?.characteristics
      .map((el) => el.speed.amount)
      .sort((a, b) => a - b);
    console.log(sortSpeed);
  };

  const findNoValid = (el: TrainCharacteristicModel): boolean => {
    const validSpeed = el.speed.isValid;
    const validEngineAmperage = el.engineAmperage.isValid;
    const validforce = el.force.isValid;

    return validEngineAmperage && validSpeed && validforce;
  };

  const isValid = currentTrain?.characteristics
    .map((el) => findNoValid(el))
    .reduce((prev, cur) => prev && cur);

  return (
    <>
      <Header />
      <main className="flex items-top">
        <Box>
          <TrainTable />
        </Box>
        {currentTrain ? (
          <Box>
            <form onSubmit={formSubmit}>
              <DataTable currentTrain={currentTrain} />
              <button
                disabled={!isValid}
                type="submit"
                className="px-2 py-1 bg-emerald-400 rounded-md mt-2 disabled:opacity-50"
              >
                Отправить
              </button>
            </form>
          </Box>
        ) : null}
      </main>
    </>
  );
}

export default App;
