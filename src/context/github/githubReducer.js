import {
   SEARCH_USERS,
   SET_LOADING,
   CLEAR_USERS,
   GET_USER,
   GET_REPOS,
   LOAD_MORE_USERS
} from '../types';
import { getNodeText } from '@testing-library/react';

const findElbyId = (arr, id) => {
   for(let e in arr){
      if(arr[e].id === id){
         return arr[e]
      }
   }
   return null
} 

const deduplicateIds = (arr1) => {
   const result = [];
      arr1.forEach(element => {
         if(findElbyId(result, element.id) === null){
            result.push(element)
         };
      });
   return result;
}

export default (state, action) => {
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
            users: deduplicateIds(state.users.concat(action.payload.users)),
            nextLink: action.payload.nextLink
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