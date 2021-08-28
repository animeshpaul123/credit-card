import React from 'react'
import backgroundImage from '../../assets/images/16.jpeg'
import backgroundImage2 from '../../assets/images/7.jpeg'
import Chip from '../../assets/images/chip.png'
import Logo from '../../assets/images/mastercard.png'
import Logo2 from '../../assets/images/visa.png'
import mastercard from '../../assets/images/mastercard.png'
import './credit-card.scss'
import { CARD_TYPES } from '../../cardTypes'

const images = {
    'VISA': Logo2,
    'MASTERCARD': mastercard
}
const backgrounds = {
    // 'green': ,
    'lime': backgroundImage2,
    // 'orange': ,
    // 'purple': ,
    'lightblue': backgroundImage,
}
const CreditCard = ({ number, name, month, year, cvv, focus, cardType, refs }) => {
    // const { number, name, month, year, cvv, focus } = props
    const { outlineRef, numberRef, nameRef, dateRef } = refs

    console.log("pppppp => ", images[CARD_TYPES[cardType.toLowerCase()]?.name])
    return (
        <>
            <div className={`credit-card ${focus ? 'hover' : ''}`}>
                <div className="card-face card-front">
                    <div className="outline" ref={outlineRef}>

                    </div>
                    <div className="background-image">
                        <img src={backgrounds[CARD_TYPES[cardType.toLowerCase()]?.color] || backgroundImage} alt="background" />
                    </div>

                    <div className="upper">
                        <div className="header">
                            <div className="chip">
                                <img src={Chip} alt="background" />
                            </div>
                            <div className="logo slideIn">
                                <img src={images[CARD_TYPES[cardType.toLowerCase()]?.name] || Logo} alt="background" />
                            </div>
                        </div>
                        <div className="content" ref={numberRef}>
                            {number.split('').map((letter, i) => {
                                return <span className={letter !== "#" ? "slideIn" : ""}>{letter}</span>
                            })}
                        </div>
                        <div className="footer">
                            <div className="name" ref={nameRef}>
                                <div className="title">Card Holder</div>
                                <div className="desc">{name ? name.toUpperCase().split('').map((letter, i) => {
                                    if (letter === " ") return <span className="skewIn" style={{ visibility: "hidden" }}>{"#"}</span>
                                    return <span className="skewIn">{letter}</span>
                                }) : "FULL NAME"}</div>
                            </div>
                            <div className="expiary" ref={dateRef}>
                                <div className="title">Expires</div>
                                <div className="desc">
                                    {
                                        month ? month.split('').map((each, i) => {
                                            return <span className={"slideIn" + each}>{each}</span>
                                        })
                                            : "MM"
                                    }
                                    <span>/</span>
                                    {
                                        year ? year.split('').map((each, i) => {
                                            return <span className={"slideIn" + each}>{each}</span>
                                        })
                                            : "YY"
                                    }
                                    {/* <span className={month !== "" ? "slideIn" : ""}>{month || "MM"}</span>/<span className="slideIn">{month || "YY"}</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-face card-back">
                    <div className="background-image">
                        <img src={backgrounds[CARD_TYPES[cardType.toLowerCase()]?.color] || backgroundImage} alt="background" />
                    </div>

                    <div className="upper">
                        <div className="header">

                        </div>
                        <div className="content">
                            <div className="name">CVV</div>
                            <div className="desc CVV">
                                {cvv.split('').map((letter, i) => {
                                    return <span className={letter !== "*" ? "slideIn" : ""}>{letter}</span>
                                })}
                            </div>
                            <div className="logo-2">
                                <img src={images[CARD_TYPES[cardType.toLowerCase()]?.name] || Logo} alt="background" />
                            </div>
                        </div>
                        <div className="footer">
                            <div className="name">
                            </div>
                            <div className="expiary">
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="card-back"></div> */}
            </div>
        </>
    )
}

export default CreditCard