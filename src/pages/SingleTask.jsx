/* eslint-disable react-hooks/exhaustive-deps */
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import toast from 'react-hot-toast';
import {
  Badge,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Link,
  Card,
  CardBody,
  useDisclosure
} from '@chakra-ui/react';


import { API_BASE_URL } from '../util';
import SingleTaskSkeleton from '../_skeletons/SingleTaskSkeleton';
import DeleteConfirmation from '../components/DeleteConfirmation';

export default function SingleTask() { 

  const [task, setTask] = useState();
  const { taskId } = useParams(); // return an object containing the current URL parameters
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteTask = async () => {
    const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await res.json();

    if (res.status === 200) {
      toast.success(data.message);
      navigate('/tasks');
    }
    else {
      toast.error(data.message);
    }
  }

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        credentials: 'include'
      });
      const data = await res.json();
      setTask(data);
    };
    fetchTask();
  }, [])

  if (!task) {
    return <SingleTaskSkeleton />
  }

  return (
    <Box p='3' maxW='lg' mx='auto'>
      <Link
        as={RouterLink}
        to='/tasks'
        color='teal'
        _hover={{ textDecor: 'none' }}
        display='flex'
        alignItems='center'
      >
        <BsChevronLeft /> All Tasks
      </Link>
      <Heading fontSize={'3xl'} fontWeight={'semibold'} my='7' textAlign={'center'}>
        {task.name}
      </Heading>
      <Stack direction='row'>
        <Badge
          fontSize='md'
          colorScheme={task.status === 'open' ? 'orange' : 'green'}
        >
          {task.status}
        </Badge>
        {task.due && <Text>{new Date(task.due).toLocaleDateString()}</Text>}
      </Stack>
      <Card mt='4' border='1px solid' borderColor='gray.200'>
        <CardBody>
          <Text>{task.description}</Text>
        </CardBody>
      </Card>
      <Flex justify='space-between' mt='5'>
        <Text as='span' color='red.600' cursor='pointer' onClick={onOpen}>
          Delete Task
        </Text>
        <Link
          as={RouterLink}
          to={`/update-task/${task._id}`}
          color='teal'
          _hover={{ textDecor: 'none' }}
        >
          Edit Task
        </Link>
      </Flex>
      <DeleteConfirmation
        alertTitle='Delete Task'
        handleClick={handleDeleteTask}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}

