"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

interface StakeholderCardProps {
  stakeholder: {
    id: string
    name: string
    department: string
    description: string
    isCorrect: boolean
    reasoning: string
    priority: string
  }
  isSelected: boolean
  showFeedback: boolean
  onToggle: (id: string, checked: boolean) => void
}

export function InteractiveStakeholderCard({ stakeholder, isSelected, showFeedback, onToggle }: StakeholderCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "important":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card
      className={`transition-all duration-300 cursor-pointer hover:shadow-md ${
        isSelected ? "ring-2 ring-blue-500 bg-blue-50 border-blue-200" : "hover:bg-gray-50 border-gray-200"
      } ${isHovered ? "scale-[1.02]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onToggle(stakeholder.id, !isSelected)}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id={stakeholder.id}
            checked={isSelected}
            onCheckedChange={(checked) => onToggle(stakeholder.id, checked as boolean)}
            className="mt-1"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-sm text-gray-900 leading-tight">{stakeholder.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{stakeholder.department}</p>
              </div>
              <Badge
                variant="outline"
                className={`text-xs ${getPriorityColor(stakeholder.priority)} animate-in fade-in-0 duration-300`}
              >
                {stakeholder.priority}
              </Badge>
            </div>

            <p className="text-xs text-gray-700 mb-3 leading-relaxed">{stakeholder.description}</p>

            {showFeedback && (
              <div className="animate-in slide-in-from-top-2 duration-500 delay-200">
                <div
                  className={`flex items-start space-x-2 p-2 rounded-lg ${
                    stakeholder.isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  {stakeholder.isCorrect ? (
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 animate-in scale-in-0 duration-300" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 mt-0.5 animate-in scale-in-0 duration-300" />
                  )}
                  <p className={`text-xs leading-relaxed ${stakeholder.isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {stakeholder.reasoning}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
