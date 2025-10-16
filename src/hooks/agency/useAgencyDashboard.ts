import { useQuery } from '@tanstack/react-query';
import { AgencyDashboardRspData } from '../../components/types';
import type { AxiosError } from 'axios';
import { apiRequest } from '../../components/utils/apiRequest';
import { AgencyDashboardErrType } from '..//types/apiTypes';

const fetchAgencyDashboard = () => apiRequest.get<AgencyDashboardRspData>('/agency/agency-dashboard');

const updateAgency = ( data ) => apiRequest.patch('/agency/profile/, data);

export const useAgencyDashboard = () => {
    return useQuery<AgencyDashboardRspData, AxiosError<AgencyDashboardErrType>>({
        queryKey: ['agencyDashboard'],
        queryFn: fetchAgencyDashboard,
    });
}

