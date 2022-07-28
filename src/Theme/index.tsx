import { createContext, useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  Printer,
  Search,
  Share,
} from "react-bootstrap-icons";

// Styles
import { root } from "./root";

const initialValues = {
  search: "",
};

export const ThemeContext = createContext(initialValues);

export const ThemeProvider = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [inputFocused, setInputFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const values = { search };

  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(
        location.search.split("?")[1]
      );
      const name = searchParams.get("documentName");
      const date = new Date(searchParams.get("lastUpdate") || "");

      if (name) setDocumentName(name);
      if (date) setLastUpdate(date.toUTCString().split("GMT")[0]);
    }
  }, [location.search]);

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  const handleChangeSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(e.target.value);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <ThemeContext.Provider value={values}>
      <Flex
        bg={root.colors.white}
        align="center"
        justify="space-between"
        wrap={!isLargerThan600 ? "wrap" : "nowrap"}
        boxShadow="0 2px 5px 0 rgba(0,0,0,.1)"
        p={4}
        py={3}
      >
        <Flex w={!isLargerThan600 ? "auto" : "full"}>
          <Link to="/">
            <Image
              src="noteDocs.svg"
              alt="NoteDocs"
              h="full"
              w={30}
              minW={30}
            />
          </Link>

          <InputGroup
            hidden={!isLargerThan600 || location.pathname !== "/"}
            w={inputFocused ? "full" : "auto"}
            maxW={inputFocused ? 600 : 350}
            minW={300}
            ml={8}
            variant="filled"
            transition=".3s"
          >
            <InputLeftElement
              children={<Search />}
              pointerEvents="none"
            />
            <Input
              value={search}
              onChange={handleChangeSearch}
              onFocus={handleFocus}
              onBlur={handleBlur}
              focusBorderColor={root.colors.primary}
              variant="filled"
              placeholder="Search your documents"
              borderRadius={10}
            />
          </InputGroup>
        </Flex>

        <Flex
          hidden={location.pathname === "/"}
          flexDir="column"
          align={!isLargerThan600 ? "end" : "center"}
          justify="center"
          w={!isLargerThan600 ? "auto" : "full"}
          mb={!isLargerThan600 ? 4 : 0}
        >
          <Text fontWeight={500}>{documentName}</Text>
          <Text color={root.colors.gray} fontSize={12}>
            {lastUpdate}
          </Text>
        </Flex>

        <Stack w="full" spacing={2} direction="row" justify="end">
          <Tooltip label="Come back home">
            <IconButton
              onClick={handleBack}
              hidden={location.pathname === "/"}
              icon={<ArrowLeft size={18} />}
              aria-label="Print"
              variant="ghost"
              rounded={10}
            />
          </Tooltip>

          <Tooltip label="Print">
            <IconButton
              onClick={() => window.print()}
              hidden={location.pathname === "/"}
              icon={<Printer size={18} />}
              aria-label="Print"
              variant="ghost"
              rounded={10}
            />
          </Tooltip>

          <Tooltip label="Share">
            <IconButton
              hidden={location.pathname === "/"}
              icon={<Share size={18} />}
              aria-label="Share"
              variant="ghost"
              rounded={10}
            />
          </Tooltip>

          <Flex
            color={root.colors.gray}
            cursor="pointer"
            transition=".2s"
            p={2}
            minW={!isLargerThan600 ? 195 : 213}
            borderWidth={1}
            borderRadius={10}
            _hover={{ color: root.colors.black }}
          >
            <Image
              src="google.svg"
              alt="Google logo"
              mx={!isLargerThan600 ? 2 : 3}
            />
            <Text fontSize={!isLargerThan600 ? 14 : 16}>
              Sign in with Google
            </Text>
          </Flex>
        </Stack>
      </Flex>
      <Outlet />
    </ThemeContext.Provider>
  );
};
