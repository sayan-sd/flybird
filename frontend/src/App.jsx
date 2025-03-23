import React from "react"
import { Route, Routes } from "react-router-dom"
import Messages from "./pages/Messages"

function App() {

  return (
    <div>
      <Routes>
        <Route index={true} element={<Messages/>} />
      </Routes>
    </div>
  )
}

export default App
