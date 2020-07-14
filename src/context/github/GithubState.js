import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
   SEARCH_USERS,
   LOAD_MORE_USERS,
   SET_LOADING,
   CLEAR_USERS,
   GET_USER,
   GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production') {
   githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
   githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
   githubClientId = process.env.GITHUB_CLIENT_ID;
   githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}


const GithubState = props => {
   const initialState = {
      users: [],
      user: {},
      repos: [],
      nextLink: null,
      loading: false
   }

   const [state, dispatch] = useReducer(GithubReducer, initialState);

   var next;

   const parseLinkHeader = (res) => {
      var parse = require('parse-link-header');
      var linkHeader = res.headers.link;
      var parsed = parse(linkHeader);
      return next = parsed?.next.url;
   }

   const searchUsers = async text => {
      setLoading();
  
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );
 
      parseLinkHeader(res);

      dispatch({
         type: SEARCH_USERS,
         payload: {
            nextLink: next,
            users: res.data.items
         }
      })
   };

   const loadMoreUsers = async () => {
      const res = await axios.get(state.nextLink);

      parseLinkHeader(res);

      dispatch({
         type: LOAD_MORE_USERS,
         payload: {
            nextLink: next,
            users: res.data.items
         }
      })
   }

   const getUser = async username => {
      setLoading();
  
      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );
  
      dispatch({
         type: GET_USER,
         payload: res.data
      })
   };

   const clearUsers = () => dispatch({ type: CLEAR_USERS });

   const getUserRepos = async username => {
      setLoading();
  
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
      );
  
      dispatch({
         type: GET_REPOS,
         payload: res.data
      })
   };

   const setLoading = () => dispatch({ type: SET_LOADING });

   return <GithubContext.Provider
      value={{
         users: state.users,
         user: state.user,
         repos: state.repos,
         nextLink: state.nextLink,
         loading: state.loading,
         searchUsers,
         clearUsers,
         getUser,
         getUserRepos,
         loadMoreUsers
      }}
   >
      {props.children}
   </GithubContext.Provider>
}

export default GithubState;