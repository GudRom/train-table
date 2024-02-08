/* eslint-disable react-refresh/only-export-components */
import { FC, memo, useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import {
  editCurrentTrainData,
} from "../../../../store/trainSlice";
import {
  CharactrecticWithFlag,
  TrainCharacteristic,
} from "../../../../types/TrainCharacteristic";

type Props = {
  characteristic: CharactrecticWithFlag;
  type: keyof TrainCharacteristic;
  id: number;
};

const Cell: FC<Props> = ({ characteristic, type, id }) => {
  const [amount, setAmount] = useState<number>(characteristic.amount);

  const dispatch = useAppDispatch();

  const updateStoreData = () => {
    dispatch(
      editCurrentTrainData({
        charId: id,
        type,
        amount,
      })
    );
  };

  return (
    <td>
      <input
        className={`text-center focus:outline-none ${
          characteristic.isValid ? "text-inherit" : "text-red-600"
        }`}
        type="number"
        value={amount}
        onChange={(e) => setAmount(+e.currentTarget.value)}
        onBlur={updateStoreData}
      />
    </td>
  );
};

export default memo(Cell);
