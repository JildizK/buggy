import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneUser, saveChanges, cleanOneUser } from '../store/usersSlice';


const UserEdit = () => {
const { oneUser } = useSelector(state => state.users);
const [user, setUser] = useState(oneUser)
const { id } = useParams()
const navigate = useNavigate()
const dispatch = useDispatch()

useEffect(() => {
  dispatch(getOneUser(id));
  return () => dispatch(cleanOneUser());
}, []);

console.log(user);

  return (
    <>
   {user ? (
     <div className='edit__block'>
     <h2>Create Usre</h2>
     <input type="text" placeholder='Name' onChange={e => setUser({...user, name: e.target.value})} value={user.name} />
     <input type="text" placeholder='Position' onChange={e => setUser({...user, position: e.target.value})} value={user.position} />
     <input type="text" placeholder='Expirience' onChange={e => setUser({...user, Expirience: e.target.value})} value={user.Expirience} />

      <button className='edit__btn' onClick={() => {dispatch(saveChanges(user)); navigate('/')}}>Save user</button>
   </div>
   ) : (
    <h3>No user to edit </h3>
   )}
    </>
  )
}

export default UserEdit