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
        <div className='barber bg-image'>
          
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
                variant="success"
                onClick={() => {nextImage(barber.haircut_images.length, index)}}
                >Next Image  </Button>
              </Card.Body>
            </Card>
          </div>
          <Card className='barber-info' style={{ width: '18rem'}} >
            <ListGroup variant="flush">
              {/* <ListGroup.Item className='listgroup'>Price: ${barber.price}</ListGroup.Item> */}
              <ListGroup.Item className='listgroup list-group-item-dark'>Location: {barber.city}, {barber.state}</ListGroup.Item>
              {/* <ListGroup.Item className='listgroup list-group-item-dark'>Rating: {barber.ratings}/5</ListGroup.Item> */}
              <ListGroup.Item className='listgroup list-group-item-dark'>Contact: {barber.contact}</ListGroup.Item>
              <ListGroup.Item className='listgroup list-group-item-dark'>Book an appointment: <a rel="noreferrer" target="_blank" href={barber.website == "N/A" ? null : 'https://' + barber.website}>{barber.website}</a></ListGroup.Item>
            </ListGroup>
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
