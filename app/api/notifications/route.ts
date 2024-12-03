import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: notifications, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error

    return NextResponse.json(notifications)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error fetching notifications' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({ message })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error creating notification' }, { status: 500 })
  }
}

