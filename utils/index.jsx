export function timeSince(date) {
    const ago = typeof date === "string" || typeof date === "object" ? new Date(date).getTime() : date;
    const seconds = Math.floor((new Date().getTime() - ago) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1)
        return `${interval} year${interval === 1 ? "" : "s"} ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1)
        return `${interval} month${interval === 1 ? "" : "s"} ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1)
        return `${interval} day${interval === 1 ? "" : "s"} ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1)
        return `${interval}  hour${interval === 1 ? "" : "s"} ago`;

    interval = Math.floor(seconds / 60);
    if (interval >= 1)
        return `${interval}  minute${interval === 1 ? "" : "s"} ago`;

    interval = Math.floor(seconds);

    return `${interval < 20 ? "a moment ago" : interval + " seconds ago"}`;
}

export const formatError = (error) => {
    let message = error.message || error.response?.message
    if (message.match(/\[[a-zA-Z]+\]/)) {
        message = message.replace(/\[[a-zA-Z]+\]/g, "");
    }
    return message
};

export function getCssStyle(element, prop) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
}

export function getCanvasFontSize(el = document.body) {
    const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
    const fontSize = getCssStyle(el, 'font-size') || '16px';
    const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';

    return `${fontWeight} ${fontSize} ${fontFamily}`;
}

export function getTextWidth(text, font, canvas = document.createElement("canvas")) {
    // re-use canvas object for better performance
    const context = canvas.getContext("2d");
    if (!context) return 0;
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}

export const arrayToObject = (keys, value) => {
    if (!Array.isArray(keys)) return keys;
    const obj = {};
    for (let key of keys)
        obj[key] = value;
    return obj;
}