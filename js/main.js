let arrSection = [];
let arrOffset = [];
let arrOffsetHeight = [];
let hamburger = $('.hamburger');

let $header = document.querySelector("header");
let offsetHeightHeader = $header.offsetHeight;
window.addEventListener("load", function () {
    initPhotoSwipeFromDOM('.gallery__img');
})
var elem = document.querySelector('.main-carousel');
var fliSliderElem = document.querySelector('.slider__item-wrap');
var flktySlider = new Flickity(fliSliderElem, {
    // options
    cellAlign: 'left',
    contain: true,
    draggable: false,
    prevNextButtons: false,
    pageDots: false
    //   freeScroll: true,
    //   prevNextButtons: false,
    //   pageDots: false
});

//DETECT MOBLE
var flkty
$(document).ready(function(){
    if(window.matchMedia("(max-width: 767px)").matches){
            flkty = new Flickity(elem, {
            // options
            draggable: true,
            cellAlign: 'center',
            contain: true,
            freeScroll: false,
            prevNextButtons: false,
            pageDots: false,
            wrapAround: true
            });
    }
    else {
            flkty = new Flickity(elem, {
            // options
            cellAlign: 'left',
            contain: true,
            freeScroll: true,
            prevNextButtons: false,
            pageDots: false
            });
    }
});
window.addEventListener("resize", function(){
    flkty.destroy()
    if(window.matchMedia("(max-width: 767px)").matches){
            flkty = new Flickity(elem, {
            // options
            draggable: true,
            cellAlign: 'center',
            contain: true,
            freeScroll: false,
            prevNextButtons: false,
            pageDots: false,
            wrapAround: true
            });
    }
    else {
        flkty = new Flickity(elem, {
            // options
            cellAlign: 'left',
            contain: true,
            freeScroll: true,
            prevNextButtons: false,
            pageDots: false
            });
    }

});

//VIDEO HOVER
$('.video .btn-play').hover(function(){
    console.log(this)
    $(this).siblings().addClass("hover")
},function(){
    $(this).siblings().removeClass("hover")
}
)

//Fix move menu
var fixed = document.getElementById('fixed');

fixed.addEventListener('touchmove', function(e) {

        e.preventDefault();

}, false);

//SLIDER WITH FLICKITY
$('.slider__bottom-control .-prev').on('click', function () {
    flktySlider.previous(false, false)
});
$('.slider__bottom-control .-next').on('click', function () {
    flktySlider.next(false, false)
});

$('.slider__bottom-control ').on('click', function () {
    changeDot(flktySlider.selectedIndex)
});

$('.slider__bottom-paging .dots').on('click', 'a', function () {
    var selector = $(this).attr('data-selector');
    flktySlider.selectCell(selector, true, false)

});
let $numb = document.querySelector(".slider .slider__bottom .numb")
let $dots = document.querySelectorAll(".slider .slider__bottom ol a")
function changeDot(index) {
    $dots.forEach((e) => {
        e.classList.remove('active')
    })
    $dots[index].classList.add('active')
    let t = parseInt(index, 10) + 1;
    $numb.innerText = t.toString().padStart(2, "0");
}

$dots.forEach((e) => {
    e.addEventListener('click', function (e) {
        let index = this.getAttribute("dot")
        changeDot(index)
    })
})

//SCROLL CHANGE MENU
function updateOffset() {
    arrOffset = []
    arrOffsetHeight = []
    document.querySelectorAll('section').forEach(function (e) {
        let GetID = e.getAttribute('id');
        arrSection.push(GetID)
        let getOffsetHeight = e.offsetHeight;
        arrOffset.push(getOffsetHeight)
    })
    offsetHeightHeader = $header.offsetHeight;
    arrOffset.reduce((sum, currentValue) => {
        sum = currentValue + sum;
        arrOffsetHeight.push(sum);
        return sum;
    }, -offsetHeightHeader)

}
let idNav = 0
window.addEventListener('scroll', function () {
    updateOffset()
    // console.log(getScroll)
    let getScroll = document.querySelector("html").scrollTop;
    idNav = arrOffsetHeight.findIndex(function (e) {
        return getScroll < e;
    })
    document.querySelectorAll('.menu li a').forEach(function (e) {
        if (e.innerHTML.toUpperCase() == arrSection[idNav].toUpperCase()) {
            $(e).parent().siblings().addClass('gray')
            $(e).parent().removeClass('gray')
        }
    })
    // console.log(arrSection[id])

})

