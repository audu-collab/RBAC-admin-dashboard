import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { supabase } from '@/lib/supabase'

export default async function DashboardPage() {
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')

  const { data: roles, error: rolesError } = await supabase
    .from('roles')
    .select('*')

  const { data: recentActivities, error: activitiesError } = await supabase
    .from('users')
    .select('id, name, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  if (usersError || rolesError || activitiesError) {
    console.error('Error fetching data:', { usersError, rolesError, activitiesError })
    // You might want to add error handling here, such as displaying an error message to the user
  }

  const totalUsers = users?.length || 0
  const activeUsers = users?.filter(user => user.status === 'Active').length || 0
  const inactiveUsers = users?.filter(user => user.status === 'Inactive').length || 0
  const totalRoles = roles?.length || 0

  // Prepare data for the Overview component
  const overviewData = roles?.map(role => ({
    name: role.name,
    total: users?.filter(user => user.role_id === role.id).length || 0
  })) || []

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeUsers}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inactiveUsers}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRoles}</div>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={overviewData} />
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivity activities={recentActivities || []} />
        </CardContent>
      </Card>
    </div>
  )
}

