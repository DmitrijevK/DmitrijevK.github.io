"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, RefreshCw, Code, Hash } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Base64HashTool() {
  const { t } = useLanguage()
  const [input, setInput] = useState("")
  const [base64Encoded, setBase64Encoded] = useState("")
  const [base64Decoded, setBase64Decoded] = useState("")
  const [sha256Hash, setSha256Hash] = useState("")
  const [sha512Hash, setSha512Hash] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const encodeBase64 = (text: string) => {
    try {
      return btoa(unescape(encodeURIComponent(text)))
    } catch (e) {
      return ""
    }
  }

  const decodeBase64 = (base64: string) => {
    try {
      return decodeURIComponent(escape(atob(base64)))
    } catch (e) {
      return ""
    }
  }

  const hashSHA256 = async (text: string) => {
    if (!text) return ""
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  const hashSHA512 = async (text: string) => {
    if (!text) return ""
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest("SHA-512", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  const handleInputChange = async (value: string) => {
    setInput(value)
    
    if (value) {
      // Base64 Encode
      setBase64Encoded(encodeBase64(value))
      
      // Base64 Decode (try to decode if it looks like base64)
      try {
        const decoded = decodeBase64(value)
        setBase64Decoded(decoded)
      } catch {
        setBase64Decoded("")
      }
      
      // SHA hashes
      const sha256 = await hashSHA256(value)
      const sha512 = await hashSHA512(value)
      setSha256Hash(sha256)
      setSha512Hash(sha512)
    } else {
      setBase64Encoded("")
      setBase64Decoded("")
      setSha256Hash("")
      setSha512Hash("")
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    if (text) {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  const clearAll = () => {
    setInput("")
    setBase64Encoded("")
    setBase64Decoded("")
    setSha256Hash("")
    setSha512Hash("")
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Code className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold">{t("tools.base64.input")}</h3>
          </div>
          <Textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={t("tools.base64.inputPlaceholder")}
            className="font-mono min-h-[120px]"
          />
          <div className="flex justify-end">
            <Button onClick={clearAll} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t("tools.base64.clear")}
            </Button>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="base64" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="base64">Base64</TabsTrigger>
          <TabsTrigger value="hash">Hash</TabsTrigger>
        </TabsList>

        {/* Base64 Tab */}
        <TabsContent value="base64" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  <Label className="text-lg font-semibold">{t("tools.base64.encode")}</Label>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(base64Encoded, "encode")}
                  disabled={!base64Encoded}
                >
                  {copied === "encode" ? (
                    <span className="text-green-600">{t("tools.base64.copied")}</span>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      {t("tools.base64.copy")}
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                value={base64Encoded}
                readOnly
                placeholder={t("tools.base64.encodePlaceholder")}
                className="font-mono min-h-[100px]"
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  <Label className="text-lg font-semibold">{t("tools.base64.decode")}</Label>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(base64Decoded, "decode")}
                  disabled={!base64Decoded}
                >
                  {copied === "decode" ? (
                    <span className="text-green-600">{t("tools.base64.copied")}</span>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      {t("tools.base64.copy")}
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                value={base64Decoded}
                readOnly
                placeholder={t("tools.base64.decodePlaceholder")}
                className="font-mono min-h-[100px]"
              />
            </div>
          </Card>
        </TabsContent>

        {/* Hash Tab */}
        <TabsContent value="hash" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Hash className="w-5 h-5 text-purple-600" />
                  <Label className="text-lg font-semibold">SHA-256</Label>
                  <Badge variant="secondary">256-bit</Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(sha256Hash, "sha256")}
                  disabled={!sha256Hash}
                >
                  {copied === "sha256" ? (
                    <span className="text-green-600">{t("tools.base64.copied")}</span>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      {t("tools.base64.copy")}
                    </>
                  )}
                </Button>
              </div>
              <Input
                value={sha256Hash}
                readOnly
                placeholder={t("tools.base64.hashPlaceholder")}
                className="font-mono"
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Hash className="w-5 h-5 text-purple-600" />
                  <Label className="text-lg font-semibold">SHA-512</Label>
                  <Badge variant="secondary">512-bit</Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(sha512Hash, "sha512")}
                  disabled={!sha512Hash}
                >
                  {copied === "sha512" ? (
                    <span className="text-green-600">{t("tools.base64.copied")}</span>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      {t("tools.base64.copy")}
                    </>
                  )}
                </Button>
              </div>
              <Input
                value={sha512Hash}
                readOnly
                placeholder={t("tools.base64.hashPlaceholder")}
                className="font-mono"
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}