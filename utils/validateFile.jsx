export const validateFileType = (file, validTypes = ["image/jpeg", "image/jpg", "image/png"]) => {
    if (validTypes.indexOf(file.type) === -1) {
        file["invalid"] = true;
        return false;
    }
    return true;
};

export const validateFileNumber = (files, maxNumber) => {
    if (files.length > maxNumber) return false;

    return true;
};

export const validateFileSize = (file, maxSize) => {
    if (file.size > maxSize) {
        file["invalid"] = true;
        return false;
    }
    return true;
};
