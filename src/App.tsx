import "./App.css";
import Header from "./components/Header";
import TrainTable from "./components/TrainTable";
import DataTable from "./components/DataTable";
import Box from "./components/Box";
import { useAppSelector } from "./store/hooks";
import { FormEvent } from "react";

function App() {
  const currentTrain = useAppSelector(
    (state) => state.trainReducer.currentTrain
  );
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    const sortSpeed = currentTrain?.characteristics
      .map((el) => el.speed)
      .sort((a, b) => a - b);
    console.log(sortSpeed);
  };
  const noValidData = useAppSelector((state) => state.trainReducer.noValidDataCount);
  console.log(noValidData);
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
                disabled={!!noValidData}
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
