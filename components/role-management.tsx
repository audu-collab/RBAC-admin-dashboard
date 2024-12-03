"use client"

import { useState, useEffect } from "react"
import { PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
}

interface Permission {
  id: string
  name: string
  description: string
}

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [searchTerm, setSearchTerm] = useState("")

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
    } catch (error) {
      console.error('Error fetching permissions:', error)
      toast({
        title: "Error",
        description: "Failed to fetch permissions. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddRole = async (newRole: Omit<Role, 'id'>) => {
    try {
      const response = await fetch('/api/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRole),
      })
      if (!response.ok) throw new Error('Failed to add role')
      await fetchRoles()
      toast({
        title: "Success",
        description: "Role added successfully.",
      })
    } catch (error) {
      console.error('Error adding role:', error)
      toast({
        title: "Error",
        description: "Failed to add role. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateRole = async (id: string, updatedRole: Partial<Role>) => {
    try {
      const response = await fetch(`/api/roles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRole),
      })
      if (!response.ok) throw new Error('Failed to update role')
      await fetchRoles()
      toast({
        title: "Success",
        description: "Role updated successfully.",
      })
    } catch (error) {
      console.error('Error updating role:', error)
      toast({
        title: "Error",
        description: "Failed to update role. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteRole = async (id: string) => {
    try {
      const response = await fetch(`/api/roles/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete role')
      await fetchRoles()
      toast({
        title: "Success",
        description: "Role deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting role:', error)
      toast({
        title: "Error",
        description: "Failed to delete role. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
            </DialogHeader>
            <AddRoleForm onAddRole={handleAddRole} permissions={permissions} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRoles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <CardTitle>{role.name}</CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Permissions: {role.permissions.map(p => p.name).join(', ')}
              </p>
              <div className="flex justify-end space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Role</DialogTitle>
                    </DialogHeader>
                    <EditRoleForm role={role} onUpdateRole={handleUpdateRole} permissions={permissions} />
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteRole(role.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AddRoleForm({ onAddRole, permissions }: { onAddRole: (role: Omit<Role, 'id'>) => void, permissions: Permission[] }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddRole({
      name,
      description,
      permissions: selectedPermissions.map(id => permissions.find(p => p.id === id)!),
    })
    setName("")
    setDescription("")
    setSelectedPermissions([])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Role Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Permissions</Label>
        <div className="grid grid-cols-2 gap-2">
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-center space-x-2">
              <Checkbox
                id={permission.id}
                checked={selectedPermissions.includes(permission.id)}
                onCheckedChange={(checked) => {
                  setSelectedPermissions(
                    checked
                      ? [...selectedPermissions, permission.id]
                      : selectedPermissions.filter((id) => id !== permission.id)
                  )
                }}
              />
              <Label htmlFor={permission.id}>{permission.name}</Label>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit">Add Role</Button>
    </form>
  )
}

function EditRoleForm({ role, onUpdateRole, permissions }: { role: Role, onUpdateRole: (id: string, role: Partial<Role>) => void, permissions: Permission[] }) {
  const [name, setName] = useState(role.name)
  const [description, setDescription] = useState(role.description)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(role.permissions.map(p => p.id))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateRole(role.id, {
      name,
      description,
      permissions: selectedPermissions.map(id => permissions.find(p => p.id === id)!),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Role Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Permissions</Label>
        <div className="grid grid-cols-2 gap-2">
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-center space-x-2">
              <Checkbox
                id={permission.id}
                checked={selectedPermissions.includes(permission.id)}
                onCheckedChange={(checked) => {
                  setSelectedPermissions(
                    checked
                      ? [...selectedPermissions, permission.id]
                      : selectedPermissions.filter((id) => id !== permission.id)
                  )
                }}
              />
              <Label htmlFor={permission.id}>{permission.name}</Label>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit">Update Role</Button>
    </form>
  )
}

