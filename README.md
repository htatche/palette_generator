# Color Palette Generator

Generates code editor themes from a prompt by infering the stabilityai/stable-diffusion-xl-base-1.0 model from Hugging Face. Vibe coded as a showcase, don't use for anything serious.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your Hugging Face token:**
   - Get your token from [Hugging Face](https://huggingface.co/settings/tokens)
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and replace `your_token_here` with your actual Hugging Face token:
     ```
     HUGGING_FACE_TOKEN=hf_your_actual_token_here
     PORT=3000
     ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Theme Installation

### VS Code Theme Installation

1. **Download the theme:**
   - Click "Download VS Code Theme" after generating a palette
   - The `.vsix` file will be downloaded to your computer

2. **Install from VSIX:**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X or Cmd+Shift+X)
   - Click the "..." menu in the Extensions panel
   - Select "Install from VSIX..."
   - Choose the downloaded `.vsix` file

3. **Apply the theme:**
   - Open Command Palette (Ctrl+Shift+P or Cmd+Shift+P)
   - Type "Preferences: Color Theme"
   - Select your newly installed theme from the list

### Vim/Neovim Theme Installation

1. **Download the theme:**
   - Click "Download Vim Theme" after generating a palette
   - The `.vim` file will be downloaded to your computer

2. **Copy to colors directory:**
   ```bash
   # For Neovim
   cp your-theme-name.vim ~/.config/nvim/colors/
   
   # For Vim
   cp your-theme-name.vim ~/.vim/colors/
   ```

3. **Apply the theme:**
   - Open Vim/Neovim
   - Run the command:
     ```
     :colorscheme your-theme-name
     ```
   - Or add to your config file:
     ```
     colorscheme your-theme-name
     ```

## API

This app uses the Hugging Face Inference API with the `stabilityai/stable-diffusion-xl-base-1.0` model to generate color palettes from text descriptions.

