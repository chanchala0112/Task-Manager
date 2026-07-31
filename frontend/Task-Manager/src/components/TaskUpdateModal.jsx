import React, { useState } from "react";
import Modal from "./Modal";
import { LuCircleCheck, LuFileText } from "react-icons/lu";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";

const TaskUpdateModal = ({ isOpen, onClose, task, onTaskUpdated }) => {
  const [completedDetails, setCompletedDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!completedDetails.trim()) {
      toast.error("Please provide completion details");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK_STATUS(task._id), {
        status: "Completed",
        completedDetails: completedDetails,
      });

      if (response.data) {
        toast.success("Task completed successfully");
        onTaskUpdated(response.data.task);
        setCompletedDetails("");
        onClose();
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error(error.response?.data?.message || "Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete Task">
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-3 py-2">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                <LuCircleCheck size={32} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-800">Finalize Task</h3>
                <p className="text-sm text-slate-500 px-4">
                    Please provide a brief summary or any relevant details about the work completed for <strong>"{task?.title}"</strong>.
                </p>
            </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Completion Details / Report</label>
          <div className="relative group">
            <div className="absolute left-4 top-4 text-slate-300 group-focus-within:text-primary transition-colors">
              <LuFileText size={18} />
            </div>
            <textarea
              value={completedDetails}
              onChange={(e) => setCompletedDetails(e.target.value)}
              placeholder="Describe what was accomplished..."
              rows={4}
              className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all placeholder:text-slate-300 resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 text-sm font-bold text-white bg-emerald-500 rounded-2xl shadow-xl shadow-emerald-200 hover:bg-emerald-600 hover:shadow-emerald-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Mark as Done"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskUpdateModal;
