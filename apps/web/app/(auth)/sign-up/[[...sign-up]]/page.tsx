import { SignUp } from "@clerk/nextjs"

/**
 * Renders the user sign-up interface using Clerk's authentication component.
 *
 * Displays the sign-up form provided by Clerk for user registration.
 */
export default function Page() {
  return <SignUp />
}
