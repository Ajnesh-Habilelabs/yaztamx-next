import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Rocket from '../../assets/images/rocket.svg';
import Support from '../../assets/images/support.svg';
import Coffee from '../../assets/images/message-group-chat.svg';
import Freelancers from '../../assets/images/freelancers.svg';
import Clients from '../../assets/images/clients.svg';
import Agencies from '../../assets/images/agencies.svg';
import { useNavigate } from 'react-router-dom';
import style from './style';
import { useSelector, useDispatch } from 'react-redux';

import {getForumCategories} from '../../../../../libs/store/src/api/forums/action'

const Categories = () => {
  const classes = style();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const dataFromStore = useSelector((state) => state.forums)
  // console.log("dataFromStore =", dataFromStore)
  const data = dataFromStore.categories

  const URL = 'https://vast.be.habilelabs.com';

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getProviderData();
  }, []);

  const getProviderData = () => {
    // console.log('executing');
    dispatch(getForumCategories());
    // console.log('executed');
  };


  // const data = [
  //   {
  //     id: 6,
  //     title: 'Current offers',
  //     description: 'Browse and compare job opportunities',
  //     published_at: '2022-05-30T14:32:47.412Z',
  //     created_at: '2022-05-30T14:32:42.469Z',
  //     updated_at: '2022-07-11T07:39:56.825Z',
  //     position: 1,
  //     icon: {
  //       id: 19,
  //       name: 'jobs.svg',
  //       alternativeText: '',
  //       caption: '',
  //       width: 85,
  //       height: 85,
  //       formats: null,
  //       hash: 'jobs_1c0100f32b',
  //       ext: '.svg',
  //       mime: 'image/svg+xml',
  //       size: 9.2,
  //       url: '/uploads/jobs_1c0100f32b.svg',
  //       previewUrl: null,
  //       provider: 'local',
  //       provider_metadata: null,
  //       created_at: '2022-07-11T07:39:29.607Z',
  //       updated_at: '2022-07-11T07:39:29.629Z',
  //     },
  //   },
  //   {
  //     id: 2,
  //     title: 'Client Q&A',
  //     description:
  //       'For Clients. All you want to as and share about household services',
  //     published_at: '2022-05-30T14:31:01.906Z',
  //     created_at: '2022-05-30T14:30:57.897Z',
  //     updated_at: '2022-07-11T07:40:08.674Z',
  //     position: 2,
  //     icon: {
  //       id: 20,
  //       name: 'qa.svg',
  //       alternativeText: '',
  //       caption: '',
  //       width: 113,
  //       height: 85,
  //       formats: null,
  //       hash: 'qa_c4aebf6f53',
  //       ext: '.svg',
  //       mime: 'image/svg+xml',
  //       size: 10.82,
  //       url: '/uploads/qa_c4aebf6f53.svg',
  //       previewUrl: null,
  //       provider: 'local',
  //       provider_metadata: null,
  //       created_at: '2022-07-11T07:39:29.611Z',
  //       updated_at: '2022-07-11T07:39:29.629Z',
  //     },
  //   },
  //   {
  //     id: 3,
  //     title: 'Provider Q&A',
  //     description:
  //       'For Providers. All you want to ask and share about getting a job',
  //     published_at: '2022-05-30T14:31:29.338Z',
  //     created_at: '2022-05-30T14:31:25.747Z',
  //     updated_at: '2022-07-11T07:41:03.168Z',
  //     position: 3,
  //     icon: {
  //       id: 20,
  //       name: 'qa.svg',
  //       alternativeText: '',
  //       caption: '',
  //       width: 113,
  //       height: 85,
  //       formats: null,
  //       hash: 'qa_c4aebf6f53',
  //       ext: '.svg',
  //       mime: 'image/svg+xml',
  //       size: 10.82,
  //       url: '/uploads/qa_c4aebf6f53.svg',
  //       previewUrl: null,
  //       provider: 'local',
  //       provider_metadata: null,
  //       created_at: '2022-07-11T07:39:29.611Z',
  //       updated_at: '2022-07-11T07:39:29.629Z',
  //     },
  //   },
  //   {
  //     id: 4,
  //     title: 'Ideas (Providers)',
  //     description: 'Ideas how to provide better service',
  //     published_at: '2022-05-30T14:31:56.060Z',
  //     created_at: '2022-05-30T14:31:52.196Z',
  //     updated_at: '2022-07-11T07:40:53.802Z',
  //     position: 4,
  //     icon: {
  //       id: 18,
  //       name: 'ideas.svg',
  //       alternativeText: '',
  //       caption: '',
  //       width: 85,
  //       height: 85,
  //       formats: null,
  //       hash: 'ideas_8717d6b3de',
  //       ext: '.svg',
  //       mime: 'image/svg+xml',
  //       size: 2.56,
  //       url: '/uploads/ideas_8717d6b3de.svg',
  //       previewUrl: null,
  //       provider: 'local',
  //       provider_metadata: null,
  //       created_at: '2022-07-11T07:39:29.580Z',
  //       updated_at: '2022-07-11T07:39:29.611Z',
  //     },
  //   },
  //   {
  //     id: 5,
  //     title: 'Ideas (Clients)',
  //     description: 'Ideas how to receive better service ',
  //     published_at: '2022-05-30T14:32:20.655Z',
  //     created_at: '2022-05-30T14:32:15.637Z',
  //     updated_at: '2022-07-11T07:40:42.728Z',
  //     position: 5,
  //     icon: {
  //       id: 18,
  //       name: 'ideas.svg',
  //       alternativeText: '',
  //       caption: '',
  //       width: 85,
  //       height: 85,
  //       formats: null,
  //       hash: 'ideas_8717d6b3de',
  //       ext: '.svg',
  //       mime: 'image/svg+xml',
  //       size: 2.56,
  //       url: '/uploads/ideas_8717d6b3de.svg',
  //       previewUrl: null,
  //       provider: 'local',
  //       provider_metadata: null,
  //       created_at: '2022-07-11T07:39:29.580Z',
  //       updated_at: '2022-07-11T07:39:29.611Z',
  //     },
  //   },
  //   {
  //     id: 1,
  //     title: 'General Discussion',
  //     description: 'Open conversation about household services',
  //     published_at: '2022-05-30T14:30:26.445Z',
  //     created_at: '2022-05-30T14:30:22.325Z',
  //     updated_at: '2022-07-11T07:40:20.810Z',
  //     position: 6,
  //     icon: {
  //       id: 21,
  //       name: 'discussions.svg',
  //       alternativeText: '',
  //       caption: '',
  //       width: 113,
  //       height: 85,
  //       formats: null,
  //       hash: 'discussions_f03a99b123',
  //       ext: '.svg',
  //       mime: 'image/svg+xml',
  //       size: 13.7,
  //       url: '/uploads/discussions_f03a99b123.svg',
  //       previewUrl: null,
  //       provider: 'local',
  //       provider_metadata: null,
  //       created_at: '2022-07-11T07:39:29.843Z',
  //       updated_at: '2022-07-11T07:39:29.849Z',
  //     },
  //   },
  // ];
  // const data = [
  //   {
  //     id: 0,
  //     image: Rocket,
  //     title: 'New to Yazta',
  //     description: 'Best practices, tips, and advice from your peers',
  //   },
  //   {
  //     id: 1,
  //     image: Support,
  //     title: 'Support',
  //     description:
  //       'Solutions and workarounds for the most common account-related issues',
  //   },
  //   {
  //     id: 2,
  //     image: Coffee,
  //     title: 'Coffee Break',
  //     description:
  //       'Explore topics ranging from work/life balance to interests, and more!',
  //   },
  //   {
  //     id: 3,
  //     image: Freelancers,
  //     title: 'Freelancers',
  //     description: 'Connect with fellow freelancers around the Yazta platform.',
  //   },
  //   {
  //     id: 4,
  //     image: Clients,
  //     title: 'Clients',
  //     description:
  //       'Gain insight and best practices from fellow clients on Yazta',
  //   },
  //   {
  //     id: 5,
  //     image: Agencies,
  //     title: 'Agencies',
  //     description:
  //       'Connect with fellow agency owners and members to share advice.',
  //   },
  // ];

  return (
    <Grid container spacing={4} paddingTop={8} className={classes.container}>
      {data.map((item) => (
        <Grid item sm={6} md={3.5} key={item.id}>
          <Box
            className={classes.offersCardUi}
            onClick={() =>
              navigate(`/discussion`, { state: { categoryId: item?.id } })
            }
          >
            <Grid container className={classes.card}>
              <Grid item sm={12}>
                <img draggable={false} src={URL + item.icon.url} alt="" />
              </Grid>
              <Grid item sm={12}>
                <Typography className={classes.title}>{item.title}</Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography className={classes.subTitle}>
                  {item.description}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
