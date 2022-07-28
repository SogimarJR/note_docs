import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  FileEarmarkTextFill,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import { v4 } from "uuid";

// Styles
import { root } from "../../Theme/root";

// Fake docs
import { fakeDocs } from "./fake-docs";

// Components
import { CreateNewDocument } from "./CreateNewDocument";

type OrderBy = "title" | "updatedAt" | "";

export const Home = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [orderBy, setOrderBy] = useState<OrderBy>("");
  const [docs, setDocs] = useState(
    fakeDocs.map((doc) => ({ ...doc, checked: false }))
  );
  const allChecked = docs.every((doc) => doc.checked);
  const isIndeterminate =
    docs.some((doc) => doc.checked) && !allChecked;
  const { isOpen, onToggle, onClose } = useDisclosure();
  const theme = useTheme();

  const handleCreateDocument = (documentName: string) => {
    const id = v4();
    const newDoc = {
      id,
      title: documentName,
      content: "",
      checked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDocs([...docs, newDoc]);

    const a = document.createElement("a");
    a.href = `/${id}?documentName=${documentName}&lastUpdate=${newDoc.updatedAt}`;
    a.target = "_blank";
    a.click();
    a.remove();
  };

  const handleChangeCheckbox = (checked: boolean, index: number) => {
    docs[index].checked = checked;
    setDocs([...docs]);
  };

  const handleChangeAllCheckbox = (checked: boolean) => {
    setDocs(docs.map((doc) => ({ ...doc, checked })));
  };

  const handleDeleteSelected = () => {
    setDocs(docs.filter((doc) => !doc.checked));
    onClose();
  };

  const handleChangeOrderBy = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderBy(e.target.value as OrderBy);
  };

  return (
    <Box p={4} px={!isLargerThan600 ? 5 : 20}>
      <Text fontWeight={500} fontSize={18}>
        Create a new document
      </Text>
      <Divider />

      <CreateNewDocument onCreate={handleCreateDocument} />

      <Flex align="center" justify={"space-between"}>
        <Text fontWeight={500} fontSize={18}>
          All your documents
        </Text>
        <Text fontSize={14} color={root.colors.gray}>
          Total {docs.length} document{docs.length > 1 && "s"}
        </Text>
      </Flex>
      <Divider />

      <Grid
        bg={root.colors.white}
        templateColumns={
          !isLargerThan600 ? "40px 1fr 170px" : "40px 1fr 1fr 170px"
        }
        h={57}
        mt={5}
        p={3}
        px={2}
        borderBottomWidth={1}
      >
        <GridItem>
          <Flex align="center" justify="start" h="full" px={2}>
            <Checkbox
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={(e) =>
                handleChangeAllCheckbox(e.target.checked)
              }
            />
          </Flex>
        </GridItem>
        <GridItem>
          <Flex align="center" h="full">
            <Text fontWeight={500} fontSize={14}>
              Document name
            </Text>
          </Flex>
        </GridItem>
        <GridItem hidden={!isLargerThan600}>
          <Flex align="center" h="full">
            <Text fontWeight={500} fontSize={14}>
              Last modification
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Box fontWeight={500} fontSize={14} textAlign="end">
            {docs.filter((doc) => doc.checked).length ? (
              <Popover
                isOpen={isOpen}
                onClose={onToggle}
                placement="left"
              >
                <PopoverTrigger>
                  <Button
                    onClick={onToggle}
                    variant="unstyled"
                    size="sm"
                    color="red"
                    cursor="pointer"
                  >
                    Delete files
                  </Button>
                </PopoverTrigger>
                <PopoverContent textAlign="start">
                  <PopoverArrow />
                  <PopoverHeader
                    fontWeight={600}
                    fontSize={16}
                    pt={2}
                    border={0}
                  >
                    Confirmation
                  </PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody border="0">
                    Do you really want to delete selected documents?
                  </PopoverBody>
                  <PopoverFooter
                    display="flex"
                    justifyContent="flex-end"
                    border="0"
                  >
                    <ButtonGroup size="sm">
                      <Button variant="ghost" onClick={onToggle}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleDeleteSelected}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            ) : (
              <Select
                onChange={handleChangeOrderBy}
                placeholder="Order by"
                variant="filled"
                size="sm"
                rounded={10}
              >
                <option value="title">Document name</option>
                <option value="updatedAt">Last modification</option>
              </Select>
            )}
          </Box>
        </GridItem>
      </Grid>

      {docs
        .sort((x, y) => {
          switch (orderBy) {
            case "title":
              return x.title < y.title
                ? -1
                : x.title > y.title
                ? 1
                : 0;
            case "updatedAt":
              return new Date(x.createdAt) > new Date(y.createdAt)
                ? -1
                : new Date(x.createdAt) < new Date(y.createdAt)
                ? 1
                : 0;
            default:
              return new Date(x.createdAt) > new Date(y.createdAt)
                ? -1
                : new Date(x.createdAt) < new Date(y.createdAt)
                ? 1
                : 0;
          }
        })
        .filter((doc) =>
          theme.search
            ? doc.title
                .toLowerCase()
                .includes(theme.search.toLowerCase())
            : doc
        )
        .map((doc, index) => (
          <Grid
            key={doc.id}
            bg={root.colors.white}
            templateColumns={
              !isLargerThan600
                ? "40px 1fr 170px"
                : "40px 1fr 1fr 170px"
            }
            p={3}
            px={2}
            borderBottomWidth={1}
            _hover={{ bg: root.colors.whiteHove }}
          >
            <GridItem>
              <Flex align="center" justify="start" h="full" px={2}>
                <Checkbox
                  isChecked={doc.checked}
                  onChange={(e) =>
                    handleChangeCheckbox(e.target.checked, index)
                  }
                />
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center" h="full">
                <FileEarmarkTextFill
                  color={root.colors.primary}
                  size={20}
                />
                <Text
                  cursor="pointer"
                  fontSize={14}
                  mx={2}
                  _hover={{ textDecoration: "underline" }}
                >
                  {doc.title}
                </Text>
              </Flex>
            </GridItem>
            <GridItem hidden={!isLargerThan600}>
              <Flex align="center" h="full">
                <Text color={root.colors.gray} fontSize={14}>
                  {
                    new Date(doc.updatedAt)
                      .toUTCString()
                      .split("GMT")[0]
                  }
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex align="center" justify="end" h="full" px={2}>
                <IconButton
                  icon={<ThreeDotsVertical size={20} />}
                  size="sm"
                  aria-label="Options"
                  variant="ghost"
                  borderRadius={50}
                />
              </Flex>
            </GridItem>
          </Grid>
        ))}
    </Box>
  );
};
