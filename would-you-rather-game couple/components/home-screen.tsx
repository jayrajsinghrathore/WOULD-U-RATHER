"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Sparkles } from "lucide-react"

// Background animation component with enhanced effects
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-100 to-pink-100"></div>

      {/* Floating hearts */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 10 - 5, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
            rotate: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Heart fill="currentColor" />
        </motion.div>
      ))}

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #ff9a9e)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
        }}
      />
    </div>
  )
}

// Cute logo component
const CuteLogo = () => (
  <motion.div
    className="flex items-center justify-center gap-2 mb-4"
    animate={{
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    }}
  >
    <div className="relative">
      <Heart className="h-10 w-10 text-pink-500 fill-pink-500" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Heart className="h-6 w-6 text-white fill-white" />
      </motion.div>
    </div>
    <span className="text-2xl font-bold text-pink-600">Would U Rather</span>
  </motion.div>
)

// Couple avatars component
const CoupleAvatars = () => (
  <motion.div
    className="flex justify-center -space-x-4 mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.5 }}
  >
    <motion.div
      className="w-20 h-20 rounded-full bg-pink-200 border-2 border-white shadow-lg overflow-hidden"
      animate={{ x: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
    >
      <img src="/placeholder.svg?height=80&width=80" alt="Girl avatar" className="w-full h-full object-cover" />
    </motion.div>
    <motion.div
      className="w-20 h-20 rounded-full bg-blue-200 border-2 border-white shadow-lg overflow-hidden z-10"
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
    >
      <Heart className="w-full h-full text-pink-400 fill-pink-400" />
    </motion.div>
    <motion.div
      className="w-20 h-20 rounded-full bg-pink-200 border-2 border-white shadow-lg overflow-hidden"
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
    >
      <img src="/placeholder.svg?height=80&width=80" alt="Boy avatar" className="w-full h-full object-cover" />
    </motion.div>
  </motion.div>
)

export default function HomeScreen({ onStart }: { onStart: () => void }) {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null)

  return (
    <>
      <AnimatedBackground />

      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-6"
        >
          <CuteLogo />

          <CoupleAvatars />

          <motion.h2
            className="text-2xl md:text-3xl font-bold text-pink-600 mb-2"
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            The Cutest Couple Game Ever!
          </motion.h2>

          <motion.p
            className="text-lg text-pink-500 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Romantic choices, sweet dilemmas, and cute couple questions await you!
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Card className="border-0 overflow-hidden rounded-2xl">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setHoveredButton(0)}
              onHoverEnd={() => setHoveredButton(null)}
            >
              <Button
                onClick={onStart}
                className="w-full p-8 text-xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 border-0 relative z-10 rounded-xl"
              >
                <Heart className="w-5 h-5 mr-2 fill-white" /> Yes, I'm ready for some fun!
              </Button>

              {hoveredButton === 0 && (
                <motion.div
                  className="absolute inset-0 bg-white/20 z-0 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              <motion.div
                className="absolute -inset-[2px] rounded-xl z-0 bg-gradient-to-r from-pink-300 to-rose-300"
                animate={{
                  background: [
                    "linear-gradient(45deg, #f9a8d4, #fda4af)",
                    "linear-gradient(45deg, #fda4af, #f9a8d4)",
                    "linear-gradient(45deg, #f9a8d4, #fda4af)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </Card>

          <Card className="border-0 overflow-hidden rounded-2xl">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setHoveredButton(1)}
              onHoverEnd={() => setHoveredButton(null)}
            >
              <Button
                onClick={onStart}
                className="w-full p-8 text-xl font-bold bg-gradient-to-r from-rose-300 to-pink-300 hover:from-rose-400 hover:to-pink-400 border-0 relative z-10 rounded-xl"
              >
                <motion.span
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-5 h-5 mr-2" /> Let's play something cute!
                </motion.span>
              </Button>

              {hoveredButton === 1 && (
                <motion.div
                  className="absolute inset-0 bg-white/20 z-0 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              <motion.div
                className="absolute -inset-[2px] rounded-xl z-0 bg-gradient-to-r from-rose-200 to-pink-200"
                animate={{
                  background: [
                    "linear-gradient(45deg, #fda4af, #f9a8d4)",
                    "linear-gradient(45deg, #f9a8d4, #fda4af)",
                    "linear-gradient(45deg, #fda4af, #f9a8d4)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </Card>
        </motion.div>

        <motion.div
          className="mt-8 text-pink-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="italic text-sm">
            ❤️ "Love is not about how many days, months or years you've been together, it's all about how much you love
            each other every day." ❤️
          </p>
          <p className="font-bold text-pink-500 mt-1">By - Jayu Kun</p>
        </motion.div>
      </div>
    </>
  )
}