window.addEventListener("resize", updateOffset);

// LANGUAGE CHANGE
$(".lang__current").click(
    function (event) {
        event.stopPropagation();
        $('.lang .lang__option').toggleClass('active')


    }
)

$(".lang .lang__option a").mouseenter(function () {

    $(this).siblings().addClass("gray")
    $(this).removeClass("gray")
    $(".lang .lang__option").mouseleave(function () {
        $(this).find('a').removeClass("gray")
    })
})

$(".menu li a").mouseenter(function () {

    $(this).parent().siblings().addClass("gray")
    $(this).parent().removeClass("gray")
    $(".menu").mouseleave(function () {
        document.querySelectorAll('.menu li a').forEach(function (e) {
            if (e.innerHTML.toUpperCase() == arrSection[idNav].toUpperCase()) {
                $(e).parent().siblings().addClass('gray')
                $(e).parent().removeClass('gray')
            }
        })
    })
})


$('body').click(function (event) {
    $(".lang .lang__option").removeClass('active')
});

$('.lang .lang__option').click(function (event) {
    event.stopPropagation();
});

$(".lang .lang__option a").click(function () {
    $(".lang__current span").html(this.innerText)
    $(".lang .lang__option").removeClass('active')
})

//HAMBURGER
document.querySelector(".hamburger").addEventListener('click', function (e) {
    $(".menu").css('transition-duration', '0.5s')
    // $(".menu").toggleClass('add')
    this.classList.toggle('clicked')
    document.querySelector(".menu").classList.toggle('active')
    if (!(this.classList.contains('clicked'))) {
        //initial transition-duration of menu to avoid bug
        setTimeout(function () {
            $(".menu").css('transition-duration', 'initial')
        }, 1000)
    }
})



//BACK-TOP-TOP 
document.querySelector(".backtotop").addEventListener("click", function (e) {
    e.preventDefault
    window.scrollBy(
        {
            top: -document.body.offsetHeight,
            behavior: "smooth"
        }
    );
})

let $backtotop = document.querySelector(".backtotop_outer");
let backtotop = () => {
    let getScroll = document.querySelector("html").scrollTop;
    if (getScroll > 600) {
        $backtotop.style.display = "block"
    } else {
        $backtotop.style.display = "none"
    }
}
backtotop();
window.addEventListener('scroll', backtotop)

$backtotop.addEventListener("click", function (e) {
    e.stopPropagation
    window.scrollBy(
        {
            top: -document.body.offsetHeight,
            behavior: "smooth"
        }
    );
})

//CHANGE COLOR MENU
let $slider = document.querySelector(".slider");
let hSlider = $slider.offsetHeight;
window.addEventListener('scroll', function () {
    let getScroll = document.querySelector("html").scrollTop;
    if (getScroll >= hSlider - offsetHeightHeader) {
        $header.style.backgroundColor = "#000";
        // $header.style.opacity = "0.5"

    }
    else {
        $header.style.backgroundColor = "transparent";
    }

})


//PLAY VIDEO 

document.querySelectorAll(".btn-play").forEach(
    (e) => {
        e.addEventListener('click', function () {
            let data = this.getAttribute("data-video-src");
            document.querySelector(".popup__video").style.display = "flex";
            document.querySelector(".popup__video video").setAttribute('src', data)
            document.querySelector(".popup__video .close").addEventListener("click", () => {
                document.querySelector(".popup__video").style.display = "none";
            })
        })
    }
)

