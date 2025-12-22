const DEFAULT_REFERRAL_BONUS = 5;

const parsePositiveInt = (value: string | undefined, fallback: number) => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
};

export const REFERRAL_BONUS_CREDITS = parsePositiveInt(
  process.env.REFERRAL_BONUS_CREDITS,
  DEFAULT_REFERRAL_BONUS
);
