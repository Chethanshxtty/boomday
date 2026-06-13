export default function CountdownBanner({ daysUntilBirthday }) {
  if (daysUntilBirthday === undefined || daysUntilBirthday === null || daysUntilBirthday < 0 || daysUntilBirthday > 7) {
    return null;
  }

  return (
    <div className="max-w-[936px] mx-auto px-4 mt-4">
      <div className="rounded-2xl bg-[#1A1A1C] border border-violet-500/30 px-6 py-3 flex items-center gap-3 text-sm text-white">
        <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse shrink-0" />
        <span>
          {daysUntilBirthday === 0
            ? "🎂 Today is your birthday! All deals are active!"
            : `🎂 Your birthday is in ${daysUntilBirthday} days — deals are live!`}
        </span>
      </div>
    </div>
  )
}

