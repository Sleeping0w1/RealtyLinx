const serviceSpecialItemButtons = document.querySelectorAll(".services-special-item-btn")
const faqQuestionsButtons = document.querySelectorAll(".faq-question-btn")
const servicesTypesCards = document.querySelectorAll(".services-types-card")
const menuButton = document.querySelector(".menu-button")
const menu = document.querySelector(".menu")
const menuList = document.querySelector(".menu-list")
let newActiveCardIndex


collapsible = button => {
  if (button.classList.contains("clicked")) {
    button.classList.remove("clicked")
    button.nextElementSibling.classList.remove("active")
    button.parentElement.classList.remove("active")
  }
  else {
    button.classList.add("clicked")
    button.nextElementSibling.classList.add("active")
    button.parentElement.classList.add("active")
  }
}

searchNewCardIndex = (arr, i) => {
  arr.forEach(card => {
    if (card.classList.contains("active")) {
      newActiveCardIndex = i
    }
    card.classList.remove("next")
    card.classList.remove("previous")
    i++
  })
}

initPopularSlider = () => {
  const sliderButtons = document.querySelectorAll(".popular-btn")
  const popularCards = document.querySelector(".popular-cards")
  const popularCard = document.querySelector(".popular-card")
  const popularCardsStyles = window.getComputedStyle(popularCards)
  const maxScroll = (popularCard.clientWidth*popularCards.childElementCount) + (parseInt(popularCardsStyles.gap)*(popularCards.childElementCount-1))-parseInt(popularCardsStyles.width)

  sliderButtons.forEach(button => {
    button.addEventListener("click", () => {
      const direction = button.id === "popular-btn-left" ? -1 : 1
      const scrollAmount = (popularCard.clientWidth + parseInt(popularCardsStyles.gap)) * direction
      popularCards.scrollBy({ left: scrollAmount, behavior: "smooth" })
    })
  })

  popularCards.addEventListener("scroll", () => {
    if (popularCards.scrollLeft <= 0) {
      sliderButtons[0].classList.remove("active")
    } else {
      sliderButtons[0].classList.add("active")
    }
    if (popularCards.scrollLeft >= maxScroll) {
      sliderButtons[1].classList.remove("active")
    } else {
      sliderButtons[1].classList.add("active")
    }
  })
}

initTestimonialSlider = () => {
  const sliderButtons = document.querySelectorAll(".testimonial-btn")
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  const testimonialCardsContainer = document.querySelector(".testimonial-cards")
  const activeTestimonialCard = document.querySelector(".testimonial-card.active")
  let mobil = false

  if (parseInt(testimonialCardsContainer.clientWidth) <= 430) {
    sliderButtons[0].classList.remove("active")
    testimonialCards[0].classList.add("active")
    testimonialCards[0].classList.remove("previous")
    testimonialCards[1].classList.add("next")
    testimonialCards[1].classList.remove("active")
    testimonialCards[2].classList.remove("next")
    mobil = true
  }

  const doNotScroll = () =>{
    testimonialCardsContainer.scrollTo(newActiveCardIndex*activeTestimonialCard.clientWidth, 0)
    console.log(testimonialCards[newActiveCardIndex])
  }
  testimonialCardsContainer.addEventListener("scroll", doNotScroll)
  
  sliderButtons.forEach(button => {
    button.addEventListener("click", () => {
      testimonialCardsContainer.removeEventListener("scroll", doNotScroll)
      const activeTestimonialCard = document.querySelector(".testimonial-card.active")
      const direction = button.id === "testimonial-btn-left" ? -1 : 1
      const scrollAmount = activeTestimonialCard.clientWidth * direction
      if (button.classList.contains("active")) {
        //changing active card
        if (direction == 1) {
          if (activeTestimonialCard.nextElementSibling) {
            activeTestimonialCard.classList.remove("active")
            activeTestimonialCard.nextElementSibling.classList.add("active")
          } else {
            button.classList.remove("active")
          }
          let i = 0
          searchNewCardIndex(testimonialCards, i)
        } else if (direction == -1) {
          if (activeTestimonialCard.previousElementSibling) {
            activeTestimonialCard.classList.remove("active")
            activeTestimonialCard.previousElementSibling.classList.add("active")
          } else {
            button.classList.remove("active")
          }
          let i = 0
          searchNewCardIndex(testimonialCards, i)
        }

        //setting classes for cards
        if (((newActiveCardIndex < testimonialCards.length - 1) && (direction === 1)) || ((newActiveCardIndex > 0) && (direction === -1))) {
          testimonialCards[newActiveCardIndex + 1].classList.add("next")
          testimonialCards[newActiveCardIndex - 1].classList.add("previous")
        } else if (direction === -1) {
          testimonialCards[newActiveCardIndex + 1].classList.add("next")
          testimonialCards[newActiveCardIndex + 2].classList.add("next")
        } else if (direction === 1) {
          testimonialCards[newActiveCardIndex - 1].classList.add("previous")
          testimonialCards[newActiveCardIndex - 2].classList.add("previous")
        }

        //moving testimonial-cards and button activity tracking
        if (mobil) {
          testimonialCardsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" })
          if (((newActiveCardIndex === testimonialCards.length - 1) && (direction === 1)) || ((newActiveCardIndex === 0) && (direction === -1))) {
            button.classList.remove("active")
          } else {
            button.nextElementSibling ? button.nextElementSibling.classList.add("active") : button.previousElementSibling.classList.add("active")
          }
        } else if ((newActiveCardIndex < testimonialCards.length - 2) && (newActiveCardIndex > 1)) {
          testimonialCardsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" })
        } else if ((newActiveCardIndex === testimonialCards.length - 2) && (direction === 1)) {
          testimonialCardsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" })
        } else if ((newActiveCardIndex === 1) && (direction === -1)) {
          testimonialCardsContainer.scrollBy({ left: scrollAmount, behavior: "smooth" })
        } else {
          if (((newActiveCardIndex === testimonialCards.length - 2) && (direction === -1)) || ((newActiveCardIndex === 1) && (direction === 1))) {
            button.nextElementSibling ? button.nextElementSibling.classList.add("active") : button.previousElementSibling.classList.add("active")
          } else {
            button.classList.remove("active")
          }
        }
      }
      setTimeout(() => testimonialCardsContainer.addEventListener("scroll", doNotScroll), 500)
    })
  })
}
window.addEventListener("load", initPopularSlider)
window.addEventListener("load", initTestimonialSlider)

menuButton.addEventListener("click", () => {
  menu.classList.toggle("active")
  menuButton.classList.toggle("clicked")
  menuList.classList.toggle("active")
})

serviceSpecialItemButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    serviceSpecialItemButtons.forEach(button => {
      if (button != event.currentTarget) {
        button.classList.remove("clicked")
        button.nextElementSibling.classList.remove("active")
        button.parentElement.classList.remove("active")
      }
    })
    collapsible(button)
  })
})

faqQuestionsButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    faqQuestionsButtons.forEach(button => {
      if (button != event.currentTarget) {
        button.classList.remove("clicked")
        button.nextElementSibling.classList.remove("active")
        button.parentElement.classList.remove("active")
      }
    })
    collapsible(button)
  })
})

servicesTypesCards.forEach(card =>
  card.addEventListener("click", (event) => {
    servicesTypesCards.forEach(card => {
      if (card != event.currentTarget) {
        card.classList.remove("active")
      } else {
        card.classList.add("active")
      }
    })
  })
)
