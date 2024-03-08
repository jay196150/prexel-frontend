import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Users = () => {
    const [tasks, setTasks] = useState([]);
    async function fetchData(){
        const data =  await axios.get( "http://localhost:3000/user/get-all-user"  );
        setTasks(data.data);
        console.log(tasks);
    }

    useEffect(  () => {
         
       fetchData();
        
    } , [] );
  
    

  return (
    <div>
      <h2>Task Table</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Number of Tasks</th>
            
          </tr>
        </thead>
        <tbody>
          { tasks && tasks.length > 0  && tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.name}</td>
              <td>{task.role}</td>
              <td>{tasks.length}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


}

export default Users
