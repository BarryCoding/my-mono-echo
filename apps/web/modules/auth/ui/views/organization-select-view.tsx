import { OrganizationList } from "@clerk/nextjs"

export function OrganizationSelectView() {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl="/"
      afterSelectOrganizationUrl="/"
      skipInvitationScreen
    />
  )
}
