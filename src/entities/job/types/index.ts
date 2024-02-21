export interface Job {
  _id: string;
  title: string;
}

export interface JobStore {
  jobs?: Job[];
}
