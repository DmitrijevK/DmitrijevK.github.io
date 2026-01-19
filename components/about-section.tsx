import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Network, Shield, Code, Cloud } from "lucide-react"

const skillCategories = [
  {
    title: "Network & Infrastructure",
    icon: Network,
    skills: ["CISCO Equipment", "Mikrotik", "HP", "OSPF", "BGP", "VPN/IPSEC", "QoS", "IP Telephony"],
  },
  {
    title: "System Administration",
    icon: Server,
    skills: [
      "Windows Server",
      "Linux (Ubuntu, CentOS, Kali)",
      "Active Directory",
      "DNS/DHCP",
      "Exchange 2010/2013",
      "SQL Server",
    ],
  },
  {
    title: "Virtualization & Cloud",
    icon: Cloud,
    skills: ["VMware", "Terminal Services", "Domain Architecture", "NETping Solutions"],
  },
  {
    title: "Programming & Automation",
    icon: Code,
    skills: ["Python", "Shell Scripting", "C#", "System Troubleshooting"],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    skills: [
      "Penetration Testing",
      "TryHackMe",
      "Network Security",
      "Freelance Security Projects (10+)",
    ],
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I design, secure, and optimize IT infrastructures — from enterprise networks to cloud automation pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <IconComponent className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="text-xs hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">60+</div>
            <div className="text-sm text-muted-foreground">My Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
            <div className="text-sm text-muted-foreground">Security Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
            <div className="text-sm text-muted-foreground">Programming Languages</div>
          </div>
        </div>
      </div>
    </section>
  )
}
