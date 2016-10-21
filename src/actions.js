import { graphql } from './fetch';

import fetch from 'isomorphic-fetch';

function receiveUsers(payload) {
    return {
        type: "RECEIVE_USERS",
        payload,
    };
}

function receiveUsernames(payload) {
    return {
        type: "RECEIVE_USER_NAMES",
        payload,
    };
}

function receiveUser(payload) {
    return {
        type: "RECEIVE_USER",
        payload,
    };
}

export function getUsers() {
  return dispatch => {
    fetch('http://localhost:3000/graphql?query={ users(from:0, to:10) { firstName }}', {
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(body => {
        dispatch(receiveUsers(body.data));
    });
  }
}

export function getUser(id) {
    return dispatch => {
        graphql({
            query: `query getUser($id: String!){
                user(id:$id){
                    firstName,
                    lastName
                }
            }`,
            variables: {
                id,
            }
        })
        .then(body => {
            dispatch(body.data);
        });
    };
}

export function createUserWithVariables(firstName, lastName) {
    return dispatch => {
        graphql({
            query: `mutation M($firstName: String!, $lastName: String!){
                firstUser: createUser(
                    firstName: $firstName,
                    lastName: $lastName,
                ){id},
            }`,
            variables: {
                firstName,
                lastName,
            },
        })
        .then(body => {
            console.log('body:', body);
        });
    };
}

export function createClients(labels) {
    return dispatch => {
        graphql({
            query: `mutation M($labels: [String]!){
                createClients(labels: $labels){
                    id
                },
            }`,
            variables: {
                labels,
            },
        })
        .then(body => {
            console.log('body:', body);
        });
    };
}
