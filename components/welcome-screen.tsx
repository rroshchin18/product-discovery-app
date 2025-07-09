"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Target, Users, Lightbulb, TrendingUp } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Header */}
        <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-white/80 backdrop-blur-sm">
            <em>A Product College Experience</em>
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Learn to Discover & Define Product Problems
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Practice the critical discovery phase of product management through realistic scenarios.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real Scenarios</h3>
              <p className="text-sm text-gray-600">
                Practice with authentic product challenges from the financial services industry
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-200">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Stakeholder Analysis</h3>
              <p className="text-sm text-gray-600">
                Learn to identify and prioritize the right stakeholders for each situation
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-200">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Problem Definition</h3>
              <p className="text-sm text-gray-600">Master the art of crafting clear, actionable problem statements</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors duration-200">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Impact Estimation</h3>
              <p className="text-sm text-gray-600">Develop skills in quantifying and communicating business value</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-400">
          <Button
            onClick={onStart}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium transition-all duration-200 hover:scale-105 group"
          >
            Start Learning Journey
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
          <p className="text-sm text-gray-500 mt-4">5 realistic scenarios • 15-20 minutes each • Immediate feedback</p>
        </div>
      </div>
    </div>
  )
}
