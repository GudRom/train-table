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
  console.log("render");
  return (
    <table>
      <caption className="text-left">Характеристики</caption>
      <caption className="text-left">{currentTrain.name}</caption>
      <TableHeader headers={CHARACTERISTICS_HEADERS} />
      <tbody>
        {currentTrain.characteristics.map((charact) => (
          <tr key={charact.id}>
            <Cell type="withoutzero" characteristic={charact.engineAmperage} />
            <Cell type="withdote" characteristic={charact.force} />
            <Cell type="withzero" characteristic={charact.speed} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
