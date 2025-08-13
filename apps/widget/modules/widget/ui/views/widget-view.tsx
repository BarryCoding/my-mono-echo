"use client"

import { WidgetAuthScreen } from "../screens/widget-auth-screen"

interface Props {
  organizationId: string | null
}

export const WidgetView = ({ organizationId }: Props) => {
  return (
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetAuthScreen />
    </main>
  )
}

// http://localhost:3020/?organizationId=111
