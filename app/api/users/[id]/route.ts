import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select(`
        *,
        roles:role_id (
          id,
          name
        )
      `)
      .eq('id', params.id)
      .single()

    if (error) throw error

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, email, roles, status } = await request.json()

    const { data: user, error } = await supabase
      .from('users')
      .update({
        name,
        email,
        role_id: roles?.id,
        status
      })
      .eq('id', params.id)
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
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 })
  }
}

