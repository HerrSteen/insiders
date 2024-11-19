export interface Row {
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

export interface Context {
  body?: Row[];
}
