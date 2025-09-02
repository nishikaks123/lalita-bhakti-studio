import { AddMovieToListData, AddMovieToListVariables, GetPublicMovieListsData, CreateUserWithEmailData, CreateUserWithEmailVariables, GetMoviesByGenreData, GetMoviesByGenreVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddMovieToList(options?: useDataConnectMutationOptions<AddMovieToListData, FirebaseError, AddMovieToListVariables>): UseDataConnectMutationResult<AddMovieToListData, AddMovieToListVariables>;
export function useAddMovieToList(dc: DataConnect, options?: useDataConnectMutationOptions<AddMovieToListData, FirebaseError, AddMovieToListVariables>): UseDataConnectMutationResult<AddMovieToListData, AddMovieToListVariables>;

export function useGetPublicMovieLists(options?: useDataConnectQueryOptions<GetPublicMovieListsData>): UseDataConnectQueryResult<GetPublicMovieListsData, undefined>;
export function useGetPublicMovieLists(dc: DataConnect, options?: useDataConnectQueryOptions<GetPublicMovieListsData>): UseDataConnectQueryResult<GetPublicMovieListsData, undefined>;

export function useCreateUserWithEmail(options?: useDataConnectMutationOptions<CreateUserWithEmailData, FirebaseError, CreateUserWithEmailVariables>): UseDataConnectMutationResult<CreateUserWithEmailData, CreateUserWithEmailVariables>;
export function useCreateUserWithEmail(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserWithEmailData, FirebaseError, CreateUserWithEmailVariables>): UseDataConnectMutationResult<CreateUserWithEmailData, CreateUserWithEmailVariables>;

export function useGetMoviesByGenre(vars: GetMoviesByGenreVariables, options?: useDataConnectQueryOptions<GetMoviesByGenreData>): UseDataConnectQueryResult<GetMoviesByGenreData, GetMoviesByGenreVariables>;
export function useGetMoviesByGenre(dc: DataConnect, vars: GetMoviesByGenreVariables, options?: useDataConnectQueryOptions<GetMoviesByGenreData>): UseDataConnectQueryResult<GetMoviesByGenreData, GetMoviesByGenreVariables>;
