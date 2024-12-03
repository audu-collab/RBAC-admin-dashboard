import { UserManagement } from "@/components/user-management"

export default function UsersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Management</h2>
      <UserManagement />
    </div>
  )
}

