import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import LangSwitch from '../pages/shared/header/languageSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from 'libs/store/src/api/core/action';
import { getLocalStorage } from 'libs/store/src/redux/localStore';
import LanguageIcon from '@mui/icons-material/Language';
import HomeIcon from '@mui/icons-material/Home';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import BookIcon from '@mui/icons-material/Book';
import ForumIcon from '@mui/icons-material/Forum';
import fonts from '../theme/font';

const MobileDrawer = (props) => {
  const location = useLocation();
  const {
    drawerOpen,
    setDrawerOpen,
    secondObjectArray,
    notificationNumber,
    setConfirmModalData,
    setConfirmModalOpen,
    logoutMethod,
  } = props;
  const isAuthenticated = getLocalStorage('Token');
  const dispatch = useDispatch();
  const language = useSelector((state) => state.core.language);
  const [lang, setLang] = React.useState(language !== '' ? language : 'sp');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const drawerOptions = [
    {
      name: 'Home',
      icon: <HomeIcon style={{ color: '#DE8706', fontSize: 22 }} />,
      route: '/home',
    },
    {
      name: 'Contact Us',
      icon: (
        <PermContactCalendarIcon style={{ color: '#DE8706', fontSize: 22 }} />
      ),
      route: '/contact',
    },
    !isAuthenticated
      ? {
          name: 'Forums',
          icon: <ForumIcon style={{ color: '#DE8706', fontSize: 22 }} />,
          route: '/categories',
        }
      : {
          name: 'Book Now',
          icon: <BookIcon style={{ color: '#DE8706', fontSize: 22 }} />,
          route: '/find-provider',
        },
  ];
  React.useEffect(() => {
    dispatch(changeLanguage(lang));
    // eslint-disable-next-line
  }, [lang]);
  const onNavigate = (route) => {
    if (route === 'logout') {
      // if (!confirm('Are you sure you want to logout?')) return;
      setConfirmModalData({
        message: 'Are you sure you want to logout?',
        object: {
          type: 'execute',
          executeWhat: 'logout',
          method: logoutMethod,
        },
      });
      setConfirmModalOpen(true);
      // dispatch(logout(navigate));
    } else {
      navigate(`${route}`);
    }
  };
  return (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {location.pathname === '/welcome' || (location.pathname === '/faq' && searchParams.get('welcome_user')) ? (
          <>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LanguageIcon style={{ color: '#DE8706', fontSize: 22 }} />
                  </ListItemIcon>
                  <ListItemText>
                    <LangSwitch lang={lang} setLang={setLang} />
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </>
        ) : (
          <>
            <List sx={{ fontFamily: fonts.primaryFontFamily }}>
              {drawerOptions.map((object, index) => {
                if (index < 3) {
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton onClick={() => navigate(object.route)}>
                        <ListItemIcon>{object.icon}</ListItemIcon>
                        <ListItemText primary={object.name} />
                      </ListItemButton>
                    </ListItem>
                  );
                } else {
                  return <></>;
                }
              })}
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/inbox/notification')}>
                  <ListItemIcon>
                    <Badge
                      // badgeContent={5}
                      badgeContent={notificationNumber}
                      color="primary"
                      // invisible={notificationNumber === 0}
                    >
                      <NotificationsIcon
                        style={{ color: '#DE8706', fontSize: 22 }}
                      />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary={'Notifications'} />
                </ListItemButton>
              </ListItem>
              <ListItem
                style={
                  location.pathname === '/about-us' ||
                  location.pathname === '/terms-conditions' ||
                  location.pathname === '/privacy-policy' ||
                  location.pathname === 'help'
                    ? { display: 'none' }
                    : { display: 'block' }
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LanguageIcon style={{ color: '#DE8706', fontSize: 22 }} />
                  </ListItemIcon>
                  <ListItemText>
                    <LangSwitch lang={lang} setLang={setLang} />
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
            {isAuthenticated ? (
              <>
                <Divider />
                <List>
                  {secondObjectArray.map((object, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={onNavigate.bind(this, object.route)}
                      >
                        <ListItemIcon>{object.icon}</ListItemIcon>
                        <ListItemText primary={object.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <>
                <Divider />
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={onNavigate.bind(this, '/login')}>
                      <ListItemIcon>
                        <LoginIcon style={{ color: '#DE8706', fontSize: 22 }} />
                      </ListItemIcon>
                      <ListItemText primary={'Login'} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={onNavigate.bind(this, '/register')}
                    >
                      <ListItemIcon>
                        <AppRegistrationIcon
                          style={{ color: '#DE8706', fontSize: 22 }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={'Register'} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </>
            )}
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
