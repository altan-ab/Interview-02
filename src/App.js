import './styles.css'

import { useState, useContext, createContext } from 'react'

const RobotContext = createContext()

function App() {
  const [robots, setRobots] = useState([])

  return (
    <RobotContext.Provider value={{ robots, setRobots }}>
      <div className="app-container">
        <RobotInput />
        <RobotList />
      </div>
    </RobotContext.Provider>
  )
}

const RobotInput = () => {
  const [inputValue, setInputValue] = useState('')
  const { robots, setRobots } = useContext(RobotContext)
  const [error, setError] = useState('')

  const handleAddRobot = () => {
    if (!inputValue.trim()) return

    if (robots.some((robot) => robot.name === inputValue)) {
      setError('Robot listede bulunmakta!')
      return
    }

    const newRobot = {
      name: inputValue,
      imageUrl: `https://robohash.org/${inputValue}`,
    }

    setRobots((prevRobots) => [...prevRobots, newRobot])
    setInputValue('')
    setError('')
  }

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Generate Robot"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="input-text"
      />
      <button onClick={handleAddRobot}>Enter</button>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

const RobotList = () => {
  const { robots, setRobots } = useContext(RobotContext)

  const handleRemoveRobot = (name) => {
    setRobots((prevRobots) => prevRobots.filter((robot) => robot.name !== name))
  }

  return (
    <div className="robot-list">
      {robots.map((robot) => (
        <div
          key={robot.name}
          className="robot-item"
          onClick={() => handleRemoveRobot(robot.name)}
        >
          <img src={robot.imageUrl} alt={robot.name} />
        </div>
      ))}
    </div>
  )
}

export default App
