'use strict';
const fetch = require('node-fetch');

module.exports.handler = (event, context, callback) => {
  let done = (err, res) => {
    if (err) {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          type: 'error'
        }),
        headers: {}
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          type: 'success',
          done: res
        }),
        headers: {}
      });
    }
  };

  let getExternalData = () => {
    const url = 'https://jsonplaceholder.typicode.com/comments?postId=1';

    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        done(null, {
          json: json
        });
      })
      .catch(error => {
        done({
          error: error
        });
      });
  };

  // try catch in case it breaks
  try {
    getExternalData();
  } catch (error) {
    done(error);
  }
};
