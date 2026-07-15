// Dynamically import original photography images
const heroImagesGlob = import.meta.glob('../assets/originals/hero/*.webp', { eager: true }) as Record<string, { default: string }>
export const HERO_SLIDESHOW_IMAGES = Object.values(heroImagesGlob).map(mod => mod.default)

const galleryImagesGlob = import.meta.glob('../assets/originals/gallery/*.webp', { eager: true }) as Record<string, { default: string }>
const GALLERY_IMAGE_URLS = Object.values(galleryImagesGlob).map(mod => mod.default)

export interface GalleryItem {
  id: string
  title: string
  imageUrl: string
}

export interface SocialLink {
  name: string
  url: string
  handle: string
}

const safeGalleryImage = (index: number) => GALLERY_IMAGE_URLS.length > 0 ? GALLERY_IMAGE_URLS[index % GALLERY_IMAGE_URLS.length] : ''

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Sanidhya Negi', 
    title: 'Hi, i\'m Sanidhya', 
    role: 'Creative Explorer',
    bio: `Every frame has a story. Welcome to mine.

I'm Sanidhya, an undergrad who enjoys exploring different creative fields. Photography is one of my favorite hobbies, but it isn't the only thing that defines me. I'm passionate about technology, editing, design, content creation, and constantly learning new skills.

I enjoy experimenting with new ideas, building projects, and exploring different creative outlets. Rather than trying to be an expert in just one thing, I believe in continuous learning, creating, and growing through every experience. This portfolio is a collection of the moments I capture, the projects I build, and the creativity I bring to everything I do.`,
    
    email: 'sheeshsanidhya@gmail.com'
  },
  
  aboutAssets: {
    moon: safeGalleryImage(1),
    object3d: safeGalleryImage(2),
    lego: safeGalleryImage(3),
    group3d: safeGalleryImage(4)
  },

  marqueeGifs: GALLERY_IMAGE_URLS.length > 0 ? GALLERY_IMAGE_URLS : HERO_SLIDESHOW_IMAGES,

  gallery: GALLERY_IMAGE_URLS.map((url, idx) => {
    // Attempt to parse a clean title from the filename
    const filename = url.split('/').pop() || ''
    const cleanName = filename.split('.')[0].replace(/[-_]/g, ' ')
    
    return {
      id: `g${idx + 1}`,
      title: cleanName || `Photograph ${idx + 1}`,
      imageUrl: url
    }
  }) as GalleryItem[],

  socials: [
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/saanidhyyaa/?hl=en', 
      handle: '@saanidhyyaa' 
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/sanidhya-negi-6aba18376', 
      handle: 'Sanidhya Negi' 
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/AlsoSanidhya', 
      handle: 'AlsoSanidhya' 
    },
    { 
      name: 'Spotify Playlist', 
      url: 'https://open.spotify.com/playlist/6uYfLDGm0aKFtxpSdktDwd?si=48234396763a4582', 
      handle: 'Curated Focus' 
    },
    { 
      name: 'Creative Projects', 
      url: '#', 
      handle: 'Explorations' 
    }
  ] as SocialLink[]
}
