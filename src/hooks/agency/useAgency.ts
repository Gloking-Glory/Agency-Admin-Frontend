import { useMutation, useQuery } from '@tanstack/react-query';
import { AgencyDashboardData, AgencyUpdateData } from '../../components/types';
import type { AxiosError } from 'axios';
import { apiRequest } from '../../components/utils/apiRequest';
import { GenErrType, AgencyUpdateRspType } from '../types/apiTypes';

const fetchAgencyDashboard = () => apiRequest.get<AgencyDashboardData>('/agency/agency-dashboard');

const agencyUpdate = (data: AgencyUpdateData) => apiRequest.patch<AgencyUpdateRspType>('/agency/agency-profile/', data);

export const useAgencyDashboard = () => {
    return useQuery<AgencyDashboardData, AxiosError<GenErrType>>({
        queryKey: ['agencyDashboard'],
        queryFn: fetchAgencyDashboard,
    });
}

export const useAgencyUpdate = () => {
    return useMutation<AgencyUpdateRspType, AxiosError<GenErrType>, AgencyUpdateData>({
        mutationFn: agencyUpdate
    })
}