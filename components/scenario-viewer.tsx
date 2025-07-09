import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Mail, FileText, BarChart3, Users } from "lucide-react"

interface ScenarioViewerProps {
  scenario: any
}

export function ScenarioViewer({ scenario }: ScenarioViewerProps) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{scenario.title}</h2>
        <p className="text-sm text-gray-600">{scenario.description}</p>
      </div>

      <Accordion type="multiple" defaultValue={["customer-complaint", "metrics"]} className="space-y-4">
        <AccordionItem value="customer-complaint">
          <AccordionTrigger className="text-left">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-red-500" />
              <span>Customer Complaint Email</span>
              <Badge variant="destructive" className="ml-2">
                High Priority
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader className="pb-3">
                <div className="text-xs text-gray-500">From: {scenario.customerComplaint.from}</div>
                <div className="text-xs text-gray-500">Subject: {scenario.customerComplaint.subject}</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-line">{scenario.customerComplaint.body}</p>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="compliance-memo">
          <AccordionTrigger className="text-left">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-orange-500" />
              <span>Compliance Memo</span>
              <Badge variant="secondary">Internal</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{scenario.complianceMemo.title}</CardTitle>
                <div className="text-xs text-gray-500">From: {scenario.complianceMemo.from}</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-line">{scenario.complianceMemo.content}</p>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="metrics">
          <AccordionTrigger className="text-left">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <span>Product Metrics Dashboard</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              {scenario.metrics.map((metric: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                    <div className={`text-xs ${metric.trend === "up" ? "text-red-500" : "text-green-500"}`}>
                      {metric.change}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="org-chart">
          <AccordionTrigger className="text-left">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span>Key Stakeholders</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {scenario.stakeholders.map((stakeholder: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{stakeholder.name}</div>
                    <div className="text-xs text-gray-600">{stakeholder.role}</div>
                  </div>
                  <Badge variant="outline">{stakeholder.department}</Badge>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
