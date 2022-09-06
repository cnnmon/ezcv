import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { SECTIONS } from '../../constants';
import { useAppContext } from '../../context/state';

const styles = {
  container: {},
};

export default function Upload() {
  const { setSections } = useAppContext();

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = '/api/parse';
  const router = useRouter();

  const setDataAsSections = (data) => {
    setSections(SECTIONS.formatSubmittedResume(data));
  };

  const handleResumeGeneration = () => {
    const formData = new FormData();
    formData.append('resume', file);

    setIsLoading(true);
    fetch(API_URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setDataAsSections(data);
        router.push('/builder');
        return data;
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div style={styles.container}>
      <input type="file" onChange={handleFileInput} />
      <button type="button" onClick={handleResumeGeneration}>
        {isLoading ? 'Loading' : 'Generate'}
      </button>
    </div>
  );
}
