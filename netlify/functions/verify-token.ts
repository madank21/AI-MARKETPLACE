import { Handler } from '@netlify/functions'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

const handler: Handler = async (event, context) => {
  try {
    const authHeader = event.headers.authorization
    
    if (!authHeader) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Authorization header required' }),
      }
    }

    const token = authHeader.replace('Bearer ', '')
    const decoded = verify(token, JWT_SECRET)

    return {
      statusCode: 200,
      body: JSON.stringify({ valid: true, user: decoded }),
    }
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid token' }),
    }
  }
}

export { handler }
