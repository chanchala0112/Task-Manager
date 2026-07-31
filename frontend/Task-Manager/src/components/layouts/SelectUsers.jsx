import React, { useEffect, useState} from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUsers } from 'react-icons/lu';

import AvatarGroup from "../AvatarGroup";

import Modal from "../Modal";


const SelectUsers = ({selectedUsers, setSelectedUsers}) => {
    const [allUsers,setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); //i change true to false using chatgpt command
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            if (response.data?.length > 0){
                setAllUsers(response.data);
            }

        } catch (error) {
            console.error("Error fetching users:" ,error);
        }
    };

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) => 
            prev.includes(userId)
            ? prev.filter((id) => id !== userId)
            : [...prev, userId]
        );
    };

    const handleSAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    };

    const setSelectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

    useEffect(() => {
    getAllUsers();
    }, []);

    useEffect(() => {
        if (selectedUsers.length === 0){
            setTempSelectedUsers([]);
        }

    }, [selectedUsers]);

   
  return (
    <div className="space-y-4 mt-1">
    {setSelectedUserAvatars.length === 0 && (
        <button 
            className="flex items-center gap-2 text-xs font-medium text-primary bg-blue-50 hover:bg-blue-100/50 px-4 py-2.5 rounded-lg border border-blue-100 transition-all cursor-pointer" 
            onClick={() => setIsModalOpen(true)}
        > 
            <LuUsers className="text-base" /> Add Members
        </button>
    )}

    {setSelectedUserAvatars.length > 0 && (
        <div 
            className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-100 hover:border-primary/20 transition-all cursor-pointer group" 
            onClick={() => setIsModalOpen(true)}
        >
            <AvatarGroup avatars={setSelectedUserAvatars} maxVisible={4}/>
            <span className="text-[11px] font-medium text-slate-500 group-hover:text-primary transition-colors">
                {setSelectedUserAvatars.length} Assigned
            </span>
        </div>
    )}

    <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
    >

    <div className="grid grid-cols-1 gap-2 h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {allUsers.map((user) => (
            <div 
                key={user._id}
                onClick={() => toggleUserSelection(user._id)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    tempSelectedUsers.includes(user._id) 
                    ? "bg-primary/5 border-primary/20 shadow-sm" 
                    : "bg-white border-transparent hover:bg-gray-50"
                }`}
            >
                <img 
                    src={user.profileImageUrl || "/defaultavatar.png"} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full border border-gray-100"
                />

                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">
                        {user.name}
                    </p>
                    <p className="text-[12px] text-gray-400 truncate">
                        {user.email}
                    </p>
                </div>

                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    tempSelectedUsers.includes(user._id)
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-200"
                }`}>
                    {tempSelectedUsers.includes(user._id) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                </div>
            </div>
        ))}
    </div>

    <div className="flex justify-end gap-4 pt-4">
        <button className="card-btn" onClick={() => setIsModalOpen(false)}>
            CANCEL
        </button>
        <button className="card-btn-fill" onClick={handleSAssign}>
            DONE
        </button>
    </div>
    </Modal>
  </div>
  );
};

export default SelectUsers