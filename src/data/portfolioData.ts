// TODO: Replace these local placeholder imports with actual personal photography files when available
import heroPortrait from '../assets/images/hero-portrait.jpg'

// Gallery imports
import galleryNature1 from '../assets/images/gallery/gallery-nature-1.jpg'
import galleryStreet1 from '../assets/images/gallery/gallery-street-1.jpg'
import galleryTravel1 from '../assets/images/gallery/gallery-travel-1.jpg'
import galleryLifestyle1 from '../assets/images/gallery/gallery-lifestyle-1.jpg'
import galleryNature2 from '../assets/images/gallery/gallery-nature-2.jpg'
import galleryStreet2 from '../assets/images/gallery/gallery-street-2.jpg'
import galleryTravel2 from '../assets/images/gallery/gallery-travel-2.jpg'
import galleryLifestyle2 from '../assets/images/gallery/gallery-lifestyle-2.jpg'

// Stories imports
import storyMountains1 from '../assets/images/stories/story-mountains-1.jpg'
import storyMountains2 from '../assets/images/stories/story-mountains-2.jpg'
import storyMountainsTall from '../assets/images/stories/story-mountains-tall.jpg'
import storyCity1 from '../assets/images/stories/story-city-1.jpg'
import storyCity2 from '../assets/images/stories/story-city-2.jpg'
import storyCityTall from '../assets/images/stories/story-city-tall.jpg'
import storyTravel1 from '../assets/images/stories/story-travel-1.jpg'
import storyTravel2 from '../assets/images/stories/story-travel-2.jpg'
import storyTravelTall from '../assets/images/stories/story-travel-tall.jpg'

// About asset imports
import aboutMoon from '../assets/images/about/about-moon.jpg'
import aboutObject3d from '../assets/images/about/about-object3d.jpg'
import aboutLego from '../assets/images/about/about-lego.jpg'
import aboutGroup3d from '../assets/images/about/about-group3d.jpg'

// Marquee Gif imports
import marquee1 from '../assets/images/marquee/marquee-1.jpg'
import marquee2 from '../assets/images/marquee/marquee-2.jpg'
import marquee3 from '../assets/images/marquee/marquee-3.jpg'
import marquee4 from '../assets/images/marquee/marquee-4.jpg'
import marquee5 from '../assets/images/marquee/marquee-5.jpg'
import marquee6 from '../assets/images/marquee/marquee-6.jpg'
import marquee7 from '../assets/images/marquee/marquee-7.jpg'
import marquee8 from '../assets/images/marquee/marquee-8.jpg'
import marquee9 from '../assets/images/marquee/marquee-9.jpg'
import marquee10 from '../assets/images/marquee/marquee-10.jpg'
import marquee11 from '../assets/images/marquee/marquee-11.jpg'
import marquee12 from '../assets/images/marquee/marquee-12.jpg'
import marquee13 from '../assets/images/marquee/marquee-13.jpg'
import marquee14 from '../assets/images/marquee/marquee-14.jpg'
import marquee15 from '../assets/images/marquee/marquee-15.jpg'
import marquee16 from '../assets/images/marquee/marquee-16.jpg'
import marquee17 from '../assets/images/marquee/marquee-17.jpg'
import marquee18 from '../assets/images/marquee/marquee-18.jpg'
import marquee19 from '../assets/images/marquee/marquee-19.jpg'
import marquee20 from '../assets/images/marquee/marquee-20.jpg'
import marquee21 from '../assets/images/marquee/marquee-21.jpg'

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

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Sanidhya Negi', 
    title: 'Hi, i\'m Sanidhya', 
    role: 'Creative Explorer',
    tagline: 'Exploring creativity through technology, photography, design, and digital experiences.',
    portraitUrl: heroPortrait,
    
    bio: `I am a B.Tech CSE (AI & ML) student who enjoys exploring different creative fields. Photography is one of my favorite hobbies, but it is not the only thing that defines me. I am interested in technology, editing, design, content creation, and learning new skills.
 
I enjoy experimenting with ideas, building projects, and exploring different creative outlets. Rather than being an expert in one thing, I see myself as someone who is constantly learning, creating, and growing.`,
    
    email: 'sheeshsanidhya@gmail.com'
  },
  
  aboutAssets: {
    moon: aboutMoon,
    object3d: aboutObject3d,
    lego: aboutLego,
    group3d: aboutGroup3d
  },

  marqueeGifs: [
    marquee1, marquee2, marquee3, marquee4, marquee5, marquee6, marquee7,
    marquee8, marquee9, marquee10, marquee11, marquee12, marquee13, marquee14,
    marquee15, marquee16, marquee17, marquee18, marquee19, marquee20, marquee21
  ],

  gallery: [
    {
      id: 'g1',
      title: 'Misty Mountains',
      imageUrl: galleryNature1
    },
    {
      id: 'g2',
      title: 'Highland Trails',
      imageUrl: storyMountainsTall
    },
    {
      id: 'g3',
      title: 'Neon Tokyo Night',
      imageUrl: galleryStreet1
    },
    {
      id: 'g4',
      title: 'Neon Reflections',
      imageUrl: storyCityTall
    },
    {
      id: 'g5',
      title: 'Desert Wanderer',
      imageUrl: galleryTravel1
    },
    {
      id: 'g6',
      title: 'Coastal Wanderlust',
      imageUrl: storyTravel1
    },
    {
      id: 'g7',
      title: 'Warm Brew & Film',
      imageUrl: galleryLifestyle1
    },
    {
      id: 'g8',
      title: 'Alpenglow Ridges',
      imageUrl: storyMountains1
    },
    {
      id: 'g9',
      title: 'Whispering Woods',
      imageUrl: galleryNature2
    },
    {
      id: 'g10',
      title: 'Nomad Chronicles',
      imageUrl: storyTravelTall
    },
    {
      id: 'g11',
      title: 'Golden Hour Crossing',
      imageUrl: galleryStreet2
    },
    {
      id: 'g12',
      title: 'Metropolis Lights',
      imageUrl: storyCity1
    },
    {
      id: 'g13',
      title: 'Venice Waterways',
      imageUrl: galleryTravel2
    },
    {
      id: 'g14',
      title: 'Summit Solitude',
      imageUrl: storyMountains2
    },
    {
      id: 'g15',
      title: 'Creative Mindspace',
      imageUrl: galleryLifestyle2
    },
    {
      id: 'g16',
      title: 'Urban Convergence',
      imageUrl: storyCity2
    },
    {
      id: 'g17',
      title: 'Ancient Pathways',
      imageUrl: storyTravel2
    }
  ] as GalleryItem[],

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
      // TODO: Replace with your actual Spotify playlist share link
      url: 'https://open.spotify.com/playlist/placeholder', 
      handle: 'Curated Focus' 
    },
    { 
      name: 'Creative Projects', 
      url: '#', 
      handle: 'Explorations' 
    }
  ] as SocialLink[]
}
