"use client"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw, Check, Shield, Lock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz"
const NUMBERS = "0123456789"
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?"
const SIMILAR_CHARS = "0O1lI"

interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeSimilar: boolean
  excludeAmbiguous: boolean
}

const defaultOptions: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeSimilar: false,
  excludeAmbiguous: false,
}

export function PasswordGenerator() {
  const { t } = useLanguage()
  const [options, setOptions] = useState<PasswordOptions>(defaultOptions)
  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState<"weak" | "medium" | "strong" | "very-strong">("weak")
  const [copied, setCopied] = useState(false)

  const calculateStrength = useCallback((pwd: string): "weak" | "medium" | "strong" | "very-strong" => {
    if (pwd.length < 8) return "weak"
    
    let score = 0
    if (pwd.length >= 8) score += 1
    if (pwd.length >= 12) score += 1
    if (pwd.length >= 16) score += 1
    if (/[a-z]/.test(pwd)) score += 1
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1
    
    if (score <= 2) return "weak"
    if (score <= 4) return "medium"
    if (score <= 6) return "strong"
    return "very-strong"
  }, [])

  const generatePassword = useCallback(() => {
    let charset = ""
    
    if (options.includeUppercase) {
      charset += options.excludeSimilar ? UPPERCASE.replace(/[O1I]/g, "") : UPPERCASE
    }
    if (options.includeLowercase) {
      charset += options.excludeSimilar ? LOWERCASE.replace(/[l1]/g, "") : LOWERCASE
    }
    if (options.includeNumbers) {
      charset += options.excludeSimilar ? NUMBERS.replace(/[01]/g, "") : NUMBERS
    }
    if (options.includeSymbols) {
      charset += SYMBOLS
    }

    if (charset.length === 0) {
      setPassword("")
      setStrength("weak")
      return
    }

    // Ensure at least one character from each selected category
    let generated = ""
    const categories: string[] = []
    
    if (options.includeUppercase) {
      const upper = options.excludeSimilar ? UPPERCASE.replace(/[O1I]/g, "") : UPPERCASE
      if (upper.length > 0) categories.push(upper)
    }
    if (options.includeLowercase) {
      const lower = options.excludeSimilar ? LOWERCASE.replace(/[l1]/g, "") : LOWERCASE
      if (lower.length > 0) categories.push(lower)
    }
    if (options.includeNumbers) {
      const nums = options.excludeSimilar ? NUMBERS.replace(/[01]/g, "") : NUMBERS
      if (nums.length > 0) categories.push(nums)
    }
    if (options.includeSymbols) {
      categories.push(SYMBOLS)
    }

    // Add at least one character from each category
    categories.forEach((cat) => {
      generated += cat[Math.floor(Math.random() * cat.length)]
    })

    // Fill the rest randomly
    for (let i = generated.length; i < options.length; i++) {
      generated += charset[Math.floor(Math.random() * charset.length)]
    }

    // Shuffle the password
    const shuffled = generated.split("").sort(() => Math.random() - 0.5).join("")
    
    setPassword(shuffled)
    setStrength(calculateStrength(shuffled))
  }, [options, calculateStrength])

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const updateOption = <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
    setOptions((prev) => {
      const updated = { ...prev, [key]: value }
      // Ensure at least one character type is selected
      if (
        key !== "length" &&
        key !== "excludeSimilar" &&
        key !== "excludeAmbiguous" &&
        !updated.includeUppercase &&
        !updated.includeLowercase &&
        !updated.includeNumbers &&
        !updated.includeSymbols
      ) {
        return prev
      }
      return updated
    })
  }

  const getStrengthColor = () => {
    switch (strength) {
      case "weak":
        return "text-red-600 dark:text-red-400"
      case "medium":
        return "text-orange-600 dark:text-orange-400"
      case "strong":
        return "text-yellow-600 dark:text-yellow-400"
      case "very-strong":
        return "text-green-600 dark:text-green-400"
    }
  }

  const getStrengthLabel = () => {
    switch (strength) {
      case "weak":
        return t("tools.password.strength.weak")
      case "medium":
        return t("tools.password.strength.medium")
      case "strong":
        return t("tools.password.strength.strong")
      case "very-strong":
        return t("tools.password.strength.veryStrong")
    }
  }

  return (
    <div className="space-y-6">
      {/* Password Display */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-2">
            <Lock className="w-5 h-5 text-purple-600" />
            <Label className="text-lg font-semibold">{t("tools.password.generated")}</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Input
              value={password}
              readOnly
              className="font-mono text-lg"
              placeholder={t("tools.password.placeholder")}
            />
            <Button onClick={copyToClipboard} disabled={!password} size="icon">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button onClick={generatePassword} variant="outline" size="icon">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>

          {password && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{t("tools.password.strength.label")}:</span>
                <Badge className={getStrengthColor()}>{getStrengthLabel()}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {t("tools.password.length")}: {password.length}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Options */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold">{t("tools.password.options")}</h3>
          </div>

          {/* Length Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{t("tools.password.length")}</Label>
              <Badge variant="secondary">{options.length}</Badge>
            </div>
            <Slider
              value={[options.length]}
              onValueChange={(value) => updateOption("length", value[0])}
              min={4}
              max={128}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>4</span>
              <span>64</span>
              <span>128</span>
            </div>
          </div>

          {/* Character Types */}
          <div className="space-y-4">
            <Label className="text-base">{t("tools.password.characterTypes")}</Label>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="uppercase">{t("tools.password.uppercase")}</Label>
                <Badge variant="outline">A-Z</Badge>
              </div>
              <Switch
                id="uppercase"
                checked={options.includeUppercase}
                onCheckedChange={(checked) => updateOption("includeUppercase", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="lowercase">{t("tools.password.lowercase")}</Label>
                <Badge variant="outline">a-z</Badge>
              </div>
              <Switch
                id="lowercase"
                checked={options.includeLowercase}
                onCheckedChange={(checked) => updateOption("includeLowercase", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="numbers">{t("tools.password.numbers")}</Label>
                <Badge variant="outline">0-9</Badge>
              </div>
              <Switch
                id="numbers"
                checked={options.includeNumbers}
                onCheckedChange={(checked) => updateOption("includeNumbers", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="symbols">{t("tools.password.symbols")}</Label>
                <Badge variant="outline">!@#$%</Badge>
              </div>
              <Switch
                id="symbols"
                checked={options.includeSymbols}
                onCheckedChange={(checked) => updateOption("includeSymbols", checked)}
              />
            </div>
          </div>

          {/* Advanced Options */}
          <div className="space-y-4 pt-4 border-t border-border">
            <Label className="text-base">{t("tools.password.advanced")}</Label>
            
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="excludeSimilar">{t("tools.password.excludeSimilar")}</Label>
                <p className="text-xs text-muted-foreground mt-1">{t("tools.password.excludeSimilarDesc")}</p>
              </div>
              <Switch
                id="excludeSimilar"
                checked={options.excludeSimilar}
                onCheckedChange={(checked) => updateOption("excludeSimilar", checked)}
              />
            </div>
          </div>

          {/* Generate Button */}
          <Button onClick={generatePassword} className="w-full" size="lg">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("tools.password.generate")}
          </Button>
        </div>
      </Card>

      {/* Security Tips */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p className="font-semibold">{t("tools.password.tips.title")}</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>{t("tools.password.tips.length")}</li>
              <li>{t("tools.password.tips.complexity")}</li>
              <li>{t("tools.password.tips.unique")}</li>
              <li>{t("tools.password.tips.manager")}</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}