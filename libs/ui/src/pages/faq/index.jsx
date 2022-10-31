/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import style from './style';
import FAQImg from './../../assets/images/faq-img.svg';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Pagination from '@mui/material/Pagination';
import { getFaqContent } from '../../../../store/src/api/core/action';
import { useDispatch, useSelector } from 'react-redux';

const FAQ = () => {
  const classes = style();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.core.language);

  React.useEffect(() => {
    dispatch(getFaqContent(language !== '' ? language : 'sp'));
  }, [language]);

  const faqList = useSelector((state) => state.core.faqList);

  return (
    <>
      <Grid container className={classes.commonRoot} alignItems="center">
        <Grid item sm={5} paddingBottom={12} paddingTop={5}>
          <img draggable={false} src={FAQImg} alt="profile-icon" />
        </Grid>
        <Grid item sm={7} alignItems="center">
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            className={classes.innerHeading}
          >
            FAQ
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Box className={classes.accordianSection}>
            {faqList &&
              faqList.map((item, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
          </Box>
          {/* <Grid
            paddingBottom={8}
            paddingTop={15}
            className={classes.paginationUI}
          >
            <Pagination count={10} showFirstButton showLastButton />
          </Grid> */}
        </Grid>
      </Grid>
    </>
  );
};

export default FAQ;
