import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcrypt'

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select(`
        *,
        roles:role_id (
          id,
          name
        )
      `)

    if (error) throw error

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, password, roles, status } = await request.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    const { data: user, error } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password: hashedPassword,
        role_id: roles.id,
        status
      })
      .select(`
        *,
        roles:role_id (
          id,
          name
        )
      `)
      .single()

    if (error) throw error

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
  }
}

