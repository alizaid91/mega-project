import React, { useState } from "react";
import { createNewList } from "../features/todo/todoSlice";
import { useDispatch } from "react-redux";

const CreateListPopup = ({ showPopup, onClose }) => {
    const [listName, setListName] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (listName.trim()) {
            dispatch(createNewList({ name: listName }))
            setListName("");
            onClose();
        }
    };

    return (
        <div className={`${showPopup ? 'visible' : 'invisible'} flex fixed inset-0 items-center justify-center bg-black/60 z-50`}>
            <div className={`${showPopup ? 'opacity-100 scale-100' : 'scale-125 opacity-0'} transition-all bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-2`}>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    Create New List
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* List Name */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            List Name
                        </label>
                        <input
                            type="text"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            className="w-full border rounded-md border-black/60 p-2 text-gray-700 focus:ring focus:ring-indigo-300"
                            placeholder="Enter list name"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateListPopup;
