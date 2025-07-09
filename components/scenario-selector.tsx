"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { scenarioData } from "@/data/scenarios"
import { FileText, Shield, CreditCard, Server, AlertTriangle, Users, Clock, TrendingUp } from "lucide-react"

const scenarioIcons = {
  "ach-transfer-delays": FileText,
  "mobile-security-breach": Shield,
  "credit-application-delays": CreditCard,
  "digital-platform-outage": Server,
  "regulatory-reporting-failure": AlertTriangle,
}

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 border-green-200",
  Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Advanced: "bg-red-100 text-red-800 border-red-200",
}

interface ScenarioSelectorProps {
  onSelectScenario: (scenarioIndex: number) => void
}

export function ScenarioSelector({ onSelectScenario }: ScenarioSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          Choose Your Discovery Challenge
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-150">
          Select a realistic product challenge to practice your discovery and problem definition skills
        </p>
      </div>

      <div className="grid gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
        {scenarioData.map((scenario, index) => {
          const IconComponent = scenarioIcons[scenario.id as keyof typeof scenarioIcons]
          return (
            <Card
              key={scenario.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-500"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-900 transition-colors duration-200">
                        {scenario.title}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${difficultyColors[scenario.difficulty as keyof typeof difficultyColors]} font-medium`}
                  >
                    {scenario.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-gray-600 text-base leading-relaxed mt-3">
                  {scenario.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{scenario.stakeholderCount} stakeholders</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{scenario.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{scenario.learningTasks} learning tasks</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => onSelectScenario(index)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 transition-all duration-200 hover:scale-105"
                  >
                    Start Scenario
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
