import { useEffect } from "react";
import BodyRow from "./components/BodyRow";
import TableHeader from "../TableHeader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTrainsData } from "../../store/trainSlice";

const TABLE_HEADERS = ["Название", "Описание"];

const TrainTable = () => {
  const dispatch = useAppDispatch();
  const { trains, loading, error } = useAppSelector(
    (state) => state.trainReducer
  );
  useEffect(() => {
    dispatch(fetchTrainsData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <table>
      <caption>Поезда</caption>
      {loading && <caption>Loading...</caption>}
      {error && <caption>{error.message}</caption>}
      <TableHeader headers={TABLE_HEADERS} />
      <tbody>
        {trains
          ? trains.map((train) => <BodyRow key={train.id} train={train} />)
          : null}
      </tbody>
    </table>
  );
};

export default TrainTable;
