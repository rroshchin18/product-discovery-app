export interface ProblemAnalysis {
  score: number
  insights: string[]
  issueQuality: number
  affectedQuality: number
  impactQuality: number
  overallClarity: "excellent" | "good" | "needs-work" | "poor"
  reasoning: string
}

const rootCauseIndicators = [
  "manual process",
  "system failure",
  "integration issue",
  "workflow bottleneck",
  "process gap",
  "automation failure",
  "handoff delay",
  "system limitation",
  "configuration error",
  "capacity constraint",
  "resource shortage",
  "technical debt",
  "legacy system",
  "data synchronization",
  "api timeout",
  "database issue",
]

const symptomIndicators = [
  "customers complain",
  "users frustrated",
  "slow response",
  "poor experience",
  "dissatisfied",
  "unhappy",
  "angry customers",
  "bad reviews",
  "complaints",
  "frustrated users",
]

const bankingDomainTerms = [
  "regulatory",
  "compliance",
  "ach",
  "processing",
  "sla",
  "fraud",
  "aml",
  "kyc",
  "cfpb",
  "occ",
  "examination",
  "audit",
  "penalty",
  "risk",
  "capital",
  "liquidity",
  "dispute",
  "resolution",
  "reporting",
  "filing",
]

export function analyzeProblemStatement(
  problemStatement: {
    issue: string
    affected: string
    businessImpact: string
  },
  scenarioId: string,
): ProblemAnalysis {
  const insights: string[] = []

  // Analyze issue quality
  const issueAnalysis = analyzeIssueField(problemStatement.issue, scenarioId)
  const affectedAnalysis = analyzeAffectedField(problemStatement.affected, scenarioId)
  const impactAnalysis = analyzeBusinessImpact(problemStatement.businessImpact, scenarioId)

  // Calculate weighted score
  const score = Math.round(issueAnalysis.score * 0.4 + affectedAnalysis.score * 0.3 + impactAnalysis.score * 0.3)

  // Combine insights
  insights.push(...issueAnalysis.insights)
  insights.push(...affectedAnalysis.insights)
  insights.push(...impactAnalysis.insights)

  // Determine overall clarity
  let overallClarity: ProblemAnalysis["overallClarity"]
  if (score >= 85) overallClarity = "excellent"
  else if (score >= 70) overallClarity = "good"
  else if (score >= 50) overallClarity = "needs-work"
  else overallClarity = "poor"

  // Generate reasoning
  const reasoning = generateProblemReasoning(issueAnalysis, affectedAnalysis, impactAnalysis, score)

  return {
    score,
    insights: insights.slice(0, 4),
    issueQuality: issueAnalysis.score,
    affectedQuality: affectedAnalysis.score,
    impactQuality: impactAnalysis.score,
    overallClarity,
    reasoning,
  }
}

function analyzeIssueField(issue: string, scenarioId: string) {
  const insights: string[] = []
  let score = 0

  if (!issue || issue.trim().length === 0) {
    insights.push("Issue description is required")
    return { score: 0, insights }
  }

  const lowerIssue = issue.toLowerCase()

  // Length and detail analysis
  if (issue.length < 20) {
    insights.push("Issue description too brief - add specific details about what's broken")
    score += 10
  } else if (issue.length < 50) {
    insights.push("Good start - consider adding more context about the root cause")
    score += 30
  } else if (issue.length < 100) {
    score += 50
    insights.push("Good detail level in issue description")
  } else {
    score += 40
    insights.push("Very detailed - ensure focus remains on core issue")
  }

  // Root cause vs symptoms analysis
  const hasRootCause = rootCauseIndicators.some((indicator) => lowerIssue.includes(indicator.toLowerCase()))
  const hasSymptoms = symptomIndicators.some((indicator) => lowerIssue.includes(indicator.toLowerCase()))

  if (hasRootCause && !hasSymptoms) {
    score += 30
    insights.push("Excellent focus on root causes rather than symptoms")
  } else if (hasRootCause && hasSymptoms) {
    score += 20
    insights.push("Good root cause identification, but consider reducing symptom focus")
  } else if (!hasRootCause && hasSymptoms) {
    score += 5
    insights.push("Focus on what's broken in the process, not just how people feel about it")
  } else {
    score += 15
    insights.push("Consider what specific process or system is failing")
  }

  // Banking domain specificity
  const hasDomainTerms = bankingDomainTerms.some((term) => lowerIssue.includes(term.toLowerCase()))
  if (hasDomainTerms) {
    score += 20
    insights.push("Good use of banking-specific terminology")
  } else {
    insights.push("Consider using more banking industry-specific terms")
  }

  // Scenario-specific analysis
  const scenarioKeywords = getScenarioKeywords(scenarioId)
  const hasScenarioContext = scenarioKeywords.some((keyword) => lowerIssue.includes(keyword.toLowerCase()))
  if (hasScenarioContext) {
    score += 15
    insights.push("Good alignment with scenario context")
  } else {
    insights.push(`Consider mentioning ${scenarioKeywords.join(" or ")} aspects for this scenario`)
  }

  return { score: Math.min(100, score), insights }
}

