import React , { useState, useEffect } from 'react'

export const Carousel = ({ slides, interval = 5000 }) => {
    
    const length = slides.length;
    const [active, setActive, handlers, style] = useCarousel(length, interval);
    const transitionTime = 400;
    const [current, setCurrent] = useState(0);

    const elastic = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
    const smooth = `transform ${transitionTime}ms ease`;    
    
    const initialCarouselState = {
        offset: 0,
        desired: 0,
        active: 0
    };

    const handlers = useSwipeable({
        onSwiping(e) {
          dispatch({
            type: "drag",
            offset: -e.deltaX
          });
        },
        onSwipedLeft(e) {
          const t = threshold(e.event.target);
      
          if (e.deltaX >= t) {
            dispatch({
              type: "next",
              length
            });
          } else {
            dispatch({
              type: "drag",
              offset: 0
            });
          }
        },
        onSwipedRight(e) {
          const t = threshold(e.event.target);
      
          if (-e.deltaX >= t) {
            dispatch({
              type: "prev",
              length
            });
          } else {
            dispatch({
              type: "drag",
              offset: 0
            });
          }
        },
        trackMouse: true,
        trackTouch: true
    });


    useEffect(() => {
        const id = setTimeout(() => dispatch({ type: "next", length }), interval);
        return () => clearTimeout(id);
      }, [state.offset, state.active]);
      
      useEffect(() => {
        const id = setTimeout(() => dispatch({ type: "done" }), transitionTime);
        return () => clearTimeout(id);
    }, [state.desired]);

  
    useEffect(() => {
        const next = (current + 1) % slides.length;
        const id = setTimeout(() => setCurrent(next), time);
        return () => clearTimeout(id);
    }, [current]);

    return (
      length > 0 && (
        <div className="carousel">
          <ol className="carousel-indicators">
            {slides.map((_, index) => (
              <li
                onClick={() => setActive(index)}
                key={index}
                className={`${active === index ? "active" : ""}`}
              />
            ))}
          </ol>
          <div className="carousel-content" {...handlers} style={style}>
            <div className="carousel-item">{slides[slides.length - 1]}</div>
            {slides.map((slide, index) => (
              <div className="carousel-item" key={index}>
                {slide}
              </div>
            ))}
            <div className="carousel-item">{slides[0]}</div>
          </div>
        </div>
      )
    );
};

//https://blog.logrocket.com/building-carousel-component-react-hooks/