import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline
} from "react-icons/io5"
import { useRef } from "react"

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  }

  const next = () => {
    sliderRef.current?.slickNext()
  }
  const previous = () => {
    sliderRef.current?.slickPrev()
  }

  const sliderRef = useRef<Slider>(null)

  function SliderNoArrow() {
    return (
      <div className="">
        <Slider ref={sliderRef} {...settings}>
          <div key={1}>
            <h3 className="m-3 h-96 rounded-lg bg-red-100"> </h3>
          </div>
          <div key={2}>
            <h3 className="m-3 h-96 rounded-lg bg-red-100"> </h3>
          </div>
          <div key={3}>
            <h3 className="m-3 h-96 rounded-lg bg-red-100"> </h3>
          </div>
        </Slider>
      </div>
    )
  }

  return (
    <>
      <div className="flex">
        <div className="flex flex-grow items-center justify-center">
          <IoArrowBackCircleOutline
            onClick={previous}
            className="mx-4 hidden h-16 w-16 sm:flex"
          />
        </div>
        <div className="w-11/12 sm:w-[calc(100vw-14rem)]">
          <SliderNoArrow />
        </div>
        <div className="flex flex-grow items-center justify-center">
          <IoArrowForwardCircleOutline
            onClick={next}
            className="mx-4 hidden h-16 w-16 sm:flex"
          />
        </div>
      </div>
    </>
  )
}
