window.onload = function(){


//Initialisation by taking the element id
  var carousel = function(){

    const carousel = document.getElementById('carousel')
    const imgContainer = document.getElementById('carousel-image-container')
    const Img_Div = carousel.getElementsByClassName('image-div')
    const navigator = document.getElementById('carousel-navigator')

    const control_left = document.getElementById('left')
    const control_right = document.getElementById('right')


    let timing = 3000
    let active


//setting the active navigator (pagination)
    function activeNav(el){
      if (active) {
        active.id = ""
        active.style.color = "#A9A9A9"
      }
      el.id = "active"
      el.style.color = "black"
      active = el
    }

//Setting Next Index
    function leftIndex(){
      let currentIndex = active.getAttribute("data-index")
      currentIndex++
      if(currentIndex === Img_Div.length){
        currentIndex = 0
      }
      return currentIndex
    }

//Setting Previous Index
    function rightIndex(){
      let currentIndex = active.getAttribute("data-index");
      currentIndex--;
      if(currentIndex < 0){
        currentIndex = Img_Div.length - 1
      }
      return currentIndex
    }

//Setting Active Index
    function currentIndex(link){
      let nextIndex = link.getAttribute("data-index")
      return nextIndex
    }

//Setting Active Image by taking the index
    function currentImg(index){
      imgContainer.style.marginLeft = "-" + index + "00%"
    }

//Displaying the slider
    function displaySlide(index){
      activeNav(navigator.children[index])

      currentImg(index)
    }

 
 //Creating the carousel
    function createCarousel(){
      if(carousel){
        let imageDivsLength = Img_Div.length
        if(imageDivsLength === 0) return
        imgContainer.style.width = 100 * imageDivsLength + "%"
        for(let i = 0; i < imageDivsLength; i++){
          Img_Div[i].style.width = 100/imageDivsLength + "%"
          let link = document.createElement("a")
          link.setAttribute('data-index', i)

          if(i === 0){
            activeNav(link)
          }

          link.onclick = function(){
            clearInterval(slide_data)
            let nextIndex = currentIndex(link)
            displaySlide(nextIndex)
          }
          navigator.append(link)
        }
        control_right.onclick = function(){
          clearInterval(slide_data)
          let currentIndex = leftIndex()
          displaySlide(currentIndex)
        }
        control_left.onclick = function(){
          clearInterval(slide_data)
          let currentIndex = rightIndex()
          displaySlide(currentIndex)
        }
      }

      const slide_data = setInterval(function(){
        let currentIndex = leftIndex()
        displaySlide(currentIndex)
      }, timing)
    }

    return {
      makeCarousel: createCarousel
    }
  }()

  carousel.makeCarousel()
}
