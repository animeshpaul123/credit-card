import React, { useRef, useState } from 'react'
import CreditCard from '../components/creditCard/credit-card'
import { Form, Button } from 'react-bootstrap'
import Input from '../components/Input'
import './form.scss'
import { DEFAULT_CARD_FORMAT, getCardType, hasLetters } from '../cardTypes'

function hashToNumber(value) {
    let newval = ''
    // let undefinedValue = 0
    debugger
    for (let i = 0; i < value.length; i++) {
        if (Number.isFinite(parseInt(value[i]))) {
            newval += value[i]
        }
        else if ((value[i] === ' ' && value[i + 1] !== "#")) {
            newval += value[i]
        }

        // else if ((value[i] === ' ') && value[i] !== undefined) {
        //     newval += value[i]
        // }
        else break
    }
    return newval
}

function getCvv(value) {
    let newval = ''
    // let undefinedValue = 0
    debugger
    for (let i = 0; i < value.length; i++) {
        if (Number.isFinite(parseInt(value[i]))) {
            newval += value[i]
        }
        else break
    }
    return newval
}
export default function CardForm(props) {
    const [number, setNumber] = useState('#### #### #### ####')
    const [name, setName] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [cvv, setCvv] = useState('***')
    const [focus, setFocussed] = useState(false)
    const [cardType, setCardType] = useState('VISA')

    const outlineRef = useRef()
    const numberRef = useRef()
    const nameRef = useRef()
    const dateRef = useRef()
    const onSubmit = (e) => {
        e.preventDefault()
    }
    const onChangeNumber = (e) => {
        const value = e.target.value
        if (value.length >= 20 || hasLetters(value)) return

        function update(newval) {
            const oldVal = "#### #### #### ####".split('')
            let i = 0
            while (i <= newval.length) {
                if (newval[i] === undefined) break
                if (i === 4 || i === 9 || i === 14 || i === 19) {
                    oldVal[i + 1] = newval[i] === " " ? newval[i + 1] : newval[i]
                    i = i + 1
                }
                else oldVal[i] = newval[i]
                i++
            }
            return oldVal.join('')
        }
        setNumber(update(value))
        const ctype = getCardType(value.replace(/ /g, ''))
        if (ctype) setCardType(ctype)
        else if (value === '') setCardType('VISA')
        // 4012 8888 8888 1881
    }

    const onChangeMonth = (e) => {
        setMonth(e.target.value)

    }
    const onChangeYear = (e) => {
        setYear(e.target.value)
    }

    const onNameFocus = () => {
        if (outlineRef?.current && numberRef?.current && nameRef?.current && dateRef?.current) {
            outlineRef.current.style.top = (nameRef.current.getBoundingClientRect().top - 46) + "px"
            outlineRef.current.style.width = (nameRef.current.getBoundingClientRect().width + 180) + "px"
            outlineRef.current.style.left = "10px"
            outlineRef.current.style.height = "40px"
            outlineRef.current.style.padding = "10px 5px"
            outlineRef.current.style.opacity = "1"
        }
    }
    const onNumberFocus = () => {

        if (outlineRef?.current && numberRef?.current && nameRef?.current && dateRef?.current) {
            console.log(nameRef?.current.getBoundingClientRect())
            outlineRef.current.style.top = "102px"
            outlineRef.current.style.left = "7px"
            outlineRef.current.style.width = "96%"
            outlineRef.current.style.height = "40px"
            outlineRef.current.style.opacity = "1"
        }
    }
    const onExpiaryFocus = () => {

        if (outlineRef?.current && numberRef?.current && nameRef?.current && dateRef?.current) {
            console.log(dateRef?.current.getBoundingClientRect())
            outlineRef.current.style.top = (dateRef.current.getBoundingClientRect().top - 46) + "px"
            outlineRef.current.style.left = "280px"
            outlineRef.current.style.width = "18%"
            outlineRef.current.style.height = "40px"
            outlineRef.current.style.opacity = "1"
        }
    }
    const onChangeCvv = (e) => {
        const value = e.target.value
        if (value.length > 3) return
        function update(newval) {
            const oldVal = "***".split('')
            let i = 0
            while (i < newval.length) {
                oldVal[i] = newval[i]
                i++
            }
            return oldVal.join('')
        }
        setCvv(update(value))
    }

    const refs = {
        outlineRef, numberRef, nameRef, dateRef
    }
    const prop = {
        number,
        name,
        month,
        year,
        cvv,
        focus,
        cardType,
        refs
    }
    return (
        <div className="form-wrapper">
            <CreditCard {...prop} />
            <div className="form-wrapper-inner">
                <Form onSubmit={onSubmit} autoComplete={false}>
                    <Input label="Card Number" placeholder="" type="text" name="number" match={DEFAULT_CARD_FORMAT} required onFocus={onNumberFocus} value={hashToNumber(number)} onChange={onChangeNumber} />
                    <Input label="Card name" placeholder="" type="text" name="name" onChange={(e) => setName(e.target.value)} onFocus={onNameFocus} />
                    <Form.Group controlId="formFile" className="mb-3 options" onFocus={onExpiaryFocus}>
                        <Form.Control
                            as="select"
                            custom
                            onChange={onChangeMonth}
                        >
                            <option value="01">Month</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                        </Form.Control>
                        <Form.Control
                            as="select"
                            custom
                            onChange={onChangeYear}
                            onFocus={onExpiaryFocus}
                        >
                            <option value="21">Year</option>
                            <option value="21">21</option>
                            <option value="20">20</option>
                            <option value="19">19</option>
                            <option value="18">18</option>
                            <option value="17">17</option>
                            <option value="16">16</option>
                            <option value="15">15</option>
                            <option value="14">14</option>
                        </Form.Control>
                        <div className="cvv-wrapper">
                            <label>cvv</label>
                            <Form.Control label="" placeholder="***" type="text" name="cvv" value={getCvv(cvv)} onChange={onChangeCvv} onFocus={() => setFocussed(true)} onBlur={() => setFocussed(false)} />
                        </div>

                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Button onClick={onSubmit} disabled={false}>Submit</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}
