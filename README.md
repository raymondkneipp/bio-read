# 📚 BioRead

A modern, accessible reading application designed to enhance your reading experience with customizable typography, bionic reading, and offline-first functionality.

![BioRead](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.14-646CFF?logo=vite)
![PWA](https://img.shields.io/badge/PWA-Enabled-4285F4?logo=pwa)

## ✨ Features

### 🎯 Core Reading Features
- **Bionic Reading Mode** - Highlights the first few letters of each word to guide your eyes naturally through text
- **RSVP Reading** - Rapid Serial Visual Presentation for speed reading
- **Text-to-Speech** - Built-in speech synthesis with customizable voices and speeds
- **Reading Progress Tracking** - Automatic progress tracking for each reading session

### 🎨 Customization Options
- **Multiple Font Families** - Montserrat, Playfair Display, Geist, Inter
- **Dyslexic-Friendly Font** - OpenDyslexic support for better accessibility
- **Typography Controls** - Adjustable font size, line height, and letter spacing
- **Theme Support** - Light and dark mode with system preference detection

### 📱 Modern Web App
- **Progressive Web App (PWA)** - Install on any device, works offline
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Offline-First** - Full functionality without internet connection
- **Auto-Updates** - Seamless app updates with user notification

### 💾 Data Management
- **Local Storage** - All data stored locally using IndexedDB
- **Reading Library** - Create, edit, and manage your reading collection
- **Settings Persistence** - Your preferences are saved across sessions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bio-read.git
   cd bio-read
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm build
# or
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite with Rolldown
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Database**: Dexie (IndexedDB wrapper)
- **PWA**: Vite PWA Plugin with Workbox
- **State Management**: React Context API
- **Icons**: Lucide React

## 📖 Usage

### Creating a New Reading
1. Click the "New Reading" button in the header
2. Enter a title and paste your text content
3. Click "Save" to add it to your library

### Customizing Your Reading Experience
1. Open the settings panel (gear icon in header)
2. Adjust font family, size, and spacing
3. Toggle bionic reading or dyslexic-friendly fonts
4. Configure text-to-speech settings
5. Enable RSVP mode for speed reading

### Managing Your Library
- View all your readings in the main list
- Click on any reading to open it
- Edit or delete readings using the action buttons
- Track your reading progress automatically

## 🎛️ Settings Reference

| Setting | Options | Description |
|---------|---------|-------------|
| Font Family | Montserrat, Playfair, Geist, Inter | Choose your preferred reading font |
| Font Size | Small, Medium, Large, Extra Large | Adjust text size for comfort |
| Line Height | Small, Medium, Large, Extra Large | Control vertical spacing between lines |
| Letter Spacing | Small, Medium, Large, Extra Large | Adjust horizontal spacing between letters |
| Dyslexic Font | On/Off | Enable OpenDyslexic for better accessibility |
| Bionic Reading | On/Off | Highlight first letters of words |
| RSVP Mode | On/Off | Rapid Serial Visual Presentation |
| Speech Voice | System voices | Choose text-to-speech voice |
| Speech Speed | 0.5x - 2x | Adjust reading speed |
| RSVP Speed | 100-1000 WPM | Control RSVP reading speed |

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── ...             # Feature components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── db.ts              # Database configuration
└── App.tsx            # Main application component
```

### Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Dexie](https://dexie.org/) for IndexedDB management
- [OpenDyslexic](https://opendyslexic.org/) for dyslexic-friendly font
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the [documentation](https://github.com/yourusername/bio-read/wiki)
- Contact the maintainers

---

**Happy Reading! 📚✨**