/**
 * scoring.config.ts
 * Cloud-tuned intelligence scoring for intelligence-gathering-system.
 * Data sovereignty preserved: storage pinned to Iowa (US-Central) region.
 * Tuned for: multi-agent/LLM, CrewAI, Ollama, infra-as-code, Iowa legal/OSINT.
 */

export interface ScoringWeights {
  relevance: number;
  velocity: number;
  authority: number;
  recency: number;
  engagement: number;
}

export const SCORING_WEIGHTS: ScoringWeights = {
  relevance: 0.40,   // raised from 0.35 - bias toward YOUR stack
  velocity: 0.25,    // early adoption edge on rising repos
  authority: 0.18,
  recency: 0.12,
  engagement: 0.05,
};

// Topics that boost relevance for your use case.
export const RELEVANCE_KEYWORDS: Record<string, number> = {
  'multi-agent': 1.5,
  'crewai': 1.5,
  'ollama': 1.4,
  'llm orchestration': 1.4,
  'browser automation': 1.3,
  'infrastructure as code': 1.3,
  'osint': 1.3,
  'legal tech': 1.2,
  'foreclosure': 1.2,
  'rag': 1.2,
};

// Source priority: bias toward buildable, citable intel over hype.
export const SOURCE_WEIGHTS: Record<string, number> = {
  github: 1.0,
  arxiv: 0.95,
  hackernews: 0.85,
  reddit: 0.65,
};

// Action engine: conservative for first cloud run.
export const ACTION_CONFIG = {
  threshold: Number(process.env.ACTION_SCORE_THRESHOLD ?? 85),
  enableAutoActions: process.env.ENABLE_AUTO_ACTIONS === 'true',
  requireConfirmation: true,
};

// Self-learning multiplier bounds (prevents runaway weight drift).
export const BEHAVIOR_MULTIPLIER = { min: 0.5, max: 2.0, default: 1.0 };

export function finalScore(
  f: ScoringWeights,
  behaviorMultiplier = BEHAVIOR_MULTIPLIER.default
): number {
  const base =
    f.relevance * SCORING_WEIGHTS.relevance +
    f.velocity * SCORING_WEIGHTS.velocity +
    f.authority * SCORING_WEIGHTS.authority +
    f.recency * SCORING_WEIGHTS.recency +
    f.engagement * SCORING_WEIGHTS.engagement;
  const m = Math.min(
    BEHAVIOR_MULTIPLIER.max,
    Math.max(BEHAVIOR_MULTIPLIER.min, behaviorMultiplier)
  );
  return base * m;
}
