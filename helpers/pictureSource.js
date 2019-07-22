// https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
function extend(obj, src) {
    Object.keys(src).forEach(function(key) { 
        if(src[key] != undefined) {
            obj[key] = src[key]; 
        }
    });
    return obj;
}

function objectClone(src) {
    return JSON.parse(JSON.stringify(src));
}

// Filter all default settings from parameters
function getImageProcessorSettings(obj) {
    for(var i = 0, len = configSettings.length; i < len; i++) {
        obj[configSettings[i]] = undefined;
    }
    return obj;
}

function createImageQueryString(settings) {
    var queryString = '?',
        filteredSettings = getImageProcessorSettings(objectClone(settings));

    Object.keys(filteredSettings).forEach(function(key) { 
        if(filteredSettings[key] != undefined) {
            queryString += queryString.length > 1 ? '&' : '';
            queryString += key + '=' + filteredSettings[key];
        }
    });

    return queryString;
}

function createSourceTag(mediaCondition, imageSrc, settings, tagClose) {
    var tagOpen = '<source media="('+mediaCondition+')" srcset="',
        imageSrcSeparator = ', ',
        outputHTML = '',
        highDensitySettings = objectClone(settings);

    // Open source tag and add standard density image source
    outputHTML += tagOpen + imageSrc + createImageQueryString(settings);

    // Check if a higher display density image source needs creating
    if(settings.createHighDensityDisplay) {

        // Apply multiplier to any dimension settings present
        if(highDensitySettings.height) {
            highDensitySettings.height = highDensitySettings.height * settings.highDensityDimensionMultiplier
        }
        if(highDensitySettings.width) {
            highDensitySettings.width = highDensitySettings.width * settings.highDensityDimensionMultiplier
        }
        outputHTML += imageSrcSeparator + imageSrc + createImageQueryString(highDensitySettings) + ' ' + settings.highDensityDisplayDensity;
    }
    
    // Close off source tag accordingly (end srcset attribute, add type attribute for webp)
    outputHTML += '"';
    outputHTML += tagClose;

    return outputHTML;
}

// Define settings
const defaultSettings = {
        quality: 80,                        // Quality of non-webP image
        createWebP: true,                   // Flag to toggle creation of webP source
        webPQuality: 85,                    // Quality of webP image
        createHighDensityDisplay: true,     // Flag to toggle creation of higher resolution source for pixel dense displays (both webP and non-webP)
        highDensityDisplayDensity: '1.5x',  // Pixel dense display selector
        highDensityDimensionMultiplier: 2,  // Factor by which image dimensions are increased by for pixel dense displays
        highDensityQuality: 50,             // Quality of non-webP images on pixel dense displays
        highDensityWebPQuality: 60          // Quality of webP images on pixel dense displays
    },
    // Define properties which are not used by image processor to be filtered out of query string
    configSettings = [
        'createWebP',
        'webPQuality',
        'createHighDensityDisplay',
        'highDensityDisplayDensity',
        'highDensityDimensionMultiplier',
        'highDensityQuality',
        'highDensityWebPQuality'
    ];

module.exports = function(mediaCondition, imageSrc, options) {
    var userSettings = options.hash,
        settings = {},
        sourceTagsHTML = '';

    // Allows overriding of any settings and/or addition of extra settings to be used by the image processor
    settings = extend(defaultSettings, userSettings); 

    // Create webP first        
    if(settings.createWebP) {
        // Create copy of object to prevent 
        var webPSettings = objectClone(settings);
        
        // Override settings to force webp format and use webP quality
        webPSettings.format = 'webp';
        webPSettings.quality = settings.webPQuality;

        sourceTagsHTML += createSourceTag(mediaCondition, imageSrc, webPSettings, ' type="image/webp">');
    }

    // Create fallback image where webP is not supported
    sourceTagsHTML += createSourceTag(mediaCondition, imageSrc, settings, '>');
    
    return sourceTagsHTML;
};
