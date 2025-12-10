/**
 * Avatar utility functions for generating random avatars using DiceBear API
 */

/**
 * Get a random avatar URL based on candidate ID
 * Uses DiceBear API with initials style
 * @param candidateId - The unique ID of the candidate
 * @returns Avatar URL string
 */
export const getAvatarUrl = (candidateId: string): string => {
  // Use DiceBear API with initials style
  // The seed ensures consistent avatar for the same ID
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(candidateId)}&backgroundColor=random`;
};

/**
 * Get an avatar URL with initials from the candidate's name
 * Uses DiceBear API with initials style and custom initials
 * @param candidateId - The unique ID of the candidate
 * @param name - The full name of the candidate
 * @returns Avatar URL string
 */
export const getAvatarUrlWithInitials = (candidateId: string, name: string): string => {
  // Extract initials from name
  const initials = name
    .split(' ')
    .map(n => n[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Use DiceBear API with initials style
  // The seed ensures consistent avatar, and initials parameter sets the letters
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(candidateId)}&initials=${encodeURIComponent(initials)}&backgroundColor=random`;
};

/**
 * Get avatar URL - prefers profileImage if available, otherwise generates one
 * @param candidateId - The unique ID of the candidate
 * @param name - The full name of the candidate
 * @param profileImage - Optional profile image URL from API
 * @returns Avatar URL string
 */
export const getCandidateAvatar = (
  candidateId: string,
  name: string,
  profileImage?: string | null
): string => {
  // If profile image exists, use it
  if (profileImage) {
    return profileImage;
  }
  
  // Otherwise, generate avatar with initials
  return getAvatarUrlWithInitials(candidateId, name);
};

