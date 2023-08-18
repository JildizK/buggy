import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../store/usersSlice'
import { useNavigate } from 'react-router-dom';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';

const UserCreate = () => {
  const [ user, setuser] = useState({
    name: '',
    position: '',
    Expirience: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function addUser() {
    for(let key in user) {
      if(!user[key]) return alert('Some inputs are empty')
    }
  dispatch(createUser({...user, favorite: false}));
  navigate('/')
  }

  return (
    <div className='create__block'> 
      <h2>Create Usre</h2>
      <input type="text" placeholder='Name' onChange={e => setuser({...user, name: e.target.value})} value={user.name} />
      <input type="text" placeholder='Position' onChange={e => setuser({...user, position: e.target.value})} value={user.position} />
      <input type="text" placeholder='Expirience' onChange={e => setuser({...user, Expirience: e.target.value})} value={user.Expirience} />

       <button className='create__btn' onClick={addUser}>Create user</button>
    </div>
  )
}

export default UserCreate