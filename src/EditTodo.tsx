import React, { useRef } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    // useDisclosure,
    Button,
    FormControl,
    Input,
    FormLabel,
  } from '@chakra-ui/react'

  type EditPrp = {isOpen: boolean, onClose: ()=> void, onEditTodo: (todoText: string)=> void, placeHoldText: string}

const EditTodo: React.FC<EditPrp> = (props) => {

    const textInputRef = useRef<HTMLInputElement>(null)
    const editSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        
        const enteredText = textInputRef.current!.value
        props.onEditTodo(enteredText)
       
        
    }
    // const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
        {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal

        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input  placeholder='Edit text' ref={textInputRef} defaultValue={props.placeHoldText} />

            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={editSubmitHandler}>
              Save
            </Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    )
}

export default EditTodo;