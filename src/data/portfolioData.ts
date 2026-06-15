export interface GalleryItem {
  id: string
  title: string
  category: 'Nature' | 'Street' | 'Travel' | 'Lifestyle'
  imageUrl: string
}

export interface StoryItem {
  id: string
  number: string
  category: string
  title: string
  images: {
    col1Img1: string
    col1Img2: string
    col2Img: string
  }
}

export interface SocialLink {
  name: string
  url: string
  handle: string
}

export const PORTFOLIO_DATA = {
  personal: {
    // -------------------------------------------------------------
    // 1. PERSONAL INFORMATION & BIO
    // Replace these values with your own name, tagline, email, and bio.
    // -------------------------------------------------------------
    
    // Your display name (used in Navbar, Copyright, page titles)
    name: 'Sanidhya Negi', 
    
    // Headline displayed in the Hero Section
    title: 'Hi, i\'m Sanidhya', 
    
    // Subheading role description
    role: 'Creative Explorer',
    
    // Short mission/tagline displayed in Hero Bottom Left
    tagline: 'Exploring creativity through technology, photography, design, and digital experiences.',
    
    // Portrait picture link (magnetic image in the Hero section)
    // Replace this with your portrait image URL
    portraitUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80',
    
    // Long bio paragraph displayed with character scroll-reveal in the About Section
    bio: 'I am a B.Tech CSE (AI & ML) student who enjoys exploring different creative fields. Photography is one of my favorite ways to express myself, but my interests extend beyond it into technology, design, content creation, fitness, and digital experiences. I enjoy learning new things, experimenting with ideas, and building projects that reflect my curiosity and creativity. Rather than defining myself by a single skill, I see myself as someone constantly exploring, creating, and growing.',
    
    // TODO: Replace with your actual email address
    email: 'placeholder@example.com'
  },
  
  aboutAssets: {
    // -------------------------------------------------------------
    // 2. CORNER FLOATERS (About Section)
    // Absolute-positioned 3D assets loaded around the About title.
    // -------------------------------------------------------------
    moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    object3d: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    group3d: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png'
  },

  marqueeGifs: [
    // -------------------------------------------------------------
    // 3. SCROLLING MARQUEE GIFS
    // 21 animated GIFs/previews moving left and right behind the hero.
    // -------------------------------------------------------------
    'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
    'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
    'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
    'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
    'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
    'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
    'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
    'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
    'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
    'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
    'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
    'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
    'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
    'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
    'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
    'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
    'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif'
  ],

  gallery: [
    // -------------------------------------------------------------
    // 4. MASONRY PHOTO GALLERY
    // Add your own photography items here.
    // Ensure the category maps to: 'Nature' | 'Street' | 'Travel' | 'Lifestyle'
    // -------------------------------------------------------------
    {
      id: 'n1',
      title: 'Misty Mountains',
      category: 'Nature',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 's1',
      title: 'Neon Tokyo Night',
      category: 'Street',
      imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 't1',
      title: 'Desert Wanderer',
      category: 'Travel',
      imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'l1',
      title: 'Warm Brew & Film',
      category: 'Lifestyle',
      imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'n2',
      title: 'Whispering Woods',
      category: 'Nature',
      imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 's2',
      title: 'Golden Hour Crossing',
      category: 'Street',
      imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 't2',
      title: 'Venice Waterways',
      category: 'Travel',
      imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'l2',
      title: 'Creative Mindspace',
      category: 'Lifestyle',
      imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&auto=format&fit=crop&q=80'
    }
  ] as GalleryItem[],

  stories: [
    // -------------------------------------------------------------
    // 5. FEATURED STORIES (Sticky-stacking section)
    // Replace the titles, categories, and image grids with your own photography stories.
    // -------------------------------------------------------------
    {
      id: 'story-1',
      number: '01',
      category: 'NATURE',
      title: 'Mountains',
      images: {
        col1Img1: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
        col1Img2: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80',
        col2Img: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1000&auto=format&fit=crop&q=80'
      }
    },
    {
      id: 'story-2',
      number: '02',
      category: 'STREET',
      title: 'City Life',
      images: {
        col1Img1: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&auto=format&fit=crop&q=80',
        col1Img2: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop&q=80',
        col2Img: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1000&auto=format&fit=crop&q=80'
      }
    },
    {
      id: 'story-3',
      number: '03',
      category: 'TRAVEL',
      title: 'Travel Diaries',
      images: {
        col1Img1: 'https://images.unsplash.com/photo-1500835595337-f7400171aa6b?w=800&auto=format&fit=crop&q=80',
        col1Img2: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
        col2Img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80'
      }
    }
  ] as StoryItem[],

  socials: [
    // -------------------------------------------------------------
    // 6. SOCIAL LINKS & HANDLES (Bento Grid & Footer)
    // Replace the placeholder URLs and handles with your actual social links.
    // -------------------------------------------------------------
    { 
      name: 'Instagram', 
      // TODO: Replace with your actual Instagram profile URL
      url: 'https://instagram.com/placeholder', 
      // TODO: Replace with your actual Instagram handle
      handle: '@placeholder' 
    },
    { 
      name: 'LinkedIn', 
      // TODO: Replace with your actual LinkedIn profile URL
      url: 'https://linkedin.com/in/placeholder', 
      // TODO: Replace with your actual LinkedIn display name
      handle: 'placeholder' 
    },
    { 
      name: 'GitHub', 
      // TODO: Replace with your actual GitHub profile URL
      url: 'https://github.com/placeholder', 
      // TODO: Replace with your actual GitHub username
      handle: 'placeholder' 
    },
    { 
      name: 'Spotify Playlist', 
      // TODO: Replace with your actual Spotify playlist share link
      url: 'https://open.spotify.com/playlist/placeholder', 
      // TODO: Replace with your actual playlist display name
      handle: 'Curated Focus' 
    },
    { 
      name: 'Gym & Lifestyle', 
      // TODO: Replace with your actual Strava/fitness profile URL if applicable
      url: 'https://strava.com/athletes/placeholder', 
      // TODO: Replace with your fitness handle/stat preview
      handle: 'Active Journey' 
    }
  ] as SocialLink[]
}
