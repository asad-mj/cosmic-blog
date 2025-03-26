# Cosmic Blog - Futuristic Blogging Platform

A modern, responsive blogging platform with a dark cosmic theme featuring 3D elements, animated backgrounds, and futuristic design elements.

![Cosmic Blog Screenshot](https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop)

## Features

- **Dark Cosmic Theme** - Immersive space-inspired design with neon accents
- **3D Elements** - Interactive Three.js objects throughout the interface
- **Animated Backgrounds** - Dynamic star fields and particle effects
- **Responsive Design** - Fully responsive from mobile to desktop
- **Full Blog Functionality** - Articles, categories, comments, and more
- **Interactive UI** - Hover effects, animations, and transitions
- **Optimized Performance** - Fast loading and smooth interactions

## Technology Stack

- **Frontend:** React + TypeScript
- **Backend:** Express + Node.js
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js
- **Animations:** GSAP
- **Routing:** Wouter
- **UI Components:** Radix UI + shadcn/ui
- **State Management:** TanStack Query

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cosmic-blog.git
cd cosmic-blog
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
.
├── client/                # Frontend React application
│   ├── src/               # Source files
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and libraries
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main application component
│   │   └── main.tsx       # Entry point
│   └── index.html         # HTML template
├── server/                # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage and management
│   └── vite.ts            # Vite configuration
├── shared/                # Shared code between client and server
│   └── schema.ts          # Data models and validation
└── package.json           # Project metadata and dependencies
```

## Design Philosophy

The Cosmic Blog was designed with a space exploration theme, representing the frontier of knowledge and discovery. The dark background with neon accents creates an immersive reading environment while showcasing technical content about futuristic technologies.

Key design elements include:
- Animated star backgrounds
- Holographic cards with dynamic hover effects
- Gradient text animations
- Neon lighting effects
- 3D interactive objects
- Futuristic typography using Orbitron and Space Grotesk fonts

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js for 3D graphics capabilities
- GSAP for smooth animations
- Tailwind CSS for utility-first styling
- shadcn/ui for accessible component primitives