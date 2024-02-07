import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import {
  addNoValidData,
  removeNoValidData,
} from "../../../../store/trainSlice";

type Props = {
  characteristic: number;
  type: "withdote" | "withoutzero" | "withzero";
};

const Cell: FC<Props> = ({ characteristic, type }) => {
  const [amount, setAmount] = useState<number>(characteristic);
  const [isValid, setIsValid] = useState(true);

  const dispatch = useAppDispatch();

  const validateAmount = () => {
    switch (type) {
      case "withdote":
        Number.isInteger(amount) && amount <= 0 && setNoValid();
        break;
      case "withoutzero":
        !(Number.isInteger(amount) && amount > 0) && setNoValid();
        break;

      case "withzero":
        !(Number.isInteger(amount) && amount >= 0) && setNoValid();
        break;
    }
  };

  const setNoValid = () => {
    setIsValid(false);
    dispatch(addNoValidData());
  };

  useEffect(() => {
    dispatch(removeNoValidData());
    setIsValid(true);
  }, [dispatch, isValid]);

  return (
    <td>
      <input
        className={`text-center ${isValid ? "text-inherit" : "text-red-600"}`}
        type="number"
        value={amount}
        onChange={(e) => setAmount(+e.currentTarget.value)}
        onBlur={validateAmount}
      />
    </td>
  );
};

export default Cell;
