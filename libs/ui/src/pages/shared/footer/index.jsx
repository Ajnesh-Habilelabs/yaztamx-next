/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Grid, Box, Typography, Link } from '@mui/material';
import style from './style';
import FacebookIcon from './../../../assets/images/fb-icon.svg';
import WhatsupFooterIcon from './../../../assets/images/w-up-icon.svg';
import MailIcon from './../../../assets/images/mail-icon.svg';
import {
  useNavigate,
  NavLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

const Footer = () => {
  const classes = style();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  return (
    <>
      <Grid container className={classes.footerRoot}>
        <Grid className={classes.container}>
          <Grid container>
            <Grid item xs={12} sm={6} md={3} className={classes.footerWidget}>
              <NavLink
                to={`/about-us${
                  location.pathname === '/welcome' ||
                  searchParams.get('welcome_user')
                    ? '?welcome_user=true'
                    : ''
                }`}
                style={{ textDecoration: 'inherit' }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  paddingTop={6}
                >
                  About Us
                </Typography>
              </NavLink>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.footerWidget}>
              {location.pathname === '/welcome' && (
                <NavLink
                  to={`/faq${
                    location.pathname === '/welcome' ||
                    searchParams.get('welcome_user')
                      ? '?welcome_user=true'
                      : ''
                  }`}
                  style={{ textDecoration: 'inherit' }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    paddingTop={6}
                  >
                    FAQ
                  </Typography>
                </NavLink>
              )}
              {location.pathname !== '/welcome' &&
                searchParams.get('welcome_user') && (
                  <NavLink
                    to={`/faq${
                      location.pathname === '/welcome' ||
                      searchParams.get('welcome_user')
                        ? '?welcome_user=true'
                        : ''
                    }`}
                    style={{ textDecoration: 'inherit' }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="div"
                      paddingTop={6}
                    >
                      FAQ
                    </Typography>
                  </NavLink>
                )}
              {location.pathname !== '/welcome' &&
                !searchParams.get('welcome_user') && (
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate('/support');
                    }}
                  >
                    Support
                  </Typography>
                )}
              {location.pathname !== '/welcome' &&
                !searchParams.get('welcome_user') && (
                  <ul>
                    <li>
                      <NavLink to="/help">Help center</NavLink>
                    </li>
                    <li>
                      <NavLink to="/faq">FAQ</NavLink>
                    </li>
                    {/* <li>
                  <NavLink to="/home">Address</NavLink>
                </li> */}
                    <li>
                      <NavLink to="/invite-friends">Invite friend</NavLink>
                    </li>
                  </ul>
                )}
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.footerWidget}>
              {location.pathname !== '/welcome' &&
                !searchParams.get('welcome_user') && (
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate('/contact');
                    }}
                  >
                    Contact Us
                  </Typography>
                )}
              <ul>
                <li>
                  <NavLink
                    to={`/terms-conditions${
                      location.pathname === '/welcome' ||
                      searchParams.get('welcome_user')
                        ? '?welcome_user=true'
                        : ''
                    }`}
                  >
                    Terms & Conditions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/privacy-policy${
                      location.pathname === '/welcome' ||
                      searchParams.get('welcome_user')
                        ? '?welcome_user=true'
                        : ''
                    }`}
                  >
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  {/* <NavLink to="/app-feedback">App FeedBack</NavLink> */}
                </li>
                {/* <li>
                  <NavLink to="/general">General</NavLink>
                </li> */}
              </ul>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.footerWidget}>
              <Typography variant="h6" gutterBottom component="div">
                Follow and Contact Us
              </Typography>
              <Box className={classes.socialIcons}>
                <Link
                  href="https://www.facebook.com/people/Yazmtamx/100085433691585"
                  target="_blank"
                >
                  <img draggable={false} src={FacebookIcon} alt="" />
                </Link>
                <Link href="https://wa.me/+525545406109" target="_blank">
                  <img draggable={false} src={WhatsupFooterIcon} alt="" />
                </Link>
                <Link href="mailto:info@yazta.com" target="_blank">
                  <img draggable={false} src={MailIcon} alt="" />
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.copyRight}>
        <Grid className={classes.container}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                className={classes.copyRightText}
              >
                Copyright 2021, YAZTA. All rights reserved
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
