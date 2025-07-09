"use client"

import { useState } from "react"
import { WelcomeScreen } from "@/components/welcome-screen"
import { LearningFlow } from "@/components/learning-flow"
import { AppProvider } from "@/context/app-context"

export default function ProblemFitApp() {
  const [hasStarted, setHasStarted] = useState(false)

  if (!hasStarted) {
    return (
      <AppProvider>
        <WelcomeScreen onStart={() => setHasStarted(true)} />
      </AppProvider>
    )
  }

  return (
    <AppProvider>
      <LearningFlow />
    </AppProvider>
  )
}
