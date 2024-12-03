import { Activity } from 'lucide-react'

interface ActivityItem {
  id: string
  name: string
  created_at: string
}

export function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Activity className="mr-4 h-4 w-4 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              New user created: {activity.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(activity.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

