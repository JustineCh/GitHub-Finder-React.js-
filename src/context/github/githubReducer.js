import {
   SEARCH_USERS,
   SET_LOADING,
   CLEAR_USERS,
   GET_USER,
   GET_REPOS,
   LOAD_MORE_USERS
} from '../types';
import { getNodeText } from '@testing-library/react';

export default (state, action) => {
   // console.log(`STATE: ${JSON.stringify(state)}`);
   // console.log(`ACTION: ${JSON.stringify(action)}`);
   switch(action.type) {
      case CLEAR_USERS:
         return {
            ...state,
            users: [],
            loading: false
         }
      case SEARCH_USERS:
         return {
            ...state,
            users: action.payload.users,
            nextLink: action.payload.nextLink,
            loading: false
         }
      case LOAD_MORE_USERS:
         return {
            ...state,
            users: state.users.concat(action.payload.users),
            nextLink: action.payload.nextLink,
            loading: false
         }
      case GET_USER:
         return {
            ...state,
            user: action.payload,
            loading: false
         }
      case GET_REPOS:
         return {
            ...state,
            repos: action.payload,
            loading: false
         }
      case SET_LOADING: 
         return {
            ...state,
            loading: true
         }
      default: 
         return state;
   }
}