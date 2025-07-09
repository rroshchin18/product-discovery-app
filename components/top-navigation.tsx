"use client"

import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface TopNavigationProps {
  currentScenario: number
  totalScenarios: number
  onScenarioChange: (scenario: number) => void
}

export function TopNavigation({ currentScenario, totalScenarios, onScenarioChange }: TopNavigationProps) {
  const progressPercentage = ((currentScenario + 1) / totalScenarios) * 100

  return (
    <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-900">ProblemFit – Banking Product Challenge</h1>
        <div className="text-sm text-gray-500">Capital One Product Management Training</div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Progress:</span>
          <Progress value={progressPercentage} className="w-32" />
          <span className="text-sm text-gray-600">
            {currentScenario + 1}/{totalScenarios}
          </span>
        </div>

        <Select value={currentScenario.toString()} onValueChange={(value) => onScenarioChange(Number.parseInt(value))}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select scenario" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: totalScenarios }, (_, i) => (
              <SelectItem key={i} value={i.toString()}>
                Scenario {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Restart
        </Button>
      </div>
    </div>
  )
}
