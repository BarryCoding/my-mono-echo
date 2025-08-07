"use client"

import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"
import {
  useMutation,
  useQuery,
  Authenticated,
  Unauthenticated,
} from "convex/react"
import { SignInButton, UserButton } from "@clerk/nextjs"

/**
 * Renders the main page with user authentication and user management features.
 *
 * Displays a greeting, user list, and an "Add User" button for authenticated users, or a sign-in button for unauthenticated users.
 */
export default function Page() {
  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello apps/web</h1>
        <Authenticated>
          <UserButton />
          <pre>{JSON.stringify(users, null, 2)}</pre>
          <Button size="sm" onClick={() => addUser()}>
            Add User
          </Button>
        </Authenticated>
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
      </div>
    </div>
  )
}
