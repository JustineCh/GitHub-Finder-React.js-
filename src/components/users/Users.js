import React, { useContext } from 'react';
import UserItem from './UserItem';
import LoadMoreUsers from "./LoadMoreUsers";
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext'

const Users = () => {
   const githubContext = useContext(GithubContext);

   const {users, loading} = githubContext;

   if (loading) {
      return <Spinner />
   } else {
      return (
         <div>
            <div style={userStyle}>
               {users.map(user => (
                  <UserItem key={user.id} user={user} />
               ))}
            </div>
            {users.length > 0 && <LoadMoreUsers />}
         </div>
      )
   }
}

const userStyle = {
   display: 'grid',
   gridTemplateColumns: 'repeat(3, 1fr)',
   gridGap: '1rem'
}

export default Users
