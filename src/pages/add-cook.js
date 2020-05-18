import React, { useState, useContext } from 'react'
import {Form, Input, Button} from '../components/common'
import {FirebaseContext} from '../components/Firebase'

const AddCook = () => {
    const { firebase } = useContext(FirebaseContext);
    const [cookName, setCookName] = useState('');
    const [success, setSuccess] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        firebase.createCook({
            cookName
        }).then(() => {
            setCookName('');
            setSuccess(true);
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input onChange={(e) => {
                e.persist();
                setSuccess(true);
                setCookName(e.target.value);
                }} value={cookName} placeholder="cook name" />
                {!!success &&
                    <span>
                        Cook created successfully!
                    </span>
                }
            <Button type="submit" block>Add new cook</Button>
        </Form>
    )
}

export default AddCook;
