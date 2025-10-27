"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ReactNode } from "react"

interface ExpandProps {
  isOpen: boolean
  children: ReactNode
}

export function Expand({ isOpen, children }: ExpandProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
