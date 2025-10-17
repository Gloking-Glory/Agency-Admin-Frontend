"use client";

import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react"; // ✅ icons
import { AdminUserList, AdminDelData } from "../types";
import AgencyModal from "../utils/agencyModal";
import { useAdminDashboard, useAdminDelUser } from "@/app/hooks/admin/useAdmin";

const AdminDashboard = () => {
  const [selectedAgency, setSelectedAgency] = useState<AdminUserList | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editFields = ["Role", "Company", "Email", "Contact Details", "Status", "Actions"];
  const { data, isPending } = useAdminDashboard();

  const allUsers: AdminUserList[] = data?.results || [];
  const { mutate, isPending: delPending, error } = useAdminDelUser();

  // const users: PaginatedRspData[] = data || [];

  // const handleEdit = (agency: AgencyData) => {
  //   setSelectedAgency(agency);
  //   setIsModalOpen(true);
  // };

  const handleDelete = (agency: AdminDelData) => {
    console.log(agency);
    mutate(
      { ...agency },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (err) => {
          console.log(err);
        }
      }
    )
  };  

  // const handleUpdate = (data: AgencyUpdateData) => {
  //   if (selectedAgency) {
  //     console.log("Updating agency:", selectedAgency.id, data);
  //   }
  // };
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {editFields.map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {allUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {user.company_name}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.email}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.contact_details}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm flex gap-3">
                    <button
                      // onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit Agency"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete({ id: user.id })}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete Agency" 
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {allUsers.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-sm">
              No user registered yet.
            </div>
          )}
        </div>
      </div>

      <AgencyModal
        isOpen={isModalOpen}
        agency={selectedAgency}
        onClose={() => setIsModalOpen(false)}
        // onUpdate={handleUpdate}
        onUpdate={() => console.log('scope')}
        loading={false}
      />
    </div>
  );
};

export default AdminDashboard;
