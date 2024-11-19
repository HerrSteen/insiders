export interface InsiderState {
  insiders?: Insider[];
}

export enum LoadingStatus {
  NOT_LOADED = 'NOT_LOADED',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  FAILED = 'FAILED',
}

export interface Insider {
  date: string;
  instrumentName: string;
  person: string;
  title: string;
  type: string;
  instrumentType: string;
  volume: string;
  price: string;
  currency: string;
  totalCost: string;
};
