"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppContext } from "@/context/app-context"
import { TrendingDown, AlertTriangle, RotateCw, MessageCircle, DollarSign } from "lucide-react"

const benefitOptions = [
  {
    id: "reduce-chargebacks",
    label: "Reduce chargebacks",
    icon: TrendingDown,
    description: "Decrease fraudulent transaction disputes and associated costs",
  },
  {
    id: "mitigate-regulatory-risk",
    label: "Mitigate regulatory risk",
    icon: AlertTriangle,
    description: "Reduce exposure to regulatory penalties and compliance issues",
  },
  {
    id: "improve-operational-throughput",
    label: "Improve operational throughput",
    icon: RotateCw,
    description: "Increase efficiency of internal processes and workflows",
  },
  {
    id: "increase-customer-trust",
    label: "Increase customer trust",
    icon: MessageCircle,
    description: "Enhance customer satisfaction and loyalty through better experience",
  },
  {
    id: "accelerate-revenue-recognition",
    label: "Accelerate revenue recognition",
    icon: DollarSign,
    description: "Speed up revenue realization and improve cash flow",
  },
]

const impactLevels = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]

export function BenefitEstimation() {
  const { submission, updateSubmission } = useAppContext()

  const handleBenefitToggle = (benefitId: string, checked: boolean) => {
    let newSelectedBenefits
    if (checked) {
      newSelectedBenefits = [...submission.selectedBenefits, benefitId]
    } else {
      newSelectedBenefits = submission.selectedBenefits.filter((id) => id !== benefitId)
      // Remove impact level when benefit is unchecked
      const newImpactLevels = { ...submission.impactLevels }
      delete newImpactLevels[benefitId]
      updateSubmission({ impactLevels: newImpactLevels })
    }

    updateSubmission({ selectedBenefits: newSelectedBenefits })
  }

  const handleImpactLevelChange = (benefitId: string, level: string) => {
    updateSubmission({
      impactLevels: {
        ...submission.impactLevels,
        [benefitId]: level,
      },
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-600 mb-4">
          Select the potential business benefits that addressing this problem could deliver. For each selected benefit,
          estimate the impact level.
        </p>
      </div>

      <div className="space-y-3">
        {benefitOptions.map((benefit) => {
          const Icon = benefit.icon
          const isSelected = submission.selectedBenefits.includes(benefit.id)

          return (
            <Card key={benefit.id} className={`transition-colors ${isSelected ? "bg-blue-50 border-blue-200" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id={benefit.id}
                    checked={isSelected}
                    onCheckedChange={(checked) => handleBenefitToggle(benefit.id, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon className="w-4 h-4 text-gray-600" />
                      <label htmlFor={benefit.id} className="font-medium text-sm cursor-pointer">
                        {benefit.label}
                      </label>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{benefit.description}</p>

                    {isSelected && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600">Impact Level:</span>
                        <Select
                          value={submission.impactLevels[benefit.id] || ""}
                          onValueChange={(value) => handleImpactLevelChange(benefit.id, value)}
                        >
                          <SelectTrigger className="w-24 h-7 text-xs">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {impactLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {submission.selectedBenefits.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">Selected Benefits Summary</h4>
          <div className="space-y-1">
            {submission.selectedBenefits.map((benefitId) => {
              const benefit = benefitOptions.find((b) => b.id === benefitId)
              const impactLevel = submission.impactLevels[benefitId]
              return benefit ? (
                <div key={benefitId} className="flex justify-between text-sm text-green-800">
                  <span>{benefit.label}</span>
                  {impactLevel && <span className="font-medium capitalize">{impactLevel} Impact</span>}
                </div>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
