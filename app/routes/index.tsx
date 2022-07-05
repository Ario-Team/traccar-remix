import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaBars, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import { Map } from "react-map-gl";
import { getDevices } from "~/functions/devices";
import { getSession } from "~/sessions";
import type { Device } from "~/types/device";

import mainStyle from "../styles/pages/index.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: mainStyle,
    },
  ];
};

export const meta: MetaFunction = () => {
  return {
    title: "Unalink Tracking Platform",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("email") && !session.has("password")) {
    return redirect("/authentication/login");
  }
  const devices: Device[] = await getDevices(session);
  return json({
    devices,
  });
};

export default function Index() {
  const { devices }: { devices: Device[] } = useLoaderData();
  const [activeDevice, setActiveDevice] = useState<Device[]>([]);
  const [search, setSearch] = useState<string>("");
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  useEffect(() => {
    if (search == "") {
      setActiveDevice(devices);
    } else {
      setActiveDevice(
        devices.filter((device) =>
          device.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [devices, search]);

  return (
    <div className="relative w-screen h-screen">
      <Map
        mapboxAccessToken="pk.eyJ1IjoibW9oYW1tYWRyYXVmemFoZWQiLCJhIjoiY2w1NnJyMGxtMWlzbDNqbjllazVzeGJ3dCJ9.i3QS34J5kFlVaS3fLkj0Tw"
        initialViewState={{
          longitude: 51.379928,
          latitude: 35.712313,
          zoom: 9,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        optimizeForTerrain={true}
      >
        <div
          className="sidebar absolute w-screen h-screen bg-white z-20 lg:w-5/12 lg:max-w-[480px] lg:h-[96vh] lg:top-[2vh] lg:left-4 lg:rounded-xl"
          aria-hidden={!openSidebar}
        >
          <div className="flex flex-row justify-between items-center px-8 shadow-gray-300 shadow-md w-screen h-20 lg:w-full">
            <FaArrowLeft
              className="text-gray-500 opacity-95 text-xl cursor-pointer transition-opacity duration-100 hover:opacity-100"
              onClick={() => setOpenSidebar(false)}
            />
            <div className="min-w-[170px] w-[64vw] max-w-[594px] h-12 sm:w-[65vw] sm:min-w-[508px] md:w-[82vw] md:max-w-[710px] lg:w-10/12 lg:min-w-[unset] lg:max-w-none">
              <input
                type="text"
                placeholder="Search Devices"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                className="border-gray-300 border-[1px] hover:border-black focus:border-black w-full h-full text-base font-light outline-none pl-4"
              />
            </div>
            <FaPlus className="text-gray-500 opacity-95 text-xl cursor-pointer transition-opacity duration-100 hover:opacity-100" />
          </div>
          <div className="flex flex-col gap-0 w-full mt-5">
            {activeDevice.map((device, key) => (
              <div
                className="w-full bg-white h-20 mb-4 flex flex-row items-center px-4 transition-transform duration-200 hover:scale-95 hover:cursor-pointer"
                key={key}
              >
                <div className="flex flex-row gap-3 min-w-[6rem] w-max justify-between items-center">
                  <div className=" bg-gray-300 p-3 rounded-full  h-max w-ma">
                    <FaMapMarkerAlt className="text-white opacity-95 text-xl h-max" />
                  </div>
                  <div className="flex flex-col justify-between items-start w-max gap-1">
                    <span className="font-light text-black text-base">
                      {device.name}
                    </span>
                    <span
                      className={`font-light ${
                        device.status == "online"
                          ? "text-unalink-blue"
                          : device.status == "offline"
                          ? "text-red-500"
                          : "text-gray-400"
                      } text-sm`}
                    >
                      {device.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute left-0 top-6 z-10 flex flex-row justify-between items-center bg-white gap-2 px-3 py-2 cursor-pointer lg:left-4
        "
          onClick={() => setOpenSidebar(true)}
        >
          <FaBars className="text-sm lg:text-base" />
          <span className="uppercase text-sm font-medium lg:text-base">
            Devices
          </span>
        </div>
      </Map>
    </div>
  );
}
