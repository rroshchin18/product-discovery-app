"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useAppContext } from "@/context/app-context"
import { analyzeBenefitSelection } from "@/utils/benefit-analysis"
import { TrendingUp, Lightbulb, CheckCircle, XCircle, ArrowRight, AlertTriangle } from "lucide-react"

interface BenefitEstimationLearningProps {
  onNext: () => void
  scenario: any
}

const benefitOptions = [
  {
    id: "reduce-chargebacks",
    label: "Reduce chargebacks",
    description: "Decrease fraudulent transaction disputes and associated costs",
  },
  {
    id: "mitigate-regulatory-risk",
    label: "Mitigate regulatory risk",
    description: "Reduce exposure to regulatory penalties and compliance issues",
  },
  {
    id: "improve-operational-throughput",
    label: "Improve operational throughput",
    description: "Increase efficiency of internal processes and workflows",
  },
  {
    id: "increase-customer-trust",
    label: "Increase customer trust",
    description: "Enhance customer satisfaction and loyalty through better experience",
  },
  {
    id: "accelerate-revenue-recognition",
    label: "Accelerate revenue recognition",
    description: "Speed up revenue realization and improve cash flow",
  },
  {
    id: "reduce-operational-costs",
    label: "Reduce operational costs",
    description: "Lower costs through process automation and efficiency",
  },
]

export function BenefitEstimationLearning({ onNext, scenario }: BenefitEstimationLearningProps) {
  const { submission, updateSubmission } = useAppContext()
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)

  const handleBenefitToggle = (benefitId: string, checked: boolean) => {
    let newSelection
    if (checked) {
      newSelection = [...selectedBenefits, benefitId]
    } else {
      newSelection = selectedBenefits.filter((id) => id !== benefitId)
    }
    setSelectedBenefits(newSelection)
  }

  const handleSubmit = () => {
    updateSubmission({ selectedBenefits })
    setShowFeedback(true)
  }

  const handleContinue = () => {
    onNext()
  }

  const analysis = showFeedback
    ? analyzeBenefitSelection(selectedBenefits, scenario?.id || "ach-transfer-delays")
    : null

  return (
    <div className="space-y-6">
      <div className="text-center animate-in fade-in-0 duration-500">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Step 3: Estimate Business Impact</h1>
        <p className="text-gray-600">Identify the key benefits that solving this problem would deliver</p>
      </div>

      <Alert className="animate-in slide-in-from-left-4 duration-500 delay-200">
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Learning Tip:</strong> Focus on benefits that directly address the problem you defined. In financial
          services, regulatory compliance often takes priority, followed by operational efficiency and customer
          experience.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Card className="animate-in slide-in-from-bottom-4 duration-500 delay-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Potential Benefits</span>
                {selectedBenefits.length > 0 && (
                  <Badge variant="secondary" className="animate-in scale-in-0 duration-300">
                    {selectedBenefits.length} selected
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Select the benefits that would result from solving this product challenge. Think about what matters most
                given the problem you identified.
              </p>

              <div className="space-y-3">
                {benefitOptions.map((benefit, index) => {
                  const isSelected = selectedBenefits.includes(benefit.id)

                  return (
                    <div
                      key={benefit.id}
                      className={`p-4 border rounded-lg transition-all duration-300 cursor-pointer hover:shadow-sm ${
                        isSelected ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => handleBenefitToggle(benefit.id, !isSelected)}
                    >
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={benefit.id}
                          checked={isSelected}
                          onCheckedChange={(checked) => handleBenefitToggle(benefit.id, checked as boolean)}
                          className="mt-1"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-1">
                          <label htmlFor={benefit.id} className="font-medium text-sm cursor-pointer block mb-1">
                            {benefit.label}
                          </label>
                          <p className="text-xs text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="animate-in slide-in-from-bottom-4 duration-500 delay-400">
            <CardHeader>
              <CardTitle>Benefit Prioritization Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors duration-200">
                  <h4 className="font-medium text-red-900 mb-2">🚨 Tier 1: Regulatory & Compliance</h4>
                  <p className="text-sm text-red-800">
                    Benefits that address compliance, regulatory risk, or legal requirements. These typically take
                    highest priority due to potential penalties.
                  </p>
                </div>

                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors duration-200">
                  <h4 className="font-medium text-orange-900 mb-2">⚡ Tier 2: Operational Efficiency</h4>
                  <p className="text-sm text-orange-800">
                    Benefits that improve internal processes, reduce manual work, or increase capacity. Important for
                    scalability and cost management.
                  </p>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                  <h4 className="font-medium text-blue-900 mb-2">💙 Tier 3: Customer Experience</h4>
                  <p className="text-sm text-blue-800">
                    Benefits that improve customer satisfaction, trust, or loyalty. Critical for long-term success and
                    competitive advantage.
                  </p>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors duration-200">
                  <h4 className="font-medium text-green-900 mb-2">💰 Tier 4: Financial Impact</h4>
                  <p className="text-sm text-green-800">
                    Direct revenue or cost benefits. Important but often secondary to regulatory and operational
                    concerns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedBenefits.length > 0 && (
            <Card className="mt-4 border-green-200 bg-green-50 animate-in slide-in-from-right-4 duration-500">
              <CardHeader>
                <CardTitle className="text-green-900">Your Selected Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedBenefits.map((benefitId) => {
                    const benefit = benefitOptions.find((b) => b.id === benefitId)
                    return benefit ? (
                      <div key={benefitId} className="flex items-center justify-between">
                        <span className="text-sm text-green-800">{benefit.label}</span>
                      </div>
                    ) : null
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

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
              <span>Benefit Analysis</span>
              <Badge variant="secondary">{analysis.score}%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{analysis.selectedCorrect.length}</div>
                <div className="text-sm text-green-700">Correct Benefits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{analysis.strategicAlignment}%</div>
                <div className="text-sm text-blue-700">Strategic Alignment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{analysis.selectedIncorrect.length}</div>
                <div className="text-sm text-red-700">Reconsider</div>
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
            disabled={selectedBenefits.length === 0}
            size="lg"
            className="hover:scale-105 transition-transform duration-200"
          >
            Analyze My Benefit Selection
          </Button>
        ) : (
          <Button onClick={handleContinue} size="lg" className="hover:scale-105 transition-transform duration-200">
            Complete Learning Experience
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
