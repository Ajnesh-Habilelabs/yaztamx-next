/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PhoneInput from 'react-phone-number-input';
import style from './style';
import LoginButton from './../../components/atoms/button';
import HomeFullImg from '../../assets/images/home-full-img.png';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DummyTextPaster from '../shared/text';
import SubscribeImg from '../../assets/images/subscribe-left-img.svg';
import AuthLogo from '../../assets/images/auth-logo.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../components/atoms/textfield';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import fonts from '../../theme/font';
import VerifiedIcon from '@mui/icons-material/Verified';
import Untick from '../../assets/images/untick.svg';
import Tick from '../../assets/images/tick.svg';
import useMediaQuery from '@mui/material/useMediaQuery';
import { mobile_width, tab_width } from '../../utils/responsiveness';
import { addConcernData, addSubscriber } from 'libs/store/src/api/auth/action';
import { Helmet } from 'react-helmet';
import { lang } from 'moment';

const TopButtomSurfer = (props) => {
  const classes = style();
  const { direction, setDirection } = props;
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight - window.innerHeight,
      behavior: 'smooth',
    });
  };
  const scroll = () => {
    goToTop();
    if (direction === 'up') {
      setDirection('down');
    } else if (direction === 'down') {
      goToBottom();
      setDirection('up');
    }
  };
  // const {direction} = props;
  return (
    <Button
      variant="contained"
      className={classes.surfUpDownArrow}
      onClick={scroll}
    >
      <KeyboardArrowUpIcon
        sx={
          direction === 'down'
            ? {
                transform: 'rotate(180deg)',
              }
            : {
                transform: 'rotate(0deg)',
              }
        }
      />
    </Button>
  );
};

