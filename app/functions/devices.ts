import type { Session } from "@remix-run/node";
import axios from "axios";
import { Device } from "~/types/device";

export async function getDevices(session: Session): Promise<Device[]> {
  const email = await session.get("email");
  const password = await session.get("password");
  const result: Device[] | any = await axios
    .get<Device[]>("https://track.unalink.net/api/devices", {
      auth: {
        username: email,
        password,
      },
      data: {
        all: true,
      },
    })
    .then((data) => data.data);
  return result;
}
