"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import {
  Heart,
  Sparkles,
  ArrowRight,
  BarChart3,
  Star,
  Crown,
  Gem,
  Flower,
  Gift,
  Music,
  Utensils,
  Camera,
  Moon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import confetti from "canvas-confetti"
import HomeScreen from "./home-screen"

// Define the questions and fake statistics
const questions = [
  {
    id: 1,
    question: "Would you rather have a romantic dinner at a fancy restaurant or a picnic under the stars?",
    options: [
      { text: "Fancy restaurant", percentage: 42 },
      { text: "Picnic under stars", percentage: 58 },
    ],
  },
  {
    id: 2,
    question: "Would you rather receive flowers or a handwritten love letter?",
    options: [
      { text: "Flowers", percentage: 45 },
      { text: "Handwritten love letter", percentage: 55 },
    ],
  },
  {
    id: 3,
    question: "Would you rather have a passionate kiss in the rain or a sweet kiss at sunset?",
    options: [
      { text: "Kiss in the rain", percentage: 39 },
      { text: "Kiss at sunset", percentage: 61 },
    ],
  },
  {
    id: 4,
    question: "Would you rather have a surprise proposal or know it's coming?",
    options: [
      { text: "Surprise proposal", percentage: 72 },
      { text: "Know it's coming", percentage: 28 },
    ],
  },
  {
    id: 5,
    question: "Would you rather have a romantic bath together or a sensual massage?",
    options: [
      { text: "Romantic bath", percentage: 44 },
      { text: "Sensual massage", percentage: 56 },
    ],
  },
  {
    id: 6,
    question: "Would you rather have a partner who's romantic or funny?",
    options: [
      { text: "Romantic partner", percentage: 41 },
      { text: "Funny partner", percentage: 59 },
    ],
  },
  {
    id: 7,
    question: "Would you rather wear red lipstick or pink lip gloss for a date?",
    options: [
      { text: "Red lipstick", percentage: 58 },
      { text: "Pink lip gloss", percentage: 42 },
    ],
  },
  {
    id: 8,
    question:
      "👗 Would you rather wear a dress that you know your date will love — OR — one that you absolutely love, even if it's not their style at all?",
    options: [
      { text: "Wear a dress that your date will love", percentage: 57 },
      { text: "One that you absolutely love", percentage: 43 },
    ],
  },
  {
    id: 9,
    question:
      "Would you rather wear high heels that elevate your look or stylish flats that keep you comfortable throughout the night?",
    options: [
      { text: "High heels ", percentage: 51 },
      { text: "Stylish flats", percentage: 49 },
    ],
  },
  {
    id: 10,
    question: "Would you rather have a steamy make-out session or intimate cuddling?",
    options: [
      { text: "Steamy make-out", percentage: 47 },
      { text: "Intimate cuddling", percentage: 53 },
    ],
  },
  {
    id: 11,
    question: "Would you rather role-play as a doctor and patient or teacher and student?",
    options: [
      { text: "Doctor and patient", percentage: 43 },
      { text: "Teacher and student", percentage: 57 },
    ],
  },
  {
    id: 12,
    question: "Would you rather have a partner who's a great kisser or great at giving compliments?",
    options: [
      { text: "Great kisser", percentage: 68 },
      { text: "Great at compliments", percentage: 32 },
    ],
  },
  {
    id: 13,
    question: "Would you rather role-play as a police officer and prisoner who fall in love or a celebrity and fan?",
    options: [
      { text: "Police officer and prisoner", percentage: 61 },
      { text: "Celebrity and fan", percentage: 39 },
    ],
  },
  {
    id: 14,
    question: "Would you rather have a beach vacation or a mountain getaway with your partner?",
    options: [
      { text: "Beach vacation", percentage: 64 },
      { text: "Mountain getaway", percentage: 36 },
    ],
  },
  {
    id: 15,
    question: "Would you rather have morning intimacy or night intimacy?",
    options: [
      { text: "Morning intimacy", percentage: 38 },
      { text: "Night intimacy", percentage: 62 },
    ],
  },
  {
    id: 16,
    question: "Would you rather role-play as strangers meeting for the first time or childhood sweethearts reuniting?",
    options: [
      { text: "Strangers meeting", percentage: 54 },
      { text: "Childhood sweethearts", percentage: 46 },
    ],
  },
  {
    id: 17,
    question: "Would you rather have a partner who's dominant or submissive?",
    options: [
      { text: "Dominant", percentage: 47 },
      { text: "Submissive", percentage: 53 },
    ],
  },
  {
    id: 18,
    question:
      "Would you rather have a long-distance relationship with deep love or a convenient relationship with moderate love?",
    options: [
      { text: "Long-distance with deep love", percentage: 64 },
      { text: "Convenient with moderate love", percentage: 36 },
    ],
  },
  {
    id: 19,
    question: "Would you rather role-play as royalty and servant or vampire and human?",
    options: [
      { text: "Royalty and servant", percentage: 42 },
      { text: "Vampire and human", percentage: 58 },
    ],
  },
  {
    id: 20,
    question: "Would you rather have a spontaneous love life or a well-planned romantic routine?",
    options: [
      { text: "Spontaneous love life", percentage: 73 },
      { text: "Well-planned romantic routine", percentage: 27 },
    ],
  },
]

