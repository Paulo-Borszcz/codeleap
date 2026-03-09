import { useState } from 'react'
import SignupModal from './components/SignupModal'
import MainScreen from './components/MainScreen'
import './App.css'

export default function App() {
  const [username, setUsername] = useState<string | null>(
    () => localStorage.getItem('codeleap_username')
  )

  function handleEnter(name: string) {
    localStorage.setItem('codeleap_username', name)
    setUsername(name)
  }

  if (!username) {
    return <SignupModal onEnter={handleEnter} />
  }

  return <MainScreen username={username} />
}
