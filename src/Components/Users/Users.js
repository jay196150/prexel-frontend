import React, { useContext, useEffect, useState } from 'react'
import SignContext from '../../contextAPI/Context/SignContext';
import "./User.css"


const Users = () => {
    const {GetallUsers , addUser , EditUser , deleteUser , GetUserById} = useContext(SignContext);
    const [Users, setUsers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [SelectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    isDeleted: false,
    });
    

    const getusers = async ()=>{
        const res = await GetallUsers();
    // console.log(res);
    setUsers(res.data);
    }

    const handleAddUser = async () => {
        try {
          const res = await addUser(newUser);
      
          if (res.success) {
            setShowAddModal(false);
            setNewUser({
              name: '',
              email: '',
              phone: '',
              birthDate: '',
              isDeleted: false,
            });
            getusers();
          } else {
            console.error('Error adding user:', res.message); 
          }
        } catch (error) {
          console.error('Error adding user:', error);
        }
    };

    const handleEditUserModal = async (user) => {
        try {
          setSelectedUser(user);
      
          
          const userDetails = await GetUserById(user._id);
      
          if (userDetails.success) {
            
            setNewUser({
              name: userDetails.data.name,
              email: userDetails.data.email,
              phone: userDetails.data.phone,
              birthDate: userDetails.data.birthDate,
              isDeleted: userDetails.data.isDeleted,
            });
      
            // Open the edit modal
            setShowEditModal(true);
          } else {
            console.error('Error fetching user details:', userDetails.message);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      
      const handleEditUser = async () => {
        try {
          const res = await EditUser(SelectedUser._id , newUser);
      
          if (res.success) {
            
            setShowEditModal(false);
      
      
            setSelectedUser(null);
      
       
            getusers();
          } else {
            console.error('Error editing user:', res.message);
          }
        } catch (error) {
          console.error('Error editing user:', error);
        }
      };
      
      
    
    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
      };

    const confirmDeleteUser = async () => {
        try {
          await deleteUser(SelectedUser._id);
          setShowDeleteModal(false);
          getusers();
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
    



    useEffect(() => {
      getusers();
    }, [])
    

  return (

    <>
    <div>

            <h2>Users List</h2>
            <div>
            <button onClick={() => setShowAddModal(true)}>Add</button>
            </div>
            <div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>DOB</th>
                        <th>Delete Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.birthDate.slice(0, 10)
                                            .split("")
                                            .join("")}</td>
                            <td>{user.isDeleted === true ? 'Deleted' : 'notDeleted'}</td>
                            <td>
                                <button className="edit-button" 
                                onClick={() => handleEditUserModal(user)}
                                >Edit</button>
                            </td>
                            <td>
                                <button className="delete-button" 
                                onClick={() => handleDeleteUser(user)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>


            </div>
            {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddModal(false)}>
              &times;
            </span>
            <h2>Add User</h2>
            <label>Name:</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <label>Email:</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <label>Phone:</label>
            <input
              type="text"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
            <label>DOB:</label>
            <input
              type="text"
              value={newUser.birthDate}
              onChange={(e) => setNewUser({ ...newUser, birthDate: e.target.value.slice(0, 10)
                .split("")
                .join("") })}
            />
            <label>isDeleted :</label>
            <input
              type="checkbox"
              checked={newUser.isDeleted}
              onChange={(e) => setNewUser({ ...newUser, isDeleted: e.target.checked })}
            />
            <button onClick={handleAddUser}>Add User</button>
          </div>
        </div>
            )}
            {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>
              &times;
            </span>
            <h2>Edit User</h2>
            <label>Name:</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <label>Email:</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <label>Phone:</label>
            <input
              type="text"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
            <label>DOB:</label>
            <input
              type="text"
              value={newUser.birthDate}
              onChange={(e) => setNewUser({ ...newUser, birthDate: e.target.value })}
            />
            <label>isDeleted:</label>
            <input
              type="checkbox"
              checked={newUser.isDeleted}
              onChange={(e) => setNewUser({ ...newUser, isDeleted: e.target.checked })}
            />
            <button onClick={handleEditUser}>Edit User</button>
          </div>
        </div>
      )}

{showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this user?</p>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
            <button onClick={confirmDeleteUser}>Delete</button>
          </div>
        </div>
      )}

            
        </>

  )
}

export default Users