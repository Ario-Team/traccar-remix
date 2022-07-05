import type { FC } from "react";
import { FaInfo } from "react-icons/fa";

const ResetPassword: FC = () => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center w-full text-center">
      <FaInfo /> <span>This page is disabled</span>
    </div>
  );
};

export default ResetPassword;
