export type Role = "product-owner" | "delivery" | "salesforce" | "restaurant-tech"

export const TAG_MAP: Record<string, Role> = {
  // Product Owner keywords
  "product owner": "product-owner",
  "product manager": "product-owner",
  "product management": "product-owner",
  roadmap: "product-owner",
  backlog: "product-owner",
  "user stories": "product-owner",
  stakeholder: "product-owner",
  requirements: "product-owner",
  vision: "product-owner",

  // Delivery keywords
  delivery: "delivery",
  "project manager": "delivery",
  "scrum master": "delivery",
  agile: "delivery",
  sprint: "delivery",
  "team lead": "delivery",
  operations: "delivery",
  execution: "delivery",

  // Leadership & Operations Strategy keywords (expanded)
  "solutions leader": "delivery",
  "operations leader": "delivery",
  "business strategy": "delivery",
  "process design": "delivery",
  "delivery management": "delivery",
  implementation: "delivery",
  director: "delivery",

  // Salesforce keywords
  salesforce: "salesforce",
  crm: "salesforce",
  apex: "salesforce",
  lightning: "salesforce",
  "force.com": "salesforce",
  "sales cloud": "salesforce",
  "service cloud": "salesforce",

  // Restaurant Tech keywords
  restaurant: "restaurant-tech",
  hospitality: "restaurant-tech",
  pos: "restaurant-tech",
  "point of sale": "restaurant-tech",
  "food service": "restaurant-tech",
  menu: "restaurant-tech",
  kitchen: "restaurant-tech",
}

// Non-destructive export for external use if needed
export const leadershipKeywords = [
  "solutions leader",
  "operations leader",
  "business strategy",
  "process design",
  "delivery management",
  "implementation",
  "director",
]

export function detectRole(text: string): Role {
  const lowerText = text.toLowerCase()
  const scores: Record<Role, number> = {
    "product-owner": 0,
    delivery: 0,
    salesforce: 0,
    "restaurant-tech": 0,
  }

  Object.entries(TAG_MAP).forEach(([keyword, role]) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi")
    const matches = lowerText.match(regex)
    if (matches) {
      scores[role] += matches.length
    }
  })

  const maxScore = Math.max(...Object.values(scores))
  if (maxScore === 0) return "product-owner" // default

  return (Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as Role) || "product-owner"
}
