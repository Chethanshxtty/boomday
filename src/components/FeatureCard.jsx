import { motion } from "motion/react"

export default function FeatureCard({ title, description, icon, gradient, delay, badge, validity }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="relative flex flex-col items-start w-full max-w-[300px] mx-auto group"
    >
      {/* Glow layer */}
      <div
        className="absolute inset-0 w-full h-[280px] opacity-50 rounded-[40px] pointer-events-none"
        style={{ background: gradient, filter: "blur(45px)" }}
      />
      {/* Card */}
      <div
        className="relative w-full h-[280px] rounded-[40px] z-10 overflow-hidden"
        style={{
          border: "8px solid transparent",
          background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, ${gradient} border-box`,
        }}
      >
        <div className="w-full h-full p-7 flex flex-col justify-between">
          {/* Top: icon + badge */}
          <div className="flex items-start justify-between">
            <div className="text-white/90">{icon}</div>
            {badge && (
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: gradient }}
              >
                {badge}
              </span>
            )}
          </div>
          {/* Bottom: text */}
          <div>
            <h3 className="text-white font-semibold text-xl mb-2 tracking-tight">{title}</h3>
            <p className="text-gray-400 text-[13px] leading-[1.6]">{description}</p>
            {validity && (
              <p className="text-gray-500 text-[11px] mt-2 font-medium">{validity}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

