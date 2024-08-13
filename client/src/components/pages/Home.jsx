import { useState } from 'react';
import sliderData from "../../utils/sliderData";
import * as sliderImgs from "../../assets/index";
import "./pages.css";
import { Box, Text } from "@chakra-ui/react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";


export default function Home() {
  const [current, setCurrent] = useState(0)
  const length = sliderData.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length -1  : current -1)
  }

  if (!Array.isArray(sliderData) || length <= 0) {
    return null;
  }

  return (
    <>
      <Box className="home">
        <Box className="intro">
          <Text fontWeight={600} mt={20} ml={170} mr={170} mb={10}>At Radiant Soul Esthetics, we believe that beauty is more than skin deep. That&apos;s why we prioritize not only providing exceptional results but also creating a comfortable and welcoming atmosphere where clients can unwind and feel pampered. From the moment you step through our doors, you&apos;ll experience the difference that personalized attention and expert skill can make.</Text>
          <Box className="slider" display="flex" justifyContent="center" align="center">
            <MdArrowBackIos className="left-arrow" onClick={prevSlide}/>
            {sliderData.map((slide, index) => {
              const imageSrc = sliderImgs[slide.image];
              return (
                <Box className={index === current ? "slide active" : "slide"} key={index}>
                  {index === current && (<img key={index} src={imageSrc} alt="location image" className="sliderImages" />)}
                </Box>
              );
            })}
            <MdArrowForwardIos className="right-arrow" onClick={nextSlide}/>
          </Box>
        </Box>
      </Box>
    </>
  )
}