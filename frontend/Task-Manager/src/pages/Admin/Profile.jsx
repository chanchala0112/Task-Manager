import React, { useContext, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import { LuMail, LuUser, LuBadgeCheck, LuCalendar } from "react-icons/lu";
import ProfileEditModal from "../../components/ProfileEditModal";

const Profile = () => {
  const { user, updateUser } = useContext(UserContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="mt-8 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header/Cover section */}
          <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/5"></div>
          
          <div className="px-8 pb-8">
            <div className="relative flex flex-col md:flex-row md:items-end gap-6 -mt-12">
              <div className="relative">
                <img
                  src={user?.profileImageUrl || "/defaultavatar.png"}
                  alt={user?.name}
                  className="w-32 h-32 rounded-3xl border-4 border-white shadow-md object-cover bg-white"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
              </div>

              <div className="flex-1 mb-2">
                <h1 className="text-2xl font-bold text-slate-800">{user?.name}</h1>
                <p className="text-gray-500 font-medium">{user?.role === 'admin' ? 'Administrator' : 'Team Member'}</p>
              </div>

              <div className="mb-2">
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                   Account Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                      <LuUser size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Full Name</p>
                      <p className="text-slate-700 font-semibold">{user?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                      <LuMail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email Address</p>
                      <p className="text-slate-700 font-semibold">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                   System Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                      <LuBadgeCheck size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Account Role</p>
                      <p className="text-slate-700 font-semibold capitalize">{user?.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                      <LuCalendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Account Created</p>
                      <p className="text-slate-700 font-semibold">{moment(user?.createdAt).format("MMMM Do, YYYY")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onUpdate={(updatedData) => updateUser(updatedData)}
      />
    </DashboardLayout>
  );
};

export default Profile;
