import DayOne from './day-1/day-one'
import DayTwo from './day-2/day-two'
import DayThree from './day-3/day-three'
import DayFour from './day-4/day-four'
import DayFive from './day-5/day-five'
import DaySix from './day-6/day-six'
import DaySeven from './day-7/day-seven'
import DayEight from './day-8/day-eight'
import DayNine from './day-9/day-nine'

function App() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Advent of Code 2025</h1>
      <DayNine />
      <DayEight />
      <DaySeven />
      <DaySix />
      <DayFive />
      <DayFour />
      <DayThree />
      <DayTwo />
      <DayOne />
    </main>
  )
}

export default App
