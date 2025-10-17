import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AgencyDashboardData, AgencyData, AgencyUpdateData } from '../types';
import { validateRequired } from '../utils/validation';
import { CircularProgress } from '@mui/material';

interface AgencyModalProps {
  isOpen: boolean;
  loading: boolean;
  agency: AgencyData | null;
  onClose: () => void;
  onUpdate: (data: AgencyUpdateData) => void;
}

const AgencyModal = ({
  isOpen, agency, onClose, onUpdate, loading
}: AgencyModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AgencyUpdateData>();

  useEffect(() => {
    if (agency && isOpen) {
      console.log(agency);
      reset({
        company_name: agency.company_name,
        address: agency.address,
        contact_details: agency.contact_details,
      });
    }
  }, [agency, isOpen, reset]);

  const handleFormSubmit = (data: AgencyUpdateData) => {
    onUpdate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Update Agency Information</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company Name *
              </label>
              <input
                type="text"
                {...register('company_name', {
                  required: 'Company name is required',
                  validate: (value) => validateRequired(value) || 'Company name is required'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
              {errors.company_name && (
                <p className="text-red-500 text-xs mt-1">{errors.company_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address *
              </label>
              <input
                type="text"
                {...register('address', {
                  required: 'Address is required',
                  validate: (value) => validateRequired(value) || 'Address is required'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contact Details
              </label>
              <input
                type="text"
                {...register('contact_details')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} color="inherit" className="mr-2" />
                    Updating...
                  </>
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgencyModal;
