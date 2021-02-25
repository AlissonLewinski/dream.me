'use strict';

if (typeof exports === "undefined") {
    var exports = {};
}

if (typeof module === "undefined") {
   var module = {};
}

Object.defineProperty(exports, '__esModule', {
    value: true
});

var hasToBlobSupport = typeof HTMLCanvasElement !== "undefined" ? HTMLCanvasElement.prototype.toBlob : false;

var hasBlobSupport = hasToBlobSupport || typeof Uint8Array !== 'undefined' && typeof ArrayBuffer !== 'undefined' && typeof atob !== 'undefined';

var hasReaderSupport = typeof FileReader !== 'undefined' || typeof URL !== 'undefined';

function isSupported() {
    return typeof HTMLCanvasElement !== 'undefined' && hasBlobSupport && hasReaderSupport;
}

function _loadImage(image, file, callback) {
    if (typeof URL === 'undefined') {
        var reader = new FileReader();
        reader.onload = function (evt) {
            image.src = evt.target.result;
            if (callback) {
                callback();
            }
        };
        reader.readAsDataURL(file);
    } else {
        image.src = URL.createObjectURL(file);
        if (callback) {
            callback();
        }
    }
}

export function resize(file, maxDimensions, callback) {
    if (typeof maxDimensions === 'function') {
        callback = maxDimensions;
        maxDimensions = {
            width: 640,
            height: 480
        };
    }

    if (!isSupported() || !file.type.match(/image.*/)) {
        callback(file, false);
        return false;
    }

    if (file.type.match(/image\/gif/)) {
        // Not attempting, could be an animated gif
        callback(file, false);
        // TODO: use https://github.com/antimatter15/whammy to convert gif to webm
        return false;
    }

    var image = document.createElement('img');

    image.onload = function () {
        var width = image.width;
        var height = image.height;
        var isTooLarge = false;

        if (width > height && width > maxDimensions.width) {
            // width is the largest dimension, and it's too big.
            height *= maxDimensions.width / width;
            width = maxDimensions.width;
            isTooLarge = true;
        } else if (height > maxDimensions.height) {
            // either width wasn't over-size or height is the largest dimension
            // and the height is over-size
            width *= maxDimensions.height / height;
            height = maxDimensions.height;
            isTooLarge = true;
        }

        if (!isTooLarge) {
            // early exit; no need to resize
            callback(file, false);
            return;
        }

        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);

        if (hasToBlobSupport) {
            canvas.toBlob(function (blob) {
                callback(blob, true);
            }, file.type);
        }
    };
    _loadImage(image, file);

    return true;
}