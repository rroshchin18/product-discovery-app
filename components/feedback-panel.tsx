"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAppContext } from "@/context/app-context"
import { CheckCircle, XCircle, AlertCircle, RotateCcw, ArrowRight } from "lucide-react"

interface FeedbackPanelProps {
  scenario: any
  showFeedback: boolean
  onTryAgain: () => void
  onNextScenario: () => void
}

export function FeedbackPanel({ scenario, showFeedback, onTryAgain, onNextScenario }: FeedbackPanelProps) {
  const { submission } = useAppContext()

  if (!showFeedback) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowRight className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Complete Your Analysis</h3>
          <p className="text-sm text-gray-600">
            Finish all three tasks and submit to receive detailed feedback on your approach.
          </p>
        </div>
      </div>
    )
  }

  // Mock scoring logic - in real app this would be more sophisticated
  const stakeholderScore = calculateStakeholderScore(submission.selectedStakeholders, scenario.correctStakeholders)
  const problemScore = calculateProblemScore(submission.problemStatement)
  const benefitScore = calculateBenefitScore(submission.selectedBenefits, scenario.correctBenefits)

  const overallScore = Math.round((stakeholderScore + problemScore + benefitScore) / 3)

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Analysis Feedback</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Overall Score:</span>
          <Progress value={overallScore} className="w-32" />
          <span className="text-sm font-medium">{overallScore}%</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Stakeholder Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {stakeholderScore >= 80 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : stakeholderScore >= 60 ? (
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span>Stakeholder Selection</span>
              <Badge
                variant={stakeholderScore >= 80 ? "default" : stakeholderScore >= 60 ? "secondary" : "destructive"}
              >
                {stakeholderScore}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-2">Your Selection:</h4>
                <div className="flex flex-wrap gap-1">
                  {submission.selectedStakeholders.map((id) => (
                    <Badge key={id} variant="outline" className="text-xs">
                      {id.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Feedback:</h4>
                <p className="text-sm text-gray-600">
                  {getStakeholderFeedback(submission.selectedStakeholders, scenario.correctStakeholders)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problem Statement Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {problemScore >= 80 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : problemScore >= 60 ? (
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span>Problem Statement</span>
              <Badge variant={problemScore >= 80 ? "default" : problemScore >= 60 ? "secondary" : "destructive"}>
                {problemScore}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-2">Feedback:</h4>
                <p className="text-sm text-gray-600">{getProblemStatementFeedback(submission.problemStatement)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefit Estimation Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {benefitScore >= 80 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : benefitScore >= 60 ? (
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span>Benefit Estimation</span>
              <Badge variant={benefitScore >= 80 ? "default" : benefitScore >= 60 ? "secondary" : "destructive"}>
                {benefitScore}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-2">Your Selection:</h4>
                <div className="flex flex-wrap gap-1">
                  {submission.selectedBenefits.map((id) => (
                    <Badge key={id} variant="outline" className="text-xs">
                      {id.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Feedback:</h4>
                <p className="text-sm text-gray-600">
                  {getBenefitFeedback(submission.selectedBenefits, scenario.correctBenefits)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button variant="outline" onClick={onTryAgain} className="flex-1 bg-transparent">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button onClick={onNextScenario} className="flex-1">
            Next Scenario
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="text-center pt-4">
          <div className="text-sm text-gray-600">Scenario 1 of 5 complete</div>
          <Progress value={20} className="w-full mt-2" />
        </div>
      </div>
    </div>
  )
}

// Helper functions for scoring and feedback
function calculateStakeholderScore(selected: string[], correct: string[]): number {
  const correctSelected = selected.filter((s) => correct.includes(s)).length
  const incorrectSelected = selected.filter((s) => !correct.includes(s)).length
  const missedCorrect = correct.filter((s) => !selected.includes(s)).length

  const score = Math.max(0, correctSelected * 20 - incorrectSelected * 10 - missedCorrect * 5)
  return Math.min(100, score)
}

function calculateProblemScore(problemStatement: any): number {
  let score = 0
  if (problemStatement.issue && problemStatement.issue.length > 20) score += 40
  if (problemStatement.affected && problemStatement.affected.length > 20) score += 30
  if (problemStatement.businessImpact) score += 30
  return score
}

function calculateBenefitScore(selected: string[], correct: string[]): number {
  const correctSelected = selected.filter((s) => correct.includes(s)).length
  const incorrectSelected = selected.filter((s) => !correct.includes(s)).length

  const score = Math.max(0, correctSelected * 25 - incorrectSelected * 10)
  return Math.min(100, score)
}

function getStakeholderFeedback(selected: string[], correct: string[]): string {
  const correctSelected = selected.filter((s) => correct.includes(s))
  const missed = correct.filter((s) => !selected.includes(s))

  if (correctSelected.length === correct.length) {
    return "Excellent stakeholder selection! You identified all the key players needed for this banking product challenge."
  } else if (correctSelected.length >= correct.length * 0.7) {
    return `Good selection overall. You might also consider including: ${missed.join(", ")}.`
  } else {
    return `Consider including these critical stakeholders: ${missed.join(", ")}. They play essential roles in banking product decisions.`
  }
}

function getProblemStatementFeedback(problemStatement: any): string {
  if (problemStatement.issue.length > 50 && problemStatement.affected.length > 30) {
    return "Well-structured problem statement! You clearly articulated the issue, affected parties, and business impact."
  } else {
    return "Your problem statement could be more detailed. Consider expanding on the specific impacts and affected stakeholders."
  }
}

function getBenefitFeedback(selected: string[], correct: string[]): string {
  const correctSelected = selected.filter((s) => correct.includes(s))

  if (correctSelected.length >= correct.length * 0.8) {
    return "Strong benefit identification! You correctly identified the primary business value drivers for this scenario."
  } else {
    return "Consider focusing on the most impactful benefits for this specific banking scenario, particularly around risk mitigation and operational efficiency."
  }
}
