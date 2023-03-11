import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  useColorModeValue,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import NextLink from "next/link";
export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Container maxW="100%" px="0">
      <Flex
        color={useColorModeValue("gray.600", "white")}
        minH={"80px"}
        bg="transparent"
        backdropFilter="auto"
        backdropBlur="6px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        position="fixed"
        w={"100%"}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <NextLink href={"/"}>
          <Text
            textAlign={"center"}
            fontFamily={"heading"}
            fontSize={"2xl"}
            color={useColorModeValue("gray.800", "white")}
          >
            RayAuth
          </Text>
        </NextLink>

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "center" }}>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            href={"#"}
            colorScheme={"blue"}
          >
            Login with Wallet
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Container>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <NextLink href={navItem.href}>
            <Text
              p={2}
              fontSize={"lg"}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
            >
              {navItem.label}
            </Text>
          </NextLink>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      mt="20"
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Dashboard",
    href: "/project",
  },
];
