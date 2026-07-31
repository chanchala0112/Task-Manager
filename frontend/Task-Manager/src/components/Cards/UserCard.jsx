import React from 'react'
import { LuPencil, LuTrash2 } from "react-icons/lu";

const UserCard = ({userInfo, onEdit, onDelete}) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
        <div className="flex items-center gap-4">
            <div className="relative">
                <img 
                    src={userInfo?.profileImageUrl || "/defaultavatar.png"} 
                    alt={userInfo?.name}
                    className="w-14 h-14 rounded-full border-2 border-primary/10 p-0.5 group-hover:border-primary/30 transition-colors object-cover" 
                />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-slate-800 truncate">{userInfo?.name}</p>
                <p className="text-xs text-gray-400 truncate tracking-tight">{userInfo?.email}</p>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={() => onEdit(userInfo)}
                    className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all cursor-pointer"
                    title="Edit User"
                >
                    <LuPencil size={16} />
                </button>
                <button 
                    onClick={() => onDelete(userInfo._id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                    title="Delete User"
                >
                    <LuTrash2 size={16} />
                </button>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-6">
            <StarCard 
                label="Pending"
                count={userInfo?.pendingTasks || 0}
                status="Pending"
            />
            <StarCard 
                label="Process"
                count={userInfo?.inProgressTasks || 0}
                status="In progress"
            />
            <StarCard 
                label="Done"
                count={userInfo?.completedTasks || 0}
                status="Completed"
            />
        </div>
    </div>
  )
}

export default UserCard

const StarCard = ({ label, count, status}) => {

    const getStatusTagColor = () => {
        switch (status) {
            case "In progress":
                return "text-blue-600 bg-blue-50/50 border-blue-100";
            case "Completed":
                return "text-emerald-600 bg-emerald-50/50 border-emerald-100";
            default:
                return "text-amber-600 bg-amber-50/50 border-amber-100";
        }
    };

    return (
        <div className={`flex-1 text-[10px] font-bold ${getStatusTagColor()} px-3 py-1.5 rounded-xl border transition-all`}>
            <span className="text-[13px] font-extrabold">{count}</span> <br /> 
            <span className="opacity-70 uppercase tracking-tighter">{label}</span>
        </div>
    );
}