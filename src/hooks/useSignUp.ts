import { useMutation } from '@tanstack/react-query';
import { SignUpData } from '../components/types';
import { SignUpResponseType, GenErrType } from './types/apiTypes';
import type { AxiosError } from 'axios';
import { apiRequest } from '../components/utils/apiRequest';

// const signUpUser = async (data: SignUpData): Promise<SignUpResponseType> => {
//     const response = await apiClient.post('/users/create-user/', data);
    // return response as SignUpResponseType; --- explicitly defining as
    // return response.data --- when interceptor does not return response with .data
// }

const signUpUser = (data: SignUpData) => apiRequest.post<SignUpResponseType>('/users/create-user/', data);

export const useSignUp = () => {
    return useMutation<SignUpResponseType, AxiosError<GenErrType>, SignUpData>({
        mutationFn: signUpUser, 
    });
}


// one way to destructure an update with its types
// const updateCourse = (id: CourseIdData, data: AddCourseData) => apiRequest.patch<AddCourseRspType>(`/courses/${id.id}/update/`, data);
// export const useUpdateCourse = () => {
//     return useMutation<AddCourseRspType, AxiosError<GenErrType>, { id: CourseIdData, data: AddCourseData }>({
//         mutationFn: ({ id, data }) => updateCourse(id, data),
//     });
// };
// other way
// const updateCourse = ({ id, ..data }: AddCourseData & CourseIdData) => apiRequest.patch<AddCourseRspType>(`/courses/${id.id}/update/`, data);
// export const useUpdateCourse = () => {
//     return useMutation<AddCourseRspType, AxiosError<GenErrType>, AddCourseData & CourseIdData>({
//         mutationFn: updateCourse,
//     });
// };