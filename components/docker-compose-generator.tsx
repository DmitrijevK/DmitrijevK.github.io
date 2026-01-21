"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, RefreshCw, Server, Settings } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

type ServicePreset = {
  image: string
  ports: string[]
  volumes: string[]
  env?: string[]
}

const presets: Record<string, ServicePreset> = {
  nginx: {
    image: "nginx:latest",
    ports: ["80:80", "443:443"],
    volumes: ["./nginx.conf:/etc/nginx/nginx.conf"],
  },
  postgres: {
    image: "postgres:16",
    ports: ["5432:5432"],
    volumes: ["pgdata:/var/lib/postgresql/data"],
    env: ["POSTGRES_USER=admin", "POSTGRES_PASSWORD=secret", "POSTGRES_DB=app"],
  },
  redis: {
    image: "redis:7",
    ports: ["6379:6379"],
    volumes: ["redisdata:/data"],
  },
}

export function DockerComposeGenerator() {
  const { t } = useLanguage()
  const [service, setService] = useState<keyof typeof presets>("nginx")
  const [containerName, setContainerName] = useState("app-service")
  const [ports, setPorts] = useState(presets[service].ports.join("\n"))
  const [volumes, setVolumes] = useState(presets[service].volumes.join("\n"))
  const [env, setEnv] = useState(presets[service].env?.join("\n") || "")
  const [copied, setCopied] = useState(false)

  const onChangeService = (value: keyof typeof presets) => {
    setService(value)
    setPorts(presets[value].ports.join("\n"))
    setVolumes(presets[value].volumes.join("\n"))
    setEnv(presets[value].env?.join("\n") || "")
  }

  const composeYaml = useMemo(() => {
    const portsList = ports
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean)
    const volumesList = volumes
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean)
    const envList = env
      .split("\n")
      .map((e) => e.trim())
      .filter(Boolean)

    const serviceName = containerName || service

    const envSection =
      envList.length > 0
        ? `    environment:\n${envList.map((e) => `      - ${e}`).join("\n")}\n`
        : ""

    const portsSection =
      portsList.length > 0
        ? `    ports:\n${portsList.map((p) => `      - \"${p}\"`).join("\n")}\n`
        : ""

    const volumesSection =
      volumesList.length > 0
        ? `    volumes:\n${volumesList.map((v) => `      - ${v}`).join("\n")}\n`
        : ""

    return `version: \"3.9\"\nservices:\n  ${serviceName}:\n    image: ${presets[service].image}\n    container_name: ${serviceName}\n${portsSection}${volumesSection}${envSection}    restart: unless-stopped\n\nvolumes:\n${volumesList
      .filter((v) => v.includes(":") === false) // именованные тома
      .map((v) => `  ${v}: {}`)
      .join("\n") || "  # add volumes here if needed"}\n`
  }, [containerName, env, ports, service, volumes])

  const copyYaml = async () => {
    await navigator.clipboard.writeText(composeYaml)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    onChangeService(service)
    setContainerName("app-service")
    setCopied(false)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold">{t("tools.compose.title")}</h3>
          </div>
          <Badge variant="secondary">docker-compose.yml</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>{t("tools.compose.service")}</Label>
            <select
              className="w-full mt-1 rounded-md border border-border bg-background p-2"
              value={service}
              onChange={(e) => onChangeService(e.target.value as keyof typeof presets)}
            >
              <option value="nginx">nginx</option>
              <option value="postgres">postgres</option>
              <option value="redis">redis</option>
            </select>
          </div>

          <div>
            <Label>{t("tools.compose.containerName")}</Label>
            <Input
              className="mt-1"
              value={containerName}
              onChange={(e) => setContainerName(e.target.value)}
              placeholder="app-service"
            />
          </div>

          <div className="md:col-span-1">
            <Label>{t("tools.compose.ports")}</Label>
            <Textarea
              className="mt-1 font-mono"
              value={ports}
              onChange={(e) => setPorts(e.target.value)}
              placeholder="80:80\n443:443"
            />
          </div>

          <div className="md:col-span-1">
            <Label>{t("tools.compose.volumes")}</Label>
            <Textarea
              className="mt-1 font-mono"
              value={volumes}
              onChange={(e) => setVolumes(e.target.value)}
              placeholder="./data:/var/lib/data\npgdata:/var/lib/postgresql/data"
            />
          </div>

          <div className="md:col-span-2">
            <Label>{t("tools.compose.env")}</Label>
            <Textarea
              className="mt-1 font-mono"
              value={env}
              onChange={(e) => setEnv(e.target.value)}
              placeholder="KEY=value\nANOTHER=value"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={copyYaml} variant="default" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            {copied ? t("tools.compose.copied") : t("tools.compose.copy")}
          </Button>
          <Button onClick={reset} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("tools.compose.reset")}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <Tabs defaultValue="compose">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="compose">docker-compose.yml</TabsTrigger>
            <TabsTrigger value="help">{t("tools.compose.helpTab")}</TabsTrigger>
          </TabsList>
          <TabsContent value="compose" className="pt-4">
            <Textarea className="font-mono min-h-[320px]" value={composeYaml} readOnly />
          </TabsContent>
          <TabsContent value="help" className="pt-4">
            <Alert>
              <AlertDescription className="space-y-2 text-sm">
                <div>{t("tools.compose.help1")}</div>
                <div>{t("tools.compose.help2")}</div>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
