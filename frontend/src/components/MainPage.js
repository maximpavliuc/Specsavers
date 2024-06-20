import React, { useState, useEffect } from "react";

const Slide = ({slide}) => {
    // Блок одного слайда
    let imgEmpty = slide.image == null ? ' empty' : '';
    let textEmpty = slide.text == null ? ' empty' : '';

    return (
        <div className='main-slide-block'>
            <div className={'main-slide-img-block' + imgEmpty}><img className='main-slide-img' src={slide.image}/></div>
            <p className={'main-slide-text' + textEmpty}>{slide.text}</p>
        </div>
    )
}

const CustomCarousel = ({ children }) => {
  // Блок слайдера
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);

  // Функция, автоматически переключающая слайд раз в 10 секунд
  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          slideNext();
          setSlideDone(true);
        }, 10000)
      );
    }
  }, [slideDone]);
  
  // Функция переключения на следующий слайд
  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= children.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  // Функция переключения на предыдущий слайд
  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return children.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  // Функция остановки автоматического переключения слайдов
  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  // Функция возобновления автоматического переключения слайдов
  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  return (
    <div
      className="container__slider"
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
    >
      {children.map((item, index) => {
        return (
          <div
            className={"slider__item slider__item-active-" + (activeIndex + 1)}
            key={index}
          >
            {item}
          </div>
        );
      })}

      <div className="container__slider__links">
        {children.map((item, index) => {
          return (
            <button
              key={index}
              className={
                activeIndex === index
                  ? "container__slider__links-small container__slider__links-small-active"
                  : "container__slider__links-small"
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(index);
              }}
            ></button>
          );
        })}
      </div>

      <button
        className="slider__btn-next"
        onClick={(e) => {
          e.preventDefault();
          slideNext();
        }}
      >
        {">"}
      </button>
      <button
        className="slider__btn-prev"
        onClick={(e) => {
          e.preventDefault();
          slidePrev();
        }}
      >
        {"<"}
      </button>
    </div>
  );
}

const MainPage = ({slides}) => {
    // Блок главной страницы
    return (
        <div>
            <div className="main-text">В современном мире, насыщенном множеством предложений и новейших технологических решений, выбор подходящего товара может оказаться сложной задачей. Как выбрать идеальный смартфон, который соответствует вашим требованиям? Как найти телевизор, который подарит наилучшие впечатления от просмотра? Как определить, какой ноутбук обеспечит вам необходимую производительность для работы и отдыха? В ответ на эти вопросы приходит на помощь система сравнения характеристик товара — Specsavers.</div>
            <div className="main-text">Specsavers — это инновационная платформа, разработанная для облегчения процесса выбора и сравнения различных товаров. С помощью Specsavers вы можете быстро и легко получить подробную информацию о характеристиках, функциях и возможностях интересующих вас продуктов. Наша цель — предоставить вам все необходимые данные, чтобы вы могли принять взвешенное и обоснованное решение.</div>
            <CustomCarousel>
                {slides.map((slide) => {
                    return <Slide slide={slide} key={slide.id} />;
                })}
            </CustomCarousel>
        </div>
    )
}

export default MainPage;