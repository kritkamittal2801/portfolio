var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
console.log(navMenuAnchorTags);

var interval;

for(var i=0; i<navMenuAnchorTags.length; i++){
    navMenuAnchorTags[i].addEventListener('click', function(event){
        event.preventDefault();
        
        var targetSectionID = this.textContent.trim().toLowerCase();
        var targetSection = document.getElementById(targetSectionID);
        console.log(targetSection);

        // interval = setInterval(scrollVertically, 20, targetSection);

        // or

        interval = setInterval(function(){
            scrollVertically(targetSection)
        }, 20);
    });
}


function scrollVertically(targetSection){
    var targetSectionCoordinates = targetSection.getBoundingClientRect();
    if(targetSectionCoordinates.top <= 100){
        clearInterval(interval);
        return;
    }
    window.scrollBy(0, 60);
}


//handle scroll event on window
//ensure that initial width of colored skill divs is 0 -> initialised/reset to 0 width values
//start animation on every skill -> increase skill width from 0 to skill level at regular interval
//store skill level -> HTML with the help of data attribute
//// now i want to fire animation only when i am able to see individual bars

var progressBars = document.querySelectorAll('.skill-progress > div');

function initialiseBar(bar){
    bar.setAttribute("data-visited", false);
    bar.style.width = 0 + '%';
}

for(var bar=0;bar<progressBars.length;bar++){
    initialiseBar(progressBars[bar]);
}

function fillBar(bar){
    var currentWidth = 0;
    var targetWidth = bar.getAttribute("data-bar-width");
    var interval = setInterval(function(){
        if(currentWidth>=targetWidth){
            clearInterval(interval);
            return;
        }
        currentWidth++;
        bar.style.width = currentWidth + '%';
    }, 5);
}

function checkScroll(){
    for(let bar of progressBars){
        var barcoordinates = bar.getBoundingClientRect();
        if((bar.getAttribute("data-visited")=="false") && (barcoordinates.top<=window.innerHeight-barcoordinates.height)){
            bar.setAttribute("data-visited", true);
            fillBar(bar);
        }
        else if(barcoordinates.top>window.innerHeight){
            bar.setAttribute("data-visited", false);
            initialiseBar(bar);
        }
    }
}

document.addEventListener("scroll", checkScroll);


