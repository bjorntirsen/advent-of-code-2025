import { useState, useEffect } from 'react'
import { inputExample } from './input-example'

interface Rotation {
  direction: string
  value: number
}

function parseInput(input: string): Rotation[] {
  if (!input) return []
  const inputArray = input.split('\n').filter((line) => line.trim())
  return inputArray.map((line) => {
    const direction = line.charAt(0)
    const value = parseInt(line.slice(1), 10)
    return { direction, value }
  })
}

function turnDial(rotation: Rotation, currentDial: number): number {
  if (rotation.direction === 'L') {
    const newDial = (currentDial - rotation.value) % 100
    if (newDial < 0) {
      return newDial + 100
    } else {
      return newDial
    }
  } else if (rotation.direction === 'R') {
    const newDial = (currentDial + rotation.value) % 100
    if (newDial >= 100) {
      return newDial - 100
    } else {
      return newDial
    }
  }
  return currentDial
}

interface SafeDialVisualizationProps {
  input?: string
}

export default function SafeDialVisualization({
  input = inputExample,
}: SafeDialVisualizationProps) {
  const DIAL_STARTING_VALUE = 50
  const [currentStep, setCurrentStep] = useState(0)
  const [dialPosition, setDialPosition] = useState(DIAL_STARTING_VALUE)
  const [zeroCount, setZeroCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const rotations = parseInput(input)

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying || currentStep >= rotations.length) return

    const timer = setTimeout(() => {
      const rotation = rotations[currentStep]
      const newPosition = turnDial(rotation, dialPosition)

      setDialPosition(newPosition)

      if (newPosition === 0) {
        setZeroCount((prev) => prev + 1)
      }

      setCurrentStep((prev) => prev + 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [currentStep, dialPosition, isPlaying, rotations])

  const reset = () => {
    setCurrentStep(0)
    setDialPosition(DIAL_STARTING_VALUE)
    setZeroCount(0)
    setIsPlaying(true)
  }

  const currentRotation =
    currentStep > 0 && currentStep <= rotations.length
      ? rotations[currentStep - 1]
      : null
  const isComplete = currentStep >= rotations.length

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <h2 className="text-2xl font-bold">Safe Dial - Part One</h2>

      <div className="text-center">
        <div className="text-xl">
          Current Position:{' '}
          <span className="text-3xl font-bold text-blue-600">
            {dialPosition}
          </span>
        </div>
        <div className="mt-2 text-lg">
          Times at 0:{' '}
          <span className="text-2xl font-bold text-green-600">{zeroCount}</span>
        </div>
      </div>

      {/* Dial circle */}
      <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-gray-800">
        {/* Rotating arrow indicator */}
        <div
          className="absolute h-20 w-1 origin-bottom bg-red-500 transition-transform duration-700"
          style={{
            bottom: '50%',
            left: 'calc(50% - 2px)',
            transform: `rotate(${dialPosition * 3.6}deg)`,
          }}
        />

        {/* Center dot */}
        <div className="absolute h-4 w-4 rounded-full bg-white" />
      </div>

      {/* Current instruction */}
      {currentRotation && !isComplete && (
        <div className="rounded bg-blue-800 p-3 text-center">
          <p className="text-lg">
            Step {currentStep}/{rotations.length}: Rotate{' '}
            <span className="font-bold">
              {currentRotation.direction}
              {currentRotation.value}
            </span>{' '}
            → {dialPosition}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Restart
        </button>
      </div>

      {/* Result */}
      {isComplete && (
        <div className="rounded border-2 border-green-500 bg-green-100 p-4 text-center">
          <p className="text-xl font-bold text-green-700">
            Password: {zeroCount}
          </p>
        </div>
      )}
    </div>
  )
}
