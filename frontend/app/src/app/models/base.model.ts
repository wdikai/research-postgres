export interface ResponseContainer < T > {
  data: T
};

export interface Dictionary < V > {
  [key: string]: V;
}

export interface LocationFilter extends Dictionary<any> {
  latitude: number;
  longitude: number;
  [key: string]: any;
}

export enum Mode {
  Online = 1,
  Offline = 2
}
