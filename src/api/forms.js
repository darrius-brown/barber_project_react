import axios from "axios";

export function postSignUp(content) {
    const URL = `https://play-squared.herokuapp.com/signup/`
    const {username, password} = content 
      return axios.post(URL, {
        username: username,
        password: password,
      })
      .then(res => {
        return res.data
      })  
  }