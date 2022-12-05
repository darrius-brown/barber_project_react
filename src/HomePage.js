import React, { useEffect, useState } from 'react'
import { getBarber } from './api/homepage'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'


function HomePage(accessToken) {
  const [database, setDatabase] = useState([])
  const [images, setImages] = useState({})

  const getDatabase = () => {
    getBarber(accessToken)
      .then((data) => {
        setDatabase(data)
      })
  }

  const storeImages = () => {
    const imageStorage = Array(2).fill(0)

    for (let i = 0; i < database.length; i++){
      imageStorage[`${i}`] = 1
      
    }
    setImages(imageStorage)
  }

  const nextImage = (imageArrayLength, index) => {
    let copyImages = [...images]
    copyImages[index] += 1
    if(copyImages[index] % imageArrayLength === 0) {
      copyImages[index] = 0
    }
    setImages(copyImages)
  }

  useEffect(() => {
    getDatabase()
    storeImages()
  }, [])

  if (database.length <= 0) {
    return (
      <h2>Loading Barbers...</h2>
    )
  }

  const renderBarbers = () => {
    return database.map((barber, index) => {
      return (
        <div className='barber-card'>
          <Card style={{ width: '35rem' }}>
          <Card.Body>
              <Card.Title>
              <img className="barber-img" src={barber.profile_image} alt="..." /> {barber.name} 
                </Card.Title>
            </Card.Body>
            <Card.Img variant="bottom" src={barber.haircut_images[images[index]]} />
            <Card.Body>
              <Card.Text>{barber.description}</Card.Text>
              
              <Button 
              variant="primary"
              onClick={() => {nextImage(barber.haircut_images.length, index)}}
              >Next Image  </Button>
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
