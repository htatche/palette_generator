// Vim Theme Generator
class VimThemeGenerator {
    constructor() {
        console.log('🎨 Initializing Vim Theme Generator...');
    }

    generateTheme(colors, themeName) {
        console.log('🎨 Generating Vim theme with colors:', colors);
        
        // Use the same color selection logic as the snippet generator
        const { background, foreground } = this.getSnippetColors(colors);
        
        // Determine theme type based on the selected background color
        const isDark = this.isDarkColor(background);
        const themeType = isDark ? "dark" : "light";
        
        // Map colors to Vim theme properties
        const themeColors = this.mapColorsToVim(colors, background, foreground);
        
        const theme = {
            name: themeName || "Generated Palette Theme",
            type: themeType,
            colors: themeColors
        };

        console.log('✅ Vim theme generated:', theme);
        return theme;
    }

    mapColorsToVim(colors, background, foreground) {
        // Use the same background and foreground as the snippet generator
        const [bg1, bg2, accent1, accent2, accent3, accent4, accent5, accent6] = colors;
        
        console.log('🎨 Vim theme color mapping:', {
            accent1, accent2, accent3, accent4, accent5, accent6,
            comment: accent3,
            keyword: accent4,
            type: accent2
        });
        
        // Determine if this should be a dark or light theme based on the selected background
        const isDark = this.isDarkColor(background);

        if (isDark) {
            // Dark theme with generated palette background for editor
            return {
                // Background colors
                "Normal": `${foreground} ${background}`,
                "NormalNC": `${foreground} ${background}`,
                "NormalFloat": `${foreground} ${background}`,
                "EndOfBuffer": `${background} ${background}`,
                "NonText": `${background} ${background}`,
                
                // UI colors (standard dark)
                "StatusLine": `#cccccc #252526`,
                "StatusLineNC": `#969696 #2d2d30`,
                "TabLine": `#969696 #2d2d30`,
                "TabLineFill": `#2d2d30 #2d2d30`,
                "TabLineSel": `#ffffff #1e1e1e`,
                "WinSeparator": `#454545 #454545`,
                "VertSplit": `#454545 #454545`,
                "LineNr": `#858585 #${background.replace('#', '')}`,
                "CursorLineNr": `#c6c6c6 #${background.replace('#', '')}`,
                "SignColumn": `${background} ${background}`,
                "FoldColumn": `${background} ${background}`,
                "Folded": `#969696 #2a2d2e`,
                
                // Selection and cursor
                "Visual": `#ffffff #264f78`,
                "VisualNOS": `#ffffff #264f78`,
                "Cursor": `#aeafad #aeafad`,
                "lCursor": `#aeafad #aeafad`,
                "CursorLine": `#2a2d2e #2a2d2e`,
                "CursorColumn": `#2a2d2e #2a2d2e`,
                
                // Search and match
                "Search": `#ffffff #0e639c`,
                "IncSearch": `#ffffff #0e639c`,
                "MatchParen": `#ffffff #0e639c`,
                
                // Syntax highlighting (using generated palette colors)
                "Comment": `${accent3 || '#6a9955'} ${background}`,
                "Constant": `${accent3 || '#4fc1ff'} ${background}`,
                "String": `${accent4 || '#ce9178'} ${background}`,
                "Character": `${accent4 || '#ce9178'} ${background}`,
                "Number": `${accent5 || '#b5cea8'} ${background}`,
                "Boolean": `${accent5 || '#b5cea8'} ${background}`,
                "Float": `${accent5 || '#b5cea8'} ${background}`,
                "Identifier": `${accent1 || '#d4d4d4'} ${background}`,
                "Function": `${accent6 || '#dcdcaa'} ${background}`,
                "Statement": `${accent2 || '#569cd6'} ${background}`,
                "Conditional": `${accent2 || '#569cd6'} ${background}`,
                "Repeat": `${accent2 || '#569cd6'} ${background}`,
                "Label": `${accent2 || '#569cd6'} ${background}`,
                "Operator": `${accent3 || '#d4d4d4'} ${background}`,
                "Keyword": `${accent4 || '#569cd6'} ${background}`,
                "Exception": `${accent2 || '#569cd6'} ${background}`,
                "PreProc": `${accent3 || '#c586c0'} ${background}`,
                "Include": `${accent3 || '#c586c0'} ${background}`,
                "Define": `${accent3 || '#c586c0'} ${background}`,
                "Macro": `${accent3 || '#c586c0'} ${background}`,
                "PreCondit": `${accent3 || '#c586c0'} ${background}`,
                "Type": `${accent2 || '#4ec9b0'} ${background}`,
                "StorageClass": `${accent2 || '#569cd6'} ${background}`,
                "Structure": `${accent2 || '#4ec9b0'} ${background}`,
                "Typedef": `${accent2 || '#4ec9b0'} ${background}`,
                "Special": `${accent5 || '#dcdcaa'} ${background}`,
                "SpecialChar": `${accent5 || '#dcdcaa'} ${background}`,
                "Tag": `${accent2 || '#569cd6'} ${background}`,
                "Delimiter": `${accent3 || '#d4d4d4'} ${background}`,
                "SpecialComment": `${accent2 || '#6a9955'} ${background}`,
                "Debug": `${accent5 || '#dcdcaa'} ${background}`,
                "Underlined": `${accent3 || '#c586c0'} ${background}`,
                "Ignore": `${accent3 || '#d4d4d4'} ${background}`,
                "Error": `#f44747 ${background}`,
                "Todo": `${accent5 || '#dcdcaa'} ${background}`,
                
                // Diff
                "DiffAdd": `#0dbc79 #0dbc79`,
                "DiffChange": `#e5e510 #e5e510`,
                "DiffDelete": `#cd3131 #cd3131`,
                "DiffText": `#ffffff #0e639c`,
                
                // Spell
                "SpellBad": `#f44747 #f44747`,
                "SpellCap": `#ffcc02 #ffcc02`,
                "SpellRare": `#c586c0 #c586c0`,
                "SpellLocal": `#4ec9b0 #4ec9b0`
            };
        } else {
            // Light theme with generated palette background for editor
            return {
                // Background colors
                "Normal": `${foreground} ${background}`,
                "NormalNC": `${foreground} ${background}`,
                "NormalFloat": `${foreground} ${background}`,
                "EndOfBuffer": `${background} ${background}`,
                "NonText": `${background} ${background}`,
                
                // UI colors (standard light)
                "StatusLine": `#333333 #f3f3f3`,
                "StatusLineNC": `#969696 #f3f3f3`,
                "TabLine": `#969696 #f3f3f3`,
                "TabLineFill": `#f3f3f3 #f3f3f3`,
                "TabLineSel": `#333333 #ffffff`,
                "WinSeparator": `#c8c8c8 #c8c8c8`,
                "VertSplit": `#c8c8c8 #c8c8c8`,
                "LineNr": `#237893 #${background.replace('#', '')}`,
                "CursorLineNr": `#0b216f #${background.replace('#', '')}`,
                "SignColumn": `${background} ${background}`,
                "FoldColumn": `${background} ${background}`,
                "Folded": `#969696 #f0f0f0`,
                
                // Selection and cursor
                "Visual": `#ffffff #add6ff`,
                "VisualNOS": `#ffffff #add6ff`,
                "Cursor": `#333333 #333333`,
                "lCursor": `#333333 #333333`,
                "CursorLine": `#f0f0f0 #f0f0f0`,
                "CursorColumn": `#f0f0f0 #f0f0f0`,
                
                // Search and match
                "Search": `#ffffff #0e639c`,
                "IncSearch": `#ffffff #0e639c`,
                "MatchParen": `#ffffff #0e639c`,
                
                // Syntax highlighting (using generated palette colors)
                "Comment": `${accent3 || '#6a9955'} ${background}`,
                "Constant": `${accent3 || '#4fc1ff'} ${background}`,
                "String": `${accent4 || '#ce9178'} ${background}`,
                "Character": `${accent4 || '#ce9178'} ${background}`,
                "Number": `${accent5 || '#b5cea8'} ${background}`,
                "Boolean": `${accent5 || '#b5cea8'} ${background}`,
                "Float": `${accent5 || '#b5cea8'} ${background}`,
                "Identifier": `${accent1 || '#333333'} ${background}`,
                "Function": `${accent6 || '#dcdcaa'} ${background}`,
                "Statement": `${accent2 || '#569cd6'} ${background}`,
                "Conditional": `${accent2 || '#569cd6'} ${background}`,
                "Repeat": `${accent2 || '#569cd6'} ${background}`,
                "Label": `${accent2 || '#569cd6'} ${background}`,
                "Operator": `${accent3 || '#333333'} ${background}`,
                "Keyword": `${accent4 || '#569cd6'} ${background}`,
                "Exception": `${accent2 || '#569cd6'} ${background}`,
                "PreProc": `${accent3 || '#c586c0'} ${background}`,
                "Include": `${accent3 || '#c586c0'} ${background}`,
                "Define": `${accent3 || '#c586c0'} ${background}`,
                "Macro": `${accent3 || '#c586c0'} ${background}`,
                "PreCondit": `${accent3 || '#c586c0'} ${background}`,
                "Type": `${accent2 || '#4ec9b0'} ${background}`,
                "StorageClass": `${accent2 || '#569cd6'} ${background}`,
                "Structure": `${accent2 || '#4ec9b0'} ${background}`,
                "Typedef": `${accent2 || '#4ec9b0'} ${background}`,
                "Special": `${accent5 || '#dcdcaa'} ${background}`,
                "SpecialChar": `${accent5 || '#dcdcaa'} ${background}`,
                "Tag": `${accent2 || '#569cd6'} ${background}`,
                "Delimiter": `${accent3 || '#333333'} ${background}`,
                "SpecialComment": `${accent2 || '#6a9955'} ${background}`,
                "Debug": `${accent5 || '#dcdcaa'} ${background}`,
                "Underlined": `${accent3 || '#c586c0'} ${background}`,
                "Ignore": `${accent3 || '#333333'} ${background}`,
                "Error": `#be1100 ${background}`,
                "Todo": `${accent5 || '#dcdcaa'} ${background}`,
                
                // Diff
                "DiffAdd": `#0dbc79 #0dbc79`,
                "DiffChange": `#e5e510 #e5e510`,
                "DiffDelete": `#cd3131 #cd3131`,
                "DiffText": `#ffffff #0e639c`,
                
                // Spell
                "SpellBad": `#be1100 #be1100`,
                "SpellCap": `#bf8803 #bf8803`,
                "SpellRare": `#c586c0 #c586c0`,
                "SpellLocal": `#4ec9b0 #4ec9b0`
            };
        }
    }

