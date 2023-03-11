import { MainLayout } from "@/components/layouts/MainLayout";
import CreateProject from "@/components/Project/CreateModal";
import EditProject from "@/components/Project/EditModal";
import { Box, Button, Text, Flex, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";

type Props = {};

const Project = (props: Props) => {
  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems="center" pt="6">
        <Heading alignContent={"center"}>Project</Heading>
        <CreateProject />
      </Flex>
      <VStack w="full" my="12">
        <Flex
          w="full"
          borderRadius={"lg"}
          border={"1px solid"}
          borderColor="blue.200"
          p="4"
          justifyContent={"space-between"}
          alignItems={"center"}
          _hover={{
            borderColor: "blue.500",
            cursor: "pointer",
            shadow: "lg",
          }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box>
            <Text fontSize={"lg"}>Project Name</Text>
            <Text fontSize={"sm"} color="gray.300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              fugiat cumque ratione nostrum amet eius.
            </Text>
          </Box>
          <Box>
            <EditProject />
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

Project.PageLayout = MainLayout;

export default Project;
