import { useEffect, useState } from "react"
import Vapi from "@vapi-ai/web"

interface TranscriptMessage {
  role: "user" | "assistant"
  text: string
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null)

  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])

  useEffect(() => {
    // testing only
    const vapiInstance = new Vapi("141d6523-81c6-4dfa-aad3-83b259b282cf") // vapi public api key
    setVapi(vapiInstance)

    vapiInstance.on("call-start", () => {
      setIsConnected(true)
      setIsConnecting(false)
      setTranscript([])
    })

    vapiInstance.on("call-end", () => {
      setIsConnected(false)
      setIsConnecting(false)
      setIsSpeaking(false)
    })

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true)
    })

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false)
    })

    vapiInstance.on("error", (error) => {
      console.error("Vapi error", error)
      setIsConnected(false)
    })

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ])
      }
    })

    return () => {
      vapiInstance.stop()
    }
  }, [])

  const startCall = () => {
    if (!vapi) return
    setIsConnecting(true)
    // testing only
    vapi.start("0725e9e0-b769-44b1-9b37-940c40fb007a") // Tom assistant id
  }

  const stopCall = () => {
    if (!vapi) return
    vapi.stop()
  }

  return {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    stopCall,
  }
}
