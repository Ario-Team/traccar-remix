import type { FC } from "react";

type props = {
  label: string;
};

const Checkbox: FC<props> = ({ label }) => {
  return (
    <div>
      <input className="text-2xl" type="checkbox" />
      <label className="text-base ml-3">{label}</label>
    </div>
  );
};

export default Checkbox;
