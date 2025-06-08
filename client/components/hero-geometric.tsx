"use client";

import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

function CodingSymbol({
  className,
  delay = 0,
  symbol,
  size = 60,
  rotate = 0,
  color = "text-gray-400",
}: {
  className?: string;
  delay?: number;
  symbol: string;
  size?: number;
  rotate?: number;
  color?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
        rotate: rotate - 20,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
        scale: 1,
      }}
      transition={{
        duration: 2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn("absolute select-none pointer-events-none", className)}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [rotate, rotate + 5, rotate],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: delay * 2,
        }}
        style={{
          fontSize: size,
        }}
        className={cn(
          "font-mono font-bold drop-shadow-lg",
          color,
          "hover:scale-110 transition-transform duration-300"
        )}
      >
        {symbol}
      </motion.div>
    </motion.div>
  );
}

export default function HeroGeometric({
  badge = "Code Arena",
  title1 = "Elevate Your",
  title2 = "Coding Skills",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const router = useRouter();

  const handleStartBattle = () => {
    router.push("/home");
  };

  const handleWatchDemo = () => {
    router.push("/demo");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Coding symbols floating around */}
      <div className="absolute inset-0 overflow-hidden">
        <CodingSymbol
          delay={0.2}
          symbol="#"
          size={80}
          rotate={15}
          color="text-blue-400/70"
          className="left-[5%] top-[15%]"
        />
        <CodingSymbol
          delay={0.2}
          symbol="#include"
          size={50}
          rotate={-15}
          color="text-blue-400/70"
          className="left-[21%] top-[15%]"
        />

        <CodingSymbol
          delay={0.4}
          symbol="<"
          size={70}
          rotate={-10}
          color="text-green-500/70"
          className="right-[8%] top-[15%]"
        />
        <CodingSymbol
          delay={0.4}
          symbol="System.out.println"
          size={40}
          rotate={+10}
          color="text-green-500/70"
          className="right-[10%] top-[23%]"
        />

        <CodingSymbol
          delay={0.6}
          symbol="?"
          size={60}
          rotate={25}
          color="text-purple-500/70"
          className="left-[10%] bottom-[25%]"
        />
        <CodingSymbol
          delay={0.6}
          symbol="go func"
          size={40}
          rotate={5}
          color="text-purple-500/70"
          className="left-[17%] bottom-[47%]"
        />
        <CodingSymbol
          delay={0.6}
          symbol="=="
          size={40}
          rotate={5}
          color="text-purple-500/70"
          className="left-[87%] bottom-[47%]"
        />

        <CodingSymbol
          delay={0.3}
          symbol="/"
          size={90}
          rotate={-20}
          color="text-red-400/70"
          className="right-[5%] bottom-[30%]"
        />
        <CodingSymbol
          delay={0.3}
          symbol="fn"
          size={50}
          rotate={-20}
          color="text-red-400/70"
          className="right-[18%] bottom-[45%]"
        />

        <CodingSymbol
          delay={0.8}
          symbol="*"
          size={80}
          rotate={45}
          color="text-yellow-500/70"
          className="left-[15%] top-[10%]"
        />

        <CodingSymbol
          delay={0.5}
          symbol="+"
          size={65}
          rotate={-15}
          color="text-indigo-500/70"
          className="right-[15%] top-[60%]"
        />
        <CodingSymbol
          delay={0.5}
          symbol="console.log"
          size={35}
          rotate={-15}
          color="text-indigo-500/70"
          className="right-[15%] top-[80%]"
        />

        <CodingSymbol
          delay={0.7}
          symbol="&"
          size={55}
          rotate={30}
          color="text-pink-500/70"
          className="left-[19%] top-[65%]"
        />
        <CodingSymbol
          delay={0.7}
          symbol="def"
          size={55}
          rotate={30}
          color="text-green-500/70"
          className="left-[21%] top-[80%]"
        />

        <CodingSymbol
          delay={0.9}
          symbol="$"
          size={75}
          rotate={-25}
          color="text-cyan-500/70"
          className="right-[17%] top-[7%]"
        />

        <CodingSymbol
          delay={1.0}
          symbol=">"
          size={65}
          rotate={20}
          color="text-emerald-500/70"
          className="left-[8%] top-[50%]"
        />

        <CodingSymbol
          delay={0.1}
          symbol="-"
          size={40}
          rotate={-5}
          color="text-orange-500/70"
          className="right-[12%] bottom-[15%]"
        />

        <CodingSymbol
          delay={1.1}
          symbol="{"
          size={85}
          rotate={-30}
          color="text-violet-500/70"
          className="left-[3%] bottom-[10%]"
        />

        <CodingSymbol
          delay={0.6}
          symbol="}"
          size={85}
          rotate={35}
          color="text-teal-500/70"
          className="right-[3%] bottom-[50%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg mb-8 md:mb-12"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            <span className="text-sm text-gray-700 tracking-wide font-medium">
              {badge}
            </span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600",
                  pacifico.className
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-12 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
              1v1 Code Arena: Bringing Nerd Rage to a Whole New Level!
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleStartBattle}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
              >
                Start Coding Battle
              </button>

              <button
                onClick={handleWatchDemo}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-full border border-gray-200 hover:bg-white hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
    </div>
  );
}
