import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import MainPage from './Pages/MainPage'
import ParkingMap from './Pages/ParkingMap'

function App() {
  return (
    <Routes>
      <Route 
        path = "/"
        element = {<MainPage/>}
      />
      <Route 
        path = "/mapa-de-parqueo"
        element = {<ParkingMap/>}
      />
    </Routes>
  )
}

export default App
