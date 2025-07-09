"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAppContext } from "@/context/app-context"
import { CheckCircle, Trophy, BookOpen, ArrowRight, RotateCcw } from "lucide-react"

interface LearningCompleteProps {
  onNext?: () => void
}

export function LearningComplete({ onNext }: LearningCompleteProps) {
  const { submission, resetSubmission } = useAppContext()

  const handleRestart = () => {
    resetSubmission()
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Learning Experience Complete!</h1>
        <p className="text-gray-600">You've successfully analyzed a banking product challenge</p>
      </div>

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-900">
            <CheckCircle className="w-5 h-5" />
            <span>What You Accomplished</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Identified Key Stakeholders</div>
                <div className="text-sm text-green-700">
                  Selected {submission.selectedStakeholders.length} stakeholders for the working group
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Defined the Problem</div>
                <div className="text-sm text-green-700">
                  Created a structured problem statement focusing on regulatory risk
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <div className="font-medium">Estimated Business Impact</div>
                <div className="text-sm text-green-700">
                  Identified {submission.selectedBenefits.length} key benefits aligned with the problem
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span>Key Takeaways</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                <strong>Stakeholder Selection:</strong> In banking product challenges, always include compliance,
                operations, customer experience, and platform teams. They represent the key perspectives needed for both
                understanding problems and implementing solutions.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertDescription>
                <strong>Problem Definition:</strong> Focus on root causes, not symptoms. A good problem statement
                clearly identifies what's broken, who's affected, and why it matters to the business. In banking,
                regulatory risk often takes priority.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertDescription>
                <strong>Benefit Prioritization:</strong> Banking benefits typically follow this hierarchy: Regulatory
                compliance → Operational efficiency → Customer experience → Financial impact. Always address compliance
                risks first.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Selected Stakeholders:</h4>
              <div className="flex flex-wrap gap-2">
                {submission.selectedStakeholders.map((id) => (
                  <Badge key={id} variant="outline">
                    {id.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Problem Statement:</h4>
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p>
                  <strong>Issue:</strong> {submission.problemStatement.issue || "Not completed"}
                </p>
                <p className="mt-1">
                  <strong>Affected:</strong> {submission.problemStatement.affected || "Not completed"}
                </p>
                <p className="mt-1">
                  <strong>Business Impact:</strong> {submission.problemStatement.businessImpact || "Not selected"}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Identified Benefits:</h4>
              <div className="flex flex-wrap gap-2">
                {submission.selectedBenefits.map((id) => (
                  <Badge key={id} variant="secondary">
                    {id.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={handleRestart}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Another Scenario
        </Button>
        <Button>
          <BookOpen className="w-4 h-4 mr-2" />
          Continue Learning
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Ready to practice with more banking scenarios?</p>
        <p>Continue your Capital One Product Management learning journey.</p>
      </div>
    </div>
  )
}
