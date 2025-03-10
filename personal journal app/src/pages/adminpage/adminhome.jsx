import React, { useState, useEffect } from 'react';
import './adminhome.css';
import Navadmin from '../../components/navbar/Navadmin'
import { useNavigate } from 'react-router-dom';


export default function Adminhome() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();   

  useEffect(() => {
    fetch('http://localhost:8000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data || [])) 
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div >
      <Navadmin/>

      <h2>Admin Panel - Users</h2>
      <table border="1" >
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role || 'User'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='btn' onClick={() => navigate('/problems')}>Problems</button>

    </div>
  );
}
