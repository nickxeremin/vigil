import React, { createContext, useContext } from "react"

import { Org } from "@vigil/domain"

type SessionContextValue = {
  org: Org
}

const OrgContext = createContext<SessionContextValue | null>(null)

interface SessionProviderProps {
  children: React.ReactNode
  value: SessionContextValue
}

export function OrgProvider({ children, value }: SessionProviderProps) {
  return <OrgContext value={value}>{children}</OrgContext>
}

export function useCurrentOrg() {
  const ctx = useContext(OrgContext)

  if (!ctx) throw new Error("useCurrentOrg must be used inside OrgProvider")

  return ctx.org
}
