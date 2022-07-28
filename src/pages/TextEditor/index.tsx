import { useEffect, useState } from "react";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Styles
import { root } from "../../Theme/root";
import { toolbar } from "./toolbar";

export const TextEditor = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [text, setText] = useState<EditorState>();

  useEffect(() => {
    if (!text) {
      setText(EditorState.createEmpty());
    }
  }, []);

  return (
    <Flex mt={6} px={5} justify="center">
      <Box
        bg={root.colors.white}
        id="printable"
        p={4}
        rounded={10}
        maxW={1100}
        boxShadow="0 2px 5px 0 rgba(0,0,0,.1)"
      >
        <Editor
          toolbarClassName="printable-hidden"
          toolbar={toolbar}
          editorState={text}
          onEditorStateChange={setText}
        />
      </Box>
    </Flex>
  );
};
