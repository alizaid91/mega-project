import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, incrementByValue } from './counterSlice'

const Counter = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0)

  return (
    <div className='pt-20'>
      <h1 className='text-3xl text-center font-bold'>Counter</h1>
      <div>
        <div className='text-center mt-4'>
          <span className='text-5xl font-semibold'>{count}</span>
        </div>
        <div className='text-center mt-4  flex flex-wrap gap-3 justify-center'>
          <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={() => dispatch(increment())}>Increment</button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4' onClick={() => dispatch(reset())}>Reset</button>
          <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4' onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
        <div className='flex flex-col items-center gap-2 mt-3'>
          <label htmlFor="custom-val">Enter Value</label>
          <input onChange={(e) => setValue(Number(e.target.value) || 0)} value={value} min='0' max='20' type="number" id='custom-val' className='border border-black w-24 rounded-md pl-1' />
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => dispatch(incrementByValue(parseInt(value)))}>Increment by value</button>
        </div>
      </div>
    </div>
  )
}

export default Counter