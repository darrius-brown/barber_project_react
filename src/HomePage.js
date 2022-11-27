import React, { useEffect, useState } from 'react'
import { getBarber } from './api/homepage'
import Card from 'react-bootstrap/Card';


function HomePage(accessToken) {
  const [database, setDatabase] = useState([])
  const [images, setImages] = useState({})

  const getDatabase = () => {
    getBarber(accessToken)
      .then((data) => {
        setDatabase(data)
      })
    storeImages()
  }

  const storeImages = () => {
    const imageStorage = {}
    database.map((barber, index) => {
      imageStorage[`${index}`] = barber.haircut_images.length
    })
    setImages(imageStorage)
  }

  const nextImage = () => {
    
  }

  useEffect(() => {
    getDatabase()
  }, [])

  if (database.length <= 0) {
    return (
      <h2>Loading Barbers...</h2>
    )
  }

  const renderBarbers = () => {
    return database.map((barber, index) => {
      console.log(barber.haircut_images[`${index}`])
      return (
        <div className='barber-card'>
          <Card style={{ width: '35rem' }}>
          <Card.Body>
              <Card.Title>
              <img className="barber-img" src={barber.profile_image} alt="..." /> {barber.name} 
                </Card.Title>
            </Card.Body>
            <Card.Img variant="bottom" src={barber.haircut_images[`${index}`]} />
            <Card.Body>
              <Card.Text>{barber.description}</Card.Text>
              
              <button 
              // onClick={() => {nextImage()}}
              >Next Image ----> </button>
            </Card.Body>
          </Card>
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
