// lib/robohash.ts
export function getRobohashUrl(name: string, size: number = 80): string {
  // Convert name to hash for consistent avatar
  const hash = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .split('')
    .reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    .toString(16)
  
  return `https://robohash.org/${hash}?size=${size}x${size}&set=set4&bgset=bg1`
}

export function getRobohashInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}