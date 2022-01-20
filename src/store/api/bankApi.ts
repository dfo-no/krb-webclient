import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBank } from '../../Nexus/entities/IBank';

const normalizeBanks = (banks: IBank[]): Record<string, IBank> =>
  banks.reduce((acc, curr) => {
    // eslint-disable-next-line no-param-reassign
    acc[curr.id] = curr;
    return acc;
  }, {} as Record<string, IBank>);

export const bankApi = createApi({
  reducerPath: 'bankApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
  }),
  tagTypes: ['Banks'],
  endpoints: (builder) => ({
    getBank: builder.query<IBank, string>({
      query: (id) => `/api/bank/${id}`
    }),
    getAllBanks: builder.query<Record<string, IBank>, void>({
      query: () => `/api/bank/banks`,
      providesTags: [{ type: 'Banks', id: 'LIST' }],
      transformResponse: (response: IBank[]) => normalizeBanks(response)
    }),
    getAlbefaticalSortedBanks: builder.query<IBank[], void>({
      query: () =>
        `/api/bank/sorted?fieldName=${'title'}&limit=${5}&order=${'ASC'}`,
      providesTags: [{ type: 'Banks', id: 'LIST' }]
    }),
    getDateSortedBanks: builder.query<IBank[], void>({
      query: () =>
        `/api/bank/sorted?fieldName=${'publishedDate'}&limit=${5}&order=${'DESC'}`,
      providesTags: [{ type: 'Banks', id: 'LIST' }]
    }),
    addBank: builder.mutation<IBank, IBank>({
      query(bank) {
        return {
          url: `/api/bank`,
          method: 'POST',
          body: bank
        };
      },
      invalidatesTags: [{ type: 'Banks', id: 'LIST' }]
    })
  })
});

export const {
  useGetBankQuery,
  useGetAllBanksQuery,
  useGetAlbefaticalSortedBanksQuery,
  useGetDateSortedBanksQuery,
  useAddBankMutation
} = bankApi;
