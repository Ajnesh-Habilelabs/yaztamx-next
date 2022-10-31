/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './style';
import { Modal, Box, Grid, Typography } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SnackbarComponent from '../../../utils/snackbarComponent';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import LoginButton from '../../../components/atoms/button';
import {
  declineProviderOffer,
  terminateProviderOffer,
} from '../../../../../../libs/store/src/api/booking/action';
import { useNavigate } from 'react-router-dom';
import SkillArrayDesign from 'libs/ui/src/utils/skillArrayDesign';
import ConfirmModal from '.';

const ViewBookingModal = (props) => {
  const classes = style();
  const navigate = useNavigate();
  const { open, setOpen, data } = props;
  // const { data, commentId } = commentData;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  const [canTerminate, setCanTerminate] = React.useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = React.useState(false);
  const [confirmModalData, setConfirmModalData] = React.useState({});
  const [openErrorBox, setOpenErrorBox] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const calculateDays = (from_date, to_date, open_ended) => {
    if (open_ended) {
      return '-';
    } else {
      let days =
        (new Date(to_date) - new Date(from_date)) / 60 / 60 / 24 / 1000;
      let numDays = days + 1;
      return `${numDays} days`;
    }
  };

  const calculateHours = (from_time, to_time) => {
    let today_date = new Date().getDate();
    let today_month = new Date().getMonth();
    let today_year = new Date().getFullYear();
    let startTime = new Date(
      `${today_year}-${today_month}-${today_date} ${from_time}`
    );
    let endTime = new Date(
      `${today_year}-${today_month}-${today_date} ${to_time}`
    );
    let hours = parseInt((endTime - startTime) / 60 / 60 / 100) / 10;
    return `${hours} hours`;
  };

  const calculateMonths = (from_date, to_date, open_ended) => {
    if (open_ended) {
      return `-`;
    } else {
      let months = Math.round(
        (new Date(to_date) - new Date(from_date)) / (60 * 60 * 24 * 30 * 1000)
      );
      return months;
    }
  };
  const calculateWeeks = (from_date, to_date, open_ended) => {
    // if (to_date === null) return `-`;
    if (open_ended) {
      return '-';
    } else {
      let weeks = Math.round(
        (new Date(to_date).getDate() - new Date(from_date).getDate()) / 7
      );
      return weeks;
    }
  };
  const renderWeekORDates = (data) => {
    let parsedData = JSON.parse(data);
    let stringData = parsedData.join();
    stringData = String(stringData).replaceAll(',', ', ');
    return stringData;
  };
  const onChat = () => {
    console.log('chating');
    const clientId = data?.offered_by.id;
    const providerId = data?.offered_to.id;
    if (providerId && clientId) {
      const roomId = `f${clientId}t${providerId}`;
      navigate('/inbox/chat', {
        state: {
          roomId: roomId ? roomId : '',
          clientId: clientId,
          providerId: providerId,
        },
      });
    } else {
      setErrorMessage('Please refresh once and try again.');
      setOpenErrorBox(true);
    }
  };
  const onDecline = (jobOfferId, jobStatus) => {
    console.log('declining', jobOfferId, jobStatus);
    dispatch(declineProviderOffer(jobOfferId, jobStatus, userId, setOpen));
  };
  const onTerminate = (jobOfferId, jobStatus) => {
    console.log('declining', jobOfferId, jobStatus);
    // if (!confirm('Are you sure you want to terminate this offer?')) return;
    setConfirmModalData({
      message: 'Are you sure you want to terminate this offer?',
      object: {
        type: 'execute',
        executeWhat: 'terminate-offer',
        jobOfferId: jobOfferId,
        jobStatus: jobStatus,
        userId,
        userId,
        setOpenModal: setOpen,
        providerId: data?.offered_to,
        method: terminateProviderOffer,
      },
    });
    setConfirmModalOpen(true);
    // dispatch(
    //   terminateProviderOffer(
    //     jobOfferId,
    //     jobStatus,
    //     userId,
    //     setOpen,
    //     navigate,
    //     data.offered_to
    //   )
    // );
  };
  useEffect(() => {
    if (new Date() > new Date(`${data?.from_date} ${data?.from_time}`)) {
      if (data?.job_status === 'ACCEPTED' || data?.job_status === 'STARTED') {
        setCanTerminate(true);
      } else {
        setCanTerminate(false);
      }
    } else {
      setCanTerminate(false);
    }
  }, [data]);
  return (
    <>
      <SnackbarComponent
        open={openErrorBox}
        setOpen={setOpenErrorBox}
        message={errorMessage}
        setMessage={setErrorMessage}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 1, border: 'unset' }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: 'fit-content',
            bgcolor: '#fefbf8',
            boxShadow: 24,
            p: 2,
            borderRadius: '10px',
            outline: 'unset',
          }}
        >
          <HighlightOffRoundedIcon
            onClick={handleClose}
            className={classes.closeModalButton}
          />
          <Grid
            container
            // marginTop={4}
            // marginBottom={4}
            paddingLeft={0}
            paddingRight0
            className={`${classes.summarySection}`}
          >
            {/* <Grid item sm={12}>
            <Typography
              variant="h6"
              component="div"
              className={`${classes.searchResult} ${classes.topBdr} ${classes.dateAndLength}`}
            >
              Date And Length Of Booking
            </Typography>
          </Grid> */}
            <Grid
              item
              sm={12}
              className={`${classes.weeksHeadWith} ${classes.startDateAndTime}`}
            >
              <DateRangeIcon className={classes.dateSvgBg} />
              <Typography
                variant="h6"
                component="div"
                color={'#707070'}
                className={`${classes.dateTime} ${classes.weeksTouchHead} ${classes.headColText}`}
              >
                Start Date :- {data.from_date || data.commute_date}
                <br />
                {data.arrangement_type !== 'LIVEIN' && (
                  <>
                    {data?.from_time &&
                      data?.to_time &&
                      `${data?.from_time} to ${data?.to_time}`}
                    <br />
                  </>
                )}
                {data?.to_date &&
                  data?.open_ended_contract &&
                  ` End Date :- ${data?.to_date}`}
              </Typography>
              <div></div>
            </Grid>
            <Grid
              item
              sm={12}
              className={`${classes.weeksHeadWith} ${classes.startDateAndTime}`}
            >
              <LocationOnOutlinedIcon className={classes.dateSvgBg} />
              <Typography
                variant="h6"
                component="div"
                color={'#707070'}
                className={`${classes.dateTime} ${classes.weeksTouchHead} ${classes.headColText}`}
              >
                {data?.offered_by?.address1
                  ? data?.offered_by?.address1 + ', '
                  : ''}
                {data?.offered_by?.address2 || ''}
                {((data?.offered_by?.address1 ||
                  data?.offered_by?.address2) && <br />) ||
                  ''}
                {data?.offered_by?.address3_city
                  ? String(data?.offered_by?.address3_city).replace(' ', '') +
                    ', '
                  : ''}
                {data?.offered_by?.address4_state
                  ? String(data?.offered_by?.address4_state).replace(' ', '')
                  : ''}
              </Typography>
              <div></div>
            </Grid>
            {/* <Grid item sm={12}>
            <Typography
              variant="h6"
              component="div"
              className={`${classes.searchResult} ${classes.topBdr} ${classes.dateAndLength}`}
            >
              Rate and Length of Engagement
            </Typography>
          </Grid> */}
            <Grid item sm={12}>
              {data?.arrangement_type === 'COMMUTE' &&
                data?.commute_type === 'RECURRING' && (
                  <>
                    <Grid container className={classes.topBdr}>
                      <Grid item sm={12} md={4} pb={2} pt={2}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          component="div"
                          className={classes.headColText}
                        >
                          ARRANGEMENT TYPE
                        </Typography>
                        <Typography
                          variant="h6"
                          component="div"
                          className={classes.headColSubText}
                        >
                          {data?.arrangement_type
                            ? data?.arrangement_type
                            : '0'}{' '}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        sm={12}
                        md={4}
                        pb={2}
                        pt={2}
                        className={classes.addLeftRightBder}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          component="div"
                          className={classes.headColText}
                        >
                          COMMUTE TYPE
                        </Typography>

                        <Typography
                          variant="h6"
                          component="div"
                          className={classes.headColSubText}
                        >
                          {data?.commute_type ? data?.commute_type : ''}
                        </Typography>
                      </Grid>
                      <Grid item sm={12} md={4} pb={2} pt={2}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          component="div"
                          className={classes.headColText}
                        >
                          RECURRING DURATION
                        </Typography>
                        <Typography
                          variant="h6"
                          component="div"
                          className={classes.headColSubText}
                        >
                          {data?.recurring_duration
                            ? data?.recurring_duration
                            : ''}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container className={classes.topBdr}>
                      <Grid item sm={12} md={4} pb={2} pt={2}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          component="div"
                          className={classes.headColText}
                        >
                          SKILL
                        </Typography>
                        <Typography
                          variant="h6"
                          component="div"
                          className={classes.headColSubText}
                        >
                          <SkillArrayDesign arrayString={data?.skill} />
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        sm={12}
                        md={4}
                        pb={2}
                        pt={2}
                        className={classes.addLeftRightBder}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          component="div"
                          className={classes.headColText}
                        >
                          {data?.recurring_duration === 'Daily' && 'DAYS'}
                          {data?.recurring_duration === 'Monthly' && 'MONTHS'}
                          {data?.recurring_duration === 'Weekly' && 'WEEKS'}
                        </Typography>

                        <Typography
                          variant="h6"
                          component="div"
                          className={classes.headColSubText}
                        >
                          {/* {data?.days ? data?.days : '-'} */}
                          {data?.recurring_duration === 'Daily' &&
                            calculateDays(
                              data?.from_date,
                              data?.to_date,
                              data?.open_ended_contract
                            )}
                          {data?.recurring_duration === 'Monthly' &&
                            calculateMonths(
                              data?.from_date,
                              data?.to_date,
                              data?.open_ended_contract
                            )}
                          {data?.recurring_duration === 'Weekly' &&
                            calculateWeeks(
                              data?.from_date,
                              data?.to_date,
                              data?.open_ended_contract
                            )}
                        </Typography>
                      </Grid>
                      <Grid item sm={12} md={4} pb={2} pt={2}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          component="div"
                          className={classes.headColText}
                        >
                          NUMBER OF HOURS
                        </Typography>
                        <Typography
                          variant="h6"
                          component="div"
                          className={classes.headColSubText}
                        >
                          {calculateHours(data?.from_time, data?.to_time)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                )}

              <Grid container>
                <Grid item sm={12} md={4} pt={2} pb={2}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className={classes.headColText}
                  >
                    AGREED UPON RATE
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    className={classes.headColSubText}
                  >
                    {data?.arrangement_type === 'LIVEIN'
                      ? `M$ ${
                          data?.weekly_rate ? data?.weekly_rate : '0'
                        } /week`
                      : `M$ ${data?.hourly_rate ? data?.hourly_rate : '0'} /hr`}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={12}
                  md={4}
                  pt={2}
                  className={classes.addLeftRightBder}
                  pb={2}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className={classes.headColText}
                  >
                    {data?.arrangement_type === 'LIVEIN' ? (
                      'LENGTH OF ENGAGEMENT'
                    ) : (
                      <>
                        {(data?.recurring_duration === 'Daily' ||
                          data?.commute_type === 'ONEOFF') &&
                          'LENGTH OF ENGAGEMENT'}
                        {data?.recurring_duration === 'Monthly' &&
                          'DATES OF ENGAGEMENT'}
                        {data?.recurring_duration === 'Weekly' &&
                          'DAYS OF ENGAGEMENT'}
                      </>
                    )}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    className={classes.headColSubText}
                  >
                    {data?.arrangement_type === 'LIVEIN' ? (
                      calculateDays(
                        data?.from_date,
                        data?.to_date,
                        data?.open_ended_contract
                      )
                    ) : (
                      <>
                        {(data?.recurring_duration === 'Daily' ||
                          data?.commute_type === 'ONEOFF') &&
                          calculateHours(data?.from_time, data?.to_time)}
                        {data?.recurring_duration === 'Monthly' &&
                          renderWeekORDates(data?.recurring_date_days)}
                        {data?.recurring_duration === 'Weekly' &&
                          renderWeekORDates(data?.recurring_date_days)}
                      </>
                    )}
                  </Typography>
                </Grid>
                <Grid item sm={12} md={4} pt={2} pb={2}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    // className={classes.headColText}
                    className={classes.headColText}
                  >
                    {data?.open_ended_contract
                      ? `TYPE OF CONTRACT`
                      : `TOTAL PAYOUT`}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    // className={classes.headColSubText}
                    className={classes.headColSubText}
                  >
                    {data?.open_ended_contract
                      ? 'Open Ended Contract'
                      : `M$ ${data?.total_payout}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            pt={2}
            sx={{ justifyContent: 'center', flexWrap: 'nowrap', gap: '20px' }}
          >
            <Grid item sm={12} md={12} className={`${classes.chatBtn}`}>
              <LoginButton label="Chat for more details" onClick={onChat} />
            </Grid>
            {(data?.job_status === 'ACCEPTED' ||
              data?.job_status === 'NEW') && (
              <>
                <Grid item sm={12} md={12} className={`${classes.declineBtn}`}>
                  <LoginButton
                    label="Decline Offer"
                    onClick={() => onDecline(data?.id, data?.job_status)}
                  />
                </Grid>
                {data?.open_ended_contract && canTerminate && (
                  <Grid
                    item
                    sm={12}
                    md={12}
                    className={`${classes.declineBtn}`}
                  >
                    <LoginButton
                      label="Terminate Offer"
                      onClick={() => onTerminate(data?.id, data?.job_status)}
                    />
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Box>
      </Modal>

      <ConfirmModal
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        data={confirmModalData}
        setData={setConfirmModalData}
      />
    </>
  );
};

export default ViewBookingModal;
