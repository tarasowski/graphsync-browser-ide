import React from 'react';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import './graphiql.css'
import config from './aws-config'

import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'

const graphQLFetcherCognito = async (graphQLParams) => {
  const session = await Auth.currentSession()
  const token = session.idToken.jwtToken
  return fetch(config.endpoint, {
    method: 'post',
    headers: {
      Authorization: token
    },
    body: JSON.stringify(graphQLParams)
  }).then(res => res.json())
}

const graphQLFetcherApiKey = (graphQLParams) => {
  return fetch(config.endpoint, {
    method: 'post',
    headers: {
      'x-api-key': config.apiKey
    },
    body: JSON.stringify(graphQLParams)
  }).then(res => res.json())
}

const App = () => {
  if (config.authType === 'COGNITO') {
    console.log('this is from cognito')
    return <GraphiQL fetcher={graphQLFetcherCognito} />
  } else {
    return <GraphiQL fetcher={graphQLFetcherApiKey} />
  }

}

export default withAuthenticator(App)