import { PermissionsMatrix } from "@/components/permissions-matrix"

export default function PermissionsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Permissions Management</h2>
      <PermissionsMatrix />
    </div>
  )
}

