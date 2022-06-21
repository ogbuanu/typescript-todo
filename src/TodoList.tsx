import React from "react"
import { SimpleGrid, Box, Button, Text, Center, Flex} from '@chakra-ui/react'
interface TodoListProps{
    items: { id: string, text: string }[],
    onDelete: (id: string) => void,
    onEdit: (id: string) => void
}
const TodoList: React.FC<TodoListProps> = props => {

    return <SimpleGrid column={1} spacing={5} borderWidth="1px" pt={4} pb={4} mt={5}>
        {props.items.map(todo => {
            return <Flex mt={2} borderWidth="1px" maxW={910} ms={4} key={todo.id} >
                <Center ms={4} flex={2}> <Text >{todo.text} </Text> </Center>
                <Button colorScheme={"yellow"} flex={1} mr={3} ms={5} onClick={()=> props.onEdit(todo.id)}>Edit</Button>
                <Button colorScheme={"red"} flex={1} onClick={()=> props.onDelete(todo.id)}>delete</Button>
            </Flex>
        })} 
    </SimpleGrid>
}

export default TodoList