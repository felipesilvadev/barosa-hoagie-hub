import { api } from '../network/api';

export type Hoagie = {
  id: string;
  name: string;
  ingredients: string[];
  picture?: string;
  creator: Creator;
  commentCount?: number;
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
};

type Creator = {
  id: string;
  name?: string;
};

type Comment = {
  id: string;
  text: string;
  createdAt: string;
  user: CommentUser;
};

type CommentUser = {
  id: string;
  name: string;
};

type FetchPaginatedHoagiesResponse = {
  hoagies: Hoagie[];
  total: number;
  perPage: number;
};

export type CreateHoagieData = Pick<Hoagie, 'name' | 'ingredients' | 'picture'>;

export const hoagieApi = {
  fetchPaginatedHoagies: (page: number) =>
    api
      .get<FetchPaginatedHoagiesResponse>(`/hoagies?page=${page}`)
      .then((response) => response.data),
  createHoagie: ({ name, ingredients, picture }: CreateHoagieData) =>
    api.post('/hoagies', { name, ingredients, picture }),
};
