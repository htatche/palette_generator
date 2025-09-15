// Color Palette Generator
class PaletteGenerator {
    constructor() {
        console.log('🎨 Initializing Color Palette Generator...');
        
        this.form = document.getElementById('paletteForm');
        this.textInput = document.getElementById('textInput');
        // Button removed - using Enter key to submit
        
        // Debug: Check if elements are found
        console.log('🔍 Form element:', this.form);
        console.log('🔍 Text input element:', this.textInput);
        // Button removed - using Enter key to submit
        // Button elements removed
        this.resultContainer = document.getElementById('result');
        this.paletteDisplay = document.getElementById('paletteDisplay');
        this.colorCodes = document.getElementById('colorCodes');
        this.errorMessage = document.getElementById('error');
        this.themePreview = document.getElementById('themePreview');
        this.generateThemeBtn = document.getElementById('generateThemeBtn');
        this.generateVimThemeBtn = document.getElementById('generateVimThemeBtn');
        this.rubyCode = document.getElementById('rubyCode');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        
        // Layout elements
        this.topPrompt = document.getElementById('topPrompt');
        this.leftPanel = document.getElementById('leftPanel');
        this.middlePanel = document.getElementById('middlePanel');
        this.rightPanel = document.getElementById('rightPanel');
        this.paletteHistory = document.getElementById('paletteHistory');
        
        // Left panel elements (now using main form)
        
        this.currentColors = null;
        this.currentPrompt = null;
        this.hasGeneratedPalette = false;
        
        // Initialize modules
        this.apiClient = new ApiClient();
        this.snippetGenerator = new SnippetGenerator();
        this.paletteHistory = new PaletteHistory((id) => this.loadPaletteFromHistory(id));
        this.themeDownloader = new ThemeDownloader();
        this.vimThemeGenerator = new VimThemeGenerator();
        
        console.log('✅ PaletteGenerator initialized successfully');
        this.init();
        this.initTypingDemo();
        this.loadLastGeneratedPalette();
    }
    
    init() {
        console.log('🔧 Setting up event listeners...');
        
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        } else {
            console.error('❌ Form element not found!');
        }
        
