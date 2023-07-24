import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';

function HomePage(accessToken) {
  const database = [
    {
        "name": "Christian Alverez",
        "state": "California",
        "city": "Corona",
        "ratings": [
            5
        ],
        "price": "35",
        "description": "Experience the finest haircuts and grooming services at my barber shop. With over 10 years of experience and a passion for precision, I guarantee you'll leave feeling and looking your best.",
        "profile_image": "https://i.imgur.com/6sLGAwr.png",
        "haircut_images": [
            "https://i.imgur.com/HUhWDGM.png",
            "https://i.imgur.com/KIwHkr2.png",
            "https://i.imgur.com/VnEXZgA.png",
            "https://i.imgur.com/WYP7Pc5.png"
        ],
        "contact": "(951) 666-1963",
        "website": "imnxt.pro/Chrisstheebarber"
    },
    {
        "name": "Ashton Vilchiz",
        "state": "California",
        "city": "Corona",
        "ratings": [
            5
        ],
        "price": "35",
        "description": "Experience the ultimate in personal grooming with a private barber. With a dedicated stylist and top-notch equipment, you'll receive individualized attention and a custom-tailored haircut.",
        "profile_image": "https://i.imgur.com/Eji3LyP.png",
        "haircut_images": [
            "https://i.imgur.com/4U3APR9.png",
            "https://i.imgur.com/ztZu9qE.png",
            "https://i.imgur.com/sXDdwAA.png",
            "https://i.imgur.com/c48iPaL.png"
        ],
        "contact": "(951) 666-1963",
        "website": "https://www.instagram.com/223_thegoon/"
    },
    {
        "name": "Cameron Caughan",
        "state": "California",
        "city": "Corona",
        "ratings": [
            5
        ],
        "price": "35",
        "description": "Experience the ultimate barbering services with a personal barber in our shop. Receive individualized attention and personalized cuts in a professional and relaxed setting.",
        "profile_image": "https://i.imgur.com/IS8zr4m.png",
        "haircut_images": [
            "https://i.imgur.com/RTLHaQ9.png",
            "https://i.imgur.com/i25RyoT.png",
            "https://i.imgur.com/w6PG8JT.png",
            "https://i.imgur.com/eeQ99B8.png"
        ],
        "contact": "(951) 666-1963",
        "website": "https://www.instagram.com/sensei_fadez/"
    },
    {
        "name": "Jonathan Covvarrubias",
        "state": "California",
        "city": "Corona",
        "ratings": [
            5
        ],
        "price": "35",
        "description": "Discover the art of grooming with a professional barber who understands the importance of a great haircut. With years of experience and a passion for making you look your best, I offer a personalized touch and a keen eye for detail. Trust me to keep you looking sharp and stylish, every time.",
        "profile_image": "https://i.imgur.com/9IOMx7a.png",
        "haircut_images": [
            "https://i.imgur.com/M2NeVsY.png",
            "https://i.imgur.com/OEUfHPR.png",
            "https://i.imgur.com/2yftDrM.png",
            "https://i.imgur.com/WCmbl4z.png"
        ],
        "contact": "(951) 666-1963",
        "website": "thefastbarber.booksy.com"
    },
    {
        "name": "Andrew Rameriz",
        "state": "California",
        "city": "Corona",
        "ratings": [
            5
        ],
        "price": "35",
        "description": "Experience the ultimate grooming experience with your own personal barber. From head-to-toe, I'll take care of all your grooming needs with personalized attention and top-notch products.",
        "profile_image": "https://i.imgur.com/6i0v8ua.png",
        "haircut_images": [
            "https://i.imgur.com/wJmQa1R.png",
            "https://i.imgur.com/P7nqcaf.png",
            "https://i.imgur.com/7nn76wi.png",
            "https://i.imgur.com/vj8lXr3.png"
        ],
        "contact": "(951) 666-1963",
        "website": "andrew1of1.booksy.com"
    }
]
  const [images, setImages] = useState(Array(100).fill(0))

  const nextImage = (imageArrayLength, index) => {
    let copyImages = [...images]
    copyImages[index] += 1
    if(copyImages[index] % imageArrayLength === 0) {
      copyImages[index] = 0
    }
    setImages(copyImages)
  }

    // State to track the current window width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Function to update window width on window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    // useEffect to add and remove the event listener for window resize
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    // Conditionally set the class name based on windowWidth
    const barberClassName = windowWidth <= 767 ? 'barber' : 'barber bg-image';

  const renderBarbers = () => {
    return database.map((barber, index) => {
      return (
        <div className={barberClassName}>
          
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
              <ListGroup.Item className='listgroup list-group-item-dark'>Book an appointment: <a rel="noreferrer" target="_blank" href={barber.website === "N/A" ? null : 'https://' + barber.website}>{barber.website}</a></ListGroup.Item>
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
