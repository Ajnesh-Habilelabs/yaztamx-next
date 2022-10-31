import React from 'react';
import Switch from 'react-switch';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import {
  mobile_width
} from 'libs/ui/src/utils/responsiveness';

const LangSwitch = (props) => {
  const location = useLocation();
  const mobileZone = useMediaQuery(mobile_width);
  const { lang, setLang } = props;
  //   const [state, setState] = React.useState('');

  const handleChange = (value) => {
    setLang(value ? 'sp' : 'en');
  };

  return (
    <label htmlFor="small-radius-switch">
      <Switch
        checked={lang === 'sp'}
        onChange={handleChange}
        handleDiameter={17}
        offColor="#3D99A7"
        onColor="#DE8706"
        offHandleColor="#FFF"
        onHandleColor="#FFF"
        height={30}
        width={65}
        borderRadius={100}
        title="Change display language"
        activeBoxShadow="0px 0px 0px 0px white"
        uncheckedIcon={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: 15,
              color: '#FFF',
              paddingRight: 2,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            SP
          </div>
        }
        checkedIcon={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: 15,
              color: '#FFF',
              paddingRight: 2,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            EN
          </div>
        }
        className="react-switch"
        id="small-radius-switch"
      />
      {!mobileZone && location.pathname === '/welcome' &&
        (lang === 'en' ? (
          <span style={{ paddingLeft: 10 }}>Switch to Spanish</span>
        ) : (
          <span style={{ paddingLeft: 10 }}>Cambia en Ingles</span>
        ))}
    </label>
  );
};

export default LangSwitch;
