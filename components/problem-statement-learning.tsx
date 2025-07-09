"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AnimatedProgressRing } from "@/components/animated-progress-ring"
import { useAppContext } from "@/context/app-context"
import { analyzeProblemStatement } from "@/utils/problem-analysis"
import { FileText, Lightbulb, CheckCircle, ArrowRight, HelpCircle, AlertTriangle, XCircle } from "lucide-react"

interface ProblemStatementLearningProps {
  onNext: () => void
  scenario: any
}

const businessImpactOptions = [
  { value: "regulatory-risk", label: "Regulatory Risk" },
  { value: "operational-cost", label: "Operational Cost" },
  { value: "customer-trust", label: "Customer Trust" },
  { value: "revenue", label: "Revenue Impact" },
  { value: "sla-violation", label: "SLA Violation" },
]

export function ProblemStatementLearning({ onNext, scenario }: ProblemStatementLearningProps) {
  const { submission, updateSubmission } = useAppContext()
  const [problemStatement, setProblemStatement] = useState({
    issue: "",
    affected: "",
    businessImpact: "",
  })
  const [showFeedback, setShowFeedback] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleFieldChange = (field: string, value: string) => {
    setProblemStatement((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    updateSubmission({ problemStatement })
    setShowFeedback(true)
  }

  const handleContinue = () => {
    onNext()
  }

  const isComplete = problemStatement.issue && problemStatement.affected && problemStatement.businessImpact
  const completionProgress = [
    problemStatement.issue.length > 20,
    problemStatement.affected.length > 20,
    !!problemStatement.businessImpact,
  ].filter(Boolean).length

  const analysis = showFeedback
    ? analyzeProblemStatement(problemStatement, scenario?.id || "ach-transfer-delays")
    : null

  return (
    <div className="space-y-6">
      <div className="text-center animate-in fade-in-0 duration-500">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Step 2: Define the Problem</h1>
        <p className="text-gray-600">Create a clear, actionable problem statement that guides solution development</p>
      </div>

      <Alert className="animate-in slide-in-from-left-4 duration-500 delay-200">
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Learning Tip:</strong> A good problem statement has three parts: What's happening (the issue), who it
          affects, and why it matters to the business. Be specific and focus on the root cause, not symptoms.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="animate-in slide-in-from-bottom-4 duration-500 delay-300">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Problem Statement Builder</span>
                </div>
                <AnimatedProgressRing progress={(completionProgress / 3) * 100} size={40} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="issue" className="text-sm font-medium flex items-center space-x-2">
                  <span>What's the core issue? *</span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Label>
                <Textarea
                  id="issue"
                  placeholder="Focus on the root cause, not just symptoms. What's actually broken in the process?"
                  value={problemStatement.issue}
                  onChange={(e) => handleFieldChange("issue", e.target.value)}
                  onFocus={() => setFocusedField("issue")}
                  onBlur={() => setFocusedField(null)}
                  className={`mt-1 transition-all duration-300 ${
                    focusedField === "issue" ? "ring-2 ring-blue-500 border-blue-500" : ""
                  } ${problemStatement.issue.length > 20 ? "border-green-500" : ""}`}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div
                    className={`text-xs transition-colors duration-300 ${
                      problemStatement.issue.length > 30 ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {problemStatement.issue.length > 30
                      ? "✓ Good detail level"
                      : `${problemStatement.issue.length}/30+ characters`}
                  </div>
                  {problemStatement.issue.length > 30 && (
                    <CheckCircle className="w-4 h-4 text-green-500 animate-in scale-in-0 duration-300" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="affected" className="text-sm font-medium flex items-center space-x-2">
                  <span>Who is affected? *</span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Label>
                <Textarea
                  id="affected"
                  placeholder="Think about both external (customers) and internal (teams, processes) impacts"
                  value={problemStatement.affected}
                  onChange={(e) => handleFieldChange("affected", e.target.value)}
                  onFocus={() => setFocusedField("affected")}
                  onBlur={() => setFocusedField(null)}
                  className={`mt-1 transition-all duration-300 ${
                    focusedField === "affected" ? "ring-2 ring-blue-500 border-blue-500" : ""
                  } ${problemStatement.affected.length > 20 ? "border-green-500" : ""}`}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div
                    className={`text-xs transition-colors duration-300 ${
                      problemStatement.affected.length > 20 ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {problemStatement.affected.length > 20
                      ? "✓ Good detail level"
                      : `${problemStatement.affected.length}/20+ characters`}
                  </div>
                  {problemStatement.affected.length > 20 && (
                    <CheckCircle className="w-4 h-4 text-green-500 animate-in scale-in-0 duration-300" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-impact" className="text-sm font-medium flex items-center space-x-2">
                  <span>Primary business impact? *</span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Label>
                <Select
                  value={problemStatement.businessImpact}
                  onValueChange={(value) => handleFieldChange("businessImpact", value)}
                >
                  <SelectTrigger
                    className={`mt-1 transition-all duration-300 ${
                      problemStatement.businessImpact ? "border-green-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="What's the biggest risk to the business?" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessImpactOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex justify-between items-center">
                  <div
                    className={`text-xs transition-colors duration-300 ${
                      problemStatement.businessImpact ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {problemStatement.businessImpact ? "✓ Impact selected" : "Select primary impact"}
                  </div>
                  {problemStatement.businessImpact && (
                    <CheckCircle className="w-4 h-4 text-green-500 animate-in scale-in-0 duration-300" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="animate-in slide-in-from-bottom-4 duration-500 delay-400">
            <CardHeader>
              <CardTitle>Problem Statement Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                  <h4 className="font-medium text-blue-900 mb-2">What makes a good problem statement?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Specific and measurable</li>
                    <li>• Focuses on root cause, not symptoms</li>
                    <li>• Clearly identifies who is impacted</li>
                    <li>• Connects to business value</li>
                    <li>• Actionable for the team</li>
                  </ul>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors duration-200">
                  <h4 className="font-medium text-yellow-900 mb-2">Common mistakes to avoid:</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Being too vague ("customers are unhappy")</li>
                    <li>• Jumping to solutions ("we need a new system")</li>
                    <li>• Focusing only on symptoms</li>
                    <li>• Missing the business impact</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {isComplete && (
            <Card className="border-green-200 bg-green-50 animate-in slide-in-from-right-4 duration-500">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Your Problem Statement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="animate-in fade-in-0 duration-300 delay-100">
                    <strong className="text-green-800">Issue:</strong>
                    <p className="text-green-700 mt-1">{problemStatement.issue}</p>
                  </div>
                  <div className="animate-in fade-in-0 duration-300 delay-200">
                    <strong className="text-green-800">Affected:</strong>
                    <p className="text-green-700 mt-1">{problemStatement.affected}</p>
                  </div>
                  <div className="animate-in fade-in-0 duration-300 delay-300">
                    <strong className="text-green-800">Business Impact:</strong>
                    <p className="text-green-700 mt-1">
                      {businessImpactOptions.find((opt) => opt.value === problemStatement.businessImpact)?.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {showFeedback && analysis && (
        <Card className="animate-in slide-in-from-bottom-4 duration-500 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-900">
              {analysis.score >= 80 ? (
                <CheckCircle className="w-5 h-5" />
              ) : analysis.score >= 60 ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span>Problem Statement Analysis</span>
              <Badge variant="secondary">{analysis.score}%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{analysis.issueQuality}%</div>
                <div className="text-sm text-green-700">Issue Quality</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{analysis.affectedQuality}%</div>
                <div className="text-sm text-blue-700">Stakeholder Analysis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{analysis.impactQuality}%</div>
                <div className="text-sm text-purple-700">Impact Alignment</div>
              </div>
            </div>

            {analysis.insights.length > 0 && (
              <div className="space-y-2">
                {analysis.insights.map((insight, index) => (
                  <div key={index} className="text-sm text-blue-800 bg-blue-100 p-2 rounded">
                    {insight}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 text-sm text-blue-800 bg-blue-100 p-2 rounded">
              <strong>Analysis:</strong> {analysis.reasoning}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center space-x-4 animate-in fade-in-0 duration-500 delay-600">
        {!showFeedback ? (
          <Button
            onClick={handleSubmit}
            disabled={!isComplete}
            size="lg"
            className="hover:scale-105 transition-transform duration-200"
          >
            Analyze My Problem Statement
          </Button>
        ) : (
          <Button onClick={handleContinue} size="lg" className="hover:scale-105 transition-transform duration-200">
            Continue to Impact Estimation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