function analyzeAffectedField(affected: string, scenarioId: string) {
  const insights: string[] = []
  let score = 0

  if (!affected || affected.trim().length === 0) {
    insights.push("Affected parties description is required")
    return { score: 0, insights }
  }

  const lowerAffected = affected.toLowerCase()

  // Length analysis
  if (affected.length < 15) {
    insights.push("Expand on who is affected - include both external and internal stakeholders")
    score += 10
  } else if (affected.length < 40) {
    score += 30
    insights.push("Good coverage of affected parties")
  } else {
    score += 40
    insights.push("Comprehensive stakeholder impact analysis")
  }

  // External stakeholder analysis
  const externalTerms = ["customer", "client", "user", "account holder", "member", "borrower"]
  const hasExternalImpact = externalTerms.some((term) => lowerAffected.includes(term))

  if (hasExternalImpact) {
    score += 25
    insights.push("Good identification of customer/external impact")
  } else {
    insights.push("Consider how customers or external parties are affected")
  }

  // Internal stakeholder analysis
  const internalTerms = ["team", "staff", "operations", "compliance", "support", "management", "analyst", "officer"]
  const hasInternalImpact = internalTerms.some((term) => lowerAffected.includes(term))

  if (hasInternalImpact) {
    score += 20
    insights.push("Good consideration of internal team impact")
  } else {
    insights.push("Consider which internal teams are affected")
  }

  // Regulatory stakeholder analysis for relevant scenarios
  if (scenarioId.includes("regulatory") || scenarioId.includes("compliance")) {
    const regulatoryTerms = ["regulator", "compliance", "audit", "examination", "supervisor"]
    const hasRegulatoryImpact = regulatoryTerms.some((term) => lowerAffected.includes(term))

    if (hasRegulatoryImpact) {
      score += 15
      insights.push("Strong regulatory awareness")
    } else {
      insights.push("For regulatory issues, consider regulator/auditor perspectives")
    }
  }

  return { score: Math.min(100, score), insights }
}

function analyzeBusinessImpact(businessImpact: string, scenarioId: string) {
  const insights: string[] = []
  let score = 60 // Base score for selecting an impact

  if (!businessImpact) {
    insights.push("Business impact selection is required")
    return { score: 0, insights }
  }

  // Scenario-specific impact analysis
  const expectedImpacts = getExpectedImpacts(scenarioId)

  if (expectedImpacts.primary.includes(businessImpact)) {
    score = 100
    insights.push("Perfect alignment - this is the primary business risk for this scenario")
  } else if (expectedImpacts.secondary.includes(businessImpact)) {
    score = 75
    insights.push("Good choice - this is a significant concern for this scenario")
  } else {
    score = 40
    const primaryLabel = formatImpactLabel(expectedImpacts.primary[0])
    insights.push(`Consider ${primaryLabel} as the primary risk for this scenario type`)
  }

  return { score, insights }
}

function getScenarioKeywords(scenarioId: string): string[] {
  const keywords: Record<string, string[]> = {
    "ach-transfer-delays": ["transfer", "ach", "delay", "processing"],
    "mobile-security-breach": ["security", "breach", "mobile", "vulnerability"],
    "credit-application-delays": ["credit", "application", "delay", "approval"],
    "digital-platform-outage": ["outage", "platform", "downtime", "availability"],
    "regulatory-reporting-failure": ["reporting", "regulatory", "compliance", "filing"],
  }
  return keywords[scenarioId] || ["process", "system"]
}

function getExpectedImpacts(scenarioId: string) {
  const impacts: Record<string, { primary: string[]; secondary: string[] }> = {
    "ach-transfer-delays": {
      primary: ["regulatory-risk"],
      secondary: ["operational-cost", "customer-trust"],
    },
    "mobile-security-breach": {
      primary: ["regulatory-risk"],
      secondary: ["customer-trust", "operational-cost"],
    },
    "credit-application-delays": {
      primary: ["revenue"],
      secondary: ["customer-trust", "operational-cost"],
    },
    "digital-platform-outage": {
      primary: ["operational-cost"],
      secondary: ["customer-trust", "sla-violation"],
    },
    "regulatory-reporting-failure": {
      primary: ["regulatory-risk"],
      secondary: ["operational-cost", "sla-violation"],
    },
  }
  return impacts[scenarioId] || { primary: ["operational-cost"], secondary: ["customer-trust"] }
}

function formatImpactLabel(impact: string): string {
  const labels: Record<string, string> = {
    "regulatory-risk": "Regulatory Risk",
    "operational-cost": "Operational Cost",
    "customer-trust": "Customer Trust",
    revenue: "Revenue Impact",
    "sla-violation": "SLA Violation",
  }
  return labels[impact] || impact
}

function generateProblemReasoning(
  issueAnalysis: any,
  affectedAnalysis: any,
  impactAnalysis: any,
  score: number,
): string {
  const strengths = []
  const improvements = []

  if (issueAnalysis.score >= 70) strengths.push("clear issue identification")
  else improvements.push("more specific issue description")

  if (affectedAnalysis.score >= 70) strengths.push("comprehensive stakeholder impact")
  else improvements.push("broader stakeholder consideration")

  if (impactAnalysis.score >= 80) strengths.push("accurate business impact assessment")
  else improvements.push("better business impact alignment")

  let reasoning = ""
  if (strengths.length > 0) {
    reasoning += `Strong ${strengths.join(" and ")}. `
  }
  if (improvements.length > 0) {
    reasoning += `Focus on ${improvements.join(" and ")}.`
  }

  if (score >= 85) {
    reasoning += " Excellent problem statement that provides clear direction for solutions."
  } else if (score >= 70) {
    reasoning += " Good foundation with room for refinement."
  } else {
    reasoning += " Consider adding more specific details and context."
  }

  return reasoning || "Well-structured problem statement with room for refinement."
}
