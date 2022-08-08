import React from 'react';
import { LINKEDIN_URL } from '../../pages/api/oauth';

export default function LinkedinButton() {
  return (
    <a href={LINKEDIN_URL}>
      <div type="submit" style={{ height: '40px', width: '215px' }}>
        <img
          style={{ height: '100%', width: '100%' }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSk3pI2NNjzOZHDLDT5sdKXO1Aqc6sLdo-zZA&usqp=CAU"
          alt="LinkedIn authentification"
        />
      </div>
    </a>
  );
}
