import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from '../components/Firebase';
import {Form, Input, Button} from '../components/common';
import styled from 'styled-components';

const FormField = styled.div`
    margin-bottom: 20px;
`

let fileReader;
if(typeof window !== 'undefined'){
    fileReader = new FileReader();
}

const AddRecipe = () => {
    const {firebase} = useContext(FirebaseContext);
    const [cooks, setCooks] = useState([]);
    const [recipeCover, setRecipeCover] = useState('');
    const [recipeName, setRecipeName] = useState('');
    const [cookId, setCookId] = useState('');
    const [summary, setSummary] = useState('');
    const [link, setLink] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fileReader.addEventListener('load', () => {
            setRecipeCover(fileReader.result);
        })
    }, []);

    useEffect(() => {
        if(firebase) {
            firebase.getCook().then(snapshot => {
                const availableCooks = [];
                snapshot.forEach(doc => {
                    availableCooks.push({
                    id: doc.id,
                    ...doc.data()
                    })
                })
                setCookId(availableCooks[0].id);
                setCooks(availableCooks);
            })
        }
    }, [firebase])


    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
                firebase.createRecipe({
                    recipeCover,
                    recipeName,
                    cookId,
                    link,
                    summary
                }).then(() => {
                    setSuccess(true)
                })
            }}>
            <FormField>
                <Input placeholder="recipe name" value={recipeName} onChange={e => {
                    e.persist();
                    setSuccess(false);
                    setRecipeName(e.target.value)
                }} />
            </FormField>
            <FormField>
                <strong>Cook Name</strong>
                <div>
                    <select value={cookId} onChange={e => {
                        e.persist();
                        setSuccess(false);
                        setCookId(e.target.value)
                    }}>
                        {cooks.map(a => (
                        <option key={a.id} value={a.id}>
                            {a.name}
                        </option>
                        ))}
                    </select>
                </div>
            </FormField>
            <FormField>
                <strong>Recipe Image</strong>
                <Input type="file" onChange={e => {
                    e.persist();
                    setSuccess(false);
                    fileReader.readAsDataURL(e.target.files[0])
                }}/>
            </FormField>
            <FormField>
                <strong>Summary</strong>
                <Input placeholder="recipe summary" value={summary}
                onChange={e => {
                    e.persist();
                    setSuccess(false);
                    setSummary(e.target.value)
                }}/>
            </FormField>
            <FormField>
                <strong>Link</strong>
                <Input placeholder="youtube link" value={link}
                onChange={e => {
                    e.persist();
                    setSuccess(false);
                    setLink(e.target.value)
                }}/>
            </FormField>
            {!!success &&
                <span>
                New book added successfully!
                </span>
            }
            <Button block type="submit">
                Add new recipe
            </Button>
        </Form>
    )
}

export default AddRecipe
