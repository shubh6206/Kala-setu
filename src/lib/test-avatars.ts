/**
 * Test avatar URLs to ensure they work properly
 */

export const testAvatarUrls = {
  potter: 'https://api.dicebear.com/8.x/adventurer/svg?seed=rajesh-potter-male&backgroundColor=d2691e',
  painter: 'https://api.dicebear.com/8.x/adventurer/svg?seed=meena-painter-female&backgroundColor=ff6347',
  toymaker: 'https://api.dicebear.com/8.x/adventurer/svg?seed=ibrahim-toymaker-male&backgroundColor=32cd32',
  weaver: 'https://api.dicebear.com/8.x/adventurer/svg?seed=lakshmi-weaver-female&backgroundColor=9370db',
  jeweler: 'https://api.dicebear.com/8.x/adventurer/svg?seed=arjun-jeweler-male&backgroundColor=ffd700',
};

// Alternative working avatars if DiceBear fails
export const fallbackAvatars = {
  potter: 'https://api.dicebear.com/8.x/personas/svg?seed=potter&backgroundColor=d2691e',
  painter: 'https://api.dicebear.com/8.x/personas/svg?seed=painter&backgroundColor=ff6347',
  toymaker: 'https://api.dicebear.com/8.x/personas/svg?seed=toymaker&backgroundColor=32cd32',
  weaver: 'https://api.dicebear.com/8.x/personas/svg?seed=weaver&backgroundColor=9370db',
  jeweler: 'https://api.dicebear.com/8.x/personas/svg?seed=jeweler&backgroundColor=ffd700',
};