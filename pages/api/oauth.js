/* eslint-disable camelcase */
const getURLWithQueryParams = (base, params) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `${base}?${query}`;
};

export const LINKEDIN_URL = getURLWithQueryParams(
  'https://www.linkedin.com/oauth/v2/authorization',
  {
    response_type: 'code',
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: process.env.LINKEDIN_REDIRECT,
    state: process.env.LINKEDIN_STATE,
    scope: process.env.LINKEDIN_SCOPE,
  }
);

const Oauth = async (req, res) => {
  try {
    const url = getURLWithQueryParams(
      'https://www.linkedin.com/oauth/v2/accessToken',
      {
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: process.env.LINKEDIN_REDIRECT,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }
    );

    let tok;

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (resp.ok) {
      tok = await resp.json();
    }

    if (!tok) {
      return;
    }

    const { access_token } = tok;
    const auth = `Bearer ${access_token}`;

    let u = {};

    const usr = await fetch('https://api.linkedin.com/v2/me', {
      method: 'GET',
      headers: { Authorization: auth },
    });

    if (usr.ok) u = await usr.json();

    if (u.localizedFirstName) {
      console.log(u.localizedFirstName);
      res.redirect(`/hello/${u.localizedFirstName}`);
    }
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
};

export default Oauth;
