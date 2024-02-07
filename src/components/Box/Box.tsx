import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Box = ({ children }: Props) => {
  return (
    <div className="p-3 border w-fit border-emerald-950 shadow-md m-4 rounded-xl h-fit">
      {children}
    </div>
  );
};

export default Box;
