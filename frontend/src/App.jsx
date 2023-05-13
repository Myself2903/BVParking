import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import MainPage from './Pages/MainPage'
import ParkingMap from './Pages/ParkingMap'
import PQR from './Pages/PQR'
import CreatePQR from './Pages/CreatePQR'

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
      <Route 
        path = "/pqr/*"
        element = {
          <Routes>
            <Route path="nueva-pqr" element={<CreatePQR/>}/>
            <Route path="/" element={<PQR/>}/>
          </Routes>
        }
      />
    </Routes>
  )
}

export default App
