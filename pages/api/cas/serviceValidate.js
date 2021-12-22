import axios from 'axios'
const url = require('url'); 

export default function handler(req, res) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    
    let apiUrl = process.env.NEXT_PUBLIC_APP_API_URL 
    const params = new url.URLSearchParams(req.query);
    let config = {
        url:`${apiUrl}/validate_cas_ticket?${params.toString()}`,
        headers: {
            "Content-Type": "application/json"
        } ,
        strictSSL: false
    }
    axios(config)
    .then(function (response) {
        res.send(response.data);
      }).catch(err => {
          console.log(err)
      })
};