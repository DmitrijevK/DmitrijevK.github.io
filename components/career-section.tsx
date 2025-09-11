"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building2, Award, Code, Network, Shield, Server } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface CareerItem {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  technologies: string[]
  icon: any
  type: "work" | "education" | "certification"
}

const careerData: CareerItem[] = [
  {
    id: "current",
    title: "System Administrator",
    company: "Victoria Tech Solutions",
    location: "Estonia, Tallinn",
    period: "2025 - Present",
    description: "Providing comprehensive IT infrastructure solutions, network security assessments, and system automation for various clients. Specializing in enterprise network design and cybersecurity implementations.",
    technologies: ["CISCO", "ProxMox", "Python", "Linux", "Windows Server", "Tech Support", "helpdesk", "Active Directory", "Dell PowerEdge Servers"],
    icon: Network,
    type: "work"
  },
  {
    id: "security",
    title: "Cybersecurity Specialist",
    company: "Freelance Projects",
    location: "Remote",
    period: "2021 - 2024",
    description: "Conducted 10+ penetration testing projects and security assessments. Developed custom security tools and automation scripts for vulnerability management.",
    technologies: ["C#", "Metasploit", "Nmap", "Burp Suite", "Python", "Custom Tools"],
    icon: Shield,
    type: "work"
  },
  {
    id: "university",
    title: "Software Developer",
    company: "MAINOR",
    location: "Estonia",
    period: "2021 - 2024",
    description: "Studied software development at the University of Estonia",
    technologies: ["JavaScript", "C#", "Java"],
    icon: Shield,
    type: "education"
  },
  {
    id: "system-admin",
    title: "System Administrator",
    company: "IPSCSTORE",
    location: "Estonia",
    period: "2020 - 2021",
    description: "Maintained Windows and Linux server environments, managed Active Directory, and implemented backup solutions. Improved system reliability and performance optimization.",
    technologies: ["Windows Server", "Linux", "Exchange", "SQL Server", "PowerShell"],
    icon: Building2,
    type: "education"
  },
  {
    id: "education",
    title: "Information Technology",
    company: "TTHK",
    location: "Estonia",
    period: "2019 - 2021",
    description: "Information Technology with focus on network engineering and system administration. Graduated with honors.",
    technologies: ["Computer Networks", "System Administration", "Programming", "Database Management"],
    icon: Award,
    type: "education"
  }
]

export function CareerSection() {
  const { t } = useLanguage()

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
      case "education":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
      case "certification":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "work":
        return Building2
      case "education":
        return Award
      case "certification":
        return Award
      default:
        return Building2
    }
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {t("career.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("career.description")}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-purple-400 to-purple-200 dark:from-purple-800 dark:via-purple-600 dark:to-purple-800"></div>

          <div className="space-y-12">
            {careerData.map((item, index) => {
              const IconComponent = item.icon
              const TypeIcon = getTypeIcon(item.type)
              const isEven = index % 2 === 0

              return (
                <div
                  key={item.id}
                  className={`relative flex items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-background shadow-lg z-10"></div>

                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 w-full md:w-5/12 ${isEven ? "md:pr-8" : "md:pl-8"}`}>
                    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-purple-600" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getTypeColor(item.type)}>
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {t(`career.types.${item.type}`)}
                            </Badge>
                          </div>
                          
                          <h3 className="font-heading text-xl font-bold mb-1 text-foreground">
                            {item.title}
                          </h3>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center space-x-1">
                              <Building2 className="w-4 h-4" />
                              <span>{item.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{item.period}</span>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {item.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="secondary"
                                className="text-xs hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
            <div className="text-sm text-muted-foreground">{t("career.stats.years")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
            <div className="text-sm text-muted-foreground">{t("career.stats.projects")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
            <div className="text-sm text-muted-foreground">{t("career.stats.technologies")}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-sm text-muted-foreground">{t("career.stats.satisfaction")}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
