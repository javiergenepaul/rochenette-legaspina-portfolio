const THUMB_GRADIENTS: Record<string, string> = {
  "from-red-700 to-red-400":       "linear-gradient(135deg,#b71c1c,#ef5350)",
  "from-rose-800 to-red-500":      "linear-gradient(135deg,#880e2e,#D32F2F)",
  "from-red-900 to-orange-600":    "linear-gradient(135deg,#D32F2F,#e65100)",
  "from-purple-900 to-red-700":    "linear-gradient(135deg,#6a1b9a,#D32F2F)",
  "from-red-700 to-pink-700":      "linear-gradient(135deg,#D32F2F,#880e4f)",
  "from-orange-800 to-amber-500":  "linear-gradient(135deg,#e65100,#f59e0b)",
  "from-blue-900 to-sky-600":      "linear-gradient(135deg,#1e3a5f,#0284c7)",
  "from-emerald-900 to-teal-600":  "linear-gradient(135deg,#064e3b,#0d9488)",
  "from-violet-900 to-purple-600": "linear-gradient(135deg,#2e1065,#9333ea)",
  "from-cyan-900 to-blue-600":     "linear-gradient(135deg,#164e63,#2563eb)",
};

export function thumbBg(gradient: string): string {
  return THUMB_GRADIENTS[gradient] ?? "linear-gradient(135deg,#D32F2F,#b71c1c)";
}
