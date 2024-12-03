import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: roles, error } = await supabase
      .from('roles')
      .select('*, permissions(*)');

    if (error) throw error;

    return NextResponse.json(roles);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching roles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, permissionIds }: { name: string; description: string; permissionIds: number[] } = await request.json();
    
    const { data: role, error } = await supabase
      .from('roles')
      .insert({ name, description })
      .select()
      .single();

    if (error) throw error;

    if (permissionIds && permissionIds.length > 0) {
      const rolePermissions = permissionIds.map((permissionId: number) => ({
        role_id: role.id,
        permission_id: permissionId,
      }));

      const { error: permissionError } = await supabase
        .from('role_permissions')
        .insert(rolePermissions);

      if (permissionError) throw permissionError;
    }

    const { data: updatedRole, error: fetchError } = await supabase
      .from('roles')
      .select('*, permissions(*)')
      .eq('id', role.id)
      .single();

    if (fetchError) throw fetchError;

    return NextResponse.json(updatedRole);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating role' }, { status: 500 });
  }
}
