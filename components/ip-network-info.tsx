"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, Search, Globe, MapPin, Building2, Network, Server, Loader2, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface IPInfo {
  query: string
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
}

export function IPNetworkInfo() {
  const { t } = useLanguage()
  const [ipInput, setIpInput] = useState("")
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [myIp, setMyIp] = useState<string>("")
  const [copied, setCopied] = useState(false)

  // Получаем текущий IP при загрузке
  useEffect(() => {
    fetchMyIP()
  }, [])

  const fetchMyIP = async () => {
    try {
      // Используем Cloudflare Trace для получения IP
      const response = await fetch("https://www.cloudflare.com/cdn-cgi/trace")
      const text = await response.text()
      const ipMatch = text.match(/ip=([^\n]+)/)
      if (ipMatch) {
        setMyIp(ipMatch[1])
        setIpInput(ipMatch[1])
      }
    } catch (err) {
      console.error("Failed to fetch IP:", err)
    }
  }

  const fetchIPInfo = async (ip: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Используем ip-api.com (бесплатный, без API ключа)
      // Примечание: ip-api.com не поддерживает HTTPS для бесплатного плана, но работает через HTTP
      const query = ip || "myip"
      const response = await fetch(`https://ip-api.com/json/${query}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch IP information")
      }
      
      const data = await response.json()
      
      if (data.status === "fail") {
        throw new Error(data.message || "Invalid IP address")
      }
      
      setIpInfo(data)
    } catch (err: any) {
      setError(err.message || t("tools.ipInfo.error"))
      setIpInfo(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    if (ipInput.trim()) {
      fetchIPInfo(ipInput.trim())
    } else {
      fetchIPInfo("")
    }
  }

  const handleMyIP = () => {
    if (myIp) {
      setIpInput(myIp)
      fetchIPInfo(myIp)
    } else {
      fetchIPInfo("")
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getCountryFlag = (countryCode: string) => {
    if (!countryCode) return ""
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold">{t("tools.ipInfo.title")}</h3>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Input
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                placeholder={t("tools.ipInfo.placeholder")}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="font-mono"
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              {t("tools.ipInfo.search")}
            </Button>
            <Button onClick={handleMyIP} variant="outline" disabled={isLoading}>
              {t("tools.ipInfo.myIP")}
            </Button>
          </div>

          {myIp && (
            <div className="text-sm text-muted-foreground">
              {t("tools.ipInfo.currentIP")}: <span className="font-mono">{myIp}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* IP Information */}
      {ipInfo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Info */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Network className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">{t("tools.ipInfo.basicInfo")}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("tools.ipInfo.ipAddress")}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-semibold">{ipInfo.query}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(ipInfo.query)}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("tools.ipInfo.status")}</span>
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                  {ipInfo.status}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Location Info */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">{t("tools.ipInfo.location")}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("tools.ipInfo.country")}</span>
                <div className="flex items-center space-x-2">
                  <span>{getCountryFlag(ipInfo.countryCode)}</span>
                  <span className="font-semibold">{ipInfo.country}</span>
                  <Badge variant="outline">{ipInfo.countryCode}</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("tools.ipInfo.region")}</span>
                <span className="font-semibold">{ipInfo.regionName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("tools.ipInfo.city")}</span>
                <span className="font-semibold">{ipInfo.city}</span>
              </div>
              {ipInfo.zip && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("tools.ipInfo.zip")}</span>
                  <span className="font-semibold">{ipInfo.zip}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("tools.ipInfo.coordinates")}</span>
                <span className="font-mono text-sm">
                  {ipInfo.lat.toFixed(4)}, {ipInfo.lon.toFixed(4)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("tools.ipInfo.timezone")}</span>
                <span className="font-semibold">{ipInfo.timezone}</span>
              </div>
            </div>
          </Card>

          {/* Network Info */}
          <Card className="p-6 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Server className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">{t("tools.ipInfo.networkInfo")}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("tools.ipInfo.isp")}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-right">{ipInfo.isp}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(ipInfo.isp)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                {ipInfo.org && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t("tools.ipInfo.organization")}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-right">{ipInfo.org}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(ipInfo.org)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {ipInfo.as && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t("tools.ipInfo.asn")}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-semibold">{ipInfo.as}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(ipInfo.as)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Info Alert */}
      <Alert>
        <Globe className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p className="font-semibold">{t("tools.ipInfo.apiInfo.title")}</p>
            <p className="text-sm">{t("tools.ipInfo.apiInfo.description")}</p>
            <p className="text-xs text-muted-foreground">{t("tools.ipInfo.apiInfo.limit")}</p>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}