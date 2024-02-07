/* eslint-disable react-refresh/only-export-components */
import { FC, memo } from "react";
import { TrainModel } from "../../../../types/Train";
import { useAppDispatch } from "../../../../store/hooks";
import { setCurrentTrain } from "../../../../store/trainSlice";

interface Props {
  train: TrainModel;
}

const BodyRow: FC<Props> = ({ train }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setCurrentTrain(train));
  };

  return (
    <tr onClick={handleClick}>
      <td>{train.name}</td>
      <td>{train.description}</td>
    </tr>
  );
};

export default memo(BodyRow);
