// Palette History Management
class PaletteHistory {
    constructor(onPaletteClick) {
        this.history = [];
        this.paletteHistoryElement = document.getElementById('paletteHistory');
        this.onPaletteClick = onPaletteClick;
        this.loadHistory();
    }
    
    loadHistory() {
        console.log('📚 Loading palette history from localStorage...');
        const saved = localStorage.getItem('paletteHistory');
        this.history = saved ? JSON.parse(saved) : [];
        this.displayHistory();
        console.log('✅ Loaded', this.history.length, 'saved palettes');
    }
    
    savePalette(prompt, colors) {
        console.log('💾 Saving palette to history...');
        const palette = {
            id: Date.now().toString(),
            prompt: prompt,
            colors: colors,
            timestamp: new Date().toISOString()
        };
        
        // Add to beginning of history
        this.history.unshift(palette);
        
        // Keep only last 20 palettes
        if (this.history.length > 20) {
            this.history = this.history.slice(0, 20);
        }
        
        // Save to localStorage
        localStorage.setItem('paletteHistory', JSON.stringify(this.history));
        
        // Update display
        this.displayHistory();
        console.log('✅ Palette saved to history');
    }
    
    displayHistory() {
        console.log('🎨 Displaying palette history...');
        
        if (this.history.length === 0) {
            this.paletteHistoryElement.style.display = 'none';
            return;
        }
        
        this.paletteHistoryElement.style.display = 'block';
        
        this.paletteHistoryElement.innerHTML = this.history.map(palette => {
            const truncatedPrompt = palette.prompt.length > 30 
                ? palette.prompt.substring(0, 30) + '...' 
                : palette.prompt;
                
            const colorBars = palette.colors.map(color => 
                `<div class="history-color-bar" style="background-color: ${color};"></div>`
            ).join('');
            
            const timeAgo = this.formatTimeAgo(new Date(palette.timestamp));
            
            return `
                <div class="history-item" data-id="${palette.id}">
                    <div class="history-palette">
                        <div class="history-overlay">
                            <div class="history-prompt" title="${palette.prompt}">${truncatedPrompt}</div>
                            <div class="history-timestamp">${timeAgo}</div>
                        </div>
                        ${colorBars}
                    </div>
                </div>
            `;
        }).join('');
        
        // Re-add click handlers after DOM update
        this.addClickHandlers();
        
        console.log('✅ History display updated');
    }
    
    getLastPalette() {
        return this.history.length > 0 ? this.history[0] : null;
    }
    
    getPaletteById(id) {
        return this.history.find(p => p.id === id);
    }
    
    setActivePalette(id) {
        this.paletteHistoryElement.querySelectorAll('.history-item').forEach(item => {
            item.classList.toggle('active', item.dataset.id === id);
        });
        
        // Show/hide header and set title
        const header = document.getElementById('selectedPaletteHeader');
        const title = document.getElementById('selectedPaletteTitle');
        
        if (id) {
            const palette = this.getPaletteById(id);
            if (palette) {
                title.textContent = palette.prompt;
                header.style.display = 'block';
            }
        } else {
            header.style.display = 'none';
        }
    }
    
    addClickHandlers() {
        this.paletteHistoryElement.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                this.onPaletteClick(id);
            });
        });
    }
    
    formatTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffMins < 1) return 'now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    }
}
