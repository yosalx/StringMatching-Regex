import React from 'react'
import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Check from './components/Check'
import AddDisease from './components/AddDisease'
import History from './components/History'

const App = () => {
  return (
    <Container>
        <Header />
        <Routes>
            <Route path='/' exact element={
                <Check />
            } />
            <Route path='/add' element={
                <AddDisease />
            } />
            <Route path='/history' element={
                <History />
            } />
        </Routes>
    </Container>
  )
}

export default App