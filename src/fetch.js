import fetch from 'isomorphic-fetch';

export function graphql(query) {
  return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({query})
  })
  .then((response) => {
    return response.json();
  })
  .then((responseBody) => {
    if (responseBody && responseBody.errors) {
      throw new Error(responseBody.errors[0].message);
    }
    return responseBody.data;
  });
}