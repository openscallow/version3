import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a referral code by taking specified parts of a UUID
 * @param {Object} options - Configuration options
 * @param {number} [options.parts=1] - Number of UUID parts to use (1-5)
 * @param {boolean} [options.uppercase=false] - Whether to return the code in uppercase
 * @returns {string} The generated referral code
 */
export default function generateReferralCode({ parts = 1, uppercase = false } = {}) {
    // Ensure parts is within valid range (1-5 since UUID has 5 parts)
    const validParts = Math.min(Math.max(1, parts), 5);
    
    // Split UUID into parts and take the requested number of parts
    const uuid = uuidv4();
    const code = uuid.split('-').slice(0, validParts).join('');
    
    // Return in requested case
    return uppercase ? code.toUpperCase() : code;
}
 
// console.log(generateReferralCode()); // default: lowercase, 1 part
// console.log(generateReferralCode({ parts: 2 })); // lowercase, 2 parts
// console.log(generateReferralCode({ uppercase: true })); // uppercase, 1 part
// console.log(generateReferralCode({ parts: 2, uppercase: true })); // uppercase, 2 parts