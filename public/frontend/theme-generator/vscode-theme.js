const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

class VSCodeThemeGenerator {
    constructor() {
        this.themeTemplate = {
            name: "Generated Theme",
            type: "dark",
            colors: {},
            tokenColors: []
        };
    }

    generateTheme(colors, themeName) {
        console.log('🎨 Generating VS Code theme with colors:', colors);
        
        // Determine theme type based on the first background color
        const isDark = this.isDarkColor(colors[0]);
        const themeType = isDark ? "dark" : "light";
        
        // Map colors to VS Code theme properties
        const themeColors = this.mapColorsToVSCode(colors);
        
        const theme = {
            name: themeName || "Generated Palette Theme",
            type: themeType,
            colors: themeColors,
            tokenColors: this.generateTokenColors(colors)
        };

        console.log('✅ Theme generated:', theme);
        return theme;
    }

    mapColorsToVSCode(colors) {
        // Use generated colors only for syntax highlighting, use standard dark/light colors for IDE chrome
        const [bg1, bg2, accent1, accent2, accent3, accent4, accent5, accent6] = colors;
        
        // Determine if this should be a dark or light theme based on the first background color
        const isDark = this.isDarkColor(bg1);
        
        // Choose appropriate foreground color based on background darkness
        const editorForeground = isDark ? 
            (this.isDarkColor(accent1) ? accent2 || accent3 || accent4 : accent1) : // For dark bg, use light accent
            (this.isDarkColor(accent1) ? accent1 : accent2 || accent3 || accent4);   // For light bg, use dark accent
        
        if (isDark) {
            // Dark Modern theme colors for IDE chrome, generated palette for editor
        return {
                // Use generated palette background for editor, Dark Modern colors for IDE chrome
            "editor.background": bg1 || "#1e1e1e",
                "sideBar.background": "#252526",
                "activityBar.background": "#333333",
                "statusBar.background": "#007acc",
                "titleBar.activeBackground": "#3c3c3c",
                "panel.background": "#1e1e1e",
                "terminal.background": bg1 || "#1e1e1e",
                
                // Use palette color for editor foreground, Dark Modern colors for IDE chrome
                "editor.foreground": editorForeground || "#d4d4d4",
                "sideBar.foreground": "#cccccc",
                "statusBar.foreground": "#ffffff",
                "titleBar.activeForeground": "#cccccc",
                "panel.foreground": "#d4d4d4",
                "terminal.foreground": "#d4d4d4",
                
                // Dark Modern accent colors
                "editorCursor.foreground": "#aeafad",
                "editor.selectionBackground": "#264f78",
                "editor.lineHighlightBackground": "#2a2d2e",
                "editorBracketMatch.background": "#0e639c",
                "editorBracketMatch.border": "#888888",
                "editorIndentGuide.background": "#404040",
                "editorIndentGuide.activeBackground": "#707070",
                "editorLineNumber.foreground": "#858585",
                "editorLineNumber.activeForeground": "#c6c6c6",
                "editorWidget.background": "#252526",
                "editorWidget.border": "#454545",
                "input.background": "#3c3c3c",
                "input.border": "#454545",
                "input.foreground": "#cccccc",
                "inputOption.activeBackground": "#007acc",
                "inputOption.activeForeground": "#ffffff",
                "inputValidation.errorBackground": "#5a1d1d",
                "inputValidation.errorBorder": "#be1100",
                "inputValidation.infoBackground": "#1a1a1a",
                "inputValidation.infoBorder": "#007acc",
                "inputValidation.warningBackground": "#5a4a1a",
                "inputValidation.warningBorder": "#b89500",
                "list.activeSelectionBackground": "#094771",
                "list.activeSelectionForeground": "#ffffff",
                "list.dropBackground": "#383b3d",
                "list.focusBackground": "#062f4a",
                "list.highlightForeground": "#0097fb",
                "list.hoverBackground": "#2a2d2e",
                "list.inactiveSelectionBackground": "#3c3c3c",
                "list.inactiveSelectionForeground": "#ffffff",
                "list.invalidItemForeground": "#b89500",
                "list.errorForeground": "#f44747",
                "list.warningForeground": "#ffcc02",
                "listFilterWidget.background": "#3c3c3c",
                "listFilterWidget.outline": "#000000",
                "listFilterWidget.noMatchesOutline": "#be1100",
                "menu.background": "#3c3c3c",
                "menu.foreground": "#cccccc",
                "menu.selectionBackground": "#094771",
                "menu.selectionForeground": "#ffffff",
                "menu.separatorBackground": "#bbbbbb",
                "menubar.selectionBackground": "#5a5a5a",
                "menubar.selectionForeground": "#cccccc",
                "notificationCenter.border": "#454545",
                "notificationCenterHeader.foreground": "#cccccc",
                "notificationCenterHeader.background": "#3c3c3c",
                "notificationToast.border": "#454545",
                "notifications.foreground": "#cccccc",
                "notifications.background": "#3c3c3c",
                "notifications.border": "#454545",
                "notificationLink.foreground": "#3794ff",
                "notificationsErrorIcon.foreground": "#f48771",
                "notificationsWarningIcon.foreground": "#cca700",
                "notificationsInfoIcon.foreground": "#3794ff",
                "pickerGroup.border": "#3f3f46",
                "pickerGroup.foreground": "#3794ff",
                "progressBar.background": "#0e70c0",
                "quickInput.background": "#3c3c3c",
                "quickInput.foreground": "#cccccc",
                "quickInputTitle.background": "#2d2d30",
                "scrollbar.shadow": "#000000",
                "scrollbarSlider.activeBackground": "#6a6a6a",
                "scrollbarSlider.background": "#79797966",
                "scrollbarSlider.hoverBackground": "#646464b3",
                "searchEditor.textInputBorder": "#007acc",
                "selection.background": "#264f78",
                "settings.headerForeground": "#cccccc",
                "settings.modifiedItemIndicator": "#0c7d9d",
                "settings.dropdownBackground": "#3c3c3c",
                "settings.dropdownForeground": "#f0f0f0",
                "settings.dropdownBorder": "#454545",
                "settings.dropdownListBorder": "#454545",
                "settings.checkboxBackground": "#3c3c3c",
                "settings.checkboxForeground": "#f0f0f0",
                "settings.checkboxBorder": "#454545",
                "settings.textInputBackground": "#3c3c3c",
                "settings.textInputForeground": "#cccccc",
                "settings.textInputBorder": "#454545",
                "settings.numberInputBackground": "#3c3c3c",
                "settings.numberInputForeground": "#cccccc",
                "settings.numberInputBorder": "#454545",
                "tab.activeBackground": "#1e1e1e",
                "tab.activeForeground": "#ffffff",
                "tab.border": "#252526",
                "tab.activeBorder": "#1e1e1e",
                "tab.inactiveBackground": "#2d2d30",
                "tab.inactiveForeground": "#969696",
                "tab.unfocusedActiveForeground": "#969696",
                "tab.unfocusedInactiveForeground": "#969696",
                "tab.unfocusedActiveBorder": "#1e1e1e",
                "tab.unfocusedInactiveBorder": "#2d2d30",
                "tab.hoverBackground": "#2a2d2e",
                "tab.hoverForeground": "#ffffff",
                "tab.unfocusedHoverBackground": "#2a2d2e",
                "tab.unfocusedHoverForeground": "#969696",
                "tab.activeModifiedBorder": "#3399cc",
                "tab.inactiveModifiedBorder": "#3399cc",
                "tab.unfocusedActiveModifiedBorder": "#3399cc",
                "tab.unfocusedInactiveModifiedBorder": "#3399cc",
                "tab.activeBorderTop": "#007acc",
                "tab.unfocusedActiveBorderTop": "#007acc",
                "tab.hoverBorder": "#2a2d2e",
                "tab.unfocusedHoverBorder": "#2a2d2e",
                "tabStack.border": "#252526",
                "terminal.ansiBlack": "#000000",
                "terminal.ansiRed": "#cd3131",
                "terminal.ansiGreen": "#0dbc79",
                "terminal.ansiYellow": "#e5e510",
                "terminal.ansiBlue": "#2472c8",
                "terminal.ansiMagenta": "#bc3fbc",
                "terminal.ansiCyan": "#11a8cd",
                "terminal.ansiWhite": "#e5e5e5",
                "terminal.ansiBrightBlack": "#666666",
                "terminal.ansiBrightRed": "#f14c4c",
                "terminal.ansiBrightGreen": "#23d18b",
                "terminal.ansiBrightYellow": "#f5f543",
                "terminal.ansiBrightBlue": "#3b8eea",
                "terminal.ansiBrightMagenta": "#d670d6",
                "terminal.ansiBrightCyan": "#29b8db",
                "terminal.ansiBrightWhite": "#e5e5e5",
                "terminal.selectionBackground": "#ffffff40",
                "terminalCursor.background": "#ffffff",
                "terminalCursor.foreground": "#000000",
                "titleBar.activeBackground": "#3c3c3c",
                "titleBar.activeForeground": "#cccccc",
                "titleBar.inactiveBackground": "#3c3c3c",
                "titleBar.inactiveForeground": "#969696",
                "titleBar.border": "#454545",
                "walkThrough.embeddedEditorBackground": "#252526",
                "welcomePage.background": "#1e1e1e",
                "welcomePage.buttonBackground": "#0e639c",
                "welcomePage.buttonHoverBackground": "#1177bb",
                "widget.shadow": "#000000"
            };
        } else {
            // Light Modern theme colors for IDE chrome, generated palette for editor
            return {
                // Use generated palette background for editor, Light Modern colors for IDE chrome
                "editor.background": bg1 || "#ffffff",
                "sideBar.background": "#f3f3f3",
                "activityBar.background": "#2c2c2c",
                "statusBar.background": "#007acc",
                "titleBar.activeBackground": "#ffffff",
                "panel.background": "#ffffff",
                "terminal.background": bg1 || "#ffffff",
                
                // Use palette color for editor foreground, Light Modern colors for IDE chrome
                "editor.foreground": editorForeground || "#333333",
                "sideBar.foreground": "#616161",
                "statusBar.foreground": "#ffffff",
                "titleBar.activeForeground": "#333333",
                "panel.foreground": "#333333",
                "terminal.foreground": "#333333",
                
                // Light Modern accent colors
                "editorCursor.foreground": "#333333",
                "editor.selectionBackground": "#add6ff",
                "editor.lineHighlightBackground": "#f0f0f0",
                "editorBracketMatch.background": "#0e639c",
                "editorBracketMatch.border": "#888888",
                "editorIndentGuide.background": "#d3d3d3",
                "editorIndentGuide.activeBackground": "#939393",
                "editorLineNumber.foreground": "#237893",
                "editorLineNumber.activeForeground": "#0b216f",
                "editorWidget.background": "#f3f3f3",
                "editorWidget.border": "#c8c8c8",
                "input.background": "#ffffff",
                "input.border": "#c8c8c8",
                "input.foreground": "#333333",
                "inputOption.activeBackground": "#007acc",
                "inputOption.activeForeground": "#ffffff",
                "inputValidation.errorBackground": "#f2dede",
                "inputValidation.errorBorder": "#be1100",
                "inputValidation.infoBackground": "#d6ecf2",
                "inputValidation.infoBorder": "#007acc",
                "inputValidation.warningBackground": "#fff2cc",
                "inputValidation.warningBorder": "#b89500",
                "list.activeSelectionBackground": "#007acc",
                "list.activeSelectionForeground": "#ffffff",
                "list.dropBackground": "#383b3d",
                "list.focusBackground": "#d6ebff",
                "list.highlightForeground": "#0066bf",
                "list.hoverBackground": "#e8e8e8",
                "list.inactiveSelectionBackground": "#e5e5e5",
                "list.inactiveSelectionForeground": "#333333",
                "list.invalidItemForeground": "#b89500",
                "list.errorForeground": "#be1100",
                "list.warningForeground": "#bf8803",
                "listFilterWidget.background": "#ffffff",
                "listFilterWidget.outline": "#000000",
                "listFilterWidget.noMatchesOutline": "#be1100",
                "menu.background": "#ffffff",
                "menu.foreground": "#333333",
                "menu.selectionBackground": "#007acc",
                "menu.selectionForeground": "#ffffff",
                "menu.separatorBackground": "#bbbbbb",
                "menubar.selectionBackground": "#5a5a5a",
                "menubar.selectionForeground": "#333333",
                "notificationCenter.border": "#c8c8c8",
                "notificationCenterHeader.foreground": "#333333",
                "notificationCenterHeader.background": "#ffffff",
                "notificationToast.border": "#c8c8c8",
                "notifications.foreground": "#333333",
                "notifications.background": "#ffffff",
                "notifications.border": "#c8c8c8",
                "notificationLink.foreground": "#0066bf",
                "notificationsErrorIcon.foreground": "#f48771",
                "notificationsWarningIcon.foreground": "#cca700",
                "notificationsInfoIcon.foreground": "#3794ff",
                "pickerGroup.border": "#3f3f46",
                "pickerGroup.foreground": "#0066bf",
                "progressBar.background": "#0e70c0",
                "quickInput.background": "#ffffff",
                "quickInput.foreground": "#333333",
                "quickInputTitle.background": "#f3f3f3",
                "scrollbar.shadow": "#000000",
                "scrollbarSlider.activeBackground": "#6a6a6a",
                "scrollbarSlider.background": "#79797966",
                "scrollbarSlider.hoverBackground": "#646464b3",
                "searchEditor.textInputBorder": "#007acc",
                "selection.background": "#add6ff",
                "settings.headerForeground": "#333333",
                "settings.modifiedItemIndicator": "#0c7d9d",
                "settings.dropdownBackground": "#ffffff",
                "settings.dropdownForeground": "#333333",
                "settings.dropdownBorder": "#c8c8c8",
                "settings.dropdownListBorder": "#c8c8c8",
                "settings.checkboxBackground": "#ffffff",
                "settings.checkboxForeground": "#333333",
                "settings.checkboxBorder": "#c8c8c8",
                "settings.textInputBackground": "#ffffff",
                "settings.textInputForeground": "#333333",
                "settings.textInputBorder": "#c8c8c8",
                "settings.numberInputBackground": "#ffffff",
                "settings.numberInputForeground": "#333333",
                "settings.numberInputBorder": "#c8c8c8",
                "tab.activeBackground": "#ffffff",
                "tab.activeForeground": "#333333",
                "tab.border": "#f3f3f3",
                "tab.activeBorder": "#ffffff",
                "tab.inactiveBackground": "#f3f3f3",
                "tab.inactiveForeground": "#969696",
                "tab.unfocusedActiveForeground": "#969696",
                "tab.unfocusedInactiveForeground": "#969696",
                "tab.unfocusedActiveBorder": "#ffffff",
                "tab.unfocusedInactiveBorder": "#f3f3f3",
                "tab.hoverBackground": "#e8e8e8",
                "tab.hoverForeground": "#333333",
                "tab.unfocusedHoverBackground": "#e8e8e8",
                "tab.unfocusedHoverForeground": "#969696",
                "tab.activeModifiedBorder": "#3399cc",
                "tab.inactiveModifiedBorder": "#3399cc",
                "tab.unfocusedActiveModifiedBorder": "#3399cc",
                "tab.unfocusedInactiveModifiedBorder": "#3399cc",
                "tab.activeBorderTop": "#007acc",
                "tab.unfocusedActiveBorderTop": "#007acc",
                "tab.hoverBorder": "#e8e8e8",
                "tab.unfocusedHoverBorder": "#e8e8e8",
                "tabStack.border": "#f3f3f3",
            "terminal.ansiBlack": "#000000",
                "terminal.ansiRed": "#cd3131",
                "terminal.ansiGreen": "#0dbc79",
                "terminal.ansiYellow": "#e5e510",
                "terminal.ansiBlue": "#2472c8",
                "terminal.ansiMagenta": "#bc3fbc",
                "terminal.ansiCyan": "#11a8cd",
                "terminal.ansiWhite": "#e5e5e5",
                "terminal.ansiBrightBlack": "#666666",
                "terminal.ansiBrightRed": "#f14c4c",
                "terminal.ansiBrightGreen": "#23d18b",
                "terminal.ansiBrightYellow": "#f5f543",
                "terminal.ansiBrightBlue": "#3b8eea",
                "terminal.ansiBrightMagenta": "#d670d6",
                "terminal.ansiBrightCyan": "#29b8db",
                "terminal.ansiBrightWhite": "#e5e5e5",
                "terminal.selectionBackground": "#ffffff40",
                "terminalCursor.background": "#000000",
                "terminalCursor.foreground": "#ffffff",
                "titleBar.activeBackground": "#ffffff",
                "titleBar.activeForeground": "#333333",
                "titleBar.inactiveBackground": "#ffffff",
                "titleBar.inactiveForeground": "#969696",
                "titleBar.border": "#c8c8c8",
                "walkThrough.embeddedEditorBackground": "#f3f3f3",
                "welcomePage.background": "#ffffff",
                "welcomePage.buttonBackground": "#0e639c",
                "welcomePage.buttonHoverBackground": "#1177bb",
                "widget.shadow": "#000000"
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

    generateTokenColors(colors) {
        const [bg1, bg2, accent1, accent2, accent3, accent4, accent5, accent6] = colors;
        
        console.log('🎨 Token color mapping:', {
            accent1, accent2, accent3, accent4, accent5, accent6,
            comment: accent3,
            keyword: accent4,
            class: accent2
        });
        
        return [
            {
                name: "Comment",
                scope: ["comment", "punctuation.definition.comment"],
                settings: {
                    foreground: accent3 || "#6a9955",
                    fontStyle: "italic"
                }
            },
            {
                name: "Keyword",
                scope: ["keyword", "storage.type", "storage.modifier"],
                settings: {
                    foreground: accent4 || "#569cd6",
                    fontStyle: "bold"
                }
            },
            {
                name: "String",
                scope: ["string", "constant.other.symbol"],
                settings: {
                    foreground: accent3 || "#ce9178"
                }
            },
            {
                name: "Number",
                scope: ["constant.numeric"],
                settings: {
                    foreground: accent4 || "#b5cea8"
                }
            },
            {
                name: "Function",
                scope: ["entity.name.function", "meta.function-call"],
                settings: {
                    foreground: accent5 || "#dcdcaa"
                }
            },
            {
                name: "Variable",
                scope: ["variable", "variable.other"],
                settings: {
                    foreground: accent6 || "#9cdcfe"
                }
            },
            {
                name: "Class",
                scope: ["entity.name.type.class", "entity.name.type"],
                settings: {
                    foreground: accent2 || "#4ec9b0",
                    fontStyle: "bold"
                }
            }
        ];
    }

    async createThemePackage(theme, themeName, colors) {
        console.log('📦 Creating VS Code theme package...');
        
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        // Determine UI theme based on the generated theme type
        const isDark = this.isDarkColor(colors[0]);
        const uiTheme = isDark ? "vs-dark" : "vs";

        const packageJson = {
            name: themeName.toLowerCase().replace(/\s+/g, '-'),
            displayName: themeName,
            description: `Generated theme from color palette`,
            version: "1.0.0",
            publisher: "palette-generator",
            engines: {
                "vscode": "^1.74.0"
            },
            categories: ["Themes"],
            contributes: {
                themes: [{
                    label: themeName,
                    uiTheme: uiTheme,
                    path: "./themes/theme.json"
                }]
            }
        };

        // Create extension directory structure
        const extensionDir = path.join(tempDir, 'extension');
        if (!fs.existsSync(extensionDir)) {
            fs.mkdirSync(extensionDir, { recursive: true });
        }

        // Create package.json inside extension directory
        fs.writeFileSync(
            path.join(extensionDir, 'package.json'),
            JSON.stringify(packageJson, null, 2)
        );

        // Create themes directory inside extension directory
        const themesDir = path.join(extensionDir, 'themes');
        if (!fs.existsSync(themesDir)) {
            fs.mkdirSync(themesDir, { recursive: true });
        }

        // Create theme.json
        fs.writeFileSync(
            path.join(themesDir, 'theme.json'),
            JSON.stringify(theme, null, 2)
        );

        // Create .vsix package
        const output = fs.createWriteStream(path.join(tempDir, `${themeName.toLowerCase().replace(/\s+/g, '-')}.vsix`));
        const archive = archiver('zip', { zlib: { level: 9 } });

        return new Promise((resolve, reject) => {
            output.on('close', () => {
                console.log('✅ Theme package created successfully');
                const packagePath = path.join(tempDir, `${themeName.toLowerCase().replace(/\s+/g, '-')}.vsix`);
                resolve(packagePath);
            });

            archive.on('error', (err) => {
                reject(err);
            });

            archive.pipe(output);
            archive.directory(extensionDir, 'extension');
            archive.finalize();
        });
    }

    cleanup(tempDir) {
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    }
}

module.exports = VSCodeThemeGenerator;
