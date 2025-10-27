import type { Role } from "./roles"

export interface Taggable {
  tags?: Role[]
}

export function sortByRole<T extends Taggable>(items: T[], role: Role | null): T[] {
  if (!role) return items

  return [...items].sort((a, b) => {
    const aHasTag = a.tags?.includes(role) ? 1 : 0
    const bHasTag = b.tags?.includes(role) ? 1 : 0
    return bHasTag - aHasTag
  })
}

export function scoreByRole(tags: Role[] | undefined, role: Role | null): number {
  if (!role || !tags) return 0
  return tags.includes(role) ? 1 : 0
}
