"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/app-context"
import { X, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const availableStakeholders = [
  {
    id: "fraud-ops",
    name: "Fraud Operations Manager",
    department: "Risk",
    description: "Manages fraud detection and prevention processes",
  },
  {
    id: "aml-compliance",
    name: "AML Compliance Officer",
    department: "Compliance",
    description: "Ensures anti-money laundering compliance",
  },
  {
    id: "legal-counsel",
    name: "Legal Counsel",
    department: "Legal",
    description: "Provides legal guidance on regulatory matters",
  },
  {
    id: "credit-risk",
    name: "Credit Risk Analyst",
    department: "Risk",
    description: "Assesses and manages credit risk exposure",
  },
  {
    id: "platform-pm",
    name: "Platform Product Manager",
    department: "Product",
    description: "Manages core banking platform features",
  },
  {
    id: "cx-lead",
    name: "Customer Experience Lead",
    department: "CX",
    description: "Focuses on customer journey and satisfaction",
  },
  {
    id: "data-privacy",
    name: "Data Privacy Officer",
    department: "Compliance",
    description: "Ensures data protection and privacy compliance",
  },
  {
    id: "ops-manager",
    name: "Operations Manager",
    department: "Operations",
    description: "Manages day-to-day operational processes",
  },
  {
    id: "tech-lead",
    name: "Technical Lead",
    department: "Engineering",
    description: "Leads technical implementation and architecture",
  },
  {
    id: "customer-support",
    name: "Customer Support Manager",
    department: "Support",
    description: "Manages customer service operations",
  },
  {
    id: "business-analyst",
    name: "Business Analyst",
    department: "Analytics",
    description: "Analyzes business processes and requirements",
  },
  {
    id: "regulatory-affairs",
    name: "Regulatory Affairs Specialist",
    department: "Compliance",
    description: "Manages regulatory reporting and compliance",
  },
]

interface StakeholderSelectionProps {
  scenario: any
}

export function StakeholderSelection({ scenario }: StakeholderSelectionProps) {
  const { submission, updateSubmission } = useAppContext()
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, stakeholderId: string) => {
    setDraggedItem(stakeholderId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedItem && submission.selectedStakeholders.length < 5) {
      if (!submission.selectedStakeholders.includes(draggedItem)) {
        updateSubmission({
          selectedStakeholders: [...submission.selectedStakeholders, draggedItem],
        })
      }
    }
    setDraggedItem(null)
  }

  const removeStakeholder = (stakeholderId: string) => {
    updateSubmission({
      selectedStakeholders: submission.selectedStakeholders.filter((id) => id !== stakeholderId),
    })
  }

  const addStakeholder = (stakeholderId: string) => {
    if (submission.selectedStakeholders.length < 5 && !submission.selectedStakeholders.includes(stakeholderId)) {
      updateSubmission({
        selectedStakeholders: [...submission.selectedStakeholders, stakeholderId],
      })
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Select up to 5 key stakeholders who should be involved in addressing this banking product challenge. Drag
            and drop or click to add them to your working group.
          </p>
        </div>

        {/* Working Group Container */}
        <Card
          className="min-h-32 border-2 border-dashed border-gray-300 bg-gray-50"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Working Group</h4>
              <Badge variant="secondary">{submission.selectedStakeholders.length}/5</Badge>
            </div>

            {submission.selectedStakeholders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">Drop stakeholders here or click to add</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {submission.selectedStakeholders.map((stakeholderId) => {
                  const stakeholder = availableStakeholders.find((s) => s.id === stakeholderId)
                  return stakeholder ? (
                    <Badge key={stakeholderId} variant="default" className="flex items-center gap-1">
                      {stakeholder.name}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeStakeholder(stakeholderId)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ) : null
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Stakeholders */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Available Stakeholders</h4>
          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
            {availableStakeholders
              .filter((s) => !submission.selectedStakeholders.includes(s.id))
              .map((stakeholder) => (
                <div
                  key={stakeholder.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, stakeholder.id)}
                  className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:bg-gray-50 transition-colors"
                  onClick={() => addStakeholder(stakeholder.id)}
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm">{stakeholder.name}</div>
                    <Badge variant="outline" className="mt-1">
                      {stakeholder.department}
                    </Badge>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{stakeholder.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
