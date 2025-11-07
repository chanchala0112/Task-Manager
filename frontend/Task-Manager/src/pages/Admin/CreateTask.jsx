import React, { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { PRIORITY_DATA } from '../../utils/data';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS  } from '../../utils/apiPaths';
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from "react-router-dom"
import moment from "moment"
import { luTrash2 } from "react-icons/lu"

const CreateTask = () => {

  const useLocation = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title:"",
    description:"",
    priority:"",
    dueDate:null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
});

  const [createTask, setCurrentTask] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key,value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value}));
  };

  const clearDAta = () => {
    //rest form
    setTaskData({
      title:"",
      description:"",
      priority:"",
      dueDate:"",
      assignedTo: [],
      todoChecklist: [],
    });
  };

  //Create Task
  const createTask = async () => {};

  // Update Task
  const updateTask = async () => {};

  const handleSubmit = async () => {};

  // Get TAsk info by ID
  const getTaskDetailsByID = async () => {};

  const deleteTask = async () => {};

  return ( <DashboardLayout activeMenue="Create Task">
    <div className="mt-5">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
        <div className="form-card col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-xl font-medium">
              {taskId ? "Update Task" : "Create Task"}
            </h2>

            {task.Id && (
              <button 
              className="flex item-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
              onClick={() => setOpenDeleteAlert(true)}>
                <LuTrash2 className="text-base" /> Delete
              </button>
            )}
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-slate-600">
              Task Title
            </label>

            <input
            placeholde="Create App UI"
            classsName="form-input"
            value={taskData.title} 
            onChange={({ target })=>
              handleValueChange("title", target.value)
              }
            />
          </div>

          <div className="mt-3">
            <label className="text-xs font-medium text-slate-600">
              Description
            </label>

            <textArea
              placeholder="Describe task"
              className="form-input"
              raws={4}
              value={taskData.description}
              onChange={({ target }) =>
                handleValueChange("description", target.value)
                }
            />
          </div>

          <div className="grid grid-cols-12 gap-4 mt-2">
            <div className="col-span-6 md:col-span-4">
              <lable className="text-xs font-medium text-slate-600">
                Priority
              </lable>

              <SelectDropdown
                options={PRIORITY_DATA}
                value={taskData.priority}
                onChange={(value) => handleValueChange("priority", value)}
                placeholder="Select Priority"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
     
     </DashboardLayout>
     )
};

export default CreateTask;
