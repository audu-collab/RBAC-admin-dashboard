"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface Notification {
  id: string
  message: string
  timestamp: string
}

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications')
      if (!response.ok) throw new Error('Failed to fetch notifications')
      const data = await response.json()
      setNotifications(data)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id}>
          <CardContent className="p-4">
            <p>{notification.message}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {new Date(notification.timestamp).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

