"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useAppContext } from "@/context/app-context"
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, Shield } from "lucide-react"

const benefitCategories = [
  {
    id: "cost-reduction",
    title: "Cost Reduction",
    icon: TrendingDown,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    benefits: [
      {
        id: "operational-efficiency",
        title: "Operational Efficiency",
        description: "Reduce manual processing and operational overhead",
        impact: "high",
        timeframe: "6-12 months",
      },
      {
        id: "compliance-costs",
        title: "Compliance Cost Reduction",
        description: "Lower regulatory compliance and reporting costs",
        impact: "medium",
        timeframe: "12-18 months",
      },
      {
        id: "support-costs",
        title: "Customer Support Cost Reduction",
        description: "Reduce customer service inquiries and support tickets",
        impact: "medium",
        timeframe: "3-6 months",
      },
    ],
  },
  {
    id: "revenue-growth",
    title: "Revenue Growth",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    benefits: [
      {
        id: "customer-retention",
        title: "Customer Retention",
        description: "Improve customer satisfaction and reduce churn",
        impact: "high",
        timeframe: "6-12 months",
      },
      {
        id: "new-customer-acquisition",
        title: "New Customer Acquisition",
        description: "Attract new customers with improved experience",
        impact: "medium",
        timeframe: "12-18 months",
      },
      {
        id: "cross-sell-opportunities",
        title: "Cross-sell Opportunities",
        description: "Increase product adoption and wallet share",
        impact: "medium",
        timeframe: "9-15 months",
      },
    ],
  },
  {
    id: "risk-mitigation",
    title: "Risk Mitigation",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    benefits: [
      {
        id: "regulatory-risk",
        title: "Regulatory Risk Reduction",
        description: "Minimize regulatory penalties and compliance issues",
        impact: "high",
        timeframe: "3-6 months",
      },
      {
        id: "operational-risk",
        title: "Operational Risk Reduction",
        description: "Reduce system downtime and operational failures",
        impact: "high",
        timeframe: "6-9 months",
      },
      {
        id: "reputational-risk",
        title: "Reputational Risk Reduction",
        description: "Protect brand reputation and customer trust",
        impact: "high",
        timeframe: "immediate",
      },
    ],
  },
  {
    id: "customer-experience",
    title: "Customer Experience",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    benefits: [
      {
        id: "user-satisfaction",
        title: "User Satisfaction",
        description: "Improve overall customer satisfaction scores",
        impact: "high",
        timeframe: "3-6 months",
      },
      {
        id: "process-speed",
        title: "Process Speed",
        description: "Faster transaction processing and response times",
        impact: "medium",
        timeframe: "6-9 months",
      },
      {
        id: "digital-experience",
        title: "Digital Experience",
        description: "Enhanced digital banking experience",
        impact: "medium",
        timeframe: "9-12 months",
      },
    ],
  },
]

const impactColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export function BenefitEstimation() {
  const { submission, updateSubmission } = useAppContext()
  const [confidenceScores, setConfidenceScores] = useState<Record<string, number>>({})

  const handleBenefitToggle = (benefitId: string, checked: boolean) => {
    const updatedBenefits = checked
      ? [...submission.selectedBenefits, benefitId]
      : submission.selectedBenefits.filter((id) => id !== benefitId)

    updateSubmission({
      selectedBenefits: updatedBenefits,
    })

    // Remove confidence score if benefit is unchecked
    if (!checked) {
      const newConfidenceScores = { ...confidenceScores }
      delete newConfidenceScores[benefitId]
      setConfidenceScores(newConfidenceScores)
    }
  }

  const handleConfidenceChange = (benefitId: string, confidence: number[]) => {
    setConfidenceScores({
      ...confidenceScores,
      [benefitId]: confidence[0],
    })
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-4">
          Select the potential benefits that addressing this problem could deliver. Rate your confidence in achieving
          each benefit.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {benefitCategories.map((category) => {
          const CategoryIcon = category.icon
          const selectedInCategory = category.benefits.filter((benefit) =>
            submission.selectedBenefits.includes(benefit.id),
          ).length

          return (
            <Card key={category.id} className={`${category.borderColor} border-2`}>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${category.bgColor}`}>
                      <CategoryIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${category.color}`} />
                    </div>
                    <span>{category.title}</span>
                  </div>
                  {selectedInCategory > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {selectedInCategory} selected
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {category.benefits.map((benefit) => {
                  const isSelected = submission.selectedBenefits.includes(benefit.id)
                  const confidence = confidenceScores[benefit.id] || 50

                  return (
                    <div
                      key={benefit.id}
                      className={`p-3 sm:p-4 rounded-lg border transition-all duration-200 ${
                        isSelected ? "bg-gray-50 border-gray-300" : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={benefit.id}
                          checked={isSelected}
                          onCheckedChange={(checked) => handleBenefitToggle(benefit.id, checked as boolean)}
                          className="mt-1 touch-manipulation"
                        />
                        <div className="flex-1 min-w-0">
                          <Label
                            htmlFor={benefit.id}
                            className="text-sm sm:text-base font-medium cursor-pointer block mb-1"
                          >
                            {benefit.title}
                          </Label>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 leading-relaxed">{benefit.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge
                              variant="outline"
                              className={`text-xs ${impactColors[benefit.impact as keyof typeof impactColors]}`}
                            >
                              {benefit.impact} impact
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {benefit.timeframe}
                            </Badge>
                          </div>

                          {isSelected && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-xs sm:text-sm text-gray-700">
                                  Confidence Level: {confidence}%
                                </Label>
                              </div>
                              <Slider
                                value={[confidence]}
                                onValueChange={(value) => handleConfidenceChange(benefit.id, value)}
                                max={100}
                                min={0}
                                step={10}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Low</span>
                                <span>Medium</span>
                                <span>High</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary */}
      {submission.selectedBenefits.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <span>Benefit Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-800 mb-3">
              You've identified <strong>{submission.selectedBenefits.length}</strong> potential benefits across{" "}
              <strong>
                {
                  new Set(
                    benefitCategories
                      .filter((cat) => cat.benefits.some((b) => submission.selectedBenefits.includes(b.id)))
                      .map((cat) => cat.id),
                  ).size
                }
              </strong>{" "}
              categories.
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {submission.selectedBenefits.map((benefitId) => {
                const benefit = benefitCategories.flatMap((cat) => cat.benefits).find((b) => b.id === benefitId)
                return benefit ? (
                  <Badge key={benefitId} variant="secondary" className="text-xs">
                    {benefit.title}
                  </Badge>
                ) : null
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
