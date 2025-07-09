"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ScenarioSelector } from "@/components/scenario-selector"
import { ScenarioIntroduction } from "@/components/scenario-introduction"
import { StakeholderLearning } from "@/components/stakeholder-learning"
import { ProblemStatementLearning } from "@/components/problem-statement-learning"
import { BenefitEstimationLearning } from "@/components/benefit-estimation-learning"
import { LearningComplete } from "@/components/learning-complete"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { scenarioData } from "@/data/scenarios"
import { ArrowLeft, Home, FileText, Shield, CreditCard, Server, AlertTriangle } from "lucide-react"

const steps = [
  { id: "selector", title: "Choose Scenario", component: ScenarioSelector },
  { id: "intro", title: "Scenario Review", component: ScenarioIntroduction },
  { id: "stakeholders", title: "Identify Stakeholders", component: StakeholderLearning },
  { id: "problem", title: "Define the Problem", component: ProblemStatementLearning },
  { id: "benefits", title: "Estimate Impact", component: BenefitEstimationLearning },
  { id: "complete", title: "Complete", component: LearningComplete },
]

const scenarioIcons = {
  "ach-transfer-delays": FileText,
  "mobile-security-breach": Shield,
  "credit-application-delays": CreditCard,
  "digital-platform-outage": Server,
  "regulatory-reporting-failure": AlertTriangle,
}

export function LearningFlow() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null)

  const CurrentComponent = steps[currentStep].component
  const progress = currentStep === 0 ? 0 : (currentStep / (steps.length - 1)) * 100

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleScenarioSelect = (scenarioIndex: number) => {
    setSelectedScenario(scenarioIndex)
    setCurrentStep(1) // Go to scenario introduction
  }

  const handleHomeClick = () => {
    if (currentStep === 0) {
      // On scenario selector page, go to main home page
      router.push("/")
    } else {
      // On all other pages, go to scenario selector
      setCurrentStep(0)
      setSelectedScenario(null)
    }
  }

  const currentScenario = selectedScenario !== null ? scenarioData[selectedScenario] : null
  const ScenarioIcon = currentScenario ? scenarioIcons[currentScenario.id as keyof typeof scenarioIcons] : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100 transition-colors duration-200"
              onClick={handleHomeClick}
            >
              <Home className="w-4 h-4" />
            </Button>
            {currentStep > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousStep}
                className="hover:bg-gray-100 transition-all duration-200 hover:-translate-x-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            {currentScenario && ScenarioIcon && (
              <div className="flex items-center space-x-2">
                <ScenarioIcon className="w-4 h-4 text-gray-600" />
                <Badge variant="outline" className="text-xs">
                  {currentScenario.title}
                </Badge>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {currentStep > 0 && (
              <>
                <span className="text-sm text-gray-600 animate-in fade-in-0 duration-300">
                  {steps[currentStep].title}
                </span>
                <div className="relative">
                  <Progress value={progress} className="w-32 transition-all duration-500 ease-out" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div key={currentStep} className="animate-in slide-in-from-right-4 fade-in-0 duration-500">
          {currentStep === 0 ? (
            <CurrentComponent onSelectScenario={handleScenarioSelect} />
          ) : (
            <CurrentComponent
              onNext={goToNextStep}
              onPrevious={goToPreviousStep}
              scenario={currentScenario}
              onRestart={handleHomeClick}
            />
          )}
        </div>
      </div>
    </div>
  )
}
