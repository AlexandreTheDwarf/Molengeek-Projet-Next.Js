"use client"

import { useState, useEffect } from "react"
import "../../styles/Carousel.scss"
const slides = [
    {
      firstTitle: "LET'S MAKE THE BEST INVESTMENT",
      title: "There Is No Friend As Loyal As A Book",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      buttonText: "Shop Now",
      image: "/carroussel/01.png",
    },
    {
      firstTitle: "LET'S MAKE THE BEST INVESTMENT",
      title: "There Is No Friend As Loyal As A Book",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      buttonText: "Shop Now",
      image: "carroussel/02.png",
    },
    {
      firstTitle: "LET'S MAKE THE BEST INVESTMENT",
      title: "There Is No Friend As Loyal As A Book",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      buttonText: "Shop Now",
      image: "carroussel/03.png",
    },
    {
      firstTitle: "LET'S MAKE THE BEST INVESTMENT",
      title: "There Is No Friend As Loyal As A Book",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      buttonText: "Shop Now",
      image: "carroussel/04.png",
    },
  ]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  const nextSlide = () => {
    setFade(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
      setFade(false)
    }, 600)
  }

  const prevSlide = () => {
    setFade(true)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
      setFade(false)
    }, 600)
  }

  const goToSlide = (index) => {
    setFade(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setFade(false)
    }, 600)
  }

  return (
    <div className="carousel-container">
      <button className="carousel-arrow left" onClick={prevSlide}>❮</button>

      <div className={`carousel-slide ${fade ? "fade-out" : "fade-in"}`}>
        <div className="text-content">
          <h5>{slides[currentIndex].firstTitle}</h5>
          <h1>{slides[currentIndex].title}</h1>
          <p>{slides[currentIndex].description}</p>
          <button className="slide-button">{slides[currentIndex].buttonText}</button>
        </div>
        <div className="image-content">
          <img src={slides[currentIndex].image} alt={slides[currentIndex].title} />
        </div>
      </div>

      <button className="carousel-arrow right" onClick={nextSlide}>❯</button>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}