// //SLIDER 
// let sliderCurrent = 0
// let $sliderItems = document.querySelectorAll(".slider .slider__item")
// let $dots = document.querySelectorAll(".slider .slider__bottom ol a")
// let $numb = document.querySelector(".slider .slider__bottom .numb")
// let changeSliderNext = () => {
//     if (sliderCurrent < $sliderItems.length - 1) {
//         $sliderItems[sliderCurrent].classList.remove('active')
//         $sliderItems[sliderCurrent + 1].classList.add('active')
//         $dots[sliderCurrent].classList.remove('active')
//         $dots[sliderCurrent + 1].classList.add('active')
//         sliderCurrent++;
//     }
//     else {
//         $sliderItems[sliderCurrent].classList.remove('active')
//         $sliderItems[0].classList.add('active')
//         $dots[sliderCurrent].classList.remove('active')
//         $dots[0].classList.add('active')
//         sliderCurrent = 0;
//     }
//     $numb.innerText = (sliderCurrent + 1).toString().padStart(2, "0");

// }
// let changeSliderPrev = () => {
//     if (sliderCurrent > 0) {
//         $sliderItems[sliderCurrent].classList.remove('active')
//         $sliderItems[sliderCurrent - 1].classList.add('active')
//         $dots[sliderCurrent].classList.remove('active')
//         $dots[sliderCurrent - 1].classList.add('active')
//         sliderCurrent--;
//     }
//     else {
//         $sliderItems[0].classList.remove('active')
//         $sliderItems[$sliderItems.length - 1].classList.add('active')
//         $dots[0].classList.remove('active')
//         $dots[$sliderItems.length - 1].classList.add('active')
//         sliderCurrent = $sliderItems.length - 1;
//     }
//     $numb.innerText = (sliderCurrent + 1).toString().padStart(2, "0");
// }

// document.querySelector('.slider .-next').addEventListener('click', changeSliderNext)
// document.querySelector('.slider .-prev').addEventListener('click', changeSliderPrev)
// $dots.forEach((e) => {
//     e.addEventListener('click', function (e) {
//         let index = this.getAttribute("dot")
//         $sliderItems.forEach((e) => {
//             e.classList.remove('active')
//         })
//         $sliderItems[index].classList.add('active')

//         $dots.forEach((e) => {
//             e.classList.remove('active')
//         })
//         $dots[index].classList.add('active')
//         let t = parseInt(index, 10) + 1;
//         $numb.innerText = t.toString().padStart(2, "0");
//     })
// })

//CLICK MENU TO SECTION
$('.menu li a').click(function (e) {
    updateOffset()
    e.preventDefault()
    let section = this.innerHTML.toUpperCase()
    let arrSectionU = arrSection.map(e => e.toUpperCase())
    let id = arrSectionU.indexOf(section)

    if (hamburger.hasClass('clicked')) {
        hamburger.removeClass('clicked')
        $('.menu').removeClass('active')
        flagClickMenuFromHamburger = true
    }


    if (id == 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        flagClickMenuFromHamburger = false
    } else {
        window.scrollTo({ top: arrOffsetHeight[id - 1], behavior: 'smooth' })
        setTimeout(function () {
            flagClickMenuFromHamburger = false
        }, 1000)
    }


})
let flagClickMenuFromHamburger = false;
//HIDE MENU
window.onscroll = function (e) {
    // print "false" if direction is down and "true" if up
    let getScroll = document.querySelector("html").scrollTop;
    // console.log(getScroll,hSlider - offsetHeightHeader)
    if (((this.oldScroll > this.scrollY)) && (getScroll >= (hSlider - offsetHeightHeader))) {
        $('header').removeClass('hide')
        // console.log('remove hide')
    }
    if ((this.oldScroll < this.scrollY) && (getScroll >= (hSlider - offsetHeightHeader)) && !flagClickMenuFromHamburger) {
        $header.classList.add('hide')
        // console.log('add hide')
    }
    this.oldScroll = this.scrollY;
}

$('.backtotop_outer').click(function () {
    $('header').removeClass('hide')
})


//Photo Swipe
var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for (var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if (figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if (figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function (el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if (!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }
            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if (index >= 0) {
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {};
        if (hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function (index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            },
            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };
        if (fromURL) {
            if (options.galleryPIDs) {
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if (isNaN(options.index)) {
            return;
        }
        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};

// $(window).load(function () {

// });
