import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import './app.module.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import {
  StyledEngineProvider,
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import WrapperComponent from '../../../../libs/ui/src/pages/shared/wrapper';
import Welcome from '../../../../libs/ui/src/pages/welcome';
import FAQ from '../../../../libs/ui/src/pages/faq';
import PrivacyPolicy from '../../../../libs/ui/src/pages/privacy-policy';
import TermsConditions from '../../../../libs/ui/src/pages/terms-conditions';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserData } from '../../../../libs/store/src/api/auth/action';
import { getLocalStorage } from '../../../../libs/store/src/redux/localStore';
import { TailSpin } from 'react-loader-spinner';
import { LicenseInfo } from '@mui/x-license-pro';
import AboutUs from '../../../../libs/ui/src/pages/about-us';
import SnackbarBackground from 'libs/ui/src/utils/snackbarInBackground';
import NotFound from '../pages/not-found';

LicenseInfo.setLicenseKey(
  'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e'
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#3D99A7',
      darker: 'black',
    },
  },
});

const styles = {
  position: 'fixed',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
};

function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyB1IcIRgSVJIVQTkm9fy04zIZ7qMiaG58Y',
    authDomain: 'yazta-client.firebaseapp.com',
    projectId: 'yazta-client',
    storageBucket: 'yazta-client.appspot.com',
    messagingSenderId: '891603291244',
    appId: '1:891603291244:web:6345f3c9c687c25c629c49',
    measurementId: 'G-NFSGR94Y92',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.auth.loader);

  React.useEffect(() => {
    const retrieveUser = async () => {
      try {
        const userData = await getLocalStorage('userData');
        if (userData !== null) {
          dispatch(saveUserData(userData));
        }
      } catch (error) {
        console.log('error :', error);
      }
    };
    retrieveUser();
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {loader && (
          <div style={styles}>
            <TailSpin color="#3D99A7" height={80} width={80} />
          </div>
        )}
        <SnackbarBackground />
        <Router>
          <Routes>
            <Route
              exact
              path="/welcome"
              element={<WrapperComponent content={<Welcome />} />}
            />
            <Route
              exact
              path="/faq"
              element={
                <WrapperComponent content={<FAQ />} />
              }
            />
            <Route
              exact
              path="/privacy-policy"
              element={
                <WrapperComponent content={<PrivacyPolicy />} />
              }
            />
            <Route
              exact
              path="/terms-conditions"
              element={
                <WrapperComponent content={<TermsConditions />} />
              }
            />
            <Route
              path="/"
              element={<WrapperComponent content={<Welcome />} />}
            />
            <Route
              exact
              path="/about-us"
              element={<WrapperComponent content={<AboutUs />} />}
            />
            <Route
              path="*"
              element={<WrapperComponent content={<NotFound />} />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
