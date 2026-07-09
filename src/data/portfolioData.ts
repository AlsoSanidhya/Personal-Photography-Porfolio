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
  category: 'Portraits' | 'Street' | 'Landscapes' | 'Edits'
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
      id: 'n1',
      title: 'Misty Mountains',
      category: 'Landscapes',
      imageUrl: galleryNature1
    },
    {
      id: 's1',
      title: 'Neon Tokyo Night',
      category: 'Street',
      imageUrl: galleryStreet1
    },
    {
      id: 't1',
      title: 'Desert Wanderer',
      category: 'Portraits',
      imageUrl: galleryTravel1
    },
    {
      id: 'l1',
      title: 'Warm Brew & Film',
      category: 'Edits',
      imageUrl: galleryLifestyle1
    },
    {
      id: 'n2',
      title: 'Whispering Woods',
      category: 'Landscapes',
      imageUrl: galleryNature2
    },
    {
      id: 's2',
      title: 'Golden Hour Crossing',
      category: 'Street',
      imageUrl: galleryStreet2
    },
    {
      id: 't2',
      title: 'Venice Waterways',
      category: 'Portraits',
      imageUrl: galleryTravel2
    },
    {
      id: 'l2',
      title: 'Creative Mindspace',
      category: 'Edits',
      imageUrl: galleryLifestyle2
    }
  ] as GalleryItem[],

  stories: [
    {
      id: 'story-1',
      number: '01',
      category: 'NATURE',
      title: 'Mountains',
      images: {
        col1Img1: storyMountains1,
        col1Img2: storyMountains2,
        col2Img: storyMountainsTall
      }
    },
    {
      id: 'story-2',
      number: '02',
      category: 'STREET',
      title: 'City Life',
      images: {
        col1Img1: storyCity1,
        col1Img2: storyCity2,
        col2Img: storyCityTall
      }
    },
    {
      id: 'story-3',
      number: '03',
      category: 'TRAVEL',
      title: 'Travel Diaries',
      images: {
        col1Img1: storyTravel1,
        col1Img2: storyTravel2,
        col2Img: storyTravelTall
      }
    }
  ] as StoryItem[],

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
