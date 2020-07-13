import React, { Fragment, useContext } from 'react';
import GithubContext from '../../context/github/githubContext'

const LoadMoreUsers = () => {
   const githubContext = useContext(GithubContext);

   return (
      <Fragment>
         <button className="btn btn-dark btn-block" style={{margin: 'auto'}}onClick={githubContext.loadMoreUsers}>
         More Users
         </button>
      </Fragment>
   )
}

export default LoadMoreUsers;

