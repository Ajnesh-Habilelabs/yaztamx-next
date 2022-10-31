import React, { useEffect, useState } from 'react';
import HomepageText from './home';
import WelcomeText from './welcome';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TextRouter = {
  '/home': HomepageText,
  '/welcome': WelcomeText,
};

const DummyTextPaster = ({ index, line }) => {
  const language = useSelector((state) => state.core.language);
  const location = useLocation();
  const route = location.pathname;
  const [lang, setLang] = useState(route === '/welcome' ? 'sp' : language || 'en')
  // const [lang, setLang] = useState(language || 'en')
  // console.log(route);
  // console.log({ route, index, language, line });

  useEffect(() => {
    if (!language) return;
    setLang(language)
  }, [language])

  if (line !== undefined) {
    // console.log(TextRouter[route][index][lang][line]);
    return `${TextRouter[route][index][lang][line]}`;
  } else {
    return `${TextRouter[route][index][lang]}`;
  }
};

export default DummyTextPaster;
