import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { databaseURL } from "./firebase-config";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: databaseURL,
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (name: string) => `${name}`,
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;

// TEST
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => `pokemon/${name}`,
    }),
  }),
});
export const { useGetPokemonByNameQuery } = pokemonApi;
