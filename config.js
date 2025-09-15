// Configuration file for the palette generator
// This file handles environment variables and provides secure configuration

require('dotenv').config();

const config = {
    // API Configuration
    huggingFaceToken: process.env.HUGGING_FACE_TOKEN || '',
    
    // Server Configuration
    port: process.env.PORT || 3000,
    
    // Validate configuration
    validate() {
        if (!this.huggingFaceToken) {
            console.error('❌ HUGGING_FACE_TOKEN environment variable is required');
            console.log('📝 Please create a .env file with your Hugging Face token:');
            console.log('   HUGGING_FACE_TOKEN=your_token_here');
            process.exit(1);
        }
        return true;
    }
};

module.exports = config;
