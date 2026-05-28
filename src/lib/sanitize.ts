import DOMPurify from 'isomorphic-dompurify';
import validator from 'validator';

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(dirty: string): string {
    return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
        ALLOWED_ATTR: []
    });
}

/**
 * Sanitize plain text (strip all HTML)
 */
export function sanitizeText(text: string): string {
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

/**
 * Validate and normalize email
 */
export function sanitizeEmail(email: string): string | null {
    const normalized = validator.normalizeEmail(email);
    if (normalized && validator.isEmail(normalized)) {
        return normalized;
    }
    return null;
}

/**
 * Validate phone number (Indian format)
 */
export function validatePhone(phone: string): boolean {
    // Remove spaces, dashes, parentheses
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    // Indian phone: 10 digits or +91 followed by 10 digits
    return /^(\+91)?[6-9]\d{9}$/.test(cleaned);
}

/**
 * Sanitize URL
 */
export function sanitizeUrl(url: string): string | null {
    if (validator.isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
        return url;
    }
    return null;
}

/**
 * Escape special characters for safe display
 */
export function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };
    return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Validate and sanitize form data
 */
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    subject?: string;
}

export function sanitizeContactForm(data: ContactFormData): ContactFormData | { error: string } {
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
        return { error: 'Missing required fields' };
    }

    // Sanitize name
    const name = sanitizeText(data.name.trim());
    if (name.length < 2 || name.length > 100) {
        return { error: 'Name must be between 2 and 100 characters' };
    }

    // Sanitize and validate email
    const email = sanitizeEmail(data.email.trim());
    if (!email) {
        return { error: 'Invalid email address' };
    }

    // Validate phone
    const phone = data.phone.trim();
    if (phone && !validatePhone(phone)) {
        return { error: 'Invalid phone number' };
    }

    // Sanitize message
    const message = sanitizeText(data.message.trim());
    if (message.length < 10 || message.length > 2000) {
        return { error: 'Message must be between 10 and 2000 characters' };
    }

    // Sanitize subject (optional)
    const subject = data.subject ? sanitizeText(data.subject.trim()) : undefined;

    return {
        name,
        email,
        phone,
        message,
        subject,
    };
}
