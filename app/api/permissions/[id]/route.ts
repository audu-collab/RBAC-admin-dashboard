import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { data: permission, error } = await supabase
      .from('permissions')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) throw error

    if (!permission) {
      return NextResponse.json({ error: 'Permission not found' }, { status: 404 })
    }

    return NextResponse.json(permission)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching permission' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, description } = await request.json()

    const { data: permission, error } = await supabase
      .from('permissions')
      .update({ name, description })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(permission)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating permission' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase
      .from('permissions')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ message: 'Permission deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting permission' }, { status: 500 })
  }
}