    isDarkColor(hexColor) {
        // Convert hex to RGB and calculate luminance
        const hex = hexColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Calculate relative luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Return true if dark (luminance < 0.5)
        return luminance < 0.5;
    }

    generateVimThemeFile(theme, themeName) {
        console.log('📝 Generating Vim theme file...');
        
        let vimTheme = `" ${themeName || 'Generated Palette Theme'}\n`;
        vimTheme += `" Generated by AI Color Palette Generator\n`;
        vimTheme += `" Type: ${theme.type}\n\n`;
        
        // Set background
        vimTheme += `set background=${theme.type}\n\n`;
        
        // Clear existing highlighting
        vimTheme += `highlight clear\n`;
        vimTheme += `if exists("syntax_on")\n`;
        vimTheme += `    syntax reset\n`;
        vimTheme += `endif\n\n`;
        
        // Set theme name
        vimTheme += `let g:colors_name = "${themeName.toLowerCase().replace(/\s+/g, '_') || 'generated_palette_theme'}"\n\n`;
        
        // Generate highlight groups
        for (const [group, colors] of Object.entries(theme.colors)) {
            if (colors && colors.includes(' ')) {
                const [fg, bg] = colors.split(' ');
                vimTheme += `highlight ${group} guifg=${fg} guibg=${bg}\n`;
            }
        }
        
        console.log('✅ Vim theme file generated');
        return vimTheme;
    }

    getSnippetColors(colors) {
        // Replicate the snippet generator's color selection logic
        const colorAnalysis = colors.map(hex => {
            const rgb = this.hexToRgb(hex);
            const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
            const lightness = this.getLuminance(hex);
            return { hex, rgb, hsl, lightness };
        });

        // Sort colors by lightness
        const sortedByLightness = [...colorAnalysis].sort((a, b) => a.lightness - b.lightness);
        
        // Determine if this is a light or dark theme based on average lightness
        const avgLightness = colorAnalysis.reduce((sum, color) => sum + color.lightness, 0) / colorAnalysis.length;
        const isLightTheme = avgLightness > 0.5;
        
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
        
        return { background: background.hex, foreground: foreground.hex };
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
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
    }

    getLuminance(hexColor) {
        const hex = hexColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16) / 255;
        const g = parseInt(hex.substr(2, 2), 16) / 255;
        const b = parseInt(hex.substr(4, 2), 16) / 255;
        
        // Apply gamma correction
        const toLinear = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        
        return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    }

    // Note: createThemePackage and cleanup methods removed as they use Node.js fs/path modules
    // The theme content is generated directly in the browser using generateVimThemeFile()
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VimThemeGenerator;
}
