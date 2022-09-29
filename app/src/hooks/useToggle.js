import { createContext, useContext, useState } from 'react'

// Creates a Context object.
export const ToggleContext = createContext()

// A custom hook for consuming the Context in other components.
export const useToggleContext = () => useContext(ToggleContext)

// A wrapper for the Context Provider providing access
// to the current state (open or close) and a function to update the state.
export const ToggleProvider = ({ children }) => {
  const [toggle, setToggle] = useState(true)

  return (
    <ToggleContext.Provider value={{ toggle, setToggle }}>
      {children}
    </ToggleContext.Provider>
  )
}
