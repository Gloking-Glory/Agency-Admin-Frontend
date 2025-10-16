import { useMutation } from '@tanstack/react-query';
import { SignUpData } from '../components/types';
import { SignUpResponseType, SignUpErrorType } from './types/apiTypes';
import type { AxiosError } from 'axios';
import { apiRequest } from '../components/utils/apiRequest';

// const signUpUser = async (data: SignUpData): Promise<SignUpResponseType> => {
//     const response = await apiClient.post('/users/create-user/', data);
    // return response as SignUpResponseType; --- explicitly defining as
    // return response.data --- when interceptor does not return response with .data
// }

const signUpUser = (data: SignUpData) => apiRequest.post<SignUpResponseType>('/users/create-user/', data);

export const useSignUp = () => {
    return useMutation<SignUpResponseType, AxiosError<SignUpErrorType>, SignUpData>({
        mutationFn: signUpUser, 
    });
}
