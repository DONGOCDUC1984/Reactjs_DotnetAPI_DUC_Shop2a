import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import p1 from "../images/fruit1.jpg";
import p2 from "../images/fruit2.jpg";
import p3 from "../images/fruit3.jpg";
import p4 from "../images/bread1.jpg";
import p5 from "../images/Cow Milk2.jpg";

function About() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <h3> About our company </h3>
      <p>
        {" "}
        Our company offers wide range of products with high quality ,good
        service and low price .
      </p>

      <Carousel
        className="w-75 mx-auto"
        activeIndex={index}
        onSelect={handleSelect}
      >
        <Carousel.Item>
          <img className="d-block w-100" src={p1} alt="First slide" />
          <Carousel.Caption>
            <h3>Wide Range</h3>
            <p>We offer wide range of products</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={p2} alt="Second slide" />

          <Carousel.Caption>
            <h3>High Quality</h3>
            <p>Products with high quality</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={p3} alt="Third slide" />

          <Carousel.Caption>
            <h3>Fresh </h3>
            <p>Fresh fruit and vegetable from gardens.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={p4} alt="Second slide" />

          <Carousel.Caption>
            <h3>Delicious </h3>
            <p>Delicious bread and cake</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={p5} alt="Second slide" />

          <Carousel.Caption>
            <h3>Fresh Milk</h3>
            <p>Fresh cow milk and soy milk</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default About;
