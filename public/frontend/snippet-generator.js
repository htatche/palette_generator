/**
 * Snippet Generator Module
 * Handles multi-language code snippet generation and syntax highlighting
 */

// Code snippets are now loaded from code-snippets.js

class SnippetGenerator {
    constructor() {
        this.currentLanguage = 'ruby';
        this.codeSnippets = window.CODE_SNIPPETS || {};
    }

    /**
     * Apply intelligent color mapping based on color properties
     */
    createIntelligentTheme(colors) {
        // Convert hex to HSL for better color analysis
        const hexToHsl = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (!result) return { h: 0, s: 0, l: 0 };
            
            let r = parseInt(result[1], 16) / 255;
            let g = parseInt(result[2], 16) / 255;
            let b = parseInt(result[3], 16) / 255;
            
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            
            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            
            return { h: h * 360, s: s * 100, l: l * 100 };
        };
        
        // Analyze all colors
        const colorAnalysis = colors.map(color => ({
            hex: color,
            hsl: hexToHsl(color),
            luminance: this.getLuminance(color)
        }));
        
        // Sort by luminance (lightness)
        const sortedByLightness = [...colorAnalysis].sort((a, b) => a.luminance - b.luminance);
        
        // Determine if this is a light or dark theme based on palette
        const averageLuminance = colorAnalysis.reduce((sum, color) => sum + color.luminance, 0) / colorAnalysis.length;
        const isLightTheme = averageLuminance > 0.5;
        
        console.log('🎨 Theme detection:', {
            averageLuminance: averageLuminance.toFixed(3),
            isLightTheme: isLightTheme,
            themeType: isLightTheme ? 'Light Theme' : 'Dark Theme'
        });
        
        // Select background and foreground based on theme type
        let background, foreground;
        if (isLightTheme) {
            // Light theme: use lightest color as background, darkest as foreground
            background = sortedByLightness[sortedByLightness.length - 1]; // Lightest color
            foreground = sortedByLightness[0]; // Darkest color
        } else {
            // Dark theme: use darkest color as background, lightest as foreground
            background = sortedByLightness[0]; // Darkest color
            foreground = sortedByLightness[sortedByLightness.length - 1]; // Lightest color
        }
        
        // Calculate contrast ratio between two colors
        const getContrastRatio = (color1, color2) => {
            const lum1 = this.getLuminance(color1);
            const lum2 = this.getLuminance(color2);
            const brightest = Math.max(lum1, lum2);
            const darkest = Math.min(lum1, lum2);
            return (brightest + 0.05) / (darkest + 0.05);
        };
        
        // Create a better color mapping strategy with contrast checking
        const allColors = [...colorAnalysis].sort((a, b) => b.hsl.s - a.hsl.s);
        
        // Create a contrast-safe color selector
        const getContrastSafeColor = (index) => {
            const color = allColors[index % allColors.length];
            const contrast = getContrastRatio(background.hex, color.hex);
            
            // If contrast is too low, use foreground color instead
            if (contrast < 3.0) {
                return foreground.hex;
            }
            return color.hex;
        };
        
        // Create theme with contrast-safe color assignment
        const theme = {
            background: background.hex,
            foreground: foreground.hex,
            comment: getContrastSafeColor(0),
            keyword: getContrastSafeColor(1),
            string: getContrastSafeColor(2),
            number: getContrastSafeColor(3),
            function: getContrastSafeColor(4),
            class: getContrastSafeColor(5),
            variable: getContrastSafeColor(6),
            symbol: getContrastSafeColor(7),
            builtin: getContrastSafeColor(4),
            property: getContrastSafeColor(6),
            char: getContrastSafeColor(2),
            regex: getContrastSafeColor(2),
            constant: getContrastSafeColor(5),
            boolean: getContrastSafeColor(1),
            operator: getContrastSafeColor(0),
            punctuation: getContrastSafeColor(0)
        };
        
        console.log('🎨 Created contrast-safe theme:', {
            inputColors: colors,
            theme: theme,
            backgroundLuminance: background.luminance,
            foregroundLuminance: foreground.luminance,
            colorMapping: allColors.map((c, i) => ({ 
                index: i, 
                hex: c.hex, 
                saturation: c.hsl.s,
                contrast: getContrastRatio(background.hex, c.hex).toFixed(2)
            }))
        });
        
