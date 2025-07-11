export interface BenefitAnalysis {
  score: number
  insights: string[]
  strategicAlignment: number
  prioritization: "excellent" | "good" | "needs-work" | "poor"
  reasoning: string
  selectedCorrect: string[]
  selectedIncorrect: string[]
  missedCritical: string[]
}

const benefitDatabase = {
  "reduce-chargebacks": {
    name: "Reduce chargebacks",
    priority: "low",
    relevance: {
      "ach-transfer-delays": 20,
      "mobile-security-breach": 30,
      "credit-application-delays": 15,
      "digital-platform-outage": 25,
      "regulatory-reporting-failure": 10,
    },
    category: "financial",
    timeframe: "medium-term",
  },
  "mitigate-regulatory-risk": {
    name: "Mitigate regulatory risk",
    priority: "critical",
    relevance: {
      "ach-transfer-delays": 95,
      "mobile-security-breach": 90,
      "credit-application-delays": 40,
      "digital-platform-outage": 60,
      "regulatory-reporting-failure": 98,
    },
    category: "compliance",
    timeframe: "immediate",
  },
  "improve-operational-throughput": {
    name: "Improve operational throughput",
    priority: "high",
    relevance: {
      "ach-transfer-delays": 85,
      "mobile-security-breach": 50,
      "credit-application-delays": 90,
      "digital-platform-outage": 80,
      "regulatory-reporting-failure": 75,
    },
    category: "operational",
    timeframe: "medium-term",
  },
  "increase-customer-trust": {
    name: "Increase customer trust",
    priority: "high",
    relevance: {
      "ach-transfer-delays": 80,
      "mobile-security-breach": 95,
      "credit-application-delays": 85,
      "digital-platform-outage": 90,
      "regulatory-reporting-failure": 30,
    },
    category: "customer",
    timeframe: "long-term",
  },
  "accelerate-revenue-recognition": {
    name: "Accelerate revenue recognition",
    priority: "low",
    relevance: {
      "ach-transfer-delays": 15,
      "mobile-security-breach": 10,
      "credit-application-delays": 70,
      "digital-platform-outage": 20,
      "regulatory-reporting-failure": 5,
    },
    category: "financial",
    timeframe: "medium-term",
  },
  "reduce-operational-costs": {
    name: "Reduce operational costs",
    priority: "medium",
    relevance: {
      "ach-transfer-delays": 60,
      "mobile-security-breach": 40,
      "credit-application-delays": 65,
      "digital-platform-outage": 70,
      "regulatory-reporting-failure": 55,
    },
    category: "operational",
    timeframe: "medium-term",
  },
}

export function analyzeBenefitSelection(selectedIds: string[], scenarioId: string): BenefitAnalysis {
  const insights: string[] = []

  // Get scenario-specific benefit relevance
  const benefitRelevance = Object.entries(benefitDatabase)
    .map(([id, data]) => ({
      id,
      ...data,
      scenarioRelevance: data.relevance[scenarioId as keyof typeof data.relevance] || 0,
    }))
    .sort((a, b) => b.scenarioRelevance - a.scenarioRelevance)

  // Identify critical and high-priority benefits for this scenario
  const criticalBenefits = benefitRelevance.filter((b) => b.scenarioRelevance >= 80 && b.priority === "critical")
  const highBenefits = benefitRelevance.filter((b) => b.scenarioRelevance >= 70 && b.priority === "high")
  const lowRelevanceBenefits = benefitRelevance.filter((b) => b.scenarioRelevance < 50)

  // Analyze selections
  const selectedBenefits = selectedIds.map((id) => benefitRelevance.find((b) => b.id === id)).filter(Boolean)
  const selectedCorrect = selectedBenefits.filter((b) => b && b.scenarioRelevance >= 70).map((b) => b!.name)
  const selectedIncorrect = selectedBenefits.filter((b) => b && b.scenarioRelevance < 50).map((b) => b!.name)
  const missedCritical = criticalBenefits.filter((b) => !selectedIds.includes(b.id)).map((b) => b.name)

  // Calculate sophisticated score
  let score = 0

  // Critical benefit coverage (50% of score)
  const criticalSelected = selectedIds.filter((id) => criticalBenefits.some((b) => b.id === id)).length
  const criticalCoverage = criticalSelected / Math.max(criticalBenefits.length, 1)
  score += criticalCoverage * 50

  // High-priority benefit coverage (30% of score)
  const highSelected = selectedIds.filter((id) => highBenefits.some((b) => b.id === id)).length
  const highCoverage = Math.min(highSelected / Math.max(highBenefits.length, 1), 1)
  score += highCoverage * 30

  // Strategic alignment (20% of score)
  const categoryBalance = analyzeCategoryBalance(selectedBenefits, scenarioId)
  score += categoryBalance * 20

  // Penalty for low-relevance selections
  const lowRelevanceSelected = selectedIds.filter((id) => lowRelevanceBenefits.some((b) => b.id === id)).length
  score -= lowRelevanceSelected * 8

  score = Math.max(0, Math.min(100, score))

  // Generate insights
  if (missedCritical.length > 0) {
    insights.push(`Critical gap: Missing ${missedCritical.join(", ")} - highest priority for this scenario`)
  }

  if (criticalSelected > 0) {
    insights.push(`Strong foundation: Selected critical benefits for ${getScenarioType(scenarioId)} scenarios`)
  }

  if (selectedIncorrect.length > 0) {
    insights.push(`Reconsider: ${selectedIncorrect.join(", ")} - limited relevance to this specific problem`)
  }

  // Category-specific insights
  const categories = selectedBenefits.map((b) => b?.category).filter(Boolean)
  const categoryInsights = generateCategoryInsights(categories, scenarioId)
  insights.push(...categoryInsights)

  // Selection strategy insights
  if (selectedIds.length > 4) {
    insights.push("Focus on 2-3 primary benefits for clearer stakeholder messaging")
  } else if (selectedIds.length < 2) {
    insights.push("Consider additional benefits to build a stronger business case")
  }

  // Strategic alignment analysis
  const strategicAlignment = calculateStrategicAlignment(selectedBenefits, scenarioId)

  // Determine prioritization quality
  let prioritization: BenefitAnalysis["prioritization"]
  if (score >= 85) prioritization = "excellent"
  else if (score >= 70) prioritization = "good"
  else if (score >= 50) prioritization = "needs-work"
  else prioritization = "poor"

  // Generate reasoning
  const reasoning = generateBenefitReasoning(selectedBenefits, scenarioId, criticalSelected, highSelected)

  return {
    score: Math.round(score),
    insights: insights.slice(0, 3),
    strategicAlignment,
    prioritization,
    reasoning,
    selectedCorrect,
    selectedIncorrect,
    missedCritical,
  }
}

