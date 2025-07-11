export interface StakeholderAnalysis {
  score: number
  insights: string[]
  strengths: string[]
  recommendations: string[]
  criticalMissed: string[]
  correctSelections: string[]
  incorrectSelections: string[]
  overallQuality: "excellent" | "good" | "needs-work" | "poor"
}

const scenarioStakeholderMapping = {
  "ach-transfer-delays": {
    critical: ["fraud-ops", "aml-compliance", "ops-manager"],
    important: ["cx-lead", "platform-pm"],
    optional: ["tech-lead", "legal-counsel", "credit-risk"],
  },
  "mobile-security-breach": {
    critical: ["tech-lead", "legal-counsel", "platform-pm"],
    important: ["cx-lead", "aml-compliance"],
    optional: ["fraud-ops", "ops-manager", "credit-risk"],
  },
  "credit-application-delays": {
    critical: ["credit-risk", "platform-pm", "ops-manager"],
    important: ["cx-lead", "tech-lead"],
    optional: ["aml-compliance", "legal-counsel", "fraud-ops"],
  },
  "digital-platform-outage": {
    critical: ["tech-lead", "ops-manager", "platform-pm"],
    important: ["cx-lead", "aml-compliance"],
    optional: ["fraud-ops", "legal-counsel", "credit-risk"],
  },
  "regulatory-reporting-failure": {
    critical: ["aml-compliance", "tech-lead", "legal-counsel"],
    important: ["platform-pm", "credit-risk"],
    optional: ["cx-lead", "ops-manager", "fraud-ops"],
  },
}

export function analyzeStakeholderSelection(selectedStakeholders: string[], scenarioId: string): StakeholderAnalysis {
  const scenario =
    scenarioStakeholderMapping[scenarioId as keyof typeof scenarioStakeholderMapping] ||
    scenarioStakeholderMapping["ach-transfer-delays"]

  const insights: string[] = []
  const strengths: string[] = []
  const recommendations: string[] = []

  // Analyze selections
  const criticalSelected = selectedStakeholders.filter((s) => scenario.critical.includes(s))
  const importantSelected = selectedStakeholders.filter((s) => scenario.important.includes(s))
  const optionalSelected = selectedStakeholders.filter((s) => scenario.optional.includes(s))

  const criticalMissed = scenario.critical.filter((s) => !selectedStakeholders.includes(s))
  const correctSelections = [...criticalSelected, ...importantSelected]
  const incorrectSelections = selectedStakeholders.filter(
    (s) => !scenario.critical.includes(s) && !scenario.important.includes(s) && !scenario.optional.includes(s),
  )

  // Calculate score
  let score = 0
  score += criticalSelected.length * 25 // Critical stakeholders worth 25 points each
  score += importantSelected.length * 15 // Important stakeholders worth 15 points each
  score += optionalSelected.length * 5 // Optional stakeholders worth 5 points each
  score -= incorrectSelections.length * 10 // Penalty for incorrect selections
  score -= criticalMissed.length * 20 // Penalty for missing critical stakeholders

  score = Math.max(0, Math.min(100, score))

  // Generate feedback
  if (criticalSelected.length === scenario.critical.length) {
    strengths.push("Identified all critical stakeholders")
    insights.push("Excellent stakeholder coverage for this scenario type")
  } else if (criticalSelected.length >= scenario.critical.length * 0.7) {
    strengths.push("Good critical stakeholder identification")
    if (criticalMissed.length > 0) {
      recommendations.push(`Consider including: ${formatStakeholderNames(criticalMissed)}`)
    }
  } else {
    recommendations.push(`Missing key stakeholders: ${formatStakeholderNames(criticalMissed)}`)
    insights.push("Focus on stakeholders who directly impact or are impacted by this problem")
  }

  if (importantSelected.length > 0) {
    strengths.push("Considered supporting stakeholders")
  }

  if (incorrectSelections.length > 0) {
    insights.push(`${formatStakeholderNames(incorrectSelections)} may not be directly relevant to this scenario`)
  }

  // Scenario-specific insights
  if (scenarioId.includes("regulatory") && !selectedStakeholders.includes("aml-compliance")) {
    insights.push("Regulatory issues always require compliance officer involvement")
  }

  if (scenarioId.includes("security") && !selectedStakeholders.includes("tech-lead")) {
    insights.push("Security incidents require technical leadership for resolution")
  }

  if (scenarioId.includes("outage") && !selectedStakeholders.includes("tech-lead")) {
    insights.push("Technical outages need engineering leadership for resolution")
  }

  // Determine overall quality
  let overallQuality: StakeholderAnalysis["overallQuality"]
  if (score >= 85) overallQuality = "excellent"
  else if (score >= 70) overallQuality = "good"
  else if (score >= 50) overallQuality = "needs-work"
  else overallQuality = "poor"

  return {
    score,
    insights: insights.slice(0, 3),
    strengths: strengths.slice(0, 2),
    recommendations: recommendations.slice(0, 2),
    criticalMissed,
    correctSelections,
    incorrectSelections,
    overallQuality,
  }
}

function formatStakeholderNames(stakeholders: string[]): string {
  const nameMap: Record<string, string> = {
    "fraud-ops": "Fraud Operations Manager",
    "aml-compliance": "AML Compliance Officer",
    "cx-lead": "Customer Experience Lead",
    "platform-pm": "Platform Product Manager",
    "ops-manager": "Operations Manager",
    "tech-lead": "Technical Lead",
    "legal-counsel": "Legal Counsel",
    "credit-risk": "Credit Risk Manager",
  }

  return stakeholders.map((s) => nameMap[s] || s).join(", ")
}
