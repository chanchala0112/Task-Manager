import React, { useState } from 'react';
import {HiMiniPlus, HiOutlineTrash} from "react-icons/hi2"

const TodoListInput = ({todoList, setTodoList}) => {
    const [option,setOption] = useState("");

    //function to handle adding an option
    const handleAddOption = () => {
        if (option.trim()) {
            setTodoList([...todoList, option.trim()]);
            setOption("");
        }
    };

        //Function to handle deleting an option
        const handleDeleteOption  = (index) => {
            const updatedArr = todoList.filter((_, idx) => idx !== index);
            setTodoList(updatedArr);
        
    };

  return (
    <div>
    {todoList.map((item, index) => {
        <div 
        key={item}
        className=""
        >
        <p className="">
            <span className="">
            {index < 9 ? `0${index + 1}` : index + 1}.
            </span>
            {item}
        </p>

        <button>
            className=""
            onClick={() => {
                handleDeleteOption (index);
            }}

            <HiOutlineTrash className="" />
        </button>
    </div>
    })}

    <div className="">
        <input
            type="text"
            placeholder="Enter Task"
            value={option}
            onChange={({target}) => setOption(target.value)}
            className=""
        />

        <button className="" onClick={handleAddOption}>
            <HiMiniPlus className="" /> Add
        </button>
        </div>
    </div>
    
  );
};

export default TodoListInput