function analyzeCategoryBalance(selectedBenefits: any[], scenarioId: string): number {
  const categories = selectedBenefits.map((b) => b?.category).filter(Boolean)
  const categoryCount = {
    compliance: categories.filter((c) => c === "compliance").length,
    operational: categories.filter((c) => c === "operational").length,
    customer: categories.filter((c) => c === "customer").length,
    financial: categories.filter((c) => c === "financial").length,
  }

  // Scenario-specific category priorities
  const categoryPriorities = {
    "ach-transfer-delays": { compliance: 0.4, operational: 0.3, customer: 0.2, financial: 0.1 },
    "mobile-security-breach": { compliance: 0.3, customer: 0.4, operational: 0.2, financial: 0.1 },
    "credit-application-delays": { operational: 0.4, customer: 0.3, financial: 0.2, compliance: 0.1 },
    "digital-platform-outage": { operational: 0.4, customer: 0.4, compliance: 0.1, financial: 0.1 },
    "regulatory-reporting-failure": { compliance: 0.5, operational: 0.3, customer: 0.1, financial: 0.1 },
  }

  const priorities = categoryPriorities[scenarioId as keyof typeof categoryPriorities] || {
    compliance: 0.25,
    operational: 0.25,
    customer: 0.25,
    financial: 0.25,
  }

  // Calculate alignment score
  let alignmentScore = 0
  Object.entries(priorities).forEach(([category, weight]) => {
    const hasCategory = categoryCount[category as keyof typeof categoryCount] > 0
    if (hasCategory) alignmentScore += weight * 100
  })

  return alignmentScore
}

function generateCategoryInsights(categories: string[], scenarioId: string): string[] {
  const insights: string[] = []
  const uniqueCategories = [...new Set(categories)]

  if (uniqueCategories.includes("compliance")) {
    insights.push("Good regulatory focus - compliance benefits often take priority in banking")
  }

  if (uniqueCategories.includes("operational") && uniqueCategories.includes("customer")) {
    insights.push("Balanced approach - operational efficiency supports customer experience")
  }

  if (uniqueCategories.length === 1) {
    insights.push("Consider diversifying benefit types for a more comprehensive business case")
  }

  // Scenario-specific category advice
  if (scenarioId.includes("regulatory") && !uniqueCategories.includes("compliance")) {
    insights.push("Regulatory scenarios typically require compliance-focused benefits")
  }

  return insights
}

function calculateStrategicAlignment(selectedBenefits: any[], scenarioId: string): number {
  const timeframes = selectedBenefits.map((b) => b?.timeframe).filter(Boolean)
  const hasImmediate = timeframes.includes("immediate")
  const hasMediumTerm = timeframes.includes("medium-term")

  // Strategic alignment considers both immediate needs and longer-term value
  let alignment = 0
  if (hasImmediate) alignment += 60 // Address urgent needs
  if (hasMediumTerm) alignment += 40 // Build sustainable value

  return Math.min(100, alignment)
}

function generateBenefitReasoning(
  selectedBenefits: any[],
  scenarioId: string,
  criticalSelected: number,
  highSelected: number,
): string {
  const strengths = []
  const improvements = []

  if (criticalSelected > 0) {
    strengths.push("identified critical benefits")
  } else {
    improvements.push("include critical benefits for this scenario type")
  }

  if (highSelected > 0) {
    strengths.push("selected high-impact benefits")
  }

  const categories = selectedBenefits.map((b) => b?.category).filter(Boolean)
  const uniqueCategories = [...new Set(categories)]

  if (uniqueCategories.length > 1) {
    strengths.push("balanced benefit portfolio")
  } else if (uniqueCategories.length === 1) {
    improvements.push("consider diverse benefit types")
  }

  let reasoning = ""
  if (strengths.length > 0) {
    reasoning += `Strong ${strengths.join(" and ")}. `
  }
  if (improvements.length > 0) {
    reasoning += `Consider ${improvements.join(" and ")}.`
  }

  return reasoning || "Solid benefit selection with strategic alignment."
}

function getScenarioType(scenarioId: string): string {
  if (scenarioId.includes("regulatory")) return "regulatory"
  if (scenarioId.includes("security")) return "security"
  if (scenarioId.includes("outage")) return "operational"
  if (scenarioId.includes("credit")) return "revenue"
  return "banking"
}
