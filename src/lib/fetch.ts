import {Article} from '@/types';

type PayloadProps = {
  status: 'ok' | 'error';
  code?: number;
  message?: string;
  articles: Article[];
  totalResults: number;
  nextCursor?: number | null;
};

type QueryProps = {
  pageParam: number;
};

const PAGE_SIZE = 20;
const MAX_RESULTS = 100;

export const fetchArticles = async ({pageParam}: QueryProps) => {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=183daca270264bad86fc5b72972fb82a&pageSize=${PAGE_SIZE}&page=${pageParam}`,
  );

  const payload: PayloadProps = await res.json();

  if (payload.status !== 'ok') {
    throw new Error(`Failed to fetch ${payload.status}: ${payload.message}`);
  }

  payload.nextCursor = null;

  const maxResults =
    payload.totalResults < MAX_RESULTS ? payload.totalResults : MAX_RESULTS;
  if (pageParam * PAGE_SIZE < maxResults) {
    payload.nextCursor = ++pageParam;
  }

  return payload;
};
