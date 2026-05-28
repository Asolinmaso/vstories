import validator from "validator";

export type AuthFieldErrors = {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

const MIN_PASSWORD = 6;
const MIN_NAME = 2;

export function validateEmailField(email: string): string | undefined {
    const trimmed = email.trim();
    if (!trimmed) return "Email is required.";
    if (!validator.isEmail(trimmed)) return "Please enter a valid email address.";
    return undefined;
}

export function validatePasswordField(password: string, label = "Password"): string | undefined {
    if (!password) return `${label} is required.`;
    if (password.length < MIN_PASSWORD) {
        return `${label} must be at least ${MIN_PASSWORD} characters.`;
    }
    return undefined;
}

export function validateFullNameField(name: string): string | undefined {
    const trimmed = name.trim();
    if (!trimmed) return "Full name is required.";
    if (trimmed.length < MIN_NAME) return "Full name must be at least 2 characters.";
    if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
        return "Full name can only contain letters and spaces.";
    }
    return undefined;
}

export function validateLoginForm(email: string, password: string): AuthFieldErrors {
    const errors: AuthFieldErrors = {};
    const emailError = validateEmailField(email);
    const passwordError = validatePasswordField(password);

    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return errors;
}

export function validateSignupForm(
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
): AuthFieldErrors {
    const errors: AuthFieldErrors = {};
    const nameError = validateFullNameField(fullName);
    const emailError = validateEmailField(email);
    const passwordError = validatePasswordField(password);

    if (nameError) errors.fullName = nameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
}

export function hasFieldErrors(errors: AuthFieldErrors): boolean {
    return Object.keys(errors).length > 0;
}
