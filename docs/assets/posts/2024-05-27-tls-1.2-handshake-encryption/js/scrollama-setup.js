
window.onload = (event) => {
    // using d3 for convenience
    // E: could have been something like jQuery, etc...
    var main = d3.select('body');
    var scrolly = main.select('#scrolly');
    var figure = scrolly.select('figure');
    var article = scrolly.select('div.articlepost');
    var step = article.selectAll('.step');

    console.log(main, scrolly, figure, article, step);
    
    // initialize the scrollama
    var scroller = scrollama();



    // generic window resize listener event
    function handleResize() {
        
    // 1. update height of step elements
    // E: I removed a div element from the figure element and now it fits all the space
        var stepH = Math.floor(window.innerHeight * 0.75);
        step.style('height', stepH + 'px');

        let figureHeight = window.innerHeight / 2;
        let figureMarginTop = (window.innerHeight - figureHeight) / 4;  
        figure
            .style('height', figureHeight + 'px')
            .style('top', figureMarginTop + 'px');
        
    // 3. tell scrollama to update new element dimensions
        scroller.resize();
    }

    const resourcesImgs = '../../../../../re-versing/mngassets/posts/2024-05-27-tls-ssl-v1.2-handshake-made-simple-session-keys-generation/img/';

    /*
    types:
    -- e: explain
    -- i: image only
    -- t: title (subtitle)

    text: true or false

    img (image for #scrollfig): something or null
    */
    let imageNamesObj = {
        metadata: {types: {descrption:'based on the classes', e: 'explain', i: 'image only', t:'title (subtitle'}, texts:{description:'true if text, otherwise false'}, imgs:{description:'images for #scrollfig; null if no image for that step'}},
         0: {img:null,type:'t',text:true},
         1: {img:'TLS - asymmetric keys.png',type:'e',text:true},
         2: {img:'TLS - client asymmetric encryption.svg',type:'e',text:true},
         3: {img:'TLS - clientPREMASTER2server airplane.svg',type:'i',text:false},
         4: {img:'TLS - server asymmetric decryption.svg',type:'e',text:true},
         5: {img:null,type:'t',text:true},
         6: {img:'TLS - randoms and pre-master.png',type:'e',text:true},
         7: {img:'TLS - PRF Master Secret.svg',type:'e',text:true},
         8: {img:'TLS - randoms and master.png',type:'e',text:true},
         9: {img:'TLS - pre-master or master.png',type:'e',text:true},
         10: {img:'TLS - PRF Session Keys.svg',type:'e',text:true},
         11: {img:null,type:'t',text:true},
         12: {img:'TLS - session keys.png',type:'e',text:true},
         13: {img:'TLS - session keys.png',type:'e',text:true},
         14: {img:null,type:'e',text:true},
         15: {img:'TLS - clientFINISHED2server airplane.svg',type:'i',text:false},
         16: {img:null,type:'e',text:true},
         17: {img:'TLS - serverFINISHED2client airplane.svg',type:'i',text:false},
         18: {img:null,type:'e',text:true}
    }


    // scrollama event handlers
    function handleStepEnter(response) {
        // E: add class active to the step which response.index is entering
        step.classed('is-active', function (d, i) { return i === response.index; });
        let figElem = document.getElementById('scrollfig');

        function imagePlacing(imageName){
            figElem.innerHTML = "";
            if(imageName){
                let img = document.createElement("img");
                img.src = resourcesImgs + imageName;
                img.classList.add('scrollamaImg');
                figElem.appendChild(img);
            }
       }
   
        function arrowOpacityAnimationScroll(){
            let scroll = response.element.querySelector('.explain');
            scroll.onscroll = function(){
                let arrowDown = scroll.parentNode.querySelector('.arrow.down');
                arrowDown.style.opacity = 1 - scroll.scrollTop/(scroll.scrollHeight - scroll.clientHeight);
                let arrowTop = scroll.parentNode.querySelector('.arrow.top');
                arrowTop.style.opacity = scroll.scrollTop/(scroll.scrollHeight - scroll.clientHeight);
            }

       };
   
   
       function arrowAnimationClick(){
           response.element.querySelector('.arrow.down').onclick = function(){
               let sibling = response.element.querySelector('.explain');
               sibling.scrollBy({
                   top:10,
                   left:0,
                   behaviour:'smooth'
               });
           };
           response.element.querySelector('.arrow.top').onclick = function(){
               let sibling = response.element.querySelector('.explain');
                sibling.scrollBy({
                   top:-10,
                   left:0,
                   behaviour:'smooth'
               });
           };    
       }

        try{
            if(response.index in imageNamesObj){
                let currentActive = imageNamesObj[response.index];
                if([0,1,2,3,4,5,6,7,8,9,10,11,14,15,16,17,18].includes(response.index)){
                    imagePlacing(currentActive.img);
                    if(currentActive.text && currentActive.type == 'e'){
                        let totalHeight = 0;
                        response.element.querySelector('.explain').querySelectorAll('p').forEach((v)=>{totalHeight += v.clientHeight;})
                        // if(totalHeight > .97*response.element.querySelector('.explain').clientHeight){
                        //     arrowOpacityAnimationScroll();
                        //     arrowAnimationClick();
                        // }else{
                        //     response.element.querySelectorAll('.arrow-wrap').forEach((v)=>{v.style.display = 'none';})
                        // }
                    }
                }else if((response.index == 12 || response.index == 13) && figElem.getElementsByClassName('scrollamaImg')[0] == null){
                    imagePlacing(currentActive.img);
                    let totalHeight = 0;
                    response.element.querySelector('.explain').querySelectorAll('p').forEach((v)=>{totalHeight += v.clientHeight;})
                    // if(totalHeight > .97*response.element.querySelector('.explain').clientHeight){
                    //     arrowOpacityAnimationScroll();
                    //     arrowAnimationClick();
                    // }else{
                    //     response.element.querySelectorAll('.arrow-wrap').forEach((v)=>{v.style.display = 'none';})
                    // }
                }
            }else{
                alert('step not found');
            }
        }catch(err){
            alert(err.message);
            document.getElementById("error").innerHTML = err.message;          
        }

    }

    //E: RELEVANT - it is a different library to stick the menu; scrollama doesn't handle this!
    function setupStickyfill() {
        d3.selectAll('.sticky').each(function () {
            //Stickyfill.add(this);
        });
    }

    function setupCharts(){
        return svg, chart, item = d3setup.chart("figure");
    }

    function init() {
        setupStickyfill();
        // 1. force a resize on load to ensure proper dimensions are sent to scrollama
        handleResize();

    // 2. setup the scroller passing options
        // 		this will also initialize trigger observations
        
    // 3. bind scrollama event handlers (this can be chained like below)
        scroller.setup({
            step: '#scrolly div.articlepost .step',
            offset: -0.0,
            debug: true,
        })
            .onStepEnter(handleStepEnter);
        
    // setup resize event
        window.addEventListener('resize', handleResize);
    
    
    }
    
    // kick things off
    init();
}