const DEFAULT_MIN_PAGES = 4;
const DEFAULT_CREDITS_PER_PAGE = 1;

const parsePositiveNumber = (value: string | undefined, fallback: number) => {
    if (!value) return fallback;
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const MIN_STORY_PAGE_COUNT = parsePositiveNumber(
    process.env.NEXT_PUBLIC_STORY_MIN_PAGES ?? process.env.STORY_MIN_PAGES,
    DEFAULT_MIN_PAGES
);

export const CREDITS_PER_PAGE = parsePositiveNumber(
    process.env.NEXT_PUBLIC_STORY_CREDITS_PER_PAGE ?? process.env.STORY_CREDITS_PER_PAGE,
    DEFAULT_CREDITS_PER_PAGE
);
