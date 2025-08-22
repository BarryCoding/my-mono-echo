export default async function Page({
  params,
}: {
  params: Promise<{
    conversationId: string
  }>
}) {
  const { conversationId } = await params

  return <div>detail {conversationId}</div>
}
