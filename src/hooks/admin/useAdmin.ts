import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiRequest } from '../../components/utils/apiRequest';
import { AdminDelRspType, GenErrType  } from '../types/apiTypes';
import { AdminDelData, PaginatedRspData } from '@/app/components/types';

const fetchAdminDashboard = () => apiRequest.get<PaginatedRspData>('/admin/users');

const adminDelUser = (data: AdminDelData) => apiRequest.delete<AdminDelRspType>(`/admin/delete-user/${data.id}/delete/`);

export const useAdminDashboard = () => {
    return useQuery<PaginatedRspData, AxiosError<GenErrType>>({
        queryKey: ['adminDashboard'],
        queryFn: fetchAdminDashboard,
    });
}

export const useAdminDelUser = () => {
    return useMutation<AdminDelRspType, AxiosError<GenErrType>, AdminDelData>({
        mutationFn: adminDelUser
    });
}