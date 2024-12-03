import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { data: role, error } = await supabase
      .from('roles')
      .select('*, permissions(*)')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    return NextResponse.json(role)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching role' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { name, description, permissionIds } = await request.json()

    const { data: role, error } = await supabase
      .from('roles')
      .update({ name, description })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Delete existing role permissions
    const { error: deleteError } = await supabase
      .from('role_permissions')
      .delete()
      .eq('role_id', id)

    if (deleteError) throw deleteError

    // Insert new role permissions
    if (permissionIds && permissionIds.length > 0) {
      const rolePermissions = permissionIds.map((permissionId: string) => ({
        role_id: id,
        permission_id: permissionId
      }))

      const { error: permissionError } = await supabase
        .from('role_permissions')
        .insert(rolePermissions)

      if (permissionError) throw permissionError
    }

    const { data: updatedRole, error: fetchError } = await supabase
      .from('roles')
      .select('*, permissions(*)')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    return NextResponse.json(updatedRole)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating role' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { error } = await supabase
      .from('roles')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Role deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting role' }, { status: 500 })
  }
}

