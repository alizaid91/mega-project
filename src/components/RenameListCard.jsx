import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { renameList } from "../features/todo/todoSlice";

const RenameListPopup = ({ listId, currentName, isOpen, onClose }) => {
    const [newName, setNewName] = useState();
    const dispatch = useDispatch();

    const handleRename = (e) => {
        e.preventDefault();
        if (newName.trim()) {
            dispatch(renameList({ listId: listId, newName: newName }))
            setNewName("")
            onClose();
        }
    };

    return (
        <div className={`${isOpen ? 'visible' : 'invisible'} flex fixed inset-0 items-center justify-center bg-black/40 backdrop-blur-md z-50`}>
            <div className={`${isOpen ? 'opacity-100 scale-100' : 'scale-125 opacity-0'} transition-all bg-white rounded-xl shadow-lg p-6 w-[280px] sm:w-[450px]`}>
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    Rename List
                </h3>
                <form onSubmit={handleRename} className="space-y-4">
                    {/* List Name Input */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            New List Name
                        </label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full border rounded-md border-black/60 p-2 text-gray-700 focus:ring focus:ring-indigo-300"
                            placeholder="Enter new list name"
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
                            Rename
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RenameListPopup;
