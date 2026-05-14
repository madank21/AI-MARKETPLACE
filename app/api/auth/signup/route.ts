import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, username, password } = await request.json()

    // Validate input
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Email, username, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // TODO: Implement actual user registration logic
    // This would typically involve:
    // 1. Checking if user already exists
    // 2. Hashing password
    // 3. Creating user in database
    // 4. Sending verification email

    const token = 'mock_jwt_token_' + Date.now()

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: Math.random().toString(36).substr(2, 9),
          email,
          username,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
