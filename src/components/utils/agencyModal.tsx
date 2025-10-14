import React from 'react';
import { useForm } from 'react-hook-form';
import { Agency, AgencyUpdateData } from '../types';
import { validateRequired } from '../utils/validation';

interface AgencyModalProps {
  isOpen: boolean;
  agency: Agency | null;
  onClose: () => void;
  onUpdate: (data: AgencyUpdateData) => void;
}

const AgencyModal = ({ isOpen, agency, onClose, onUpdate }: AgencyModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AgencyUpdateData>();

  React.useEffect(() => {
    if (agency && isOpen) {
      reset({
        name: agency.name,
        address: agency.address,
        contactDetails: agency.contactDetails,
        city: agency.city,
        country: agency.country
      });
    }
  }, [agency, isOpen, reset]);

  const handleFormSubmit = (data: AgencyUpdateData) => {
    onUpdate(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Update Agency Information</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
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
                {...register('name', {
                  required: 'Company name is required',
                  validate: (value) => validateRequired(value) || 'Company name is required'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                {...register('contactDetails')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City *
              </label>
              <input
                type="text"
                {...register('city', {
                  required: 'City is required',
                  validate: (value) => validateRequired(value) || 'City is required'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Country *
              </label>
              <input
                type="text"
                {...register('country', {
                  required: 'Country is required',
                  validate: (value) => validateRequired(value) || 'Country is required'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgencyModal;
