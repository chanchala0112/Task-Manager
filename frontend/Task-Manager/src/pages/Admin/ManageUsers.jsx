import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import UserCard from "../../components/Cards/UserCard";
import AddMemberModal from "../../components/AddMemberModal";
import UserEditModal from "../../components/UserEditModal";
import { LuFileSpreadsheet, LuPlus } from "react-icons/lu";

const ManageUsers = () => {

  const [allUsers, setAllUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getAllUsers = async () =>{
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0 ){
        setAllUsers(response.data);
      }

    }catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
        try {
            await axiosInstance.delete(API_PATHS.USERS.DELETE_USER(userId));
            toast.success("User deleted successfully");
            getAllUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error(error.response?.data?.message || "Failed to delete user");
        }
    }
  };

  //Download task report
  const handleDownloadReport = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXORT_USERS, {
        responseType: "blob"
      });

      //Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading user report:", error);
      toast.error("Failed to download user report. Please try again.");
    }
  };

  useEffect(() => {
    getAllUsers();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-800">Team Members</h2>

          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all cursor-pointer"
              onClick={() => setIsAddModalOpen(true)}
            >
              <LuPlus size={18} />
              Add Member
            </button>

            <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-600 text-sm font-semibold rounded-xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer" onClick={handleDownloadReport}>
              <LuFileSpreadsheet size={18} />
              Download Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allUsers?.map((user) => (
            <UserCard 
                key={user._id} 
                userInfo={user} 
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
          ))}
        </div>

      </div>

      <AddMemberModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onUserAdded={() => getAllUsers()}
      />

      {selectedUser && (
        <UserEditModal
            isOpen={isEditModalOpen}
            onClose={() => {
                setIsEditModalOpen(false);
                setSelectedUser(null);
            }}
            userInfo={selectedUser}
            onUserUpdated={() => getAllUsers()}
        />
      )}
    </DashboardLayout>
  )
};

export default ManageUsers;
