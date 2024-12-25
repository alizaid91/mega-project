import React, { useEffect, useState } from 'react'
import { IoMdStar } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { LuArrowUpDown } from "react-icons/lu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegCircle } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";

import { useSelector, useDispatch } from 'react-redux';
import { markCompleted, toggelStar, deleteList, deleteCompletedTasks } from './todoSlice';
import CreateTask from '../../components/CreateTaskCard';
import CreateListPopup from '../../components/CreateListCard';
import RenameListPopup from '../../components/RenameListCard';

const TodoList = () => {
  const todoList = useSelector((state) => state.todoList)
  const dispatch = useDispatch();
  const [selectedList, setSelectedList] = useState(todoList[1]);
  const [newTaskPopup, setNewTaskPopup] = useState(false);
  const [newListPopup, setNewListPopup] = useState(false);
  const [renameListPopup, setRenameListPopup] = useState(false);
  const [showListOptions, setShowListOptions] = useState(false);

  return (
    <div
      className='pt-20 pb-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen'
    >
      <header className="text-center mb-5">
        <motion.h1
          className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          To-Do List
        </motion.h1>
        <motion.p
          className="text-lg text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          All you to-dos at one place.
        </motion.p>
      </header>
      <motion.div
        className='relative p-1 flex flex-col max-w-[500px] gap-3 mx-2 sm:mx-auto'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* created lists section */}
        <div className='border-b text-white border-b-gray-400 pb-2 flex items-center gap-3 overflow-x-scroll no-scrollbar text-nowrap px-3 text-base font-semibold'>
          {
            todoList.map((list, index) => {
              return index === 0
                ? <div onClick={() => { setSelectedList(todoList[0]); setShowListOptions(false) }} key={index} className={`text-2xl py-1 px-2 rounded-lg ${list.id === selectedList.id ? 'bg-white/10' : ''} cursor-pointer`}>
                  <IoMdStar />
                </div>
                : <div onClick={() => { setSelectedList(list); setShowListOptions(false) }} className={`py-1 px-2 rounded-lg ${list.id === selectedList.id ? 'bg-white/10' : ''} cursor-pointer`}>
                  <h1>
                    {list.name}
                  </h1>
                </div>
            })
          }
          <button className='flex items-center' onClick={() => { setNewListPopup(true); setShowListOptions(false) }}>
            <GoPlus className='text-xl' />
            <span>New List</span>
          </button>
        </div>

        {/* Tasks section */}
        <div className='bg-white rounded-xl mx-1 pt-3 pb-5 px-4'>

          <div className='flex items-center justify-between text-lg'>
            <h1 className='font-semibold text-gray-800'>{selectedList.name}</h1>
            <div className='flex gap-4 items-center'>
              <div className='cursor-pointer'>
                <LuArrowUpDown />
              </div>
              {
                selectedList.id !== todoList[0].id
                  ? <div className='relative cursor-pointer'>
                    <div onClick={() => setShowListOptions(!showListOptions)}><HiOutlineDotsVertical /></div>
                    <div className={`${showListOptions ? 'visible opacity-100 translate-x-0' : '-translate-x-5 opacity-0 invisible'} text-white transition-all absolute top-1/2 -translate-y-1/2 -left-56 z-50 text-nowrap flex flex-col text-center gap-3 bg-black/70 backdrop-blur-md shadow-xl py-2 text-base rounded-lg font-semibold`}>
                      <button className='hover:bg-white/60 px-2' onClick={() => { setRenameListPopup(true); setShowListOptions(false) }}>Rename list</button>
                      {
                        selectedList.id !== todoList[1].id
                          ? <button onClick={() => { dispatch(deleteList({ listId: selectedList.id })); setShowListOptions(false); setSelectedList(todoList[1]) }} className='hover:bg-white/60 px-2'>Delete list</button>
                          : <div className='px-2 text-gray-200'>
                            <button disabled>Delete list</button>
                            <p className='text-xs cursor-default'>Default list can`t be deleted</p>
                          </div>
                      }
                      <button onClick={() => { dispatch(deleteCompletedTasks({ listId: selectedList.id })); setShowListOptions(false) }} className='hover:bg-white/60 px-3'>Delete all completed tasks</button>
                    </div>
                  </div>
                  : ''
              }
            </div>
          </div>

          {/* Tasks List */}
          <ul className="pt-3">
            {todoList.map((list) => {
              if (list.id !== selectedList.id) return null;

              return (
                <div className='flex flex-col gap-3' key={list.id}>
                  {/* Active Todos */}
                  {list.todos.length > 0 ? (
                    list.todos.map((todo) => (
                      <li key={todo.id} className="group md:hover:bg-gray-400/40 py-1 px-2 transition-colors duration-400 rounded-lg flex items-start justify-between">
                        <div className="flex items-start gap-3 pr-3">
                          <div
                            className="text-xl cursor-pointer pt-1"
                            onClick={() =>
                              dispatch(markCompleted({ listId: list.id, todoId: todo.id }))
                            }
                          >
                            <FaRegCircle />
                          </div>
                          <div>
                            <h1 className="font-semibold">{todo.name}</h1>
                            {todo.description && (
                              <p className="text-sm text-gray-800 pr-3">
                                {todo.description}
                              </p>
                            )}
                            <p className="text-sm font-semibold">
                              {todo.date || "No due date"}
                            </p>
                          </div>
                        </div>
                        <div className="group-hover:visible invisible flex items-center gap-3">
                          <div
                            className="text-2xl cursor-pointer"
                            onClick={() => dispatch(toggelStar({ listId: selectedList.id, todoId: todo.id }))}
                          >
                            {todo.starred ? <IoMdStar /> : <IoMdStarOutline />}
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <h1 className="text-center text-gray-800 font-semibold">No todos</h1>
                  )}
                </div>
              );
            })}
          </ul>
        </div>

        {/* Completed Tasks */}
        {
          todoList.map((list, index) => {
            if (list.id !== selectedList.id || !list.completed) return null;
            return (
              <div key={index} className='bg-white rounded-xl mx-1 pt-3 pb-5 px-4'>
                <h2 className="text-base font-semibold mb-2 text-gray-800">Completed Tasks</h2>
                {
                  <div className='flex flex-col gap-3'>
                    {list.completed.length > 0 ? (
                      list.completed.map((todo) => (
                        <li key={todo.id} className="flex items-start justify-between">
                          <div className="flex items-start gap-3 pr-3">
                            <div className="text-green-500 text-xl pt-1">
                              {/* <FaCheckCircle /> */}
                            </div>
                            <div>
                              <h1 className="font-semibold line-through">{todo.name}</h1>
                              <p className="text-sm text-gray-500">
                                {todo.description || "No description"}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <h1 className="text-center text-gray-800 font-semibold">No completed tasks</h1>
                    )}
                  </div>
                }
              </div>
            )
          })
        }
        <div className='absolute -bottom-14 right-4 bg-indigo-500 hover:bg-indigo-600 text-white p-3 text-2xl rounded-xl cursor-pointer' onClick={() => setNewTaskPopup(true)}>
          <AiOutlinePlus />
        </div>
      </motion.div>
      <CreateTask listId={selectedList.id} showPopup={newTaskPopup} setShowPopup={() => setNewTaskPopup(false)} />
      <CreateListPopup showPopup={newListPopup} onClose={() => setNewListPopup(false)} />
      <RenameListPopup listId={selectedList.id} currentName={selectedList.name} isOpen={renameListPopup} onClose={() => setRenameListPopup(false)} />
    </div>
  )
}

export default TodoList