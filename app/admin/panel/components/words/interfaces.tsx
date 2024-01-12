export interface Word {
  _id: string;
  word: string;
  type: string;
  text: string;
  mature: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  __v: number;
}

export interface StupidWords {
  status: string;
  total: number;
  data: Word[];
}

export interface SearchParams {
  word?: string;
  mature?: string;
  type?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

export interface FilterParams {
  mature: string | undefined;
  type: string | undefined;
}
