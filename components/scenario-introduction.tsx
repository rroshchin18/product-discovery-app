"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, FileText, BarChart3, Users, ArrowRight, Lightbulb } from "lucide-react"

interface ScenarioIntroductionProps {
  onNext: () => void
  scenario: any
}

export function ScenarioIntroduction({ onNext, scenario }: ScenarioIntroductionProps) {
  if (!scenario) return null

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Scenario: {scenario.title}</h1>
        <p className="text-gray-600">Let's explore this banking challenge that requires product management expertise</p>
      </div>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Learning Goal:</strong> By the end of this scenario, you'll understand how to analyze this specific
          banking product problem, identify the right stakeholders, and estimate business impact.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>The Situation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{scenario.description}</p>
          <p className="text-gray-700">
            As a Product Manager, you need to understand the full scope of this problem and determine how to address it
            effectively.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="customer" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customer" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Customer Voice</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Internal Alert</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Key Metrics</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Your Team</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customer" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Customer Communication</CardTitle>
                <Badge variant="destructive">High Priority</Badge>
              </div>
              <div className="text-sm text-gray-500">
                From: {scenario.customerComplaint.from} | Subject: {scenario.customerComplaint.subject}
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm leading-relaxed whitespace-pre-line">{scenario.customerComplaint.body}</p>
              </div>
              <Alert className="mt-4">
                <AlertDescription>
                  <strong>Why this matters:</strong> Customer feedback like this indicates systemic issues that can lead
                  to regulatory scrutiny, customer churn, and reputational damage.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{scenario.complianceMemo.title}</CardTitle>
              <div className="text-sm text-gray-500">From: {scenario.complianceMemo.from} | Confidential</div>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <div className="text-sm text-red-800 whitespace-pre-line">{scenario.complianceMemo.content}</div>
              </div>
              <Alert className="mt-4">
                <AlertDescription>
                  <strong>Learning Point:</strong> Internal alerts like this highlight the business and regulatory
                  implications that product managers must consider when prioritizing solutions.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {scenario.metrics.map((metric: any, index: number) => (
                  <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-700">{metric.value}</div>
                    <div className="text-sm text-red-600">{metric.label}</div>
                    <div className="text-xs text-red-500">{metric.change}</div>
                  </div>
                ))}
              </div>
              <Alert className="mt-4">
                <AlertDescription>
                  <strong>What to notice:</strong> Multiple metrics trending negatively suggests this isn't just an
                  isolated issue but a systemic product problem requiring comprehensive solution.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {scenario.stakeholders.map((person: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{person.name}</div>
                      <div className="text-xs text-gray-600">{person.role}</div>
                    </div>
                    <Badge variant="outline">{person.department}</Badge>
                  </div>
                ))}
              </div>
              <Alert className="mt-4">
                <AlertDescription>
                  <strong>Coming up:</strong> You'll need to identify which of these team members (and others) should be
                  involved in solving this problem.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center pt-6">
        <Button onClick={onNext} size="lg">
          I understand the scenario - Let's start analyzing
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
