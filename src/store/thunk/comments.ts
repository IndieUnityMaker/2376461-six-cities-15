import { createAsyncThunk } from '@reduxjs/toolkit';
import { typeCard, typeComment } from '../../types';
import type { AxiosInstance } from 'axios';

export const fetchAllComments = createAsyncThunk<typeComment[], string, {extra: AxiosInstance}>(
  'fetchOffers/comments', async (offerId, {extra: api}) => {
    const responce = await api.get<typeComment[]>(`/comments/${offerId}`);
    return responce.data;
  }
);

type PostCommentProps = {
  comment: string;
  rating: number;
  offerId?: typeCard['id'];
}

export const postComment = createAsyncThunk<typeComment, PostCommentProps, {extra: AxiosInstance}>(
  'comments/post', async ({offerId, comment, rating}, {extra: api}) => {
    const responce = await api.post<typeComment>(`/comments/${offerId}`,{ comment, rating });
    return responce.data;
  }
);

