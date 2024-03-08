import axios from 'axios';
import React, { useState } from 'react'

const Home = () => {

    const [name, setName] = useState('');
    const [role, setRole] = useState('user');
  
    const handleSubmit =  async (e) => {
      e.preventDefault();
      
      if( name && role ){
        const data =  await axios.post( "http://localhost:3000/user/create-user" , { name , role } );

        if( data.status === 200 ){
             setName("");
             setRole("user");
        }
      }

       
    };
  return (
    <div className=' w-[90%] mx-auto'>

    <div className=' h-[40%] ' >
      <h2>User/Admin Form</h2>
      <form onSubmit={handleSubmit}>

        {/* Name Field */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        {/* Role Radio Buttons */}
        <label>Role:</label>
        <br />
        <input
          type="radio"
          id="user"
          name="role"
          value="user"
          checked={role === 'user'}
          onChange={() => setRole('user')}
        />
        <label htmlFor="user">User</label>

        <input
          type="radio"
          id="admin"
          name="role"
          value="admin"
          checked={role === 'admin'}
          onChange={() => setRole('admin')}
        />
        <label htmlFor="admin">Admin</label>

        <br /><br />

        {/* Submit Button */}
        <input type="submit" value="Submit" />

      </form>
    </div>
        
    </div>
  )
}

export default Home

