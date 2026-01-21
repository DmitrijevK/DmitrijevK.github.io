"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/tool-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, X, Shield, Network, Globe, Terminal, Server, Code, Database } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { FirewallGenerator } from "@/components/firewall-generator"
import { SubnetCalculator } from "@/components/subnet-calculator"

interface Tool {
  id: string
  title: string
  description: string
  category: string
  icon: any
  component: React.ComponentType
  tags: string[]
}

const tools: Tool[] = [
  {
    id: "firewall-generator",
    title: "Firewall Rules Generator",
    description: "Generate iptables and nftables firewall rules with an intuitive interface. Create complex firewall configurations easily.",
    category: "Security",
    icon: Shield,
    component: FirewallGenerator,
    tags: ["iptables", "nftables", "firewall", "security"],
  },
  // Placeholder для будущих инструментов
  {
    id: "subnet-calculator",
    title: "Subnet Calculator",
    description: "Calculate subnet masks, network addresses, and host ranges. Essential tool for network planning.",
    category: "Network",
    icon: Network,
    component: SubnetCalculator,
    tags: ["subnet", "CIDR", "network", "IP"],
  },
  {
    id: "dns-lookup",
    title: "DNS Lookup Tool",
    description: "Perform DNS queries, check A, AAAA, MX, TXT, and other DNS records. Troubleshoot DNS issues quickly.",
    category: "DNS",
    icon: Globe,
    component: () => <div>DNS Lookup - Coming Soon</div>,
    tags: ["DNS", "lookup", "records", "query"],
  },
  {
    id: "port-checker",
    title: "Port Checker",
    description: "Check if ports are open or closed on remote hosts. Useful for firewall testing and network diagnostics.",
    category: "Network",
    icon: Terminal,
    component: () => <div>Port Checker - Coming Soon</div>,
    tags: ["port", "scan", "network", "diagnostics"],
  },
  {
    id: "ip-converter",
    title: "IP Address Converter",
    description: "Convert between decimal, binary, and hexadecimal IP address formats. Useful for network calculations.",
    category: "Network",
    icon: Code,
    component: () => <div>IP Converter - Coming Soon</div>,
    tags: ["IP", "converter", "binary", "hex"],
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Generate secure passwords with customizable length and character sets. Perfect for system administration.",
    category: "Security",
    icon: Shield,
    component: () => <div>Password Generator - Coming Soon</div>,
    tags: ["password", "security", "generator"],
  },
]

const categories = ["All", "Security", "Network", "DNS", "System"] as const

export function ToolsCatalog() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const groupedTools = useMemo(() => {
    const groups: Record<string, Tool[]> = {}
    filteredTools.forEach((tool) => {
      if (!groups[tool.category]) {
        groups[tool.category] = []
      }
      groups[tool.category].push(tool)
    })
    return groups
  }, [filteredTools])

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool)
  }

  const closeTool = () => {
    setSelectedTool(null)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t("tools.search.placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setSearchQuery("")}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="text-sm text-muted-foreground">
          {t("tools.results")}: {filteredTools.length}
        </div>
      </div>

      {/* Tools Grid */}
      {Object.keys(groupedTools).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedTools).map(([category, categoryTools]) => (
            <div key={category}>
              <h2 className="font-heading text-2xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    title={tool.title}
                    description={tool.description}
                    category={tool.category}
                    icon={tool.icon}
                    tags={tool.tags}
                    onClick={() => handleToolClick(tool)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("tools.noResults")}</p>
        </div>
      )}

      {/* Tool Modal */}
      <Dialog open={!!selectedTool} onOpenChange={closeTool}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTool?.title}</DialogTitle>
            <DialogDescription>{selectedTool?.description}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedTool && <selectedTool.component />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}