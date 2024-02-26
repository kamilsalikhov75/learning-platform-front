import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Lesson } from "entities/course";
import { Reorder } from "framer-motion";
import { Link } from "react-router-dom";

export interface AdminLessonCardProps {
  data: Lesson;
}

const variants = {
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 100,
    height: "auto",
  },
  exit: {
    opacity: 0,
    height: 0,
  },
};

export const AdminLessonCard = ({ data }: AdminLessonCardProps) => {
  const { title, _id } = data;

  return (
    <Reorder.Item
      {...variants}
      whileDrag={{
        scale: 1.01,
      }}
      as="div"
      value={data}
    >
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="20px">
        <SimpleGrid
          minChildWidth="120px"
          spacing="40px"
          alignItems="center"
          gap="16px"
        >
          <Heading as="h6" size="sm">
            {title}
          </Heading>
          <Stack>
            <Text>Действия:</Text>
            <Stack direction="row">
              <Button as={Link} to={`/admin/lessons/${_id}`}>
                Редактировать
              </Button>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Box>
    </Reorder.Item>
  );
};
