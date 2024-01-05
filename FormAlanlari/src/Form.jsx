import { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import {useHistory} from 'react-router-dom'
import {usersData} from './usersData.js'

export default function FormAlani() {
   
    
    const initialForm = {
        email: '',
        password: '',
    }
    const initialErrors = {
        email: false,
        password: false,
    }

    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState(initialErrors)
    const [isValid,setIsValid]=useState(false)

    const history=useHistory()

    useEffect(()=>{
        if(validateEmail(form.email) && form.password.length>5 && form.password.includes('.')){
            setIsValid(true)
        }else{
            setIsValid(false)
        }
    },[form])

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value })
        console.log('handleChange', name)

        if (name == 'email') {
            if (validateEmail(value)) {
                setErrors({ ...errors, [name]: false })
            } else {
                setErrors({ ...errors, [name]: true })
            }
        }
        if (name == 'password') {
            if (value.length > 5 && value.includes('.')) {
                setErrors({ ...errors, [name]: false })
            } else {
                setErrors({ ...errors, [name]: true })
            }
        }
    }
    function handleSubmit(event){
        event.preventDefault();
        
        for(let data of usersData){
            if(form.email===data.email && form.password===data.password){              
                history.push('/main')
                break;
            }else{
                history.push('/error')               
            }
        }
        setForm(initialForm)
    }



    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="exampleEmail">
                    Email
                </Label>
                <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Enter Your Email"
                    type="email"
                    onChange={handleChange}
                    value={form.email}
                    invalid={errors.email}
                    valid={!errors.email}
                />
                {errors.email && <FormFeedback >
                    This email is not valid.
                </FormFeedback>}
                {!errors.email && <FormFeedback>
                    Sweet! that email is valid
                </FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">
                    Password
                </Label>
                <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Enter Your Password"
                    type="password"
                    onChange={handleChange}
                    value={form.password}
                    invalid={errors.password}
                    valid={!errors.password}
                />
                {errors.password && <FormFeedback >
                    This password is not valid.
                </FormFeedback>}
                {!errors.password && <FormFeedback>
                    Sweet! that password is valid
                </FormFeedback>}
            </FormGroup>
            <Button data-cy='login-submit' disabled={!isValid}>
                Submit
            </Button>
        </Form>
    )
}