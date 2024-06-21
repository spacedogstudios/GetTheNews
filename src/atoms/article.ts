import {atom} from 'jotai';
import {Article} from '@/types';

export const selectedArticleAtom = atom<Article | null>(null);
