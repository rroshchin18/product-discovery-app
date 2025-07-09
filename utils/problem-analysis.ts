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
  "manual",
  "process",
  "system",
  "workflow",
  "handoff",
  "integration",
  "automation",
  "bottleneck",
  "delay",
  "failure",
  "breakdown",
  "gap",
]

const symptomIndicators = [
  "complaints",
  "unhappy",
  "frustrated",
  "slow",
  "bad",
  "poor",
  "dissatisfied",
  "angry",
  "upset",
  "disappointed",
]

const bankingDomainTerms = [
  "regulatory",
  "compliance",
  "dispute",
  "resolution",
  "ach",
  "processing",
  "sla",
  "fraud",
  "aml",
  "kyc",
  "cfpb",
  "occ",
  "examination",
  "penalty",
]

const stakeholderTypes = [
  "customer",
  "client",
  "user",
  "team",
  "staff",
  "employee",
  "operations",
  "compliance",
  "support",
  "management",
  "executive",
  "regulator",
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

  // Analyze issue field
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
  const reasoning = generateProblemReasoning(issueAnalysis, affectedAnalysis, impactAnalysis)

  return {
    score,
    insights,
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

  const lowerIssue = issue.toLowerCase()
  const wordCount = issue.split(/\s+/).length

  // Length and detail analysis
  if (issue.length < 30) {
    insights.push("Issue description too brief - add specific details about what's broken")
    score += 10
  } else if (issue.length < 80) {
    insights.push("Good length, but could be more specific about the root cause")
    score += 25
  } else {
    score += 35
  }

  // Root cause vs symptoms analysis
  const rootCauseWords = rootCauseIndicators.filter((word) => lowerIssue.includes(word))
  const symptomWords = symptomIndicators.filter((word) => lowerIssue.includes(word))

  if (rootCauseWords.length === 0 && symptomWords.length > 0) {
    insights.push("Focus on root causes (what's broken) rather than symptoms (how people feel)")
    score += 5
  } else if (rootCauseWords.length > 0) {
    insights.push(`Good root cause focus: identified ${rootCauseWords.join(", ")} issues`)
    score += 25
  }

  // Banking domain specificity
  const domainTerms = bankingDomainTerms.filter((term) => lowerIssue.includes(term))
  if (domainTerms.length > 0) {
    insights.push(`Strong domain knowledge: used ${domainTerms.join(", ")}`)
    score += 20
  } else {
    insights.push("Consider using more banking-specific terminology")
  }

  // Scenario-specific analysis
  if (scenarioId.includes("regulatory") && !lowerIssue.includes("regulat") && !lowerIssue.includes("complian")) {
    insights.push("Regulatory scenarios should emphasize compliance aspects")
  }

  if (scenarioId.includes("delay") && !lowerIssue.includes("delay") && !lowerIssue.includes("time")) {
    insights.push("Consider mentioning timing/delay aspects for this scenario")
  }

  // Specificity analysis
  const vagueTerms = ["problem", "issue", "bad", "poor", "not working"]
  const vagueCount = vagueTerms.filter((term) => lowerIssue.includes(term)).length
  if (vagueCount > 2) {
    insights.push("Replace vague terms with specific descriptions of what's failing")
  }

  return { score: Math.min(100, score), insights }
}

function analyzeAffectedField(affected: string, scenarioId: string) {
  const insights: string[] = []
  let score = 0

  const lowerAffected = affected.toLowerCase()

  // Length analysis
  if (affected.length < 20) {
    insights.push("Expand on who is affected - include both external and internal stakeholders")
    score += 10
  } else {
    score += 25
  }

  // Customer impact analysis
  const customerTerms = ["customer", "client", "user", "account holder"]
  const hasCustomerImpact = customerTerms.some((term) => lowerAffected.includes(term))

  if (hasCustomerImpact) {
    insights.push("Good - identified customer impact, crucial for executive attention")
    score += 25
  } else {
    insights.push("Missing customer impact - always consider external stakeholder effects")
  }

  // Internal stakeholder analysis
  const internalTerms = ["team", "staff", "operations", "compliance", "support", "management"]
  const hasInternalImpact = internalTerms.some((term) => lowerAffected.includes(term))

  if (hasInternalImpact) {
    insights.push("Excellent - considered internal team impact for resource planning")
    score += 25
  } else {
    insights.push("Consider which internal teams are affected by this problem")
  }

  // Regulatory stakeholder analysis
  if (scenarioId.includes("regulatory") || scenarioId.includes("compliance")) {
    const regulatoryTerms = ["regulator", "compliance", "audit", "examination"]
    const hasRegulatoryImpact = regulatoryTerms.some((term) => lowerAffected.includes(term))

    if (hasRegulatoryImpact) {
      insights.push("Strong regulatory awareness - identified compliance stakeholder impact")
      score += 25
    } else {
      insights.push("For regulatory issues, consider regulator/auditor perspectives")
    }
  }

  // Specificity analysis
  const specificRoles = affected.match(/\b(manager|analyst|officer|lead|director|specialist)\b/gi)
  if (specificRoles && specificRoles.length > 0) {
    insights.push("Good specificity - identified specific roles affected")
    score += 15
  }

  return { score: Math.min(100, score), insights }
}

function analyzeBusinessImpact(businessImpact: string, scenarioId: string) {
  const insights: string[] = []
  let score = 0

  if (!businessImpact) {
    insights.push("Select a business impact to complete your problem statement")
    return { score: 0, insights }
  }

  // Scenario-specific impact analysis
  const impactMapping = {
    "ach-transfer-delays": "regulatory-risk",
    "mobile-security-breach": "regulatory-risk",
    "credit-application-delays": "revenue",
    "digital-platform-outage": "operational-cost",
    "regulatory-reporting-failure": "regulatory-risk",
  }

  const expectedImpact = impactMapping[scenarioId as keyof typeof impactMapping]

  if (businessImpact === expectedImpact) {
    insights.push("Correct primary impact - aligns with scenario's main business risk")
    score = 100
  } else {
    const impactLabels = {
      "regulatory-risk": "Regulatory Risk",
      "operational-cost": "Operational Cost",
      "customer-trust": "Customer Trust",
      revenue: "Revenue Impact",
      "sla-violation": "SLA Violation",
    }

    const selectedLabel = impactLabels[businessImpact as keyof typeof impactLabels]
    const expectedLabel = impactLabels[expectedImpact as keyof typeof impactLabels]

    insights.push(`${selectedLabel} is a concern, but ${expectedLabel} is the primary risk for this scenario`)
    score = 60
  }

  return { score, insights }
}

function generateProblemReasoning(issueAnalysis: any, affectedAnalysis: any, impactAnalysis: any): string {
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

  return reasoning || "Well-structured problem statement with room for refinement."
}
