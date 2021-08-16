import React, {useRef} from 'react'
import { FaCode } from "react-icons/fa";
import { Image } from 'antd';
import './LandingPage.css'
import useScrollSnap from 'react-use-scroll-snap';

function LandingPage() {
  const scrollRef = useRef(null);
  // useScrollSnap({ ref: scrollRef, duration: 50, delay: 0 });

  return (
    <>
      <section ref={scrollRef} className={"scrollSnap"} style={{overflowX:'hidden'}}>
        <div className={"imgContainer"} style={{backgroundColor: 'rgb(21, 21, 21)'}}>
            <img className={"img"} src={'img/4.jpg'}></img>
            <div className={"mainTitle"}>WOMEN’S<br/> FALL-WINTER 2021</div>
            <div className={"containerBox1"}>Discover the Campaign</div>
            <div className={"containerBox2"}>Discover the Collection</div>
        </div>
        <div className={"imgContainer"} style={{backgroundColor: 'rgb(151, 151, 151)'}}>
            <img className={"img"} src={'img/3.jpg'} style={{paddingLeft:'400px'}}></img>
            <div className={"mainTitle"} style={{right:'0px', left:'30px', color:'rgb(21, 21, 21)'}}>MEN’S<br/> FALL-WINTER 2021</div>
            <div className={"containerBox1"} style={{right:'0px', left:'30px', border:'2px solid black', color:'black'}}>Discover the Campaign</div>
            <div className={"containerBox2"} style={{right:'0px', left:'320px', backgroundColor: 'black', color: 'white', mixBlendMode: 'multiply'}}>Discover the Collection</div>
        </div>
        <div className={"imgContainer"} style={{backgroundColor: 'rgb(225, 75, 24)'}}>
          <img className={"img"} src={'img/2.jpg'} style={{paddingLeft:'200px'}}></img>
        </div>
      </section>
    </>
  )
}

export default LandingPage
