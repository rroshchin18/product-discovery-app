"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InteractiveStakeholderCard } from "@/components/interactive-stakeholder-card"
import { useAppContext } from "@/context/app-context"
import { analyzeStakeholderSelection } from "@/utils/stakeholder-analysis"
import { Users, Lightbulb, ArrowRight, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface StakeholderLearningProps {
  onNext: () => void
  scenario: any
}

const stakeholderOptions = [
  {
    id: "fraud-ops",
    name: "Fraud Operations Manager",
    department: "Risk",
    description: "Manages fraud detection processes and dispute investigations",
    isCorrect: true,
    reasoning: "Essential for understanding current dispute resolution workflow and bottlenecks",
    priority: "critical",
  },
  {
    id: "aml-compliance",
    name: "AML Compliance Officer",
    department: "Compliance",
    description: "Ensures anti-money laundering compliance",
    isCorrect: true,
    reasoning: "Critical for ensuring any solution meets regulatory requirements",
    priority: "critical",
  },
  {
    id: "cx-lead",
    name: "Customer Experience Lead",
    department: "CX",
    description: "Focuses on customer journey and satisfaction",
    isCorrect: true,
    reasoning: "Needed to understand customer impact and design better communication",
    priority: "important",
  },
  {
    id: "platform-pm",
    name: "Platform Product Manager",
    department: "Product",
    description: "Manages core platform features",
    isCorrect: true,
    reasoning: "Required for any system changes or process improvements",
    priority: "important",
  },
  {
    id: "ops-manager",
    name: "Operations Manager",
    department: "Operations",
    description: "Manages day-to-day operational processes",
    isCorrect: true,
    reasoning: "Key for implementing operational process changes",
    priority: "important",
  },
  {
    id: "tech-lead",
    name: "Technical Lead",
    department: "Engineering",
    description: "Leads technical implementation",
    isCorrect: false,
    reasoning: "May be needed later, but not essential for initial problem analysis",
    priority: "optional",
  },
  {
    id: "legal-counsel",
    name: "Legal Counsel",
    department: "Legal",
    description: "Provides legal guidance",
    isCorrect: false,
    reasoning: "Important for regulatory issues, but compliance officer covers immediate needs",
    priority: "optional",
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    department: "Analytics",
    description: "Analyzes performance metrics",
    isCorrect: false,
    reasoning: "Helpful for analysis, but not critical for initial stakeholder alignment",
    priority: "optional",
  },
]

export function StakeholderLearning({ onNext, scenario }: StakeholderLearningProps) {
  const { submission, updateSubmission } = useAppContext()
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedStakeholders, setSelectedStakeholders] = useState<string[]>([])

  const handleStakeholderToggle = (stakeholderId: string, checked: boolean) => {
    let newSelection
    if (checked) {
      newSelection = [...selectedStakeholders, stakeholderId]
    } else {
      newSelection = selectedStakeholders.filter((id) => id !== stakeholderId)
    }
    setSelectedStakeholders(newSelection)
  }

  const handleSubmit = () => {
    updateSubmission({ selectedStakeholders })
    setShowFeedback(true)
  }

  const handleContinue = () => {
    onNext()
  }

  const analysis = showFeedback
    ? analyzeStakeholderSelection(selectedStakeholders, scenario?.id || "ach-transfer-delays")
    : null

  return (
    <div className="space-y-6">
      <div className="text-center animate-in fade-in-0 duration-500">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Identify Key Stakeholders</h1>
        <p className="text-gray-600">Who should be involved in solving this product challenge?</p>
      </div>

      <Alert className="animate-in slide-in-from-left-4 duration-500 delay-200">
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Learning Tip:</strong> Think about who owns the current process, who can implement changes, and who
          ensures regulatory compliance. Start with critical stakeholders, then add important ones.
        </AlertDescription>
      </Alert>

      <Card className="animate-in slide-in-from-bottom-4 duration-500 delay-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Available Team Members</span>
            {selectedStakeholders.length > 0 && (
              <Badge variant="secondary" className="animate-in scale-in-0 duration-300">
                {selectedStakeholders.length} selected
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Select the stakeholders you think should be involved. Consider who needs to be part of understanding the
            problem and implementing a solution.
          </p>

          <div className="space-y-3">
            {stakeholderOptions.map((stakeholder, index) => (
              <div
                key={stakeholder.id}
                className="animate-in slide-in-from-left-4 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <InteractiveStakeholderCard
                  stakeholder={stakeholder}
                  isSelected={selectedStakeholders.includes(stakeholder.id)}
                  showFeedback={showFeedback}
                  onToggle={handleStakeholderToggle}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showFeedback && analysis && (
        <Card className="animate-in slide-in-from-bottom-4 duration-500 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2 text-blue-900">
              {analysis.score >= 80 ? (
                <CheckCircle className="w-5 h-5" />
              ) : analysis.score >= 60 ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span>Stakeholder Analysis</span>
              <Badge variant="secondary">{analysis.score}%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {analysis.missing.length === 0 ? "✓" : analysis.missing.length}
                </div>
                <div className="text-sm text-green-700">Critical Gaps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{analysis.teamComposition}</div>
                <div className="text-sm text-blue-700">Team Quality</div>
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

      <div className="flex justify-center space-x-4 animate-in fade-in-0 duration-500 delay-500">
        {!showFeedback ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedStakeholders.length === 0}
            size="lg"
            className="hover:scale-105 transition-transform duration-200"
          >
            Analyze My Selection
          </Button>
        ) : (
          <Button onClick={handleContinue} size="lg" className="hover:scale-105 transition-transform duration-200">
            Continue to Problem Definition
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
