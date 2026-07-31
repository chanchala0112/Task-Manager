import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import moment from 'moment';
import AvatarGroup from '../../components/AvatarGroup';
import { LuSquareArrowOutUpRight, LuChevronLeft, LuChevronDown, LuChevronUp } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const ViewTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";

      case "Completed":
        return "text-lime-500 bg-cyan-50 border border-lime-500/10";

      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  //get Task info by 10 
  const getTaskDetailsByID = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );

      if(response.data?.task) {
        setTask(response.data.task);
      }
    }catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //Handle todo check
  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist];
    const taskId = id;

    if(todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed;

      try{
        const response = await axiosInstance.put(
          API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
          {todoChecklist}
        );
        if (response.status === 200) {
          setTask(response.data.task || response.data || task);
        } else {
          //Optionally revert the toggle if the API call fails,
          todoChecklist[index].completed = !todoChecklist[index].completed;
        }

      }catch (error) {
        todoChecklist[index].completed = !todoChecklist[index].completed;
      }
    }
  };

  //Handle attachment link lick
  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link //default to https
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
    return () => {};
  }, [id]);

  return(
    <DashboardLayout activeMenu="My Tasks"> 
      <div className="mt-5">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors mb-4 text-sm font-medium cursor-pointer group"
        >
          <LuChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Tasks
        </button>

        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-xl font-medium">
                  {task?.title}
                </h2>

                <div className={`text-[11px] font-medium ${getStatusTagColor (
                  task?.status
                  )} px-4 py-0.5 rounded `}
                >
                  {task?.status}

                </div>
            </div>

            <div className="mt-4">
              <InfoBox label="Description" value={task?.description} />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-4">
              <div className="col-span-6 md:col-span-4">
                <InfoBox label="Priority" value={task?.priority} />
              </div>

              <div className="col-span-6 md:col-span-4">
                <InfoBox 
                label="Due Date"
                value={task?.dueDate
                  ? moment(task?.dueDate).format("DD MM YYYY")
                  : "N/A"
                }
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-500">
                  Assign To
                </label>

                <AvatarGroup 
                  avatars={
                    task?.assignedTo?.map((item) => item?.profileImageUrl) || 
                  []
                }
                maxVisible={5}
                />
              </div>
              </div>

              <div className="mt-2">
                <label className="text-xs font-medium text-slate-500">
                  Todo Checklist
                </label>

                {task?.todoChecklist?.map((item, index) => (
                  <TodoChecklist 
                    key={`todo_${index}`}
                    text={typeof item === 'string' ? item : item.text}
                    description={typeof item === 'string' ? "" : item.description}
                    isChecked={item?.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              </div>

              {task?.attachments?.length > 0 && (
                <div className="mt-2">
                  <label className="text-xs font-medium text-slate-500">
                    Attachments
                  </label>

                  {task?.attachments?.map((link, index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}

              {task?.completedDetails && (
                <div className="mt-6 p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                  <label className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest px-1">Completion Report</label>
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed italic">
                    "{task?.completedDetails}"
                  </p>
                </div>
              )}
            </div>
          </div>
        
        )}
      </div>
    </DashboardLayout>
  )
};

export default ViewTaskDetails;

const InfoBox = ({label, value}) => {
  return (<>
    <label className="text-xs font-medium text-slate-500">{label}</label>

    <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-0.5">
      {value}
    </p>
  </>
  );
};

const TodoChecklist = ({ text, description, isChecked, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-3 px-3">
      <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 transition-all group">
        <input 
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="w-4 h-4 text-primary bg-white border-slate-300 rounded focus:ring-primary/20 cursor-pointer"
        />

        <div 
          className="flex-1 flex items-center justify-between cursor-pointer"
          onClick={() => description && setIsExpanded(!isExpanded)}
        >
          <p className={`text-[13px] font-medium transition-all ${isChecked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
            {text}
          </p>
          
          {description && (
            <div className="text-slate-400 group-hover:text-primary transition-colors">
              {isExpanded ? <LuChevronUp size={16} /> : <LuChevronDown size={16} />}
            </div>
          )}
        </div>
      </div>

      {isExpanded && description && (
        <div className="ml-10 mt-2 p-3 bg-white border border-slate-100 rounded-xl animate-in fade-in slide-in-from-top-1">
          <p className="text-[12px] text-slate-500 leading-relaxed italic">
            {description}
          </p>
        </div>
      )}
    </div>
  )
};

const Attachment = ({ link, index, onClick }) => {
  return <div className="flex justify-between bg-gray border border-gray-100 px-3 rounded-md mb-3 mt-2 cursor-pointer"
    onClick={onClick}
    >

    <div className="flex-1 flex items-center gap-3 ">
      <span className="text-xs text-gray-400 font-semibold mr-2">
        {index < 9 ? `0${index + 1}` : index + 1}
      </span>

      <p className="text-xs text-black">{link}</p>
    </div>

    <LuSquareArrowOutUpRight className="text-gray-400" />
  </div>
}