        return theme;
    }

    /**
     * Calculate luminance of a hex color
     */
    getLuminance(hex) {
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };
        
        const rgb = hexToRgb(hex);
        if (!rgb) return 0;
        
        const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    /**
     * Switch to a different programming language
     */
    switchLanguage(language) {
        if (this.codeSnippets[language]) {
            this.currentLanguage = language;
            console.log(`🔄 Switched to ${language} language`);
            
            // Update the code content
            const codeElement = document.getElementById('codeSnippet');
            if (codeElement) {
                codeElement.textContent = this.codeSnippets[language];
                codeElement.className = `language-${language}`;
            }
            
            // Re-apply syntax highlighting if Prism is available
            if (typeof Prism !== 'undefined') {
                Prism.highlightElement(codeElement);
            }
        }
    }

    /**
     * Apply theme colors to the code preview
     */
    applyThemeColors(colors) {
        console.log(`🎨 Applying theme colors to ${this.currentLanguage} code preview`);
        
        // Apply colors to the code preview
        const codePreview = document.querySelector('.code-preview');
        const preElement = codePreview?.querySelector('pre');
        
        if (preElement && colors.length > 0) {
            // Use first color as background on the pre element (where the code actually is)
            const backgroundColor = colors[0];
            preElement.style.backgroundColor = backgroundColor;
            
            // Apply syntax highlighting with API colors
            this.applySyntaxTheme(colors);
            
            console.log(`🎨 Applied background: ${backgroundColor} with syntax theme`);
        }
    }

    /**
     * Apply syntax highlighting theme
     */
    applySyntaxTheme(colors) {
        // Intelligently map colors based on their properties
        const theme = this.createIntelligentTheme(colors);
        
        // Apply the theme to the code preview
        const codePreview = document.querySelector('.code-preview');
        const preElement = codePreview.querySelector('pre');
        
        if (preElement) {
            // Set base colors
            preElement.style.backgroundColor = theme.background;
            preElement.style.color = theme.foreground;
            
            // Apply syntax highlighting
            this.highlightSyntax(preElement, theme);
        }
        
        console.log('🎨 Applied intelligent syntax theme:', theme);
    }

    /**
     * Apply Prism.js syntax highlighting with theme colors
     */
    highlightSyntax(preElement, theme) {
        // Apply CSS custom properties for the theme colors
        const codePreview = document.querySelector('.code-preview');
        if (codePreview) {
            codePreview.style.setProperty('--theme-comment', theme.comment);
            codePreview.style.setProperty('--theme-keyword', theme.keyword);
            codePreview.style.setProperty('--theme-string', theme.string);
            codePreview.style.setProperty('--theme-number', theme.number);
            codePreview.style.setProperty('--theme-class', theme.class);
            codePreview.style.setProperty('--theme-function', theme.function);
            codePreview.style.setProperty('--theme-variable', theme.variable || theme.foreground);
            codePreview.style.setProperty('--theme-symbol', theme.symbol || theme.variable || theme.foreground);
            codePreview.style.setProperty('--theme-builtin', theme.builtin || theme.function);
            codePreview.style.setProperty('--theme-property', theme.property || theme.variable || theme.foreground);
            codePreview.style.setProperty('--theme-char', theme.char || theme.string);
            codePreview.style.setProperty('--theme-regex', theme.regex || theme.string);
            codePreview.style.setProperty('--theme-constant', theme.constant || theme.class);
            codePreview.style.setProperty('--theme-boolean', theme.boolean || theme.keyword);
            codePreview.style.setProperty('--theme-operator', theme.operator || theme.foreground);
            codePreview.style.setProperty('--theme-punctuation', theme.punctuation || theme.foreground);
            codePreview.style.setProperty('--theme-foreground', theme.foreground);
        }
        
        // Find the code element directly by ID
        const codeElement = document.getElementById('codeSnippet');
        
        if (codeElement) {
            // Use Prism.js to highlight the code
            if (typeof Prism !== 'undefined') {
                try {
                    // Make sure the code element has the correct language class
                    const languageClass = `language-${this.currentLanguage}`;
                    if (!codeElement.classList.contains(languageClass)) {
                        // Remove any existing language classes
                        codeElement.className = codeElement.className.replace(/language-\w+/g, '');
                        codeElement.classList.add(languageClass);
                    }
                    Prism.highlightElement(codeElement);
                    console.log(`🎨 Applied Prism.js highlighting for ${this.currentLanguage} successfully`);
                } catch (error) {
                    console.warn('⚠️ Prism.js highlighting failed:', error);
                    // Fallback: just apply the theme colors without syntax highlighting
                }
            }
        } else {
            console.warn('⚠️ Code element not found');
        }
        
        console.log('🎨 Applied theme colors');
    }

    /**
     * Update theme preview with colors
     */
    updateThemePreview(colors) {
        console.log('🎨 Updating theme preview with colors:', colors);
        
        // Get the code element and set the current language's snippet content
        const codeElement = document.getElementById('codeSnippet');
        if (codeElement) {
            const snippet = this.codeSnippets[this.currentLanguage] || this.codeSnippets['ruby'] || '# Code snippet not available';
            codeElement.textContent = snippet;
            codeElement.className = `language-${this.currentLanguage}`;
        }
        
        // Apply the extracted colors to style the code preview
        this.applyThemeColors(colors);
        
        // Show the theme preview
        const themePreview = document.getElementById('themePreview');
        if (themePreview) {
            themePreview.style.display = 'block';
        }
        
        console.log(`✅ Theme preview updated with ${this.currentLanguage} code and extracted colors`);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SnippetGenerator;
} else {
    window.SnippetGenerator = SnippetGenerator;
}
