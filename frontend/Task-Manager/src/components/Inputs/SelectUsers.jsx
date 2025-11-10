import React, { useEffect, useState} from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUsers } from 'react-icons/lu';


const SelectUsers = ({selectedUsers, setSelectedUsers}) => {
    const [allUsers,setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            if (reaponse.data.?length > 0){
                setAllUsers(response.Data);
            }

        } catch (error) {
            console.error("Error fetching users:" ,error);
        }
    };

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers{(prev) => 
            prev.includes(userId)
            ?prev.filter((id) => id !== userId)
            : [...prev, userId]
        };
    };

    const handleSAssign = () => {
        setSelectedUsers(tempSelectUsers);
        setIsModelOpen(false);
    };

    const setSelectedUserAvatars = allUsers.filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

    useEffect(() => {
        if (selectedUsers.length === 0){
            setTempSelectedUsers([]);
        }

        return() = {};
    }, [selectUsers]);

  return (
    <div classNAme="space-y-4 mt-2">
    {setSelectedUserAvatars.length === 0 && (
        <button className="card-btn" onClick={() => setIsModalOpen(true)}> 
            <LuUsers className="text-sm" /> Add Members
        </button>
    )}

    <Modal 
        isOpen={isModelOpen}
        onClick={() => setIsModalOpen(false)}
        title="Select Users"
    />

    <div className="space-y-4 h-[60vh] overFlow-y-auto"></div>
  </div>
  )
};

export default SelectUsers