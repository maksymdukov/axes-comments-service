import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
  editor: {
    height: 300,
    border: `1px solid ${palette.grey[400]}`,
    padding: 5,
    "& .DraftEditor-root": {
      height: "auto",
    },
  },
}));

const toolbarOptions = {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "embedded",
    "emoji",
    "image",
    "remove",
    "history",
  ],
};

const WYSIWYG = ({ initEditorState, onBlur }) => {
  const classes = useStyles();
  const [editorState, setEditorState] = useState(initEditorState);
  const onEditorStateChange = (es) => {
    setEditorState(es);
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      onBlur={(e) => onBlur(e, editorState)}
      editorClassName={classes.editor}
      toolbar={toolbarOptions}
    />
  );
};

export default WYSIWYG;
