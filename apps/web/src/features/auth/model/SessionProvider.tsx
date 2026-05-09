import React, { createContext, useContext } from "react"

import { Session, User } from "@vigil/domain"

type SessionContextValue = {
  user: User
  session: Session
}

const SessionContext = createContext<SessionContextValue | null>(null)

interface SessionProviderProps {
  children: React.ReactNode
  value: SessionContextValue
}

export function SessionProvider({ children, value }: SessionProviderProps) {
  return <SessionContext value={value}>{children}</SessionContext>
}

export function useCurrentUser() {
  const ctx = useContext(SessionContext)

  if (!ctx)
    throw new Error("useCurrentUser must be used inside authenticated route")

  return ctx.user
}

export function useCurrentSession() {
  const ctx = useContext(SessionContext)

  if (!ctx)
    throw new Error("useCurrentSession must be used inside authenticated route")

  return ctx.session
}
