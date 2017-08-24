module.exports = {	
    
        buildSourcesObj : function (breakpoints) {	
            var sources = {};
            for (var i = 0, len = breakpoints.length ; i < len; i++) {
                var current = breakpoints[i].split(" ");
                sources[current[0]] = current[1];
            }
    
            return sources;
        },
    
        element : function(src, alt, focalPoint, classes, sources, fallbackSize) {
            var html = '',
                openingTag = '<picture alt="'+ alt +'" class="'+ classes +'" data-picture>',
                sourceTags = '',
                imageFallback = '',
                closingTag = '</picture>',
                allOption = '';
            
            if(sources.all != undefined) {
                allOption = sources.all;
                delete sources.all;
            }
    
            if(focalPoint) {
                if(allOption == '')
                    allOption += '?center='+ focalPoint.left +','+ focalPoint.top;
                else
                    allOption += '&center='+ focalPoint.left +','+ focalPoint.top;
            }
                
    
            for (var key in sources) {
                if (sources.hasOwnProperty(key)) {
                    // Build sources HTML
                    var val = sources[key],
                        source = '<source media="(min-width: ' + key + ')" srcset="' + src + '?';
    
                    if(allOption !== '') {
                        source += allOption + '&' + val + '">'
                    }
                    else {
                        source += val + '">'
                    }
    
                    sourceTags += source;
                }
            }
    
            // Build fallback image HTML
            imageFallback = '<img src="' + src + '?';
    
            if(allOption !== '') {
                imageFallback += allOption + '&' + sources[fallbackSize];
            }
            else {
                source += sources[fallbackSize];
            }
    
            imageFallback += '" alt="' + alt +'">';
    
            return html = openingTag + sourceTags + imageFallback + closingTag;
        },
    
        attributes : function(src, sources) {
            return "data-app='PictureBackground' data-image='"+ src +"' data-options='" + JSON.stringify(sources) + "'";
        }
    }