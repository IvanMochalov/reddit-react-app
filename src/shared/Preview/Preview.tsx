import React from "react";
import styles from "./preview.css";

interface IPreviewProps {
  preview?: string;
}

export function Preview({ preview }: IPreviewProps) {
  return (
    <div className={styles.preview}>
      <img
        className={styles.previewImg}
        src={preview && !preview.startsWith('https://st.') ? preview : 'https://жемчужина-крыма.рус/custom/pearl/img/noimage.jpg'}
        alt="preview image"
      />
    </div>
  );
}
