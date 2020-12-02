import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

export const createEditorState = (description) => {
  if (!description) return null;
  const blocksFromHtml = htmlToDraft(description);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  return EditorState.createWithContent(contentState);
};

export const editorStateToHtml = (editorState) => {
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  return draftToHtml(rawContentState);
};