        if (this.textInput) {
            this.textInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSubmit(e);
                }
            });
        }
        
        if (this.generateThemeBtn) {
            this.generateThemeBtn.addEventListener('click', () => this.generateAndDownloadTheme());
        }
        
        if (this.generateVimThemeBtn) {
            this.generateVimThemeBtn.addEventListener('click', () => this.generateAndDownloadVimTheme());
        }
        
        // Language selector event listener
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.snippetGenerator.switchLanguage(e.target.value);
            });
        }
        
        console.log('✅ Event listeners configured');
    }
    
    
    async handleSubmit(e) {
        e.preventDefault();
        console.log('📝 Form submitted');
        
        // Get text from input
        const text = this.textInput.value.trim();
        console.log('📝 Input text:', text);
        
        if (!text) {
            console.log('⚠️ Empty text input, ignoring submission');
            return;
        }
        
        console.log('🔄 Starting palette generation process...');
        this.setLoading(true);
        this.hideError();
        // Keep result visible but show loading state
        this.showLoadingOverlay();
        
        try {
            const paletteData = await this.generatePalette(text);
            console.log('✅ Palette generated successfully:', paletteData);
            this.hasGeneratedPalette = true; // Stop typing demo after first generation
            this.currentPrompt = text; // Store the current prompt for theme naming
            this.displayPalette(paletteData, text);
        } catch (error) {
            console.error('❌ Error generating palette:', error);
            this.showError(error.message);
        } finally {
            console.log('🏁 Generation process completed');
            this.setLoading(false);
            this.hideLoadingOverlay();
        }
    }
    
    async generatePalette(text) {
        return await this.apiClient.generatePalette(text);
    }
    
    displayPalette(paletteData, text) {
        console.log('🎨 Displaying generated palette colors...');
        
        // Clear previous content
        this.paletteDisplay.innerHTML = '';
        this.colorCodes.innerHTML = '';
        console.log('🧹 Cleared previous palette content');
        
        // Store colors for theme generation
        this.currentColors = paletteData.colors;
        
        // Save palette to history
        this.paletteHistory.savePalette(text, paletteData.colors);
        
        // Set the newly generated palette as active (shows header with name)
        const latestPalette = this.paletteHistory.getLastPalette();
        if (latestPalette) {
            this.paletteHistory.setActivePalette(latestPalette.id);
        }
        
        // Display the color palette as horizontal bars
        this.addColorPalette(paletteData.colors);
        console.log('🎨 Color palette added');
        
        // Update theme preview with actual colors
        this.snippetGenerator.updateThemePreview(paletteData.colors);
        
        this.showResult();
        console.log('✅ Palette display completed');
    }
    
    addColorPalette(colors) {
        console.log('🎨 Creating color palette...');
        console.log('🎨 Colors to display:', colors);
        
        // Create the palette container
        const paletteContainer = document.createElement('div');
        paletteContainer.className = 'color-palette';
        
        colors.forEach((color, index) => {
            console.log(`🎨 Adding color bar ${index + 1}:`, color);
            
            const colorBar = document.createElement('div');
            colorBar.className = 'color-bar';
            colorBar.style.backgroundColor = color;
            colorBar.setAttribute('data-color', color);
            
            // Add click handler for future use (copying to clipboard)
            colorBar.addEventListener('click', () => {
                this.copyToClipboard(color);
            });
            
            paletteContainer.appendChild(colorBar);
        });
        
        this.paletteDisplay.appendChild(paletteContainer);
        console.log('✅ Color palette created');
    }
    
    async copyToClipboard(text) {
        console.log('📋 Copying to clipboard:', text);
        
        try {
            await navigator.clipboard.writeText(text);
            console.log('✅ Successfully copied to clipboard');
            
            // Show a brief success message
            const originalText = event.target.textContent;
            event.target.textContent = 'Copied!';
            setTimeout(() => {
                event.target.textContent = originalText;
            }, 1000);
        } catch (err) {
            console.error('❌ Failed to copy to clipboard:', err);
        }
    }
    
    setLoading(loading) {
        console.log('🔄 Setting loading state:', loading);
        // Button removed - loading state handled by input field
        if (loading) {
            this.textInput.disabled = true;
            this.textInput.placeholder = 'Generating palette...';
            this.loadingSpinner.style.display = 'flex';
        } else {
            this.textInput.disabled = false;
            this.textInput.placeholder = '';
            this.loadingSpinner.style.display = 'none';
        }
    }
    
    showResult() {
        console.log('👁️ Showing result container');
        this.resultContainer.style.display = 'block';
    }
    
    hideResult() {
        console.log('🙈 Hiding result container');
        this.resultContainer.style.display = 'none';
    }
    
    showLoadingOverlay() {
        console.log('⏳ Starting beaming effect on palette');
        this.addBeamingEffect();
    }
    
    hideLoadingOverlay() {
        console.log('✅ Stopping beaming effect');
        this.removeBeamingEffect();
    }
    
    addBeamingEffect() {
        // Remove any existing effect
        this.removeBeamingEffect();
        
        // Add CSS animation if it doesn't exist
        if (!document.getElementById('beamingAnimationStyle')) {
            const style = document.createElement('style');
            style.id = 'beamingAnimationStyle';
            style.textContent = `
                @keyframes beaming {
                    0% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.4;
                        transform: scale(0.98);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .beaming-effect {
                    animation: beaming 2.5s ease-in-out infinite;
                    transition: all 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Apply beaming effect to the color palette
        const colorPalette = document.querySelector('.color-palette');
        if (colorPalette) {
            colorPalette.classList.add('beaming-effect');
        }
        
        // Apply beaming effect to the code preview in middle panel
        const codePreview = document.querySelector('.code-preview');
        if (codePreview) {
            codePreview.classList.add('beaming-effect');
        }
    }
    
    removeBeamingEffect() {
        const colorPalette = document.querySelector('.color-palette');
        if (colorPalette) {
            colorPalette.classList.remove('beaming-effect');
        }
        
        const codePreview = document.querySelector('.code-preview');
        if (codePreview) {
            codePreview.classList.remove('beaming-effect');
        }
    }
    
    showError(message) {
        console.log('❌ Showing error message:', message);
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
    }
    
    hideError() {
        console.log('🙈 Hiding error message');
        this.errorMessage.style.display = 'none';
    }
    
    async generateAndDownloadTheme() {
        if (!this.currentColors) {
            this.showError('Please generate a palette first');
            return;
        }
        
        const themeName = this.currentPrompt || 'Generated Palette Theme';
        
        try {
            await this.themeDownloader.downloadTheme(this.currentColors, themeName);
        } catch (error) {
            console.error('Error generating theme:', error);
            this.showError(error.message);
        }
    }
    
    async generateAndDownloadVimTheme() {
        if (!this.currentColors) {
            this.showError('Please generate a palette first');
            return;
        }
        
        const themeName = this.currentPrompt || 'Generated Palette Theme';
        
        try {
            // Generate Vim theme
            const theme = this.vimThemeGenerator.generateTheme(this.currentColors, themeName);
            const vimThemeContent = this.vimThemeGenerator.generateVimThemeFile(theme, themeName);
            
            // Create download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(new Blob([vimThemeContent], { type: 'text/plain' }));
            link.download = `${themeName.toLowerCase().replace(/\s+/g, '_')}.vim`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            console.log('✅ Vim theme downloaded successfully');
        } catch (error) {
            console.error('Error generating Vim theme:', error);
            this.showError(error.message);
        }
    }
    
    
    loadLastGeneratedPalette() {
        console.log('🔄 Loading last generated palette...');
        
        const lastPalette = this.paletteHistory.getLastPalette();
        if (lastPalette) {
            console.log('📋 Found last palette:', lastPalette.prompt);
            
            // Set the current colors
            this.currentColors = lastPalette.colors;
            
            // Keep prompt input empty when loading last palette
            
            // Clear and display the palette
            this.paletteDisplay.innerHTML = '';
            this.addColorPalette(lastPalette.colors);
            
            // Update theme preview
            this.snippetGenerator.updateThemePreview(lastPalette.colors);
            
            // Show the result container
            this.showResult();
            
            // Mark the last palette as active in history
            this.paletteHistory.setActivePalette(lastPalette.id);
            
            console.log('✅ Last generated palette loaded and displayed');
        } else {
            console.log('📭 No previous palettes found');
        }
    }
    
    loadPaletteFromHistory(id) {
        console.log('🔄 Loading palette from history:', id);
        const palette = this.paletteHistory.getPaletteById(id);
        
        if (!palette) {
            console.error('❌ Palette not found in history');
            return;
        }
        
        // Update active state
        this.paletteHistory.setActivePalette(id);
        
        // Load the palette
        this.currentColors = palette.colors;
        this.currentPrompt = palette.prompt; // Store the prompt for theme naming
        // Keep prompt input empty when loading from history
        
        // Clear and display the palette
        this.paletteDisplay.innerHTML = '';
        this.addColorPalette(palette.colors);
        
        // Update theme preview
        this.snippetGenerator.updateThemePreview(palette.colors);
        
        // Show result
        this.showResult();
        
        console.log('✅ Palette loaded from history');
    }

    initTypingDemo() {
        const examples = [
            "midnight hacker vibes",
            "sunset on Mars",
            "matrix green",
            "coffee shop coding",
            "ocean depths",
            "neon cyberpunk",
            "warm autumn leaves",
            "arctic aurora"
        ];
        
        let currentExampleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let deleteSpeed = 50;
        let pauseTime = 2000;
        
        const typingText = document.querySelector('.typing-text');
        const input = this.textInput;
        
        if (!typingText || !input) return;
        
        const typeText = () => {
            // Stop typing demo if user has generated a palette
            if (this.hasGeneratedPalette) {
                typingText.textContent = '';
                return;
            }
            
            const currentExample = examples[currentExampleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentExample.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = deleteSpeed;
            } else {
                typingText.textContent = currentExample.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentCharIndex === currentExample.length) {
                typingSpeed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentExampleIndex = (currentExampleIndex + 1) % examples.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeText, typingSpeed);
        };
        
        // Stop typing demo when user interacts with input
        input.addEventListener('focus', () => {
            typingText.textContent = '';
        });
        
        input.addEventListener('input', () => {
            typingText.textContent = '';
        });
        
        // Start the typing animation
        typeText();
    }

}
