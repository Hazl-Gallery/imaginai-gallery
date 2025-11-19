<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ImaginAI Gallery

AI-powered image generation gallery using Gemini 2.5 Flash.

View your app in AI Studio: https://ai.studio/apps/drive/1u6SeMEAFwYjRgvJXd6vQYrBzvkXlUJPa

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` file with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Docker Deployment

**Prerequisites:** Docker and Docker Compose

1. Set your API key:
   ```bash
   export GEMINI_API_KEY=your_api_key_here
   ```

2. Build and run:
   ```bash
   docker-compose up -d
   ```

3. Access at http://localhost:3000

To stop:
```bash
docker-compose down
```
