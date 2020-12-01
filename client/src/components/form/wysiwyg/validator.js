export const validateDraftjs = () => [
  "draftjs",
  "${path} is required",
  (value) => value.getCurrentContent().hasText(),
];
