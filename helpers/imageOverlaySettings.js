module.exports = function(parentWidth, parentHeight, settings) {
        
    var positionLeft, positionTop, sizeWidth, sizeHeight;

    if(settings)
    {
        if(parentWidth)
            sizeWidth = parseInt((parentWidth/100) * settings.size);
    
        if(parentHeight)
            sizeHeight = parseInt((parentHeight/100) * settings.size);

        if(settings.position.startsWith('top'))
            positionTop = 0;
    
        if(settings.position.startsWith('bottom'))
            positionTop = 5000;
    
        if(settings.position.endsWith('left'))
            positionLeft = 0;
    
        if(settings.position.endsWith('right'))
            positionLeft = 5000;         
    
        return '&overlay='+ settings.src +'&overlay.position='+ positionTop +','+ positionLeft +'&overlay.size='+ sizeWidth +','+ sizeHeight +'&overlay.opacity='+ settings.opacity;    
    }
};
