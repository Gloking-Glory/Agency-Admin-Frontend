import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { LoginData } from '../components/types';
import { LoginResponseType, GenErrType } from './types/apiTypes';
import { apiRequest } from '../components/utils/apiRequest';

const loginUser = (data: LoginData) => apiRequest.post<LoginResponseType>('/users/login/', data);

export const useLogin = () => {
    return useMutation<LoginResponseType, AxiosError<GenErrType>, LoginData>({
        mutationFn: loginUser
    })
}