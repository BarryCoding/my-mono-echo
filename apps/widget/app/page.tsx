"use client"

import { Button } from "@workspace/ui/components/button"
import { useVapi } from "../modules/widget/hooks/use-vapi"

export default function Page() {
  const {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    stopCall,
  } = useVapi()
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <Button onClick={() => startCall()}>Start Call</Button>
        <Button variant="destructive" onClick={() => stopCall()}>
          Stop Call
        </Button>
        <p>Connected: {isConnected ? "Yes" : "No"}</p>
        <p>Connecting: {isConnecting ? "Yes" : "No"}</p>
        <p>Speaking: {isSpeaking ? "Yes" : "No"}</p>
        <pre>{JSON.stringify(transcript, null, 2)}</pre>
      </div>
    </div>
  )
}