// Cute comments after selecting an answer
const cuteComments = [
  "Ooh, that's such a romantic choice! 💕",
  "I totally agree with you! So dreamy! ✨",
  "That's exactly what I would choose too! 💖",
  "You have amazing taste in romance! 👑",
  "That's the perfect choice for you! 🌸",
  "Your romantic sense is on point! 💃",
  "That's so sweet! I love it! 💘",
  "You're such a sweetheart for choosing that! 🍭",
  "That's the cutest choice ever! 🎀",
  "You're absolutely fabulous! 💅",
  "That's a gorgeous pick! You have great taste! 💋",
  "You're making me blush with that choice! 😊",
  "That's so dreamy and romantic! 💫",
  "You're such a romantic soul! 💌",
  "That's the perfect choice for a queen! 👸",
  "Your romantic side is showing! 💌",
  "That's so passionate and lovely! 🥂",
  "You have the sweetest taste! 🍬",
  "That's absolutely divine! 😍",
  "You're glowing with that choice! ✨",
]

// Background animation component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-50"></div>

      {/* Floating hearts */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-200"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 10}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
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
    </div>
  )
}

// Cute logo component
const CuteLogo = () => (
  <div className="flex items-center justify-center gap-2">
    <Heart className="h-6 w-6 text-pink-500 fill-pink-500" />
    <span className="text-xl font-bold text-pink-600">Would U Rather</span>
  </div>
)

// Get icon based on question index
const getQuestionIcon = (index: number) => {
  const icons = [Heart, Star, Crown, Gem, Flower, Gift, Music, Utensils, Camera, Moon]
  return icons[index % icons.length]
}

