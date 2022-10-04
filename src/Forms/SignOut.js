import React, {useEffect} from 'react'
function SignOut({setUserSignedIn, setAccessToken}) {

    useEffect(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('access_token')
        setUserSignedIn(false)
        setAccessToken()
    })
  return (
    <div>
        <h2 className='logout'>You are logged out!</h2>
    </div>
  )
}

export default SignOut