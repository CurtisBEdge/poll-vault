export const isValidInput = (value) => {
    return /[a-zA-Z0-9]/.test(value)
}

export const pollURLValidation = (value) => {
    try {
        new URL(value);
    }
    catch (e) {
        return false

    }
    return true;
}

export const isValidDate = (value) => {
    const now  = new Date()
    return value > (now.getTime() + 60000)
}



