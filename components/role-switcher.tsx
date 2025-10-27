"use client"

import type { Role } from "@/lib/roles"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RoleSwitcherProps {
  currentRole: Role | null
  onRoleChange: (role: Role | null) => void
  translations: any
}

export function RoleSwitcher({ currentRole, onRoleChange, translations }: RoleSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{translations.role.label}:</span>
      <Select
        value={currentRole || "all"}
        onValueChange={(value) => onRoleChange(value === "all" ? null : (value as Role))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{translations.role.all}</SelectItem>
          <SelectItem value="product-owner">{translations.role["product-owner"]}</SelectItem>
          <SelectItem value="delivery">{translations.role.delivery}</SelectItem>
          <SelectItem value="salesforce">{translations.role.salesforce}</SelectItem>
          <SelectItem value="restaurant-tech">{translations.role["restaurant-tech"]}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
