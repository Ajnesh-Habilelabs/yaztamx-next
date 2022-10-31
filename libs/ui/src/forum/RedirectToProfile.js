import React from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToProfile = (props) => {
  const { title, userId } = props;
  const navigate = useNavigate();
  return (
    <span
    style={{cursor: 'pointer'}}
      onClick={(e) => {
        e.cancelBubble = true;
        if (e.stopPropagation) { 
            e.stopPropagation();
        }
        navigate('/profile-forum', { state: { userId: userId } })
    }}
    >
      {title}
    </span>
  );
};

export default RedirectToProfile;
