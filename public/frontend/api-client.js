/**
 * API Client Module
 * Handles communication with the backend API for palette generation
 */

class ApiClient {
    constructor() {
        this.baseUrl = window.location.origin;
    }

    /**
     * Generate color palette from text description
     */
    async generatePalette(text) {
        console.log('🚀 Starting palette generation...');
        
        try {
            console.log('📡 Making API call to backend...');
            
            const response = await fetch(`${this.baseUrl}/api/generate-palette`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text
                })
            });

            console.log('📡 API response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ API error response:', errorData);
                throw new Error(`API request failed: ${errorData.error || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log('✅ API call successful, received data:', data);
            
            return data;

        } catch (error) {
            console.error('❌ API call failed:', error);
            throw error;
        }
    }


}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ApiClient;
} else {
    window.ApiClient = ApiClient;
}
