import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import CreateBook from './page/CreateBook'
import ShowBook from './page/ShowBook'
import EditBook from './page/EditBook'
import DeleteBook from './page/DeleteBook'

export const App = () => {
  return (
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/:id' element={<ShowBook/>}/>
      <Route path='/books/:id' element={<EditBook/>}/>
      <Route path='/books/:id' element={<DeleteBook/>}/>
   </Routes>
  )
}
