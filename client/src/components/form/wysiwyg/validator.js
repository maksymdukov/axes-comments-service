export const validateDraftjs = () => [
  "draftjs",
  "${path} is required",
  (value, ctx) => value.getCurrentContent().hasText(),
];
