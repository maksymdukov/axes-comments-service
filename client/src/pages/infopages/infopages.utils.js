import { validateDraftjs } from "components/form/wysiwyg/validator";
import { object, string, mixed } from "yup";
import { actionsColumn, idColumn } from "components/tables/columns";

export const getPagesColumns = ({ onDeleteClick, onEditClick }) => [
  idColumn(),
  { name: "name", label: "Имя" },
  actionsColumn({ onDeleteClick, onEditClick }),
];

export const pageFormValidation = object().shape({
  name: string()
    .required()
    .matches(
      /^[a-z0-9-]+$/,
      'Допустимы только строчные латинские буквы, цифры и знак "-"'
    ),
  ruContent: mixed()
    .required()
    .test(...validateDraftjs()),
  ukContent: mixed()
    .required()
    .test(...validateDraftjs()),
});
