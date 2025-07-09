export const scenarioData = [
  {
    id: "ach-transfer-delays",
    title: "ACH Transfer Dispute Resolution Delays",
    description:
      "Customer complaints are rising due to extended processing times for ACH transfer disputes, creating regulatory risk and customer satisfaction issues.",

    customerComplaint: {
      from: "sarah.johnson@email.com",
      subject: "URGENT: Still waiting for ACH transfer dispute resolution - 12 days!",
      body: `Dear Capital One,

I initiated a dispute for an unauthorized ACH transfer of $2,847 from my checking account on January 15th. It's now been 12 days and I still haven't received any meaningful update beyond "we're investigating."

This money was taken without my authorization and I need it back immediately. I've had to overdraft on other accounts to cover my mortgage payment because of this delay.

I've been a customer for 8 years and this is completely unacceptable. If this isn't resolved by tomorrow, I'm filing complaints with the CFPB and considering switching banks.

The customer service rep told me it could take "up to 10 business days" but that was 2 weeks ago. What is going on?

Frustrated and disappointed,
Sarah Johnson
Account: ****-1234`,
    },

    complianceMemo: {
      title: "URGENT: ACH Dispute Resolution SLA Violations",
      from: "Risk & Compliance Team",
      content: `INTERNAL MEMO - CONFIDENTIAL

TO: Product Management, Operations Leadership
FROM: Compliance & Risk Management
DATE: January 28, 2024
RE: ACH Dispute Resolution Process - Regulatory Concerns

We are seeing a concerning trend in our ACH dispute resolution process:

• 23% of disputes are exceeding the 10-business-day regulatory guideline
• Average resolution time has increased from 6.2 to 8.7 business days
• Customer complaints to CFPB have increased 34% month-over-month
• Risk of regulatory scrutiny from OCC examination team

ROOT CAUSES IDENTIFIED:
- Manual handoffs between Fraud Ops and Customer Service
- Incomplete documentation requirements causing rework
- Legacy system limitations requiring dual data entry
- Insufficient staffing during peak dispute periods

REGULATORY IMPLICATIONS:
- Potential CFPB enforcement action
- OCC examination findings
- Reputational risk and customer attrition

IMMEDIATE ACTION REQUIRED to address process gaps and technology limitations.`,
    },

    metrics: [
      { label: "Avg. Dispute Resolution Time", value: "8.7 days", change: "+2.5 days vs target", trend: "up" },
      { label: "Customer NPS Score", value: "42", change: "-18 points", trend: "up" },
      { label: "CFPB Complaints", value: "156", change: "+34% MoM", trend: "up" },
      { label: "SLA Compliance Rate", value: "77%", change: "-23% vs target", trend: "up" },
    ],

    stakeholders: [
      { name: "Jennifer Martinez", role: "Fraud Operations Manager", department: "Risk" },
      { name: "David Chen", role: "Customer Experience Lead", department: "CX" },
      { name: "Lisa Thompson", role: "Compliance Officer", department: "Compliance" },
      { name: "Michael Rodriguez", role: "Platform Product Manager", department: "Product" },
      { name: "Amanda Foster", role: "Operations Manager", department: "Operations" },
      { name: "Robert Kim", role: "Technical Lead", department: "Engineering" },
    ],

    correctStakeholders: ["fraud-ops", "cx-lead", "aml-compliance", "platform-pm", "ops-manager"],
    correctBenefits: ["mitigate-regulatory-risk", "improve-operational-throughput", "increase-customer-trust"],

    expectedProblemStatement: {
      issue: "ACH transfer dispute resolution process is exceeding regulatory timeframes",
      affected: "Customers waiting for dispute resolution, compliance team facing regulatory risk",
      businessImpact: "regulatory-risk",
    },
  },

  {
    id: "mobile-security-breach",
    title: "Mobile App Security Incident Response",
    description:
      "A security vulnerability in the mobile banking app has been discovered, requiring immediate response to protect customer data and maintain regulatory compliance.",

    customerComplaint: {
      from: "marcus.williams@email.com",
      subject: "SECURITY ALERT: Unauthorized login attempts on my mobile app",
      body: `Capital One Security Team,

I received multiple notifications about login attempts on my mobile banking app from locations I've never been to (Chicago, Miami, Seattle) all within the same hour yesterday evening.

I immediately changed my password and enabled two-factor authentication, but I'm extremely concerned about the security of your mobile platform. How did someone get my login credentials?

I've been reading online that other customers are experiencing similar issues. This is terrifying - my entire financial life is managed through your app.

I need immediate answers:
1. Has there been a data breach?
2. Is my account information compromised?
3. What are you doing to fix this?

If I don't get satisfactory answers within 24 hours, I'm closing all my accounts and reporting this to the authorities.

Very concerned,
Marcus Williams
Account: ****-5678`,
    },

    complianceMemo: {
      title: "CRITICAL: Mobile App Security Incident - Immediate Response Required",
      from: "Information Security & Compliance",
      content: `CONFIDENTIAL - INCIDENT RESPONSE

TO: Executive Leadership, Product Management, Legal
FROM: Chief Information Security Officer
DATE: February 3, 2024
RE: Mobile Banking App Security Vulnerability

INCIDENT SUMMARY:
Security researchers have identified a vulnerability in our mobile banking app (iOS v4.2.1, Android v4.1.8) that could allow unauthorized access to customer session tokens.

IMPACT ASSESSMENT:
• Approximately 2.3M active mobile users potentially affected
• 847 confirmed unauthorized login attempts detected
• No evidence of successful account access or data exfiltration
• Vulnerability exists in authentication token management

REGULATORY REQUIREMENTS:
- FFIEC notification required within 72 hours
- State AG notifications for affected customers
- CFPB incident reporting mandatory
- Potential OCC examination trigger

IMMEDIATE ACTIONS TAKEN:
- Emergency app update pushed to stores (pending approval)
- Enhanced monitoring activated
- Customer communication plan initiated
- Incident response team assembled

BUSINESS IMPACT:
- Potential regulatory fines ($2-5M estimated)
- Customer trust and retention risk
- Media and reputational exposure
- Operational costs for remediation`,
    },

    metrics: [
      { label: "Affected Mobile Users", value: "2.3M", change: "Potential exposure", trend: "up" },
      { label: "Unauthorized Attempts", value: "847", change: "Confirmed incidents", trend: "up" },
      { label: "App Store Rating", value: "2.1", change: "-2.8 points", trend: "up" },
      { label: "Customer Service Calls", value: "+340%", change: "Security-related", trend: "up" },
    ],

    stakeholders: [
      { name: "Sarah Mitchell", role: "Chief Information Security Officer", department: "Security" },
      { name: "James Park", role: "Mobile Product Manager", department: "Product" },
      { name: "Rachel Green", role: "Legal Counsel", department: "Legal" },
      { name: "David Chen", role: "Customer Experience Lead", department: "CX" },
      { name: "Lisa Thompson", role: "Compliance Officer", department: "Compliance" },
      { name: "Kevin Zhang", role: "Mobile Engineering Lead", department: "Engineering" },
    ],

    correctStakeholders: ["security-officer", "mobile-pm", "legal-counsel", "cx-lead", "aml-compliance", "tech-lead"],
    correctBenefits: ["mitigate-regulatory-risk", "increase-customer-trust", "improve-operational-throughput"],

    expectedProblemStatement: {
      issue: "Mobile app security vulnerability exposing customer authentication tokens",
      affected: "2.3M mobile banking customers, security team, customer service operations",
      businessImpact: "regulatory-risk",
    },
  },

  {
    id: "credit-application-delays",
    title: "Credit Card Application Processing Bottlenecks",
    description:
      "Credit card application approval times have increased significantly, impacting customer acquisition and revenue targets while creating competitive disadvantage.",

    customerComplaint: {
      from: "jennifer.adams@email.com",
      subject: "Credit card application - 3 weeks and still pending?",
      body: `Dear Capital One,

I applied for your Venture Rewards credit card on January 10th and it's now been over 3 weeks with no decision. This is absolutely ridiculous.

I have an excellent credit score (780+), stable income ($95K annually), and have been pre-approved for multiple other cards that I could get approved for instantly online.

I specifically chose Capital One because of your reputation, but this experience has been terrible:

- Your website said "decision in minutes" 
- After a week, I called and was told "7-10 business days"
- It's now been 15+ business days with no communication
- Customer service keeps giving me different answers

I have a large purchase coming up and need this card. I'm about to accept one of the other offers I have instead.

This is not the experience I expected from a major bank. Please expedite my application or I'm moving on.

Disappointed,
Jennifer Adams
Application #: CC-2024-789456`,
    },

    complianceMemo: {
      title: "Credit Application Processing Performance Degradation",
      from: "Credit Risk & Operations",
      content: `INTERNAL OPERATIONS REPORT

TO: Product Management, Executive Leadership
FROM: Credit Operations & Risk Management
DATE: February 5, 2024
RE: Credit Card Application Processing Delays

PERFORMANCE METRICS:
• Average application processing time: 12.4 days (target: 2-3 days)
• Instant decision rate: 23% (target: 75%)
• Application abandonment rate: 31% (up from 8%)
• Customer service escalations: +180% month-over-month

ROOT CAUSE ANALYSIS:
- Credit bureau API timeouts causing system delays
- Manual review queue backlog (4,200+ applications)
- Underwriting team capacity constraints
- Legacy credit scoring system integration issues
- Increased fraud detection false positives

BUSINESS IMPACT:
- $2.8M in lost monthly acquisition revenue
- Competitive disadvantage vs. instant approval competitors
- Customer satisfaction scores declining
- Marketing campaign ROI reduced by 40%

OPERATIONAL CHALLENGES:
- Credit analysts working overtime to clear backlog
- Customer service overwhelmed with status inquiries
- IT resources diverted to system stability issues

RECOMMENDATIONS:
- Emergency system optimization required
- Additional underwriting staff needed
- Process automation opportunities identified`,
    },

    metrics: [
      { label: "Avg. Processing Time", value: "12.4 days", change: "+9.4 days vs target", trend: "up" },
      { label: "Instant Decision Rate", value: "23%", change: "-52% vs target", trend: "up" },
      { label: "Application Abandonment", value: "31%", change: "+23% vs baseline", trend: "up" },
      { label: "Lost Revenue", value: "$2.8M", change: "Monthly impact", trend: "up" },
    ],

    stakeholders: [
      { name: "Patricia Wong", role: "Credit Risk Manager", department: "Risk" },
      { name: "Michael Rodriguez", role: "Credit Product Manager", department: "Product" },
      { name: "Amanda Foster", role: "Credit Operations Manager", department: "Operations" },
      { name: "David Chen", role: "Customer Experience Lead", department: "CX" },
      { name: "Robert Kim", role: "Platform Technical Lead", department: "Engineering" },
      { name: "Lisa Thompson", role: "Compliance Officer", department: "Compliance" },
    ],

    correctStakeholders: ["credit-risk", "platform-pm", "ops-manager", "cx-lead", "tech-lead"],
    correctBenefits: ["accelerate-revenue-recognition", "improve-operational-throughput", "increase-customer-trust"],

    expectedProblemStatement: {
      issue: "Credit card application processing system experiencing significant delays and bottlenecks",
      affected: "Prospective customers, credit operations team, customer service, revenue targets",
      businessImpact: "revenue",
    },
  },

  {
    id: "digital-platform-outage",
    title: "Digital Banking Platform Outage",
    description:
      "A critical system outage has affected online and mobile banking services during peak usage hours, impacting millions of customers and business operations.",

    customerComplaint: {
      from: "robert.taylor@email.com",
      subject: "URGENT: Cannot access my account during system outage - NEED MONEY NOW",
      body: `Capital One,

Your entire digital platform has been down for over 4 hours and I CANNOT ACCESS MY MONEY. This is completely unacceptable!

I'm at the grocery store trying to buy food for my family and my debit card is being declined. The ATM won't work. Your mobile app won't load. Your website is showing error messages.

I called customer service and waited 45 minutes just to be told "we're experiencing technical difficulties" with no timeline for resolution.

This is my PRIMARY BANK ACCOUNT. I have bills due today, I need to buy groceries, and I have a mortgage payment that needs to go through.

What if this was an emergency? What if I needed to access my money for a medical situation?

I've been a loyal customer for 12 years but this is making me seriously consider switching to a bank that can keep their systems running.

When will this be fixed? What are you doing to prevent this from happening again?

Extremely frustrated,
Robert Taylor
Account: ****-9012`,
    },

    complianceMemo: {
      title: "CRITICAL INCIDENT: Core Banking Platform Outage",
      from: "Technology Operations & Risk Management",
      content: `INCIDENT COMMAND CENTER - CONFIDENTIAL

TO: Executive Leadership, Board Risk Committee
FROM: Chief Technology Officer & Chief Risk Officer
DATE: February 8, 2024
RE: Core Banking Platform Service Disruption

INCIDENT STATUS: CRITICAL - ONGOING
Start Time: 09:23 EST
Duration: 4 hours 17 minutes (ongoing)
Affected Services: Online banking, mobile app, ATM network, debit card processing

IMPACT ASSESSMENT:
• 8.2M customers unable to access accounts
• $47M in transaction volume blocked
• 15,000+ customer service calls in queue
• Social media sentiment: 89% negative
• News media coverage initiated

TECHNICAL DETAILS:
- Primary data center cooling system failure
- Automatic failover to secondary DC unsuccessful
- Database synchronization issues preventing recovery
- Estimated 2-4 hours additional downtime

REGULATORY IMPLICATIONS:
- OCC notification completed
- State banking regulators informed
- Potential operational risk examination
- Customer communication requirements under Reg E

BUSINESS CONTINUITY:
- Branch locations experiencing 300% increase in traffic
- Call center capacity exceeded by 400%
- Executive communication plan activated
- Customer compensation program may be required

REPUTATIONAL RISK:
- Trending #1 on social media platforms
- Competitor acquisition campaigns launched
- Customer retention risk estimated at 3-5%`,
    },

    metrics: [
      { label: "Affected Customers", value: "8.2M", change: "Total impact", trend: "up" },
      { label: "Blocked Transactions", value: "$47M", change: "Revenue at risk", trend: "up" },
      { label: "Service Calls", value: "15,000+", change: "In queue", trend: "up" },
      { label: "System Uptime", value: "0%", change: "4h 17m outage", trend: "up" },
    ],

    stakeholders: [
      { name: "Thomas Anderson", role: "Chief Technology Officer", department: "Technology" },
      { name: "Sarah Mitchell", role: "Infrastructure Operations Manager", department: "Operations" },
      { name: "David Chen", role: "Customer Experience Lead", department: "CX" },
      { name: "Lisa Thompson", role: "Risk & Compliance Officer", department: "Compliance" },
      { name: "Michael Rodriguez", role: "Digital Platform PM", department: "Product" },
      { name: "Rachel Green", role: "Corporate Communications", department: "Communications" },
    ],

    correctStakeholders: ["tech-lead", "ops-manager", "cx-lead", "aml-compliance", "platform-pm"],
    correctBenefits: ["improve-operational-throughput", "increase-customer-trust", "mitigate-regulatory-risk"],

    expectedProblemStatement: {
      issue: "Core banking platform outage preventing customer access to digital services",
      affected: "8.2M customers, operations teams, customer service, business continuity",
      businessImpact: "operational-cost",
    },
  },

  {
    id: "regulatory-reporting-failure",
    title: "Automated Regulatory Reporting System Failure",
    description:
      "The automated system for generating critical regulatory reports has failed, risking compliance violations and potential regulatory penalties.",

    customerComplaint: {
      from: "internal.audit@capitalone.com",
      subject: "INTERNAL AUDIT ALERT: Regulatory Reporting Discrepancies Identified",
      body: `TO: Executive Leadership, Compliance Team
FROM: Internal Audit Department
RE: Critical Regulatory Reporting Issues

During our quarterly compliance review, we have identified significant discrepancies in our automated regulatory reporting systems that require immediate executive attention.

FINDINGS:
- BSA/AML reports showing data inconsistencies for the past 6 weeks
- CTR (Currency Transaction Reports) missing 12% of required filings
- SAR (Suspicious Activity Reports) generation delayed by 5-8 days
- FFIEC Call Report data validation errors detected

POTENTIAL VIOLATIONS:
- Bank Secrecy Act reporting requirements
- FinCEN filing deadlines missed
- OCC examination findings likely
- Potential civil money penalties

This appears to be a systemic issue with our automated reporting infrastructure, not isolated incidents. The compliance team has been manually generating reports, but this is not sustainable and increases operational risk.

We need immediate action to:
1. Identify root cause of system failures
2. Implement temporary manual processes
3. Notify regulators of potential delays
4. Develop permanent solution

This is a Category 1 audit finding requiring board notification.

Internal Audit Team`,
    },

    complianceMemo: {
      title: "URGENT: Regulatory Reporting System Failure - Compliance Risk",
      from: "Chief Compliance Officer",
      content: `CONFIDENTIAL COMPLIANCE ALERT

TO: Board Risk Committee, Executive Leadership
FROM: Chief Compliance Officer
DATE: February 12, 2024
RE: Critical Regulatory Reporting System Malfunction

SITUATION OVERVIEW:
Our automated regulatory reporting system has experienced cascading failures over the past 6 weeks, creating significant compliance risk and potential regulatory violations.

AFFECTED REPORTS:
• BSA/AML Monitoring Reports - Data integrity issues
• Currency Transaction Reports (CTRs) - 12% filing gap
• Suspicious Activity Reports (SARs) - 5-8 day delays
• FFIEC Call Reports - Validation errors
• OFAC Screening Reports - Processing delays

REGULATORY EXPOSURE:
- FinCEN penalties: $25,000-$100,000 per violation
- OCC enforcement action risk
- Consent order potential
- Reputational damage with regulators

ROOT CAUSE ANALYSIS:
- Legacy mainframe integration failures
- Data warehouse synchronization issues
- Automated workflow engine bugs
- Insufficient system monitoring/alerting

IMMEDIATE RISKS:
- Q1 regulatory filings at risk
- Examiner criticism during next review
- Potential business restrictions
- Board governance concerns

MITIGATION EFFORTS:
- Manual reporting processes activated
- Additional compliance staff assigned
- Vendor emergency support engaged
- Regulatory notification prepared

ESTIMATED COSTS:
- System remediation: $2-4M
- Additional staffing: $500K/month
- Potential penalties: $5-15M
- Regulatory consulting: $1M`,
    },

    metrics: [
      { label: "Missing CTR Filings", value: "12%", change: "Compliance gap", trend: "up" },
      { label: "SAR Delays", value: "5-8 days", change: "Behind schedule", trend: "up" },
      { label: "Manual Processing", value: "78%", change: "Of reports", trend: "up" },
      { label: "Potential Penalties", value: "$5-15M", change: "Estimated risk", trend: "up" },
    ],

    stakeholders: [
      { name: "Margaret Foster", role: "Chief Compliance Officer", department: "Compliance" },
      { name: "Lisa Thompson", role: "BSA/AML Manager", department: "Compliance" },
      { name: "Robert Kim", role: "Data Platform Technical Lead", department: "Engineering" },
      { name: "Patricia Wong", role: "Risk Management Director", department: "Risk" },
      { name: "Michael Rodriguez", role: "Regulatory Technology PM", department: "Product" },
      { name: "Thomas Anderson", role: "Data Architecture Manager", department: "Technology" },
    ],

    correctStakeholders: ["aml-compliance", "tech-lead", "credit-risk", "platform-pm", "data-privacy"],
    correctBenefits: ["mitigate-regulatory-risk", "improve-operational-throughput", "reduce-operational-costs"],

    expectedProblemStatement: {
      issue: "Automated regulatory reporting system failures causing compliance violations and filing delays",
      affected: "Compliance team, regulators, audit functions, executive leadership",
      businessImpact: "regulatory-risk",
    },
  },
]
