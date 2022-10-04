import axios from "axios";

export function getBarber(accessToken) {
    const URL = 'http://localhost:8000/barbers'
    const headers = { 
        'Authorization': `Bearer ${accessToken}`,
    };
      return axios.get(URL, {headers},)
      .then(res => {
        return res.data
      })
}