import React, {useEffect, useState} from 'react'
import { getBarber } from './api/homepage'

function HomePage(accessToken) {
  const [database, setDatabase] = useState([])

  const getDatabase = () => {
    getBarber(accessToken)
    .then((data) =>{
      setDatabase(data)
    })
  }

  useEffect(() => {
    getDatabase()
  }, )

  if (database.length <= 0) {
    return (
      <h2>Loading Barbers...</h2>
    )
  }
  
  const renderBarbers = () => {
    return database.map((barber, index) => {
      return(
        <div>
          <p>{barber.name}</p>
          <p>{barber.index}</p>
        </div>
      )
    })
  }

  
  return (
    <div>
      {renderBarbers()}
    </div>
  )
}

export default HomePage
