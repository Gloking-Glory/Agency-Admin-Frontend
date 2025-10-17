import { useMutation, useQuery } from '@tanstack/react-query';
import { AgencyDashboardData, AgencyUpdateData } from '../../components/types';
import type { AxiosError } from 'axios';
import { apiRequest } from '../../components/utils/apiRequest';
import { AgencyDashboardErrType, SignUpErrorType, SignUpResponseType } from '..//types/apiTypes';

const fetchAgencyDashboard = () => apiRequest.get<AgencyDashboardData>('/agency/agency-dashboard');

const agencyUpdate = (data: AgencyUpdateData) => apiRequest.patch<SignUpResponseType>('/agency/agency-profile/', data);

export const useAgencyDashboard = () => {
    return useQuery<AgencyDashboardData, AxiosError<AgencyDashboardErrType>>({
        queryKey: ['agencyDashboard'],
        queryFn: fetchAgencyDashboard,
    });
}

export const useAgencyUpdate = () => {
    return useMutation<SignUpResponseType, AxiosError<SignUpErrorType>, AgencyUpdateData>({
        mutationFn: agencyUpdate
    })
}