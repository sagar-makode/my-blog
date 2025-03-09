import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import templates from "../templates/templates";


function TopCards({ setSelectedTemplateid ,selectedTemplateid }) {
    const handleSelect = (templateId) => {
        setSelectedTemplateid(templateId);
        sessionStorage.setItem('selectedTemplateid', templateId);
    };

    
    const settings = {
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 4, // Increased item count for better space utilization
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 8 } },
            { breakpoint: 1024, settings: { slidesToShow: 7 } },
            { breakpoint: 768, settings: { slidesToShow: 6 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } }
        ]
    };
    // Custom Next and Previous Arrow components
    function CustomNextArrow(props) {
        const { className, onClick } = props;
        return (
            <div
                className={`${className} custom-next-arrow`}
                onClick={onClick}
            >
                &#8594; {/* Right arrow symbol */}
            </div>
        );
    }

    function CustomPrevArrow(props) {
        const { className, onClick } = props;
        return (
            <div
                className={`${className} custom-prev-arrow`}
                onClick={onClick}
            >
                &#8592; {/* Left arrow symbol */}
            </div>
        );
    }

    return (
        <div className="custom-carousel-container">
            <h2 className="custom-carousel-title">Select Template</h2>
            <Slider {...settings}>
                {templates.map((product) => (
                    <div key={product.id}
                        className={`custom-product-card ${selectedTemplateid === product.id ? 'selected' : ''}`}
                        onClick={() => handleSelect(product.id)}>
                        <img
                            src={product.image}
                            alt="Product"
                            className="custom-product-image"
                        />
                        <button className="custom-select-button">Select</button>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default TopCards;
