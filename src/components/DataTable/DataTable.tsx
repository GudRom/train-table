import { TrainModel } from "../../types/Train";
import TableHeader from "../TableHeader";
import Cell from "./components/Cell";

interface Props {
  currentTrain: TrainModel;
}

const CHARACTERISTICS_HEADERS = [
  "Ток двигателя, А",
  "Сила тяги, кН",
  "Скорость, км/ч",
];

const DataTable = ({ currentTrain }: Props) => {
  return (
    <table>
      <caption className="text-left">Характеристики</caption>
      <caption className="text-left">{currentTrain.name}</caption>
      <TableHeader headers={CHARACTERISTICS_HEADERS} />
      <tbody>
        {currentTrain.characteristics.map((charact) => (
          <tr key={charact.id}>
            <Cell
              characteristic={charact.engineAmperage}
              type={"engineAmperage"}
              id={charact.id}
            />
            <Cell
              characteristic={charact.force}
              type={"force"}
              id={charact.id}
            />
            <Cell
              characteristic={charact.speed}
              type={"speed"}
              id={charact.id}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
