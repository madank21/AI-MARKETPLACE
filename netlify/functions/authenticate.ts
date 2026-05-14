import { Handler } from '@netlify/functions'

const handler: Handler = async (event, context) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
      }
    }

    const { email, password } = JSON.parse(event.body || '{}')

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and password required' }),
      }
    }

    // TODO: Implement actual authentication
    // 1. Verify credentials
    // 2. Create JWT token
    // 3. Return token

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        token: 'jwt_token_' + Date.now(),
        user: { email, id: '1' },
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Authentication failed' }),
    }
  }
}

export { handler }
