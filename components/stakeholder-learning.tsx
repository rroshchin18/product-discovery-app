"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InteractiveStakeholderCard } from "@/components/interactive-stakeholder-card"
import { AnimatedProgressRing } from "@/components/animated-progress-ring"
import { useAppContext } from "@/context/app-context"
import { analyzeStakeholderSelection } from "@/utils/stakeholder-analysis"
import { CheckCircle, Users, Target, TrendingUp, Lightbulb, ArrowRight, AlertTriangle, XCircle } from "lucide-react"

interface StakeholderLearningProps {
  scenario: any
  onNext: () => void
}

const availableStakeholders = [
  {
    id: "fraud-ops",
    name: "Jennifer Martinez",
    role: "Fraud Operations Manager",
    department: "Risk",
    description: "Manages fraud detection and prevention processes, dispute resolution workflows",
    expertise: ["Dispute Resolution", "Fraud Detection", "Process Optimization"],
    priority: "critical",
  },
  {
    id: "aml-compliance",
    name: "Lisa Thompson",
    role: "AML Compliance Officer",
    department: "Compliance",
    description: "Ensures anti-money laundering compliance and regulatory reporting",
    expertise: ["Regulatory Compliance", "Risk Assessment", "AML Reporting"],
    priority: "critical",
  },
  {
    id: "cx-lead",
    name: "David Chen",
    role: "Customer Experience Lead",
    department: "CX",
    description: "Focuses on customer journey optimization and satisfaction metrics",
    expertise: ["Customer Journey", "Satisfaction Metrics", "Communication Strategy"],
    priority: "important",
  },
  {
    id: "platform-pm",
    name: "Michael Rodriguez",
    role: "Platform Product Manager",
    department: "Product",
    description: "Manages core banking platform features and integrations",
    expertise: ["System Integration", "Product Strategy", "Technical Requirements"],
    priority: "important",
  },
  {
    id: "ops-manager",
    name: "Amanda Foster",
    role: "Operations Manager",
    department: "Operations",
    description: "Manages day-to-day operational processes and capacity planning",
    expertise: ["Process Management", "Capacity Planning", "Workflow Optimization"],
    priority: "important",
  },
  {
    id: "tech-lead",
    name: "Robert Kim",
    role: "Technical Lead",
    department: "Engineering",
    description: "Leads technical implementation and system architecture decisions",
    expertise: ["System Architecture", "Technical Implementation", "Security"],
    priority: "optional",
  },
  {
    id: "legal-counsel",
    name: "Rachel Green",
    role: "Legal Counsel",
    department: "Legal",
    description: "Provides legal guidance on regulatory matters and compliance issues",
    expertise: ["Legal Compliance", "Regulatory Interpretation", "Risk Mitigation"],
    priority: "optional",
  },
  {
    id: "credit-risk",
    name: "Patricia Wong",
    role: "Credit Risk Manager",
    department: "Risk",
    description: "Assesses and manages credit risk exposure across products",
    expertise: ["Credit Assessment", "Risk Modeling", "Portfolio Management"],
    priority: "optional",
  },
]

export function StakeholderLearning({ scenario, onNext }: StakeholderLearningProps) {
  const { submission, updateSubmission } = useAppContext()
  const [selectedStakeholders, setSelectedStakeholders] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleStakeholderToggle = (stakeholderId: string, checked: boolean) => {
    if (checked && selectedStakeholders.length < 6) {
      setSelectedStakeholders([...selectedStakeholders, stakeholderId])
    } else if (!checked) {
      setSelectedStakeholders(selectedStakeholders.filter((id) => id !== stakeholderId))
    }
  }

  const handleSubmit = () => {
    const result = analyzeStakeholderSelection(selectedStakeholders, scenario?.id || "ach-transfer-delays")
    setAnalysis(result)
    updateSubmission({ selectedStakeholders })
    setShowFeedback(true)
  }

  const handleContinue = () => {
    onNext()
  }

  const canSubmit = selectedStakeholders.length >= 3

  return (
    <div className="space-y-6">
      <div className="text-center animate-in fade-in-0 duration-500">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Identify Key Stakeholders</h1>
        <p className="text-gray-600">
          Select 3-6 stakeholders who should be involved in addressing this challenge. Consider who owns the problem,
          who can solve it, and who will be impacted.
        </p>
      </div>

      <Alert className="animate-in slide-in-from-left-4 duration-500 delay-200">
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Learning Tip:</strong> In banking, start with compliance and risk stakeholders for regulatory issues,
          operations for process problems, and customer experience for user-facing challenges. Avoid including too many
          people initially.
        </AlertDescription>
      </Alert>

      {/* Selection Summary */}
      <Card className="bg-blue-50 border-blue-200 animate-in slide-in-from-top-4 duration-500 delay-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Selected: {selectedStakeholders.length}/6 stakeholders</span>
            </div>
            <Badge variant={canSubmit ? "default" : "secondary"}>
              {canSubmit ? "Ready to Submit" : "Select at least 3"}
            </Badge>
          </div>
          {selectedStakeholders.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {selectedStakeholders.map((id) => {
                const stakeholder = availableStakeholders.find((s) => s.id === id)
                return stakeholder ? (
                  <Badge key={id} variant="outline" className="text-xs">
                    {stakeholder.name}
                  </Badge>
                ) : null
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stakeholder Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableStakeholders.map((stakeholder, index) => (
          <div
            key={stakeholder.id}
            className="animate-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100 + 400}ms` }}
          >
            <InteractiveStakeholderCard
              stakeholder={stakeholder}
              isSelected={selectedStakeholders.includes(stakeholder.id)}
              showFeedback={showFeedback}
              onToggle={handleStakeholderToggle}
              disabled={!selectedStakeholders.includes(stakeholder.id) && selectedStakeholders.length >= 6}
            />
          </div>
        ))}
      </div>

      {/* Feedback Section */}
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
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <AnimatedProgressRing progress={analysis.score} size={60} strokeWidth={6} />
                <p className="text-sm font-medium text-gray-900 mt-2">Overall Score</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    Critical Coverage: {analysis.criticalMissed?.length === 0 ? "Complete" : "Partial"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Quality: {analysis.overallQuality}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">Key Insights:</p>
                <ul className="text-xs text-gray-700 space-y-0.5">
                  {analysis.insights?.slice(0, 2).map((insight: string, index: number) => (
                    <li key={index}>• {insight}</li>
                  ))}
                </ul>
              </div>
            </div>

            {analysis.strengths && analysis.strengths.length > 0 && (
              <div className="border-t border-blue-200 pt-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Strengths:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {analysis.strengths.map((strength: string, index: number) => (
                        <li key={index}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div className="border-t border-blue-200 pt-3">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Recommendations:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {analysis.recommendations.map((rec: string, index: number) => (
                        <li key={index}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 animate-in fade-in-0 duration-500 delay-600">
        {!showFeedback ? (
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
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
