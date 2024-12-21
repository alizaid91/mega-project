import React, { useState } from 'react'
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { LuArrowUpDown } from "react-icons/lu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegCircle } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

import { useSelector, useDispatch } from 'react-redux';
import { markCompleted } from './todoSlice';
import CreateTask from '../../components/CreateTaskCard';
import CreateListPopup from '../../components/CreateListCard';

const TodoList = () => {
  const todoList = useSelector((state) => state.todoList)
  const dispatch = useDispatch();
  const [selectedList, setSelectedList] = useState(todoList[1]);
  const [newTaskPopup, setNewTaskPopup] = useState(false);
  const [newListPopup, setNewListPopup] = useState(false)

  return (
    <div className='pt-20 pb-4 bg-slate-300 h-screen overflow-y-scroll'>
      <h1 className='text-center mb-3 text-2xl font-bold'>
        Todo List
      </h1>
      <div className='p-1 flex flex-col gap-3'>
        {/* created lists section */}
        <div className='border-b border-b-gray-400 pb-2 flex items-center gap-3 overflow-x-scroll text-nowrap px-3 text-base font-semibold'>
          {
            todoList.map((list, index) => {
              return index === 0
                ? <div onClick={() => setSelectedList(todoList[0])} key={index} className={`text-2xl py-1 px-2 rounded-lg ${list.id === selectedList.id ? 'bg-white/80' : ''}`}>
                  <IoMdStar />
                </div>
                : <div onClick={() => setSelectedList(list)} className={`py-1 px-2 rounded-lg ${list.id === selectedList.id ? 'bg-white/80' : ''}`}>
                  <h1>
                    {list.name}
                  </h1>
                </div>
            })
          }
          <button className='flex items-center' onClick={() => setNewListPopup(true)}>
            <GoPlus className='text-xl' />
            <span>New List</span>
          </button>
        </div>

        {/* Tasks section */}
        <div className='bg-white rounded-xl mx-1 py-3 px-4'>

          <div className='flex items-center justify-between text-lg'>
            <h1 className='font-semibold text-gray-800'>{selectedList.name}</h1>
            <div className='flex gap-4 items-center'>
              <div>
                <LuArrowUpDown />
              </div>
              <div>
                <HiOutlineDotsVertical />
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <ul className='px-1 py-3 flex flex-col gap-3'>
            {
              todoList.map((list, _) => {
                return list.id === selectedList.id
                  ? list.todos.length > 0
                    ? list.todos.map((todo, index) => {
                      return <li key={index} className='flex items-start justify-between'>
                        <div className='flex items-start gap-3 pr-3'>
                          <div className='text-xl cursor-pointer pt-1' onClick={() => dispatch(markCompleted({ listId: selectedList.id, todoId: todo.id }))}>
                            <FaRegCircle />
                          </div>
                          <div>
                            <h1 className='font-semibold'>{todo.name}</h1>
                            {todo.description && <p className='text-sm text-gray-800 pr-3'>{todo.description}</p>}
                            <p className='text-sm font-semibold'>{todo.date || 'No due'}</p>
                          </div>
                        </div>
                        <div className='text-2xl text-gray-700 cursor-pointer'>
                          <IoMdStarOutline />
                        </div>
                      </li>
                    })
                    : <h1 className='w-fit mx-auto my-auto text-xl font-bold text-gray-800'>No todos</h1>
                  : ''
              })
            }
          </ul>
        </div>
      </div>
      <div className='fixed bottom-4 right-4 bg-indigo-500 hover:bg-indigo-600 p-3 text-2xl rounded-xl' onClick={() => setNewTaskPopup(true)}>
        <AiOutlinePlus />
      </div>
      <CreateTask listId={selectedList.id} showPopup={newTaskPopup} setShowPopup={() => setNewTaskPopup(false)} />
      <CreateListPopup showPopup={newListPopup} onClose={() => setNewListPopup(false)} />
    </div>
  )
}

export default TodoList