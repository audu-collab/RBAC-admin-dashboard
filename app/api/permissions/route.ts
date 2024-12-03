import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const defaultPermissions = [
  { name: 'view_users', description: 'Can view user list' },
  { name: 'create_users', description: 'Can create new users' },
  { name: 'edit_users', description: 'Can edit user information' },
  { name: 'delete_users', description: 'Can delete users' },
  { name: 'view_roles', description: 'Can view role list' },
  { name: 'create_roles', description: 'Can create new roles' },
  { name: 'edit_roles', description: 'Can edit role information' },
  { name: 'delete_roles', description: 'Can delete roles' },
  { name: 'assign_permissions', description: 'Can assign permissions to roles' },
]

function checkPermissions(permissions: any[]): boolean {
  if (permissions === null || permissions === undefined) {
    return false;
  }

  if (permissions.length === 0) {
    return false;
  }

  for (let i = 0; i < permissions.length; i++) {
    if (permissions[i] === 'admin') {
      return true;
    }
  }
  return false;
}

export async function GET() {
  try {
    let { data: permissions, error } = await supabase
      .from('permissions')
      .select('*')

    if (error) throw error

    if (permissions === null || permissions.length === 0) {
      const { data: createdPermissions, error: createError } = await supabase
        .from('permissions')
        .insert(defaultPermissions)
        .select()

      if (createError) throw createError
      permissions = createdPermissions
    }

    return NextResponse.json(permissions)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error fetching permissions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json()

    const { data: permission, error } = await supabase
      .from('permissions')
      .insert({ name, description })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(permission)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error creating permission' }, { status: 500 })
  }
}