export default function WouldYouRatherGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [showFinalReport, setShowFinalReport] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [currentComment, setCurrentComment] = useState("")
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const { toast } = useToast()

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  // Trigger confetti on game completion
  useEffect(() => {
    if (gameComplete && showFinalReport) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const colors = ["#f472b6", "#fb7185", "#fdba74", "#c4b5fd"]

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

      const frame = () => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) return

        const particleCount = 50 * (timeLeft / duration)

        confetti({
          particleCount,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.5) },
          colors: colors,
          shapes: ["circle", "heart"],
          scalar: randomInRange(0.4, 1),
        })

        requestAnimationFrame(frame)
      }

      frame()
    }
  }, [gameComplete, showFinalReport])

  const handleStartGame = () => {
    setGameStarted(true)
  }

  const handleSelectOption = (optionIndex: number) => {
    if (showResults) return

    setSelectedOption(optionIndex)

    // Show random cute comment
    const randomComment = cuteComments[Math.floor(Math.random() * cuteComments.length)]
    setCurrentComment(randomComment)
    setShowComment(true)

    // Show toast notification with cute comment
    toast({
      title: "Lovely choice! ✨",
      description: randomComment,
      variant: "default",
    })

    // Hide comment after 2 seconds
    setTimeout(() => {
      setShowComment(false)
    }, 2000)

    setSelectedAnswers([...selectedAnswers, optionIndex])
    setShowResults(true)

    // Auto-advance to next question after a delay
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setShowResults(false)
        setSelectedOption(null)
      }, 3000)
    } else {
      setGameComplete(true)
    }
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setGameComplete(true)
      setShowFinalReport(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowResults(false)
      setSelectedOption(null)
    }
  }

  const handleViewReport = () => {
    setShowFinalReport(true)
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setShowResults(false)
    setGameComplete(false)
    setShowFinalReport(false)
    setGameStarted(false)
    setSelectedOption(null)
  }

  // Calculate how many of your answers match the majority
  const calculateMatchPercentage = () => {
    let matchCount = 0
    let answeredCount = 0

    selectedAnswers.forEach((selectedOption, index) => {
      const question = questions[index]
      if (question && question.options) {
        answeredCount++
        const majorityOption = question.options[0].percentage > question.options[1].percentage ? 0 : 1

        if (selectedOption === majorityOption) {
          matchCount++
        }
      }
    })

    // Avoid division by zero
    return answeredCount > 0 ? Math.round((matchCount / answeredCount) * 100) : 0
  }

  // If game hasn't started, show home screen
  if (!gameStarted) {
    return <HomeScreen onStart={handleStartGame} />
  }

  if (showFinalReport) {
    const matchPercentage = calculateMatchPercentage()
    const QuestionIcon = getQuestionIcon(currentQuestionIndex)

    return (
      <>
        <AnimatedBackground />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
          <Card className="border-2 border-pink-300 shadow-lg shadow-pink-200/50 bg-white/90 backdrop-blur-md">
            <CardHeader className="text-center bg-gradient-to-r from-pink-400 to-rose-300 rounded-t-lg">
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2 text-white">
                <Sparkles className="h-6 w-6" />
                Your Results
                <Sparkles className="h-6 w-6" />
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">How romantic are your choices?</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <motion.h3
                  className="text-2xl font-bold text-pink-600"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                    delay: 0.3,
                  }}
                >
                  You think like {matchPercentage}% of other people
                </motion.h3>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-lg py-1 px-4 border-2",
                    matchPercentage > 75
                      ? "border-pink-500 text-pink-600 bg-pink-50"
                      : matchPercentage > 50
                        ? "border-rose-400 text-rose-500 bg-rose-50"
                        : matchPercentage > 25
                          ? "border-orange-300 text-orange-500 bg-orange-50"
                          : "border-purple-300 text-purple-500 bg-purple-50",
                  )}
                >
                  {matchPercentage > 75
                    ? "Romantic Soulmate"
                    : matchPercentage > 50
                      ? "Love Enthusiast"
                      : matchPercentage > 25
                        ? "Passion Explorer"
                        : "Unique Romantic"}
                </Badge>
                <p className="text-gray-600 mt-2">
                  {matchPercentage > 75
                    ? "You're totally in sync with romantic choices! You're everyone's dream partner!"
                    : matchPercentage > 50
                      ? "You have a great sense of romance with just the right amount of personal flair!"
                      : matchPercentage > 25
                        ? "You have your own unique romantic style that sets you apart from the crowd!"
                        : "You're a true romantic rebel with a completely unique perspective on love!"}
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="font-semibold text-lg flex items-center gap-2 text-pink-600">
                  <BarChart3 className="h-5 w-5 text-pink-500" />
                  Your Choices
                </h3>

                <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
                  {questions.map((question, index) => {
                    const selectedOption = selectedAnswers[index]
                    const selectedPercentage = question.options[selectedOption].percentage
                    const isInMajority =
                      (selectedOption === 0 && question.options[0].percentage > question.options[1].percentage) ||
                      (selectedOption === 1 && question.options[1].percentage > question.options[0].percentage)
                    const QuestionIcon = getQuestionIcon(index)

                    return (
                      <motion.div
                        key={index}
                        className="space-y-1 bg-pink-50/70 p-3 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-start gap-2">
                          <QuestionIcon className="h-5 w-5 text-pink-500 shrink-0 mt-1" />
                          <p className="text-sm font-medium text-gray-700">{question.question}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-7">
                          <div className="text-sm font-medium w-32 truncate text-pink-600">
                            {question.options[selectedOption].text}
                          </div>
                          <div className="relative flex-1 h-2 bg-pink-100 rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "absolute top-0 left-0 h-full rounded-full",
                                isInMajority ? "bg-pink-400" : "bg-rose-400",
                              )}
                              style={{ width: `${selectedPercentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-pink-600">{selectedPercentage}%</span>
                          {isInMajority ? (
                            <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
                          ) : (
                            <Star className="h-4 w-4 text-rose-400 fill-rose-400" />
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center p-6 pt-2 gap-4">
              <Button
                onClick={handleRestart}
                className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 w-full"
                size="lg"
              >
                <Heart className="mr-2 h-4 w-4 fill-white" />
                Play Again
              </Button>

              <div className="text-center text-sm text-pink-500 italic mt-2">
                "❤️ Love is not finding someone to live with, it's finding someone you can't live without. ❤️"
                <div className="font-bold text-pink-600 mt-1">By - Jayu Kun</div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </>
    )
  }

  return (
    <>
      <AnimatedBackground />
      <div className="w-full max-w-2xl relative">
        <div className="mb-4 flex justify-between items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-pink-600 border-pink-300 px-3 py-1 bg-white/80">
                  <CuteLogo />
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="bg-pink-50 border-pink-200">
                <p>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Progress value={(currentQuestionIndex / questions.length) * 100} className="w-1/2 h-2 bg-pink-100" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-pink-300 shadow-lg shadow-pink-200/30 bg-white/90 backdrop-blur-md">
              <CardHeader className="text-center bg-gradient-to-r from-pink-400 to-rose-300 rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2 text-white">
                  {React.createElement(getQuestionIcon(currentQuestionIndex), { className: "h-6 w-6" })}
                  Would U Rather
                </CardTitle>
                <CardDescription className="text-white/90">Choose the option that matches your heart!</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="text-xl font-medium text-center mb-6 text-pink-600">{currentQuestion.question}</div>

                {currentQuestion.options.map((option, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mb-4">
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full p-6 h-auto text-lg justify-between group relative overflow-hidden border-2 rounded-xl",
                        selectedOption === index
                          ? "border-pink-400 bg-pink-50 text-pink-700"
                          : "border-pink-200 hover:border-pink-300 bg-white hover:bg-pink-50/50 text-gray-700",
                      )}
                      onClick={() => handleSelectOption(index)}
                      disabled={showResults && selectedOption !== index}
                    >
                      <span className="z-10">{option.text}</span>

                      {showResults && (
                        <motion.div
                          className="absolute right-4 flex items-center gap-2 z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Badge variant="outline" className="bg-pink-100/80 border-pink-300 text-pink-600">
                            {option.percentage}%
                          </Badge>
                        </motion.div>
                      )}

                      {showResults && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-pink-200/40 to-rose-200/40"
                          initial={{ width: 0 }}
                          animate={{ width: `${option.percentage}%` }}
                          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                        />
                      )}

                      {selectedOption === index && (
                        <motion.div
                          className="absolute inset-0 bg-pink-100/30"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      {!showResults && (
                        <Heart className="w-5 h-5 text-pink-300 group-hover:text-pink-500 group-hover:fill-pink-200" />
                      )}
                    </Button>
                  </motion.div>
                ))}

                <AnimatePresence>
                  {showComment && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-20 bg-white/90 border-2 border-pink-300 text-pink-600 p-3 rounded-lg max-w-md text-center shadow-lg shadow-pink-200/30"
                    >
                      {currentComment}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              <CardFooter className="flex justify-between p-6 pt-2">
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="ml-auto"
                  >
                    <Button
                      onClick={handleNextQuestion}
                      className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500"
                      size="lg"
                    >
                      {isLastQuestion ? "View Results" : "Next Question"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}

                {gameComplete && !showResults && (
                  <Button
                    onClick={handleViewReport}
                    className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500"
                    size="lg"
                  >
                    View Your Results
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="text-center text-sm text-pink-500 italic mt-4">
          "❤️ Every love story is beautiful, but ours is my favorite! ❤️"
          <div className="font-bold text-pink-600">By - Jayu Kun</div>
        </div>
      </div>
    </>
  )
}
