import React, { useState } from 'react';
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuChevronDown, LuChevronUp, LuFileText } from "react-icons/lu";

const TodoListInput = ({ todoList = [], setTodoList }) => {
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");
    const [expandedIndex, setExpandedIndex] = useState(null);

    // function to handle adding an option
    const handleAddOption = () => {
        if (text.trim()) {
            setTodoList([...todoList, { text: text.trim(), description: description.trim() }]);
            setText("");
            setDescription("");
        }
    };

    // Function to handle deleting an option
    const handleDeleteOption = (index) => {
        const updatedArr = todoList.filter((_, idx) => idx !== index);
        setTodoList(updatedArr);
        if (expandedIndex === index) setExpandedIndex(null);
    };

    return (
        <div className="space-y-3">
            {todoList.map((item, index) => (
                <div key={`todo_${index}`} className="group p-3 bg-slate-50/50 border border-slate-100 rounded-xl hover:bg-white hover:border-primary/20 hover:shadow-sm transition-all animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 flex items-center gap-3 cursor-pointer" onClick={() => (typeof item !== 'string' && item.description) && setExpandedIndex(expandedIndex === index ? null : index)}>
                            <span className="text-[11px] font-bold text-slate-300">
                                {index < 9 ? `0${index + 1}` : index + 1}.
                            </span>
                            <p className="text-sm font-medium text-slate-700">{typeof item === 'string' ? item : item.text}</p>
                            {(typeof item !== 'string' && item.description) && (
                                <div className="text-slate-400">
                                    {expandedIndex === index ? <LuChevronUp size={16} /> : <LuChevronDown size={16} />}
                                </div>
                            )}
                        </div>

                        <button
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                            onClick={() => handleDeleteOption(index)}
                        >
                            <HiOutlineTrash size={18} />
                        </button>
                    </div>

                    {expandedIndex === index && typeof item !== 'string' && item.description && (
                        <div className="mt-3 pt-3 border-t border-slate-100/50">
                            <div className="flex gap-2">
                                <LuFileText className="text-slate-300 mt-0.5" size={14} />
                                <p className="text-[12px] text-slate-500 leading-relaxed italic">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <div className="mt-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={text}
                        onChange={({ target }) => setText(target.value)}
                        className="w-full text-sm font-medium px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-primary/30 outline-none transition-all placeholder:text-slate-400"
                    />
                    
                    <div className="relative group">
                        <LuFileText className="absolute left-4 top-3 text-slate-300 group-focus-within:text-primary transition-colors" size={16} />
                        <textarea
                            placeholder="Add a description (optional)..."
                            value={description}
                            onChange={({ target }) => setDescription(target.value)}
                            rows={2}
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-primary/30 outline-none transition-all placeholder:text-slate-400 text-xs resize-none"
                        />
                    </div>

                    <button 
                        className="w-full py-2.5 flex items-center justify-center gap-2 text-[13px] font-bold text-white bg-primary rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98] transition-all cursor-pointer" 
                        onClick={handleAddOption}
                    >
                        <HiMiniPlus size={18} />
                        Add Todo Item
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoListInput;