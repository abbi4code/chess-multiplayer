"use client"

import React from 'react'
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


 

const Landing = () => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1a2e1a] to-black relative overflow-hidden">
    {/* Animated background grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563232e_1px,transparent_1px),linear-gradient(to_bottom,#2563232e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
    
    {/* Glow effects */}
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
    <div className="absolute top-40 left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

    <div className="relative z-10 container mx-auto px-4 py-32 text-center">
      {/* Animated Chessboard SVG */}
      <div className="w-24 h-24 mx-auto mb-8 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#059669' }} />
              <stop offset="100%" style={{ stopColor: '#047857' }} />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="80" height="80" fill="none" stroke="url(#greenGradient)" strokeWidth="4" />
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) =>
              (row + col) % 2 === 0 ? (
                <rect
                  key={`${row}-${col}`}
                  x={10 + col * 20}
                  y={10 + row * 20}
                  width="20"
                  height="20"
                  fill="url(#greenGradient)"
                  className="animate-pulse"
                />
              ) : null
            )
          )}
        </svg>
      </div>
      
      <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-500 to-white animate-gradient">
        Chess Unleashed
      </h1>
      
      <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
        Experience chess like never before. Challenge players worldwide in our
        next-generation multiplayer platform.
      </p>

      <Button
        size="lg"
        className={`
          group relative overflow-hidden rounded-full bg-emerald-50 px-12 py-8 text-2xl font-bold text-emerald-900 transition-all duration-300
          hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(16,185,129,0.3)]
          ${isHovered ? 'shadow-[0_0_20px_4px_rgba(16,185,129,0.2)]' : ''}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push('/game')}
      >
        <span className="relative z-10 flex items-center gap-2">
          Play Online <Sparkles className="w-6 h-6" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 via-green-200 to-emerald-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        <div className="p-6 rounded-2xl bg-emerald-900/10 backdrop-blur-sm border border-emerald-500/10">
          <h3 className="text-xl font-bold mb-2 text-emerald-400">Real-time Matches</h3>
          <p className="text-gray-400">Challenge players instantly with our seamless matchmaking system</p>
        </div>
        <div className="p-6 rounded-2xl bg-emerald-900/10 backdrop-blur-sm border border-emerald-500/10">
          <h3 className="text-xl font-bold mb-2 text-emerald-400">Advanced Analytics</h3>
          <p className="text-gray-400">Track your progress with detailed game analysis and statistics</p>
        </div>
        <div className="p-6 rounded-2xl bg-emerald-900/10 backdrop-blur-sm border border-emerald-500/10">
          <h3 className="text-xl font-bold mb-2 text-emerald-400">Global Rankings</h3>
          <p className="text-gray-400">Compete with players worldwide and climb the leaderboard</p>
        </div>
      </div>
    </div>
  </main>
  )
}

export default Landing
