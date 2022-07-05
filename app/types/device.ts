export type Device = {
  id: number | string;
  name: string;
  uniqueId: string;
  status: "offline" | "online" | "unknown";
  disabled: boolean;
  lastUpdate: string;
  positionId: number;
  groupId: number;
  phone: string;
  model: string;
  contact: string;
  category: string;
  geofenceIds: number[];
  attributes: object;
};
