"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StakeholderSelection } from "@/components/stakeholder-selection"
import { ProblemStatementBuilder } from "@/components/problem-statement-builder"
import { BenefitEstimation } from "@/components/benefit-estimation"
import { useAppContext } from "@/context/app-context"
import { CheckCircle, Send } from "lucide-react"

interface TaskWorkspaceProps {
  scenario: any
  onSubmit: () => void
  showFeedback: boolean
}

export function TaskWorkspace({ scenario, onSubmit, showFeedback }: TaskWorkspaceProps) {
  const { submission, resetSubmission } = useAppContext()
  const [activeTask, setActiveTask] = useState(1)

  const isTask1Complete = submission.selectedStakeholders.length > 0
  const isTask2Complete =
    submission.problemStatement.issue &&
    submission.problemStatement.affected &&
    submission.problemStatement.businessImpact
  const isTask3Complete = submission.selectedBenefits.length > 0

  const canSubmit = isTask1Complete && isTask2Complete && isTask3Complete

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit()
    }
  }

  const handleReset = () => {
    resetSubmission()
    setActiveTask(1)
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Interactive Tasks</h2>
        <p className="text-sm text-gray-600">Complete all three tasks to receive feedback on your approach.</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Task Progress Indicators */}
        <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-4 mb-4 sm:mb-6 overflow-x-auto pb-2">
          {[1, 2, 3].map((taskNum) => (
            <div key={taskNum} className="flex items-center flex-shrink-0">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  taskNum === 1 && isTask1Complete
                    ? "bg-green-100 text-green-700"
                    : taskNum === 2 && isTask2Complete
                      ? "bg-green-100 text-green-700"
                      : taskNum === 3 && isTask3Complete
                        ? "bg-green-100 text-green-700"
                        : taskNum === activeTask
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-500"
                }`}
              >
                {(taskNum === 1 && isTask1Complete) ||
                (taskNum === 2 && isTask2Complete) ||
                (taskNum === 3 && isTask3Complete) ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  taskNum
                )}
              </div>
              <span className="ml-2 text-xs sm:text-sm text-gray-600 whitespace-nowrap">Task {taskNum}</span>
              {taskNum < 3 && <div className="w-4 sm:w-8 h-px bg-gray-300 ml-2 sm:ml-4" />}
            </div>
          ))}
        </div>

        {/* Task 1: Stakeholder Selection */}
        <Card className={`${activeTask === 1 ? "ring-2 ring-blue-500" : ""} transition-all duration-200`}>
          <CardHeader
            className="cursor-pointer touch-manipulation active:bg-gray-50 transition-colors"
            onClick={() => setActiveTask(1)}
          >
            <CardTitle className="flex items-center justify-between text-base sm:text-lg">
              <span>Task 1: Stakeholder Selection</span>
              {isTask1Complete && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
            </CardTitle>
          </CardHeader>
          {activeTask === 1 && (
            <CardContent className="px-3 sm:px-6">
              <StakeholderSelection scenario={scenario} />
            </CardContent>
          )}
        </Card>

        {/* Task 2: Problem Statement Builder */}
        <Card className={`${activeTask === 2 ? "ring-2 ring-blue-500" : ""} transition-all duration-200`}>
          <CardHeader
            className="cursor-pointer touch-manipulation active:bg-gray-50 transition-colors"
            onClick={() => setActiveTask(2)}
          >
            <CardTitle className="flex items-center justify-between text-base sm:text-lg">
              <span>Task 2: Problem Statement Builder</span>
              {isTask2Complete && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
            </CardTitle>
          </CardHeader>
          {activeTask === 2 && (
            <CardContent className="px-3 sm:px-6">
              <ProblemStatementBuilder />
            </CardContent>
          )}
        </Card>

        {/* Task 3: Benefit Estimation */}
        <Card className={`${activeTask === 3 ? "ring-2 ring-blue-500" : ""} transition-all duration-200`}>
          <CardHeader
            className="cursor-pointer touch-manipulation active:bg-gray-50 transition-colors"
            onClick={() => setActiveTask(3)}
          >
            <CardTitle className="flex items-center justify-between text-base sm:text-lg">
              <span>Task 3: Benefit Estimation</span>
              {isTask3Complete && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
            </CardTitle>
          </CardHeader>
          {activeTask === 3 && (
            <CardContent className="px-3 sm:px-6">
              <BenefitEstimation />
            </CardContent>
          )}
        </Card>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || showFeedback}
            className="flex-1 h-12 sm:h-10 text-base sm:text-sm touch-manipulation"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Analysis
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="h-12 sm:h-10 text-base sm:text-sm touch-manipulation bg-transparent"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
