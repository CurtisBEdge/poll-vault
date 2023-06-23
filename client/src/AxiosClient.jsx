import axios from 'axios';
import { useEffect, useState } from 'react';
import App from './App'
import AppContext from "./context";

const AxiosClient = () => {

  const baseUrl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';
  const [token, setToken] = useState(undefined)
  const [username, setUsername] = useState(undefined)
  const [polls, setPolls] = useState([])
  const [role, setRole] = useState(undefined)

  const apiCall = ({ method, url, data }) => {
    return axios({
      method,
      url: `${baseUrl}${url}`,
      data,
      headers: {
        Authorization: token
      }
    }).catch((error) => {
      throw error;
    })
  }

  const getPolls = () => apiCall({
    method: "get",
    url: "/api/polls"
  })
    .then(({ data }) => {
      setPolls(data)
    })

  useEffect(() => {
    if (token) {
      getPolls()
    }
  }, [])

  const getSinglePoll = (id) => apiCall({
    method: 'get',
    url: `/api/polls/${id}`
  })

  const signUp = (username, password, confirmpassword) => apiCall({
    method: "post",
    url: "/api/users/signup",
    data: { username, password, confirmpassword }
  })
    .then(({ data }) => {
      setToken(data.token)
      setUsername(data.username)
      setRole(data.role)
    })

  const logIn = (username, password) => apiCall({
    method: "post",
    url: "/api/users/login",
    data: { username, password }
  })
    .then(({ data }) => {
      setToken(data.token)
      setUsername(data.username)
      setRole(data.role)
    })

  const signOut = () => {
    setToken(undefined)
    setUsername(undefined)
  }

  const deletePoll = (_id) => apiCall({
    method: "delete",
    url: `/api/polls/${_id}`
  })
    .then(() => {
      getPolls()
    })

  const vote = (id, optionid) => apiCall({
    headers: { Authorization: token },
    method: "patch",
    url: `/api/polls/${id}/${optionid}`
  })
    .then(() => getPolls())
    .catch((error) => console.log(error));

  const getComments = (id) => apiCall({
    headers: { Authorization: token },
    method: "get",
    url: `/api/polls/${id}/comments`
  })

  const submitComment = (id, text, timestamp) => apiCall({
    headers: { Authorization: token },
    method: "post",
    url: `/api/polls/${id}/addcomment`,
    data: {text, timestamp}
  })

  const newPoll = (data) => apiCall( {
    method: "post",
    url: '/api/polls',
    data,
  })
    .then(() => getPolls())

  const client = {
    apiCall,
    deletePoll,
    signUp,
    logIn,
    signOut,
    getPolls,
    vote,
    newPoll,
    getComments,
    submitComment,
    getSinglePoll
  }

  return (
    <AppContext.Provider
      value={{
        client,
        token,
        setToken,
        username,
        polls,
        role,
      }}
    >
      <App/>
    </AppContext.Provider>
  )
}

export default AxiosClient;
