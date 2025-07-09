export interface StakeholderAnalysis {
  score: number
  insights: string[]
  missing: string[]
  unnecessary: string[]
  teamComposition: "excellent" | "good" | "needs-work" | "poor"
  reasoning: string
}

const stakeholderDatabase = {
  "fraud-ops": {
    name: "Fraud Operations Manager",
    department: "Risk",
    priority: "critical",
    relevance: {
      "ach-transfer-delays": 95,
      "mobile-security-breach": 85,
      "credit-application-delays": 30,
      "digital-platform-outage": 40,
      "regulatory-reporting-failure": 60,
    },
    expertise: ["dispute-resolution", "fraud-detection", "process-optimization"],
    stakeholderType: "process-owner",
  },
  "aml-compliance": {
    name: "AML Compliance Officer",
    department: "Compliance",
    priority: "critical",
    relevance: {
      "ach-transfer-delays": 90,
      "mobile-security-breach": 70,
      "credit-application-delays": 40,
      "digital-platform-outage": 50,
      "regulatory-reporting-failure": 95,
    },
    expertise: ["regulatory-compliance", "risk-assessment", "reporting"],
    stakeholderType: "regulatory-guardian",
  },
  "cx-lead": {
    name: "Customer Experience Lead",
    department: "CX",
    priority: "important",
    relevance: {
      "ach-transfer-delays": 85,
      "mobile-security-breach": 80,
      "credit-application-delays": 90,
      "digital-platform-outage": 95,
      "regulatory-reporting-failure": 30,
    },
    expertise: ["customer-journey", "satisfaction-metrics", "communication"],
    stakeholderType: "customer-advocate",
  },
  "platform-pm": {
    name: "Platform Product Manager",
    department: "Product",
    priority: "important",
    relevance: {
      "ach-transfer-delays": 80,
      "mobile-security-breach": 75,
      "credit-application-delays": 85,
      "digital-platform-outage": 90,
      "regulatory-reporting-failure": 70,
    },
    expertise: ["system-integration", "product-strategy", "technical-requirements"],
    stakeholderType: "solution-architect",
  },
  "ops-manager": {
    name: "Operations Manager",
    department: "Operations",
    priority: "important",
    relevance: {
      "ach-transfer-delays": 85,
      "mobile-security-breach": 60,
      "credit-application-delays": 80,
      "digital-platform-outage": 85,
      "regulatory-reporting-failure": 75,
    },
    expertise: ["process-management", "capacity-planning", "workflow-optimization"],
    stakeholderType: "execution-lead",
  },
  "tech-lead": {
    name: "Technical Lead",
    department: "Engineering",
    priority: "optional",
    relevance: {
      "ach-transfer-delays": 40,
      "mobile-security-breach": 90,
      "credit-application-delays": 50,
      "digital-platform-outage": 95,
      "regulatory-reporting-failure": 80,
    },
    expertise: ["system-architecture", "technical-implementation", "security"],
    stakeholderType: "technical-expert",
  },
  "legal-counsel": {
    name: "Legal Counsel",
    department: "Legal",
    priority: "optional",
    relevance: {
      "ach-transfer-delays": 60,
      "mobile-security-breach": 85,
      "credit-application-delays": 45,
      "digital-platform-outage": 40,
      "regulatory-reporting-failure": 90,
    },
    expertise: ["legal-compliance", "regulatory-interpretation", "risk-mitigation"],
    stakeholderType: "legal-advisor",
  },
  "data-analyst": {
    name: "Data Analyst",
    department: "Analytics",
    priority: "optional",
    relevance: {
      "ach-transfer-delays": 50,
      "mobile-security-breach": 40,
      "credit-application-delays": 70,
      "digital-platform-outage": 60,
      "regulatory-reporting-failure": 85,
    },
    expertise: ["data-analysis", "metrics-tracking", "reporting"],
    stakeholderType: "insights-provider",
  },
}

