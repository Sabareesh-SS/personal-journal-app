import React from 'react'
import {Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Navbar from '../components/navbar/Navbar'
import Myjournals from '../pages/myjournals/myjournals'
import Support from '../pages/support/support'
import NewJournal from '../pages/new-journal/New-journal'
import Editjournal from '../pages/editjournal/Editjournal'
import Loginpage from '../pages/loginpage/Loginpage'
import Adminhome from '../pages/adminpage/adminhome'
import Problems from '../pages/problems/Problems'


export default function Routeer() {
  return (
    <div>
      
      
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/myjournals" element={<Myjournals />} />
        <Route path="/support" element={<Support />} />
        <Route path="/new-journal" element={<NewJournal />} />
        <Route path="/edit-journal" element={<Editjournal />} />
        <Route path="/adminhome" element={<Adminhome />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="*" element={<p>error</p>} />
      </Routes>
    </div>
  )
}
