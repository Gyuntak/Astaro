import React, { useRef, useState } from "react";
import Button from "@component/Button";
import RowContainer from "@component/layout/RowContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { useNavigate } from "react-router-dom";

import "@css/flip.css";
import "@css/carousel.css";

import { EffectCoverflow, EffectFlip } from "swiper";
import styled from "styled-components";

export default function TodayTaro() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <Swiper
        ref={swiperRef}
        effect={"coverflow"}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 30,
          depth: 70,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, EffectFlip]}
        className="mySwiper"
      >
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          0
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          1
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          2
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          3
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          4
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          5
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          6
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          7
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          8
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          9
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          10
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          11
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          12
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          13
        </SwiperSlide>
        <SwiperSlide className="carousel-swiper-slide">
          <div className="flip">
            <div className="card">
              <div className="front"></div>
              <div className="back"></div>
            </div>
          </div>
          14
        </SwiperSlide>

        {/* <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image5} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image4} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image3} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image2} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image1} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image} alt="pic5" className="photos" />
        </SwiperSlide> */}
      </Swiper>

      <RowContainer width="100%" style={{ justifyContent: "space-evenly" }}>
        <Button onClick={() => navigate("/todayresult")}>결과보기</Button>
        {/* <Button onClick={handleCategory}>연애</Button> */}
      </RowContainer>
    </>
  );
}

const LinkWrapper = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  z-index: 1;
  position: relative;
`;
