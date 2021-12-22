import withSession from 'lib/session'
import axios from 'axios'
require('https').globalAgent.options.ca = require('ssl-root-cas').create();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

export default withSession(async (req, res) => {
  let url = process.env.NEXT_PUBLIC_APP_API_URL
  try {
    const data = await axios.post(`${url}/auth/sign_in`,
    req.body,
    {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json'
      }
    })

    const user = { isSignedIn: true, user: data?.data.user }
    const token = data?.data.auth_user
    req.session.set("user", user);
    req.session.set("token", token);
    await req.session.save();
    res.json(user);

  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 401).json(error.data);
  }
})