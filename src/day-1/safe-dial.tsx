import { useState } from 'react'

export default function SafeDial() {
  const [dialPosition, setDialPosition] = useState(50)

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <h2 className="text-2xl font-bold">Safe Dial</h2>

      <div className="text-4xl font-bold">Current Position: {dialPosition}</div>

      {/* Simple dial circle */}
      <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-gray-800">
        {/* Rotating arrow indicator */}
        <div
          className="absolute h-20 w-1 origin-bottom bg-red-500 transition-transform duration-500"
          style={{
            bottom: '50%',
            left: 'calc(50% - 2px)',
            transform: `rotate(${dialPosition * 3.6}deg)`,
          }}
        />

        {/* Center dot */}
        <div className="absolute h-4 w-4 rounded-full bg-white" />
      </div>

      {/* Simple test buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setDialPosition(0)}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Set to 0
        </button>
        <button
          onClick={() => setDialPosition(50)}
          className="rounded bg-gray-600 px-4 py-2 text-white"
        >
          Reset to 50
        </button>
        <button
          onClick={() => setDialPosition(99)}
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          Set to 99
        </button>
      </div>
    </div>
  )
}
