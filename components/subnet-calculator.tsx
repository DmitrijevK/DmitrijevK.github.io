"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Terminal, Info } from "lucide-react"

function ipToInt(ip: string): number | null {
  const parts = ip.split(".").map((p) => Number(p))
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) return null
  return ((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3]
}

function intToIp(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join(".")
}

function prefixToMask(prefix: number): number {
  return prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
}

function maskToWildcard(mask: number): string {
  const wildcard = (~mask) >>> 0
  return intToIp(wildcard)
}

function getClass(ipInt: number): string {
  const firstOctet = (ipInt >>> 24) & 255
  if (firstOctet >= 1 && firstOctet <= 126) return "A"
  if (firstOctet >= 128 && firstOctet <= 191) return "B"
  if (firstOctet >= 192 && firstOctet <= 223) return "C"
  if (firstOctet >= 224 && firstOctet <= 239) return "D (Multicast)"
  if (firstOctet >= 240 && firstOctet <= 255) return "E (Experimental)"
  return "-"
}

export function SubnetCalculator() {
  const { t } = useLanguage()
  const [cidr, setCidr] = useState("192.168.1.0/24")
  const [error, setError] = useState<string | null>(null)

  let result: {
    ip: string
    prefix: number
    netmask: string
    wildcard: string
    network: string
    broadcast: string
    firstHost: string | null
    lastHost: string | null
    hostCount: number
    usableHosts: number
    ipClass: string
  } | null = null

  try {
    const [ipPart, prefixPart] = cidr.split("/")
    const prefix = Number(prefixPart)
    const ipInt = ipToInt(ipPart)

    if (!ipPart || isNaN(prefix) || prefix < 0 || prefix > 32 || ipInt === null) {
      throw new Error("Invalid CIDR")
    }

    const maskInt = prefixToMask(prefix)
    const netInt = ipInt & maskInt
    const broadcastInt = netInt | (~maskInt >>> 0)
    const hostCount = prefix === 32 ? 1 : 2 ** (32 - prefix)
    const usableHosts = prefix >= 31 ? hostCount : Math.max(0, hostCount - 2)

    let firstHost: string | null = null
    let lastHost: string | null = null

    if (prefix === 32) {
      firstHost = intToIp(ipInt)
      lastHost = intToIp(ipInt)
    } else if (prefix === 31) {
      firstHost = intToIp(netInt)
      lastHost = intToIp(broadcastInt)
    } else if (hostCount >= 2) {
      firstHost = intToIp(netInt + 1)
      lastHost = intToIp(broadcastInt - 1)
    }

    result = {
      ip: ipPart,
      prefix,
      netmask: intToIp(maskInt),
      wildcard: maskToWildcard(maskInt),
      network: intToIp(netInt),
      broadcast: intToIp(broadcastInt),
      firstHost,
      lastHost,
      hostCount,
      usableHosts,
      ipClass: getClass(ipInt),
    }
    if (error) setError(null)
  } catch (e) {
    if (!error && cidr.trim() !== "") {
      setError(t("tools.subnet.error"))
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading text-2xl font-bold mb-1">
              {t("tools.subnet.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("tools.subnet.description")}
            </p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            CIDR
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="cidr">{t("tools.subnet.inputLabel")}</Label>
            <Input
              id="cidr"
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              placeholder="192.168.1.0/24"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </Card>

      {result && !error && (
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">
                {t("tools.subnet.networkInfo")}
              </h3>
              <div className="text-sm space-y-1 font-mono">
                <div>
                  <span className="text-muted-foreground">
                    {t("tools.subnet.ip")}:
                  </span>{" "}
                  {result.ip}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {t("tools.subnet.network")}:
                  </span>{" "}
                  {result.network}/{result.prefix}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {t("tools.subnet.broadcast")}:
                  </span>{" "}
                  {result.broadcast}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {t("tools.subnet.firstHost")}:
                  </span>{" "}
                  {result.firstHost ?? "-"}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {t("tools.subnet.lastHost")}:
                  </span>{" "}
                  {result.lastHost ?? "-"}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                {t("tools.subnet.maskInfo")}
              </h3>
              <div className="text-sm space-y-1 font-mono">
                <div>
                  <span className="text-muted-foreground">
                    {t("tools.subnet.prefix")}:
                  </span>{" "}
                  /{result.prefix}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {t("tools.subnet.netmask")}:
                  </span>{" "}
                  {result.netmask}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {t("tools.subnet.wildcard")}:
                  </span>{" "}
                  {result.wildcard}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {t("tools.subnet.hosts")}:
                  </span>{" "}
                  {result.hostCount}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {t("tools.subnet.usableHosts")}:
                  </span>{" "}
                  {result.usableHosts}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    {t("tools.subnet.class")}:
                  </span>{" "}
                  {result.ipClass}
                </div>
              </div>
            </div>
          </div>

          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription className="text-sm mt-2">
              {t("tools.subnet.note")}
            </AlertDescription>
          </Alert>
        </Card>
      )}
    </div>
  )
}