const Welcome = (props) => {
  const classes = style();
  const mobileZone = useMediaQuery(mobile_width);
  const tabZone = useMediaQuery(tab_width);
  const [direction, setDirection] = React.useState('down');
  const dispatch = useDispatch();
  const language = useSelector((state) => state.core.language);
  const location = useLocation();
  const scollToRef = useRef();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNo: '',
      role: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please type your name'),
      email: Yup.string()
        .email('Your email is not correct')
        .required('Please type your email'),
      phoneNo: Yup.number().required('Please type your phone number'),
      role: Yup.string().required('Please select the role'),
    }),
    onSubmit: (values) => {
      onContinue(values);
    },
  });

  const onContinue = (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phoneNo,
      role: values.role.toUpperCase(),
    };
    dispatch(addSubscriber(payload, formik));
  };

  const formikQuestions = useFormik({
    initialValues: {
      concerns: '',
    },
    validationSchema: Yup.object({
      concerns: Yup.string().required('Leave us your thoughts here'),
    }),
    onSubmit: (values) => {
      onContinueConcerns(values);
    },
  });

  const onContinueConcerns = (values) => {
    const payload = {
      concern: values.concerns,
    };
    dispatch(addConcernData(payload, formikQuestions));
  };

  useEffect(() => {
    // window.scrollTo(0,0);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    checkInnerHeight();
    document.documentElement.addEventListener('scroll', checkInnerHeight());
    return () => {
      // 👇️ remove event listener when the component unmounts
      document.documentElement.removeEventListener(
        'scroll',
        checkInnerHeight()
      );
    };
  }, []);

  const checkInnerHeight = () => {
    var scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
    if (scrollTop >= document.body.scrollHeight / 2) {
      setDirection('up');
    } else if (scrollTop < document.body.scrollHeight / 2) {
      setDirection('down');
    }
  };

  if (location.pathname === '/') {
    location.pathname = '/welcome';
  }

  return (
    <Grid className={classes.commonRoot} onWheel={checkInnerHeight}>
      {location.pathname === '/welcome' && (
        <Helmet>
          <title>
            {language === 'sp'
              ? 'Empleadas Domesticas y Clientes en Directo'
              : 'Empleadas Domesticas y Clientes en Directo'}
          </title>
          <meta
            name="description"
            content={
              language === 'sp'
                ? 'Buscar empleo y empleadas domesticas por hora o de planta para limpieza, nana o niñera y hacer ofertas en directo'
                : 'Buscar empleo y empleadas domesticas por hora o de planta para limpieza, nana o niñera y hacer ofertas en directo'
            }
          />
        </Helmet>
      )}
      {!tabZone && !mobileZone && (
        <TopButtomSurfer direction={direction} setDirection={setDirection} />
      )}
      <Grid container paddingTop={5} paddingBottom={5}>
        <Grid container justifyContent={'space-between'}>
          <Grid
            item
            maxWidth={
              tabZone || mobileZone ? '100% !important' : '48% !important'
            }
          >
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              className={`${classes.commonHead} ${classes.commonHeadFontSize} ${
                mobileZone && classes.mobileFontSizeHeadings
              }`}
            >
              <DummyTextPaster index={0} />
            </Typography>
            <Typography
              // // variant="h6"
              // gutterBottom
              // component="div"
              className={`${classes.commonPara} ${classes.lessPadding} ${
                mobileZone && classes.mobileFontSizeContent
              }`}
              paragraph={true}
              variant="body1"
              style={{
                whiteSpace: 'pre-line',
                textAlign: 'justify',
                marginTop: 40,
                marginBottom: 30,
              }}
            >
              <DummyTextPaster index={1} />
            </Typography>
          </Grid>
          <Grid
            item
            maxWidth={
              tabZone || mobileZone ? '100% !important' : '48% !important'
            }
          >
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              className={`${classes.commonHead} ${
                classes.changeFontSizeColor
              } ${mobileZone && classes.mobileFontSizeHeadings}`}
            >
              <DummyTextPaster index={4} />
            </Typography>
            <img
              draggable={false}
              width="70%"
              src={HomeFullImg}
              alt=""
              style={{
                marginBottom: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Box
        sx={
          mobileZone
            ? {
                paddingBottom: '100px !important',
                width: '100%',
              }
            : { width: '100%' }
        }
        paddingBottom={5}
      >
        <Grid container className={classes.welcomeRooting}>
          {[2, 3].map((parentKey) => {
            return (
              <Grid
                container
                maxWidth={
                  tabZone || mobileZone ? '100% !important' : '48% !important'
                }
                className={classes.panel}
                key={parentKey}
                sx={
                  (formik.values.role === 'customer' &&
                    parentKey === 2 && {
                      background: 'rgba(61, 153, 167, 0.08)',
                    }) ||
                  (formik.values.role === 'provider' &&
                    parentKey === 3 && {
                      background: 'rgba(61, 153, 167, 0.08)',
                    })
                }
                justifyContent="space-between"
                height={'450px'}
                flexDirection={'column'}
                flexWrap={'nowrap'}
              >
                <Grid>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className={`${classes.commonHead} ${classes.commonHeadFontSize} ${classes.mobileFontSizeHeadings}`}
                  >
                    <DummyTextPaster index={parentKey} line={0} />
                  </Typography>
                  <Typography
                    // // variant="h6"
                    // gutterBottom
                    component="div"
                    className={`${classes.commonPara} ${classes.lessPadding} ${
                      mobileZone && classes.mobileFontSizeContent
                    }`}
                    paragraph={true}
                    variant="body1"
                    style={{ whiteSpace: 'pre-line', textAlign: 'left' }}
                  >
                    <ul>
                      {Array(4)
                        .fill(1)
                        .map((key, index) => {
                          return (
                            <li>
                              <DummyTextPaster
                                index={parentKey}
                                line={index + 1}
                              />
                            </li>
                          );
                        })}
                    </ul>
                  </Typography>
                </Grid>
                <Box>
                  <LoginButton
                    label={
                      language === 'sp'
                        ? `SUSCRIBETE COMO ${
                            parentKey === 2 ? 'CLIENTE' : 'EMPLEADA DOMÉSTICA'
                          }`
                        : `Subscribe to Yazta ${parentKey === 2 ? 'MX' : 'PRO'}`
                    }
                    styles={
                      mobileZone
                        ? {
                            padding: '10px 2px !important',
                            fontSize: '14px !important',
                            lineHeight: '22px !important',
                            width: '100%',
                          }
                        : { width: '100%' }
                    }
                    onClick={() => {
                      formik.setFieldValue(
                        'role',
                        parentKey === 2 ? 'customer' : 'provider'
                      );
                      setTimeout(() => {
                        scollToRef.current.scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                          inline: 'start',
                        });
                      }, 100);
                    }}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box
        ref={scollToRef}
        sx={
          formik.values.role
            ? { width: '100%', display: 'block' }
            : { width: '100%', display: 'none' }
        }
        paddingBottom={5}
      >
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          className={`${classes.commonHead} ${classes.commonHeadFontSize} ${
            mobileZone && classes.mobileFontSizeHeadings
          }`}
        >
          Subscribe
        </Typography>
        <Grid container className={classes.loginRoot}>
          <Grid item xs={12} md={5} className={classes.leftPanel}>
            <img draggable={false} src={SubscribeImg} alt="" width="100%" />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className={`${classes.rightPanel} ${
              mobileZone && classes.mobileFontSizeContent
            }`}
          >
            <Box>
              <TextInput
                name="name"
                color="secondary"
                label={
                  language === 'sp'
                    ? 'NOMBRE Y APELLIDO'
                    : 'NAME'
                }
                type="text"
                id="name"
                value={formik.values.name}
                required={true}
                error={formik.errors.name ? true : false}
                errorText={formik.errors.name && formik.errors.name}
                onChange={formik.handleChange}
              />
            </Box>
            <Box>
              <PhoneInput
                placeholder={
                  language === 'sp'
                    ? 'NUMERO DE CELULAR * (codigo del pais mas 10 digitos)'
                    : 'MOBILE NU WITH COUNTRY CODE *'
                }
                id="phoneNo"
                name="phoneNo"
                value={formik.values.phoneNo}
                required={true}
                onChange={(value) => formik.setFieldValue('phoneNo', value)}
                className={classes.phoneInput}
              />
            </Box>            
            <Box>
              <TextInput
                name="email"
                label="email"
                type="email"
                id="email"
                value={formik.values.email}
                required={true}
                error={formik.errors.email ? true : false}
                errorText={formik.errors.email}
                onChange={formik.handleChange}
              />
            </Box>
            <Box paddingTop={4} paddingBottom={4}>
              <LoginButton
                label={
                  language === 'sp'
                    ? `SUSCRIBETE COMO ${
                        formik.values.role === 'provider'
                          ? 'EMPLEADA DOMÉSTICA'
                          : 'CLIENTE'
                      }`
                    : `Subscribe to Yazta ${
                        formik.values.role === 'provider' ? 'PRO' : 'MX'
                      }`
                }
                styles={
                  mobileZone
                    ? {
                        padding: '10px 2px !important',
                        fontSize: '14px !important',
                        lineHeight: '22px !important',
                        width: '100%',
                      }
                    : { width: '100%' }
                }
                onClick={() => {
                  formik.submitForm();
                  // formik.resetForm();
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container>
        <Grid container justifyContent={'space-between'}>
          <Grid
            item
            maxWidth={
              tabZone || mobileZone ? '100% !important' : '100% !important'
            }
          >
            <Typography
              className={`${classes.commonPara} ${classes.lessPadding} ${
                mobileZone && classes.mobileFontSizeContent
              } ${mobileZone && classes.mobileMarginTop}`}
              paragraph={true}
              variant="body1"
              style={{
                whiteSpace: 'pre-line',
                textAlign: 'justify',
                marginTop: 20,
                marginBottom: 40,
              }}
            >
              <DummyTextPaster index={5} />
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8}>
          <Box>
            <TextInput
              name="concerns"
              color="secondary"
              label={
                language === 'sp'
                  ? 'DINOS LO QUE PIENSAS'
                  : 'Leave us your thoughts here'
              }
              type="text"
              id="concerns"
              value={formikQuestions.values.concerns}
              required={true}
              error={formikQuestions.errors.concerns ? true : false}
              errorText={formikQuestions.errors.concerns}
              onChange={formikQuestions.handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={4}>
          <Box paddingTop={4} paddingBottom={4}>
            <LoginButton
              label={'Submit'}
              styles={
                mobileZone
                  ? {
                      fontSize: '17px !important',
                      width: '100%',
                    }
                  : { width: '100%' }
              }
              onClick={() => {
                formikQuestions.submitForm();
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </Grid>
  );
};

export default Welcome;
