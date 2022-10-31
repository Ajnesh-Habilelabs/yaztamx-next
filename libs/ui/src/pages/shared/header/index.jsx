/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import { Grid, Typography, Link } from '@mui/material';
import style from './style';
import { Box } from '@mui/system';
import SiteLogo from './../../../assets/images/auth-logo.svg';
import { getLocalStorage } from '../../../../../../libs/store/src/redux/localStore';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import UserIcon from '../../../assets/images/user-icon.png';
import PeopleIcon from '@mui/icons-material/People';
import {
  useNavigate,
  NavLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../../store/src/api/auth/action';
import ForumIcon from '@mui/icons-material/Forum';
import StarIcon from '@mui/icons-material/Star';
import ProfileIcon from '../../../assets/images/profile-icon.svg';
import {
  changeLanguage,
  getNotificationCounter,
} from 'libs/store/src/api/core/action';
import color from './../../../theme/color';
import ConfirmModal from '../modal';
import LangSwitch from './languageSwitch';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileDrawer from 'libs/ui/src/utils/mobileDrawer';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {
  mobile_width,
  tab_width,
  small_screen_width,
} from 'libs/ui/src/utils/responsiveness';

const Header = () => {
  const classes = style();
  const location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = getLocalStorage('Token');
  const MenuRef = useRef();
  const mobileZone = useMediaQuery(mobile_width);
  const tabZone = useMediaQuery(tab_width);
  const smallScreenZone = useMediaQuery(small_screen_width);
  const user = useSelector((state) => state.auth.user);
  const notificationCounter = useSelector(
    (state) => state.core.userNotificationCounter
  );
  const language = useSelector((state) => state.core.language);
  const options = [
    {
      name: 'My Profile',
      icon: <PersonIcon style={{ color: '#DE8706', fontSize: 22 }} />,
      route: '/profile',
    },
    {
      name: 'My Booking',
      icon: <DateRangeIcon style={{ color: '#DE8706', fontSize: 22 }} />,
      route: '/pending-offers',
    },
    {
      name: 'Favorite Providers',
      icon: <FavoriteIcon style={{ color: '#DE8706', fontSize: 22 }} />,
      route: '/favorite-providers',
    },
    // {
    //   name: 'My Provider',
    //   icon: <PersonOutlineIcon style={{ color: '#DE8706', fontSize: 22 }} />,
    //   route: '/my-provider',
    // },
    {
      name: 'Messages',
      icon: <ChatIcon style={{ color: '#DE8706', fontSize: 22 }} />,
      route: '/inbox/chat',
    },
    {
      name: 'Payment Method',
      icon: (
        <AccountBalanceWalletIcon style={{ color: '#DE8706', fontSize: 22 }} />
      ),
      route: '/payment-method',
    },
    {
      name: 'Support',
      icon: <ContactSupportIcon style={{ color: '#DE8706', fontSize: 22 }} />,
      route: '/support',
    },
    {
      name: 'Settings',
      icon: <SettingsIcon style={{ color: '#DE8706', fontSize: 22 }} />,
      route: '/setting',
    },
    {
      name: 'Forum',
      icon: <ForumIcon style={{ color: '#DE8706', fontSize: 22 }} />,
      route: '/categories',
    },
    // {
    //   name: 'Rating',
    //   icon: <StarIcon style={{ color: '#DE8706', fontSize: 22 }} />,
    //   route: '/rating-and-review',
    // },
    {
      name: 'Logout',
      icon: <PowerSettingsNewIcon style={{ color: '#DE8706', fontSize: 22 }} />,
      route: 'logout',
    },
  ];

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationNumber, setNotificationNumber] = React.useState(0);
  const open = Boolean(anchorEl);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState({});
  const [userData, setUserData] = useState({});
  const [lang, setLang] = useState(language !== '' ? language : 'sp');
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    dispatch(changeLanguage(lang));
  }, [lang]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const toggleDrawer = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onNavigate = (route) => {
    if (route === 'logout') {
      // if (!confirm('Are you sure you want to logout?')) return;
      setConfirmModalData({
        message: 'Are you sure you want to logout?',
        object: {
          type: 'execute',
          executeWhat: 'logout',
          method: logout,
        },
      });
      setConfirmModalOpen(true);
      // dispatch(logout(navigate));
    } else {
      navigate(`${route}`);
      handleClose();
    }
  };

  const onInvite = () => {
    navigate('/invite-friends');
  };

  const getNotificationsCounter = () => {
    dispatch(getNotificationCounter());
  };

  React.useEffect(() => {
    if (!isAuthenticated) return;
    getNotificationsCounter();
  }, []);

  React.useEffect(() => {
    setNotificationNumber(notificationCounter);
  }, [notificationCounter]);

  React.useEffect(() => {
    setUserData(user);
  }, [user]);

  const bookNow = (value, arr) => {
    var obj = {
      living_arrangement: value,
      preferred_time: 'am',
      skill: arr,
    };
    sessionStorage.setItem('queryData', JSON.stringify(obj));
    navigate('/find-provider', { state: { value, arr } });
  };

  if (location.pathname === '/') {
    location.pathname = '/welcome';
  }

  return (
    <>
      <Grid container className={classes.headerRoot}>
        <MobileDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          secondObjectArray={options}
          notificationNumber={notificationNumber}
          setConfirmModalData={setConfirmModalData}
          setConfirmModalOpen={setConfirmModalOpen}
          logoutMethod={logout}
        />
        <Box
          style={{ cursor: 'pointer' }}
          className={`${classes.siteLogo} ${classes.dflexAlign}`}
          onClick={() => navigate('/')}
        >
          <img draggable={false} src={SiteLogo} alt="Left Img" height={47} />
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            className={classes.leftSpace}
          >
            YAZTA
          </Typography>
        </Box>
        {!mobileZone && !tabZone && (
          <Box>
            <ul className={classes.dflexAlign}>
              {location.pathname === '/welcome' ||
              searchParams.get('welcome_user') ? (
                <></>
              ) : (
                <>
                  <li>
                    <NavLink to="/home">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">Contact Us</NavLink>
                  </li>
                </>
              )}
              {isAuthenticated && (
                <>
                  {location.pathname === '/welcome' ||
                  searchParams.get('welcome_user') ? (
                    <></>
                  ) : (
                    <li>
                      <Link
                        sx={{ cursor: 'pointer' }}
                        onClick={() =>
                          bookNow('livein', [
                            'cleaning',
                            'babysitting',
                            'cooking',
                            'fullService',
                          ])
                        }
                      >
                        Book Now
                      </Link>
                    </li>
                  )}
                </>
              )}
              {!isAuthenticated && (
                <>
                  {location.pathname === '/welcome' ||
                  searchParams.get('welcome_user') ? (
                    <></>
                  ) : (
                    <li>
                      <NavLink to="/categories">Forums</NavLink>
                    </li>
                  )}
                </>
              )}

              <li
                style={
                  location.pathname === '/about-us' ||
                  location.pathname === '/terms-conditions' ||
                  location.pathname === '/privacy-policy' ||
                  location.pathname === 'help'
                    ? { display: 'none' }
                    : { marginLeft: '40px' }
                }
              >
                <LangSwitch lang={lang} setLang={setLang} />
              </li>
            </ul>
          </Box>
        )}
        <Box className={classes.dflexAlign} marginLeft={'auto'}>
          {isAuthenticated && !mobileZone && (
            <Box paddingLeft={4} paddingRight={4}>
              <Badge
                // badgeContent={5}
                badgeContent={notificationNumber}
                color="primary"
                // invisible={notificationNumber === 0}
              >
                <NotificationsIcon
                  style={{ fontSize: 30 }}
                  onClick={() => navigate('/inbox/notification')}
                />
              </Badge>
            </Box>
          )}
          {isAuthenticated && !tabZone && !mobileZone && !smallScreenZone && (
            <Box className={classes.dflexAlign}>
              <img
                draggable={false}
                src={userData.image ? userData?.image : ProfileIcon}
                alt=""
                className={classes.profile}
              />
              {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                className={`${classes.leftSpace} ${classes.accountName}`}
              >
                {userData?.name}
              </Typography>
            </Box>
          )}
          {/* {!console.log(isAuthenticated, mobileZone, tabZone)} */}
          {(isAuthenticated ||
            (!isAuthenticated && mobileZone) ||
            (!isAuthenticated && tabZone)) && (
            <Box
              style={
                (location.pathname === '/about-us' ||
                  location.pathname === '/terms-conditions' ||
                  location.pathname === '/privacy-policy' ||
                  location.pathname === 'help') &&
                searchParams.get('welcome_user')
                  ? { display: 'none' }
                  : { display: 'block' }
              }
            >
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls="long-menu"
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={tabZone || mobileZone ? toggleDrawer : handleClick}
                >
                  <MenuRoundedIcon style={{ fontSize: 30 }} />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  ref={MenuRef}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      maxHeight: '100vh',
                      width: '450px',
                      // width: '30%',
                      margin: '2% 0 0 0',
                      padding: '15px 20px',
                      background: '#F9F9F9',
                      overflowY: 'auto',
                      top: '-26px !important',
                      // right: '4px !important',
                      left: `${screen.width - 550}px !important`,
                      // left: 'unset !important',
                      '& li': {
                        padding: '6px 16px',
                        minHeight: '-webkit-fill-available',
                        minWidth: '-webkit-fill-available',
                        justifyContent: 'flex-start',
                      },
                    },
                  }}
                >
                  <Box className={classes.dflexAlign}>
                    <Grid display="flex" className={classes.userSec}>
                      <img
                        draggable={false}
                        src={userData?.image ? userData?.image : ProfileIcon}
                        alt=""
                        className={classes.profileImg}
                      />
                      <Typography className={classes.username}>
                        {userData?.name}
                      </Typography>
                    </Grid>
                  </Box>
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      selected={option === 'Pyxis'}
                      onClick={() => onNavigate(option?.route)}
                    >
                      {option?.icon}
                      <Typography className={classes.menuTitle}>
                        {option?.name}
                      </Typography>
                    </MenuItem>
                  ))}
                  <Grid
                    display="flex"
                    className={classes.bottomSec}
                    onClick={onInvite}
                  >
                    <PeopleIcon
                      style={{
                        color: '#DE8706',
                        fontSize: 22,
                      }}
                    />
                    <Typography className={classes.inviteText}>
                      INVITE FRIENDS / MAKE MONEY
                    </Typography>
                  </Grid>
                </Menu>
              </div>
            </Box>
          )}
          {!isAuthenticated &&
            !mobileZone &&
            !tabZone &&
            location.pathname !== '/welcome' && (
              <ul
                style={
                  searchParams.get('welcome_user')
                    ? { display: 'none' }
                    : { display: 'block' }
                }
                className={classes.dflexAlign}
              >
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </ul>
            )}
        </Box>
      </Grid>
      <ConfirmModal
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        data={confirmModalData}
        setData={setConfirmModalData}
      />
    </>
  );
};

export default Header;
