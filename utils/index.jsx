import { centerCrop, makeAspectCrop } from "react-image-crop";

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
    return error.response?.data?.message || error.message || error.response?.message
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

export const setLocalStorage = cartItems => {
    if (typeof window !== 'undefined') localStorage.setItem("insta-cart", JSON.stringify(cartItems));
}

export function centerAspectCrop(
    mediaWidth,
    mediaHeight,
    aspect,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export const crop = (url, aspectRatio, canvas) => {
    return new Promise((resolve, reject) => {
        const inputImage = new Image();
        inputImage.crossOrigin = process.env.NEXTAUTH_URL;

        inputImage.addEventListener("error", (error) => reject(error));
        inputImage.addEventListener("load", () => {
            const inputWidth = inputImage.naturalWidth;
            const inputHeight = inputImage.naturalHeight;

            const scaleX = inputImage.naturalWidth / inputImage.width;
            const scaleY = inputImage.naturalHeight / inputImage.height;

            const inputAspectRatio = inputWidth / inputHeight;

            let outputWidth = inputWidth * scaleX;
            let outputHeight = inputHeight * scaleY;
            if (inputAspectRatio > aspectRatio) outputWidth = inputHeight * aspectRatio;
            else if (inputAspectRatio < aspectRatio) outputHeight = inputWidth * aspectRatio;

            const outputX = (inputWidth - outputWidth) / 2;
            const outputY = (inputHeight - outputHeight) / 2;

            canvas = canvas ?? document.createElement("canvas");

            const ctx = canvas.getContext("2d");
            const pxRatio = window.devicePixelRatio;
            if (!ctx) return reject(new Error("Canvas didn't load"));
            if (pxRatio === 1)
                ctx.setTransform(pxRatio, 0, 0, pxRatio, 0, 0);
            try {
                ctx.drawImage(inputImage, outputX, outputY, outputWidth, outputHeight, 0, 0, ctx.canvas.width, ctx.canvas.width);
                ctx.save();
            } catch (err) { reject(err); }
            resolve(canvas);
        });

        inputImage.src = url; //"?not+from+cache+please";
    });
};

export const formatFileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "Kb", "Mb", "Gb", "Tb"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFileType = (fileName) => {
    return (fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) || fileName).toLowerCase();
};

export const getMimeType = (filename) => {
    return `image/${getFileType(filename)}`;
};

export const readFile = (file) => {
    if (!file) return Promise.reject(new Error("Empty file"));
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
};