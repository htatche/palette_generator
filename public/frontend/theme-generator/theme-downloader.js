/**
 * Theme Downloader Module
 * Handles downloading VS Code themes as .vsix files
 */

class ThemeDownloader {
    constructor(baseUrl = window.location.origin) {
        this.baseUrl = baseUrl;
    }

    /**
     * Generate VS Code theme from colors
     */
    async generateTheme(colors, themeName) {
        console.log('🎨 Generating VS Code theme...');
        
        try {
            const response = await fetch(`${this.baseUrl}/api/generate-theme`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    colors: colors,
                    themeName: themeName
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Theme generation failed: ${errorData.error || 'Unknown error'}`);
            }

            const themeData = await response.json();
            console.log('✅ Theme generated successfully:', themeData);
            
            return themeData;

        } catch (error) {
            console.error('❌ Theme generation failed:', error);
            throw error;
        }
    }

    /**
     * Download VS Code theme as .vsix file
     */
    async downloadTheme(colors, themeName) {
        console.log('📦 Downloading VS Code theme...');
        
        try {
            const response = await fetch(`${this.baseUrl}/api/download-theme`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    colors: colors,
                    themeName: themeName
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Theme download failed: ${errorData.error || 'Unknown error'}`);
            }

            // Get the blob from the response
            const blob = await response.blob();
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${themeName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.vsix`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            console.log('✅ Theme downloaded successfully');

        } catch (error) {
            console.error('❌ Theme download failed:', error);
            throw error;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeDownloader;
} else {
    window.ThemeDownloader = ThemeDownloader;
}
