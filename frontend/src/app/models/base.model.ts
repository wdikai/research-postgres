export interface ResponseContainer < T > {
  data: T
};

export interface Dictionary < V > {
  [key: string]: V;
}

export enum Mode {
  Online = 1,
  Offline = 2
}
