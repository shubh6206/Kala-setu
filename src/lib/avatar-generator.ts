/**
 * Professional Avatar Generator for Artisans
 * Generates profession-specific avatars using various avatar services
 */

export interface AvatarConfig {
  profession: string;
  gender?: 'male' | 'female';
  style?: 'traditional' | 'modern' | 'artistic';
  seed?: string;
}

export class AvatarGenerator {
  private static readonly AVATAR_SERVICES = {
    dicebear: 'https://api.dicebear.com/7.x',
    robohash: 'https://robohash.org',
    avataaars: 'https://api.dicebear.com/7.x/avataaars/svg',
    personas: 'https://api.dicebear.com/7.x/personas/svg',
    initials: 'https://api.dicebear.com/7.x/initials/svg',
  };

  private static readonly PROFESSION_STYLES = {
    'potter': {
      style: 'personas',
      accessories: ['glasses'],
      clothing: ['apron', 'casual'],
      colors: ['earth-tones'],
      background: '#8B4513', // Saddle brown for clay
    },
    'painter': {
      style: 'avataaars',
      accessories: ['beret', 'glasses'],
      clothing: ['artistic', 'colorful'],
      colors: ['vibrant'],
      background: '#FF6347', // Tomato red for artistic
    },
    'toymaker': {
      style: 'personas',
      accessories: ['tools', 'glasses'],
      clothing: ['workshop', 'casual'],
      colors: ['warm'],
      background: '#32CD32', // Lime green for playful
    },
    'weaver': {
      style: 'avataaars',
      accessories: ['traditional'],
      clothing: ['ethnic', 'traditional'],
      colors: ['traditional'],
      background: '#9370DB', // Medium purple for textiles
    },
    'jeweler': {
      style: 'personas',
      accessories: ['magnifying-glass', 'elegant'],
      clothing: ['formal', 'elegant'],
      colors: ['gold', 'silver'],
      background: '#FFD700', // Gold for jewelry
    },
    'sculptor': {
      style: 'avataaars',
      accessories: ['tools', 'artistic'],
      clothing: ['workshop', 'artistic'],
      colors: ['stone-tones'],
      background: '#696969', // Dim gray for stone
    },
  };

  static generateProfessionAvatar(config: AvatarConfig): string {
    const { profession, gender = 'male', seed } = config;
    const professionKey = profession.toLowerCase().replace(/\s+/g, '-');
    
    // Get profession-specific configuration
    const professionConfig = this.PROFESSION_STYLES[professionKey as keyof typeof this.PROFESSION_STYLES] 
      || this.PROFESSION_STYLES.potter; // Default fallback

    // Generate seed based on profession and name with gender
    const avatarSeed = seed || `${profession}-${gender}-${Math.random().toString(36).substr(2, 9)}`;

    // Use adventurer style for better, more reliable avatars
    const baseUrl = 'https://api.dicebear.com/8.x/adventurer/svg';
    const params = new URLSearchParams({
      seed: `${avatarSeed}-${gender}`,
      backgroundColor: professionConfig.background.replace('#', ''),
    });

    return `${baseUrl}?${params.toString()}`;
  }

  static getArtisanAvatar(artisanName: string, craft: string, gender?: 'male' | 'female'): string {
    // Map craft types to professions
    const craftToProfession: Record<string, string> = {
      'terracotta pottery': 'potter',
      'pottery': 'potter',
      'clay work': 'potter',
      'madhubani painting': 'painter',
      'painting': 'painter',
      'folk art': 'painter',
      'channapatna toys': 'toymaker',
      'toy making': 'toymaker',
      'wooden toys': 'toymaker',
      'weaving': 'weaver',
      'textile': 'weaver',
      'fabric': 'weaver',
      'jewelry': 'jeweler',
      'metalwork': 'jeweler',
      'sculpture': 'sculptor',
      'carving': 'sculptor',
      'stone work': 'sculptor',
    };

    const profession = craftToProfession[craft.toLowerCase()] || 'potter';
    
    return this.generateProfessionAvatar({
      profession,
      gender,
      seed: `${artisanName}-${craft}`,
    });
  }

  // Predefined avatars for consistent display with clear gender representation
  static getPredefinedAvatars(): Record<string, string> {
    return {
      'potter-avatar': 'https://api.dicebear.com/8.x/adventurer/svg?seed=rajesh-potter-male&backgroundColor=d2691e',
      'painter-avatar': 'https://api.dicebear.com/8.x/adventurer/svg?seed=meena-painter-female&backgroundColor=ff6347',
      'toymaker-avatar': 'https://api.dicebear.com/8.x/adventurer/svg?seed=ibrahim-toymaker-male&backgroundColor=32cd32',
      'weaver-avatar': 'https://api.dicebear.com/8.x/adventurer/svg?seed=lakshmi-weaver-female&backgroundColor=9370db',
      'jeweler-avatar': 'https://api.dicebear.com/8.x/adventurer/svg?seed=arjun-jeweler-male&backgroundColor=ffd700',
      'sculptor-avatar': 'https://api.dicebear.com/8.x/adventurer/svg?seed=sculptor-male&backgroundColor=696969',
    };
  }
}