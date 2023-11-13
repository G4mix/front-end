export const hasGmailDomain = (email: string) => /@gmail\.com$/.test(email),
isValidUsername = (username: string) => /^[A-Za-z0-9_]+$/.test(username),
hasOneUppercaseChar = (text: string) => /[A-Z]/.test(text),
hasNumber = (text: string) => /\d/.test(text),
hasSpecialChar = (text: string) => /[^A-Za-z0-9_]/.test(text),
hasEightOrMoreChars = (text: string) => text.length >= 8;