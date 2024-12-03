"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

interface Role {
  id: string
  name: string
  permissions: Permission[]
}

interface Permission {
  id: string
  name: string
}

export function PermissionsMatrix() {
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRoles()
    fetchPermissions()
  }, [])

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/roles')
      if (!response.ok) throw new Error('Failed to fetch roles')
      const data = await response.json()
      setRoles(data)
    } catch (error) {
      console.error('Error fetching roles:', error)
      toast({
        title: "Error",
        description: "Failed to fetch roles. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchPermissions = async () => {
    try {
      const response = await fetch('/api/permissions')
      if (!response.ok) throw new Error('Failed to fetch permissions')
      const data = await response.json()
      setPermissions(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching permissions:', error)
      toast({
        title: "Error",
        description: "Failed to fetch permissions. Please try again.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  const togglePermission = async (roleId: string, permissionId: string) => {
    try {
      const role = roles.find(r => r.id === roleId)
      if (!role) return

      const updatedPermissions = role.permissions.some(p => p.id === permissionId)
        ? role.permissions.filter(p => p.id !== permissionId)
        : [...role.permissions, { id: permissionId, name: permissions.find(p => p.id === permissionId)?.name || '' }]

      const response = await fetch(`/api/roles/${roleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          permissions: updatedPermissions.map(p => ({ id: p.id })),
        }),
      })

      if (!response.ok) throw new Error('Failed to update role permissions')

      setRoles(roles.map(r => r.id === roleId ? { ...r, permissions: updatedPermissions } : r))
      toast({
        title: "Success",
        description: "Permissions updated successfully.",
      })
    } catch (error) {
      console.error('Error updating permissions:', error)
      toast({
        title: "Error",
        description: "Failed to update permissions. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Permission / Role</TableHead>
            {roles.map((role) => (
              <TableHead key={role.id}>{role.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell className="font-medium">{permission.name}</TableCell>
              {roles.map((role) => (
                <TableCell key={`${permission.id}-${role.id}`}>
                  <Switch
                    checked={role.permissions.some(p => p.id === permission.id)}
                    onCheckedChange={() => togglePermission(role.id, permission.id)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={fetchRoles}>Reset to Default</Button>
        <Button onClick={fetchRoles}>Save Changes</Button>
      </div>
    </div>
  )
}

