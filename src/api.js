'use strict';
const fetch = require('node-fetch');
const api_url = 'https://www.whoisxmlapi.com/whoisserver/WhoisService';
const api_key = process.env.API_KEY;

module.exports.handler = (event, context, callback) => {
  let done = (err, res) => {
    if (err) {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          type: 'error'
        }),
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          type: 'success',
          done: res
        }),
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  };

  let getExternalData = domain => {
    let url = `${api_url}?apiKey=${api_key}&domainName=${domain}&outputFormat=JSON`;

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
    getExternalData(event.body);
  } catch (error) {
    done(error);
  }
};
