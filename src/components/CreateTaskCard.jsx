import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';
import { RiCloseCircleFill } from "react-icons/ri";

const CreateTask = ({ listId, showPopup, setShowPopup }) => {
    // console.log(listId)
    const dispatch = useDispatch();
    const [task, setTask] = useState({
        name: "",
        date: "",
        description: "",
        starred: false,
        listId: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask({
            ...task,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("id", listId)
        dispatch(addTodo({ ...task, listId: listId }));
        setShowPopup();
        console.log("New Task Created:", task);
        setTask({ name: "", date: "", description: "", starred: false, listId: '' });
    };

    return (
        <div className={`${showPopup ? 'visible' : 'invisible'} fixed w-screen h-screen top-0 left-0 bg-black/30 flex justify-center z-50`}>
            <div className={`relative ${showPopup ? 'opacity-100 scale-100' : 'scale-125 opacity-0'} transition-all bg-white shadow-md rounded-xl p-6 max-w-md my-10 overflow-y-scroll w-full mx-3`}>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    Create New Todo
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Task Name */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Todo Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={task.name}
                            onChange={handleInputChange}
                            className="w-full border rounded-md border-black/60 p-2 text-gray-700 focus:ring focus:ring-indigo-300"
                            placeholder="Enter task name"
                            required
                        />
                    </div>

                    {/* Task Date */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Due Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={task.date}
                            onChange={handleInputChange}
                            className="w-full border rounded-md border-black/60 p-2 text-gray-700 focus:ring focus:ring-indigo-300"
                        />
                    </div>

                    {/* Task Description */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleInputChange}
                            className="w-full border rounded-md border-black/60 p-2 text-gray-700 focus:ring focus:ring-indigo-300"
                            placeholder="Enter task description"
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                        className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
                    >
                        Add Task
                    </button>
                </form>
                <div onClick={() => setShowPopup()} className="text-3xl absolute top-3 right-3">
                    <RiCloseCircleFill />
                </div>
            </div>
        </div>

    );
};

export default CreateTask;