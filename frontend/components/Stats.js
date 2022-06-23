import React, { useEffect, useState } from 'react'
import axiosWithAuth from '../axios'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

export function Stats(props) {
  const {
    auth,
    setMessage,
    navigate,
  } = props

  const [stats, setStats] = useState()

  useEffect(() => {
    if (auth.is_user === false) {
      navigate('/auth')
      setMessage({ main: 'Not allowed there', code: 'red' })
    }
  }, [auth])

  useEffect(() => {
    function getGeneralStats() {
      axiosWithAuth().get('http://localhost:9000/api/stats/general')
        .then(res => { setStats(res.data) })
        .catch((err) => { console.log(err.message) })
    }
    getGeneralStats()
  }, [])

  if (!stats) return null

  return (
    <div id="stats">
      <h1>{stats.corrects}</h1>correct answers
      <h1>{stats.incorrects}</h1>incorrect answers
    </div>
  )
}

export default connect(st => ({
  // mapping state to props
  auth: st.auth,
}), {
  // action creators
  setMessage: actions.setMessage,
})(Stats)
