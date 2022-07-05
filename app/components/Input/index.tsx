import { useState } from "react";
import type { ChangeEventHandler } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";

type props = {
  type: "password" | "text" | "email";
  label: string;
  name: string;
  onChange: ChangeEventHandler;
  value: string;
};

const Input: React.FC<props> = ({ type, label, name, onChange, value }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-[80vw] max-w-[63rem] min-w-[8rem] relative xl:w-[39.5vw] xl:max-w-[36rem] xl:min-w-[35.5rem]">
      <input
        type={
          type == "password" && show
            ? "text"
            : type == "password" && !show
            ? "password"
            : type
        }
        autoComplete="off"
        onChange={onChange}
        value={value}
        className="bg-gray-200 w-full h-14 rounded-sm outline-none pl-12 font-normal  text-base my-5"
        name={name}
      />
      <label className="absolute ltr:left-4 top-3 text-xs text-gray-800 font-light opacity-75">
        {label}
      </label>
      {type == "email" ? (
        <FaEnvelope className="text-xl absolute ltr:left-5 top-9" />
      ) : type == "password" ? (
        <FaKey className="text-xl absolute ltr:left-5 top-9" />
      ) : type == "text" ? (
        <FaUser className="text-xl absolute ltr:left-5 top-9" />
      ) : null}
      {type == "password" ? (
        <>
          {show ? (
            <FaEyeSlash
              className="text-xl absolute ltr:right-5 top-9 cursor-pointer"
              onClick={() => setShow(false)}
            />
          ) : (
            <FaEye
              className="text-xl absolute ltr:right-5 top-9 cursor-pointer"
              onClick={() => setShow(true)}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default Input;
