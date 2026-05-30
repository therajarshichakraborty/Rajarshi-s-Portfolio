"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const GREETINGS = [
  { hello: "Hello", name: "Rajarshi Chakraborty" },
  { hello: "নমস্কার", name: "রাজর্ষি চক্রবর্তী", extraGap: true },
  { hello: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ", name: "ਰਾਜਰਸ਼ੀ ਚੱਕਰਵਰਤੀ", extraGap: true },
  { hello: "Hola", name: "Rajarshi Chakraborty" },
  { hello: "Bonjour", name: "Rajarshi Chakraborty" },
  { hello: "こんにちは", name: "ラジャルシ・チャクラボルティ" },
  { hello: "你好", name: "拉贾尔希·查克拉博蒂" },
  { hello: "નમસ્તે", name: "રાજર્ષિ ચક્રવર્તી" },
  { hello: "Ciao", name: "Rajarshi Chakraborty" },
  { hello: "Olá", name: "Rajarshi Chakraborty" },
  { hello: "नमस्ते", name: "राजर्षि चक्रवर्ती", extraGap: true },
  { hello: "Hallo", name: "Rajarshi Chakraborty" },
  { hello: "Привет", name: "Раджарши Чакраборти" },
  { hello: "안녕", name: "ラ자르시 차크라보르티" },
  { hello: "Merhaba", name: "Rajarshi Chakraborty" },
  { hello: "Xin chào", name: "Rajarshi Chakraborty" },
  { hello: "Hej", name: "Rajarshi Chakraborty" },
  { hello: "Aloha", name: "Rajarshi Chakraborty" },
  { hello: "வணக்கம்", name: "இராஜர்ஷி சக்ரவர்த்தி" },
  { hello: "నమస్కారం", name: "రాజర్షి చక్రవర్తి" },
  { hello: "നമസ്കാരം", name: "രാജർഷി ചക്രവർത്തി" },
  { hello: "ನಮಸ್ಕಾರ", name: "ರಾಜರ್ಷಿ ಚಕ್ರವರ್ತಿ" },
  { hello: "नमस्कार", name: "राजर्षी चक्रवर्ती" }
];

export default function MultilingualGreeting() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const current = GREETINGS[currentIndex] || GREETINGS[0];
  const isExtraGap = current.extraGap;

  return (
    <div className="flex flex-col gap-0">
      {/* LINE 1: Greeting + Waving Emoji + Comma */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="flex items-center gap-x-1.5 text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl leading-none select-none whitespace-nowrap"
      >
        <div className="inline-flex items-center py-0">
          <AnimatePresence mode="wait">
            <motion.span
              key={`hello-${currentIndex}`}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="inline-block bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-extrabold whitespace-nowrap leading-none pr-4"
            >
              {current.hello}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.span
          animate={{ rotate: [0, 14, -8, 14, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
            repeatDelay: 1
          }}
          className="inline-block origin-bottom-right"
        >
          👋🏻
        </motion.span>
        <span className="text-foreground leading-none">,</span>
      </motion.div>

      {/* LINE 2: "My name is" */}
      <div
        className={`text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl leading-none select-none text-foreground py-0 transition-all duration-300 ${isExtraGap ? "mt-2.5 sm:mt-3" : "mt-1 sm:mt-1.5"}`}
      >
        My name is
      </div>

      {/* LINE 3: Name */}
      <div
        className={`py-0 transition-all duration-300 ${isExtraGap ? "mt-2 sm:mt-2.5" : "mt-1 sm:mt-1.5"}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`name-${currentIndex}`}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tighter bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent leading-none whitespace-nowrap pr-4"
          >
            {current.name}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
