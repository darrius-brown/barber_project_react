import React, { useEffect, useState } from 'react'
import { getBarber } from './api/homepage'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';

function HomePage(accessToken) {
  const [database, setDatabase] = useState([])
  const [images, setImages] = useState(Array(100).fill(0))

  const getDatabase = () => {
    getBarber(accessToken)
      .then((data) => {
        setDatabase(data)
      })
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
  }, )

  if (database.length <= 0) {
    return (
      <h2>Loading Barbers...</h2>
    )
  }

  const renderBarbers = () => {
    return database.map((barber, index) => {
      return (
        <div className='barber'>
          <Card className='barber-info' style={{ width: '18rem' }}>
            <ListGroup variant="flush">
              <ListGroup.Item className='listgroup'>Price: ${barber.price}</ListGroup.Item>
              <ListGroup.Item className='listgroup'>Location: {barber.city}, {barber.state}</ListGroup.Item>
              <ListGroup.Item className='listgroup'>Rating: {barber.ratings}/5</ListGroup.Item>
            </ListGroup>
          </Card>
          <div className='barber-card'>
            <Card style={{ width: '35rem' }}>
            <Card.Body>
                <Card.Title>
                <img className="barber-img" src={barber.profile_image} alt="..." /> {barber.name} 
                  </Card.Title>
              </Card.Body>
              <Card.Img variant="bottom" className='barber-cut' src={barber.haircut_images[images[index]]} />
              <Card.Body>
                <Card.Text>{barber.description}</Card.Text>
                
                <Button 
                variant="primary"
                onClick={() => {nextImage(barber.haircut_images.length, index)}}
                >Next Image  </Button>
              </Card.Body>
            </Card>
          </div>
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
