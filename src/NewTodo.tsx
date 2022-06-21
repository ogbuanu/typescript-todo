import React, {useRef} from "react"
import {
    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import { Button, Input } from '@chakra-ui/react'
type NewTodoProp = {
    onAddTodo: (todoText: string) => void
}

const NewTodo: React.FC <NewTodoProp>= (props) => {
    const textInputRef = useRef<HTMLInputElement>(null)
    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        const enteredText = textInputRef.current!.value
        props.onAddTodo(enteredText)
        textInputRef.current!.value = ""
        
    }
    return <>
        <form onSubmit={todoSubmitHandler}>
         <FormControl maxWidth="100%">
        <FormLabel htmlFor='todo-text'>Todo Text</FormLabel>
        <Input type="text" id="todo-text" maxWidth={"100%"} ref={textInputRef}/>
         </FormControl>
         <Button colorScheme='blue' type="submit" mt={5} mb={5}>ADD TODO</Button>
       
        </form>
    </>
}

export default NewTodo