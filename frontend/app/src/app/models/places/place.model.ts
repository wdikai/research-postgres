import {LocationData} from "../location/location.model";

export enum Days {
  Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 7,
}

export interface Place {
  id: number;
  name: string;
  types: string[];
  address: string;
  openingHours?: OpeningHours;
  location: LocationData;
  distance?: number;
  isOpen?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface OpeningHours {
  workSchedule: WorkSchedule;
  timeZoneOffset: number;
}

export interface WorkSchedule {
  [day: number]: WorkPeriod | null;
}

export interface WorkPeriod {
  openAt: string;
  closeAt: string;
}