export function analyzeStakeholderSelection(selectedIds: string[], scenarioId: string): StakeholderAnalysis {
  const insights: string[] = []
  const missing: string[] = []
  const unnecessary: string[] = []

  // Get scenario-specific relevance scores
  const stakeholderRelevance = Object.entries(stakeholderDatabase)
    .map(([id, data]) => ({
      id,
      ...data,
      scenarioRelevance: data.relevance[scenarioId as keyof typeof data.relevance] || 0,
    }))
    .sort((a, b) => b.scenarioRelevance - a.scenarioRelevance)

  // Identify critical stakeholders for this scenario
  const criticalStakeholders = stakeholderRelevance.filter(
    (s) => s.scenarioRelevance >= 80 && s.priority === "critical",
  )

  const importantStakeholders = stakeholderRelevance.filter(
    (s) => s.scenarioRelevance >= 70 && s.priority === "important",
  )

  // Analyze selections
  const selectedStakeholders = selectedIds.map((id) => stakeholderRelevance.find((s) => s.id === id)).filter(Boolean)

  // Check for missing critical stakeholders
  const missedCritical = criticalStakeholders.filter((s) => !selectedIds.includes(s.id))
  const missedImportant = importantStakeholders.filter((s) => !selectedIds.includes(s.id))

  // Check for unnecessary selections
  const lowRelevanceSelected = selectedStakeholders.filter((s) => s && s.scenarioRelevance < 60)

  // Generate insights based on stakeholder types
  const selectedTypes = selectedStakeholders.map((s) => s?.stakeholderType).filter(Boolean)
  const typeBalance = {
    "process-owner": selectedTypes.filter((t) => t === "process-owner").length,
    "regulatory-guardian": selectedTypes.filter((t) => t === "regulatory-guardian").length,
    "customer-advocate": selectedTypes.filter((t) => t === "customer-advocate").length,
    "solution-architect": selectedTypes.filter((t) => t === "solution-architect").length,
    "execution-lead": selectedTypes.filter((t) => t === "execution-lead").length,
  }

  // Calculate sophisticated score
  let score = 0

  // Critical stakeholder coverage (40% of score)
  const criticalCoverage =
    (criticalStakeholders.length - missedCritical.length) / Math.max(criticalStakeholders.length, 1)
  score += criticalCoverage * 40

  // Important stakeholder coverage (30% of score)
  const importantCoverage =
    (importantStakeholders.length - missedImportant.length) / Math.max(importantStakeholders.length, 1)
  score += importantCoverage * 30

  // Team composition balance (20% of score)
  const hasProcessOwner = typeBalance["process-owner"] > 0
  const hasRegulatory = typeBalance["regulatory-guardian"] > 0
  const hasCustomerAdvocate = typeBalance["customer-advocate"] > 0
  const balanceScore = (hasProcessOwner ? 7 : 0) + (hasRegulatory ? 7 : 0) + (hasCustomerAdvocate ? 6 : 0)
  score += balanceScore

  // Efficiency penalty for unnecessary selections (10% of score)
  const efficiencyPenalty = Math.min(lowRelevanceSelected.length * 3, 10)
  score -= efficiencyPenalty

  score = Math.max(0, Math.min(100, score))

  // Generate specific insights
  if (missedCritical.length > 0) {
    missing.push(...missedCritical.map((s) => s.name))
    insights.push(
      `Critical gap: Missing ${missedCritical.map((s) => s.name).join(", ")} - essential for ${scenarioId.includes("regulatory") ? "compliance" : "process ownership"}`,
    )
  }

  if (lowRelevanceSelected.length > 0) {
    unnecessary.push(...lowRelevanceSelected.map((s) => s!.name))
    insights.push(
      `Consider removing ${lowRelevanceSelected.map((s) => s!.name).join(", ")} - limited relevance to this scenario`,
    )
  }

  if (!hasRegulatory && scenarioId.includes("regulatory")) {
    insights.push("Regulatory scenarios require compliance expertise from the start")
  }

  if (!hasProcessOwner) {
    insights.push("Missing process owner - who will explain current workflows and bottlenecks?")
  }

  if (selectedIds.length > 6) {
    insights.push("Large teams can slow decision-making - consider starting with core stakeholders")
  }

  if (selectedIds.length < 3) {
    insights.push("Small teams may lack diverse perspectives needed for complex banking problems")
  }

  // Determine team composition quality
  let teamComposition: StakeholderAnalysis["teamComposition"]
  if (score >= 85) teamComposition = "excellent"
  else if (score >= 70) teamComposition = "good"
  else if (score >= 50) teamComposition = "needs-work"
  else teamComposition = "poor"

  // Generate reasoning
  const reasoning = generateStakeholderReasoning(selectedStakeholders, scenarioId, typeBalance)

  return {
    score: Math.round(score),
    insights,
    missing,
    unnecessary,
    teamComposition,
    reasoning,
  }
}

function generateStakeholderReasoning(selectedStakeholders: any[], scenarioId: string, typeBalance: any): string {
  const strengths = []
  const gaps = []

  if (typeBalance["regulatory-guardian"] > 0) {
    strengths.push("regulatory compliance coverage")
  } else {
    gaps.push("regulatory oversight")
  }

  if (typeBalance["process-owner"] > 0) {
    strengths.push("process expertise")
  } else {
    gaps.push("current process knowledge")
  }

  if (typeBalance["customer-advocate"] > 0) {
    strengths.push("customer perspective")
  } else {
    gaps.push("customer impact assessment")
  }

  let reasoning = ""
  if (strengths.length > 0) {
    reasoning += `Strong ${strengths.join(" and ")}. `
  }
  if (gaps.length > 0) {
    reasoning += `Consider adding ${gaps.join(" and ")} expertise.`
  }

  return reasoning || "Balanced stakeholder selection for this scenario."
}
