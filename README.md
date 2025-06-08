# Veo 3 Video Generator

A secure web application for generating videos using Google's Veo 3 model via FAL.ai. The API key is safely stored in an external file and never exposed in the browser interface.

## Features

- 🔐 **Secure API Key Management** - API key stored in external `fal.env` file
- 🎨 **Clean Web Interface** - Beautiful Tailwind CSS interface
- ⚙️ **Full Parameter Control** - All Veo 3 parameters exposed
- 📊 **Real-time Progress** - Live status updates during generation
- 🎬 **Video Preview** - Direct video playback and download
- 🖥️ **Screenshare Safe** - No API key visible in the interface

## Quick Start

### 1. Clone or Create Project Structure

```
veo3-video-generator/
├── server.js
├── package.json
├── fal.env
├── README.md
└── public/
    └── index.html
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Key

1. Get your FAL.ai API key from [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys)
2. Create a `fal.env` file in the project root:

```bash
# fal.env
FAL_KEY=your_actual_api_key_here
```

⚠️ **Important**: Add `fal.env` to your `.gitignore` file to prevent committing your API key!

### 4. Run the Application

```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

### 5. Open in Browser

Navigate to `http://localhost:3000`

## Project Structure

- **`server.js`** - Express server that handles API requests and serves the frontend
- **`public/index.html`** - Frontend interface with form controls and video display
- **`fal.env`** - API key configuration (not committed to git)
- **`package.json`** - Node.js dependencies and scripts

## API Endpoints

- **`GET /`** - Serves the main application
- **`GET /api/status`** - Server health check
- **`POST /api/generate-video`** - Video generation endpoint

## Veo 3 Parameters

- **Prompt**: Detailed description of the desired video
- **Negative Prompt**: What to avoid in the video
- **Aspect Ratio**: 16:9 (landscape) or 9:16 (portrait)
- **Duration**: 5 or 8 seconds
- **Seed**: For reproducible results
- **Enhance Prompt**: AI prompt enhancement
- **Generate Audio**: Include audio (uses 33% more credits)

## Security Features

- API key stored server-side only
- No sensitive data exposed to browser
- Input validation and error handling
- Secure file-based configuration

## Development

For development with auto-restart:

```bash
npm install -g nodemon
npm run dev
```

## Troubleshooting

### Server Won't Start
- Check that `fal.env` exists and contains `FAL_KEY=your_key`
- Verify your API key is valid at [fal.ai](https://fal.ai)

### Video Generation Fails
- Check server logs for detailed error messages
- Verify your FAL.ai account has sufficient credits
- Ensure prompts follow the recommended format

### Connection Issues
- Make sure the server is running on `http://localhost:3000`
- Check browser console for JavaScript errors

## Credits

- **Veo 3 Model**: Google
- **API Platform**: [FAL.ai](https://fal.ai)
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com)

## License

MIT License - feel free to modify and distribute!