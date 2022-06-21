import React, {useEffect, useState} from 'react';
import TodoList from "./TodoList"
import NewTodo from "./NewTodo"
import EditTodo, {} from "./EditTodo"
import {Center} from "@chakra-ui/layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  useDisclosure
  // BreadcrumbSeparator,
} from '@chakra-ui/react'
import {
  ApolloClient,
  InMemoryCache,
  // ApolloProvider,
  // useQuery,
  gql
} from "@apollo/client";


export const client = new ApolloClient({
  uri: 'http://localhost:5000/todo',
  cache: new InMemoryCache()
});


interface TodoStructure { id: string, text: string, __typename?: any }


const App: React.FC = () => {
  const [editable, setEditable] =  useState<{id: string, text: string | any}>()
  const [todos, setTodos] = useState<TodoStructure[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const todoAddHandler = (text: string) => {
    client
    .mutate({
      mutation: gql`
        mutation  {
          addTodo(text: "${text}") {
            id
            text
          }
        }
      `
    })
      .then(result => {
        
        setTodos(prev=> [...prev,{id: result!.data.addTodo.id, text: result!.data.addTodo.text}])
      });
  }
  const editTodoHandler = (text: string) => {

    client
    .mutate({
      mutation: gql`
        mutation  {
          editTodo(id: "${editable?.id}", text: "${text}") {
            id
            text
          }
        }
      `
    })
      .then(result => {
        
        setEditable({ id: result.data!.editTodo.id, text: text })
        onClose()
      });
    
  }
  const fillDefault = (todoId: string) => {
        onOpen()
        const item = todos.find(o => o.id === todoId)
        setEditable(item)
      
  }

  const deletTodoHandler = (todoId: string) => {
    client
    .mutate({
      mutation: gql`
        mutation  {
          deleteTodo(id: "${todoId}") {
            id
            text
          }
        }
      `
    })
      .then(result => {
        
        // setTodos(result.data!.todos) 
    setTodos(prev => {
    return  prev.filter(todo=> todoId !== todo.id)
    })
      });
  
    
  }
  useEffect(() => {
   
    
    client
    .query({
      query: gql`
        query  {
          todos {
            id
            text
          }
        }
      `
    })
      .then(result => {
       return setTodos(prev=> result.data!.todos) 
      });
  
  }, [editable])
  return <>
  <Box bgColor='blue.500' h='30px' color='white'>
   <Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href='#'>Home</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink href='#'>Todos</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
</Box>
    <Center mt={5} borderWidth="1px">
      
      <NewTodo onAddTodo={todoAddHandler}/>
    </Center>
    <div className='app'>
      <TodoList items={todos} onEdit={fillDefault} onDelete={deletTodoHandler} />
    </div>
    <EditTodo isOpen={ isOpen} onClose={onClose} onEditTodo={editTodoHandler} placeHoldText={editable?.text} />
  </>
}

export default App;
