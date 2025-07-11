"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppContext } from "@/context/app-context"

const businessImpactOptions = [
  { value: "regulatory-risk", label: "Regulatory Risk" },
  { value: "operational-cost", label: "Operational Cost" },
  { value: "customer-trust", label: "Customer Trust" },
  { value: "revenue", label: "Revenue Impact" },
  { value: "sla-violation", label: "SLA Violation" },
]

export function ProblemStatementBuilder() {
  const { submission, updateSubmission } = useAppContext()

  const handleProblemStatementChange = (field: string, value: string) => {
    updateSubmission({
      problemStatement: {
        ...submission.problemStatement,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-4">
          Build a clear, concise problem statement that captures the core issue, affected parties, and business impact.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="issue" className="text-sm font-medium block mb-2">
            What's the issue you're seeing? *
          </Label>
          <Textarea
            id="issue"
            placeholder="Describe the specific problem or challenge you've identified..."
            value={submission.problemStatement.issue}
            onChange={(e) => handleProblemStatementChange("issue", e.target.value)}
            className="min-h-20 sm:min-h-24 text-base sm:text-sm resize-none"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="affected" className="text-sm font-medium block mb-2">
            Who is affected by it? *
          </Label>
          <Textarea
            id="affected"
            placeholder="Identify the customers, internal teams, or other parties impacted..."
            value={submission.problemStatement.affected}
            onChange={(e) => handleProblemStatementChange("affected", e.target.value)}
            className="min-h-20 sm:min-h-24 text-base sm:text-sm resize-none"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="business-impact" className="text-sm font-medium block mb-2">
            Why does this matter to Capital One's business? *
          </Label>
          <Select
            value={submission.problemStatement.businessImpact}
            onValueChange={(value) => handleProblemStatementChange("businessImpact", value)}
          >
            <SelectTrigger className="h-12 sm:h-10 text-base sm:text-sm">
              <SelectValue placeholder="Select primary business impact" />
            </SelectTrigger>
            <SelectContent>
              {businessImpactOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-base sm:text-sm py-3 sm:py-2">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Problem Statement Preview */}
      {submission.problemStatement.issue &&
        submission.problemStatement.affected &&
        submission.problemStatement.businessImpact && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-3 text-sm sm:text-base">Problem Statement Preview</h4>
            <div className="space-y-2">
              <p className="text-sm text-blue-800">
                <strong>Issue:</strong> {submission.problemStatement.issue}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Affected:</strong> {submission.problemStatement.affected}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Business Impact:</strong>{" "}
                {businessImpactOptions.find((opt) => opt.value === submission.problemStatement.businessImpact)?.label}
              </p>
            </div>
          </div>
        )}
    </div>
  )
}
