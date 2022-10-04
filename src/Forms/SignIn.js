import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

function SignIn({ setUserSignedIn, setAccessToken }) {
    const navigate = useNavigate()
    const loginEndpoint = 'https://play-squared.herokuapp.com/api/token/'
    const initialState = { username: '', password: '' }
    const [formState, setFormState] = useState(initialState)
    const [networkErrMsg, setNetworkErrMsg] = useState(null)
    const [clientErrMsg, setClientErrMsg] = useState(null)


    const clientFormValidation = (formState) => {
        const blankFields = Object.entries(formState)
            .filter(kv => kv[1] === '')
        if (blankFields.length > 0) {
            setClientErrMsg(`${blankFields[0][0]} can not be blank`)
            return false
        }
        setClientErrMsg(null)
        return true
    }

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setNetworkErrMsg(null)
        if (!clientFormValidation(formState)) {
            return
        }

        fetch(loginEndpoint, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(formState)
                }
        )
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.resolve(null)
                }
            })
            .then(data => {
                if (!data) {
                    console.log(`problem with network request: ${networkErrMsg}`)
                    console.log('data = ' + data)
                } else {

                    console.log('data' + data)

                    setUserSignedIn(formState.username)
                    setAccessToken(data.access)

                    localStorage.setItem('access_token', data.access)
                    localStorage.setItem('user', formState.username)
                    navigate('/')
                }
            })


    }

    return (
        <div>
            <h3>Login</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control id="username" name="username" type="text" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control id="password" name="password" type="password" onChange={handleChange} />
                </Form.Group>
                <Button variant="success" className="submit-gamerec" type="submit" >Login</Button>
            </Form>
            <p id='no-account'>Don't have an account?</p>
            <Link to='/signup'>
                <div className="mb-5"> Sign up</div>
            </Link>

            <p>{networkErrMsg}</p>
            <p>{clientErrMsg}</p>

        </div>
    );
}

export default SignIn;