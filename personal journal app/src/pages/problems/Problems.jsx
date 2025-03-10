import React, { useEffect, useState } from 'react';
import './problems.css';
import Navadmin from '../../components/navbar/Navadmin'

export default function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/supports')
      .then((res) => res.json())
      .then((data) => setProblems(data))
      .catch((err) => console.error('Error fetching problems:', err));
  }, []);

  return (
    <div>
      <Navadmin/>
    <div>
      <h2>Support Problems</h2>
      <table>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Issue</th>
            <th>details</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td>{problem.email}</td>
              <td>{problem.subjects}</td>
              <td>{problem.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
