import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { PlusLg } from "react-bootstrap-icons";

// Styles
import { root } from "../../Theme/root";

// Types
import { CreateNewDocumentProps } from "../../types/homeTypes";

export const CreateNewDocument = ({
  onCreate,
}: CreateNewDocumentProps) => {
  const [documentName, setDocumentName] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeDocumentName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDocumentName(e.target.value);
  };

  const handleCreateDocument = () => {
    if (!documentName) return;

    onCreate(documentName);
    setDocumentName("");
    onClose();
  };

  const handleKeyDownDocumentName = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleCreateDocument();
    }
  };

  return (
    <>
      <Tooltip label="Click to create a new document">
        <Box
          onClick={onOpen}
          bg={root.colors.white}
          w="min-content"
          cursor={"pointer"}
          my={5}
          p={16}
          rounded={10}
          borderWidth={1}
        >
          <PlusLg color={root.colors.primary} size={30} />
        </Box>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="rgba(0,0,0,.2)"
          backdropFilter="blur(5px)"
        />
        <ModalContent>
          <ModalHeader>Create your document</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Document name</FormLabel>
              <Input
                value={documentName}
                onChange={handleChangeDocumentName}
                onKeyDown={handleKeyDownDocumentName}
                autoFocus
                placeholder="My document"
                variant="filled"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleCreateDocument}>
              Create document
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
