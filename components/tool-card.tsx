"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToolCardProps {
  title: string
  description: string
  category: string
  icon: LucideIcon
  onClick: () => void
  tags?: string[]
}

export function ToolCard({ title, description, category, icon: Icon, onClick, tags = [] }: ToolCardProps) {
  return (
    <Card
      className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-purple-500/50"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-semibold text-lg group-hover:text-purple-600 transition-colors">
              {title}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}