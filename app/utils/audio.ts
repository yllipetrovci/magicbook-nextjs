
// Simple magic chime sound effect
const MAGIC_CHIME = "https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3";
// Page flip sound effect
const PAGE_FLIP = "https://assets.mixkit.co/active_storage/sfx/1104/1104-preview.mp3";

export const playMagicSound = () => {
  try {
    const audio = new Audio(MAGIC_CHIME);
    audio.volume = 0.4; // Gentle volume
    // Play and catch errors (e.g., if user hasn't interacted with document yet)
    audio.play().catch(() => {}); 
  } catch (e) {
    // Ignore environments where Audio is not available
  }
};

export const playPageTurnSound = () => {
  try {
    const audio = new Audio(PAGE_FLIP);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch (e) {
    // Ignore environments where Audio is not available
  }
};
