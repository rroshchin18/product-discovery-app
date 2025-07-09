"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface TaskSubmission {
  selectedStakeholders: string[]
  problemStatement: {
    issue: string
    affected: string
    businessImpact: string
  }
  selectedBenefits: string[]
}

interface AppContextType {
  submission: TaskSubmission
  updateSubmission: (updates: Partial<TaskSubmission>) => void
  resetSubmission: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const initialSubmission: TaskSubmission = {
  selectedStakeholders: [],
  problemStatement: {
    issue: "",
    affected: "",
    businessImpact: "",
  },
  selectedBenefits: [],
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [submission, setSubmission] = useState<TaskSubmission>(initialSubmission)

  const updateSubmission = (updates: Partial<TaskSubmission>) => {
    setSubmission((prev) => ({ ...prev, ...updates }))
  }

  const resetSubmission = () => {
    setSubmission(initialSubmission)
  }

  return <AppContext.Provider value={{ submission, updateSubmission, resetSubmission }}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
