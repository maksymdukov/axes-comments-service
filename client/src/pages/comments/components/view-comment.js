import LabelledParagraph from "components/typography/labelled-paragraph";
import React from "react";

const ViewComment = ({ entity }) => {
  const isAnonymous = !!entity.anonymousUser;
  return (
    <div>
      <LabelledParagraph
        label="Продукт"
        content={entity.product && entity.product.languages[0].title}
      />
      <LabelledParagraph
        label="Анонимный"
        content={isAnonymous ? "Да" : "Нет"}
      />
      <LabelledParagraph
        label="Имя"
        content={
          isAnonymous ? entity.anonymousUser.firstName : entity.user.firstName
        }
      />
      <LabelledParagraph
        label="Email"
        content={isAnonymous ? entity.anonymousUser.email : entity.user.email}
      />
      <LabelledParagraph label="Оценка" content={entity.rating || "Нет"} />
      <LabelledParagraph
        label="Дата"
        content={new Date(entity.createdAt).toLocaleDateString()}
      />
      <LabelledParagraph
        label="Текст"
        content={isAnonymous ? entity.content : entity.content}
      />
    </div>
  );
};

export default ViewComment;
