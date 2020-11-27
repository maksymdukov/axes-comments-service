import { makeStyles } from "@material-ui/core";
import React from "react";
import { useDropzone } from "react-dropzone";

const useStyles = makeStyles(({ palette }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  dropzone: {
    flex: "1",
    display: "flex",
    color: palette.grey[600],
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: palette.grey[100],
    borderStyle: "dashed",
    backgroundColor: palette.grey[100],
  },
}));

const FilePicker = ({ onDrop }) => {
  const classes = useStyles();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.name} - {(file.size / 1024).toFixed(2)} Kbytes
    </li>
  ));

  return (
    <section className={classes.container}>
      <div {...getRootProps({ className: classes.dropzone })}>
        <input {...getInputProps()} />
        <p>Перетащите сюда файлы. Или нажмите на область для выбора.</p>
      </div>
      <aside>
        <h4>Выбранные файлы</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default FilePicker;
