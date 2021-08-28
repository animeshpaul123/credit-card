import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import './style.scss'

export default function Input({ label, type, ...rest }) {
    const [showEye] = useState(false)

    return (
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="text-left">{label}</Form.Label>
            <div className="input-box">
                {/* {
                    type === "password" ? renderEye() : null
                } */}
                <Form.Control type={
                    type === "password" ?
                        showEye ? "text" : "password"
                        : type
                }
                    {...rest}
                />
            </div>
        </Form.Group>
    )
}
