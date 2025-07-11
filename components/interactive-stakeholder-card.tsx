"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, User } from "lucide-react"

interface StakeholderCardProps {
  stakeholder: {
    id: string
    name: string
    role: string
    department: string
    description: string
    expertise: string[]
    priority: "critical" | "important" | "optional"
  }
  isSelected: boolean
  showFeedback: boolean
  onToggle: (id: string, checked: boolean) => void
  disabled?: boolean
}

export function InteractiveStakeholderCard({
  stakeholder,
  isSelected,
  showFeedback,
  onToggle,
  disabled = false,
}: StakeholderCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "important":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "optional":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSelectionFeedback = () => {
    if (!showFeedback) return null

    // This would be enhanced with actual scenario-specific logic
    const isCorrectForScenario = stakeholder.priority === "critical" || stakeholder.priority === "important"

    if (isSelected && isCorrectForScenario) {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    } else if (isSelected && !isCorrectForScenario) {
      return <XCircle className="w-4 h-4 text-red-500" />
    }
    return null
  }

  return (
    <Card
      className={`transition-all duration-300 cursor-pointer hover:shadow-md ${
        isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={() => !disabled && onToggle(stakeholder.id, !isSelected)}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => !disabled && onToggle(stakeholder.id, checked as boolean)}
            disabled={disabled}
            className="mt-1"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium text-sm text-gray-900 truncate">{stakeholder.name}</h3>
                {showFeedback && getSelectionFeedback()}
              </div>
              <Badge className={`text-xs ${getPriorityColor(stakeholder.priority)}`}>{stakeholder.priority}</Badge>
            </div>

            <p className="text-sm font-medium text-gray-700 mb-1">{stakeholder.role}</p>
            <p className="text-xs text-gray-600 mb-2">{stakeholder.department}</p>
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{stakeholder.description}</p>

            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-700">Expertise:</p>
              <div className="flex flex-wrap gap-1">
                {stakeholder.expertise.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
