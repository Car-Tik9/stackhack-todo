import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useMediaQuery } from '@material-ui/core'
import classNames from 'classnames'

import SideBar from './components/SideBar'
import TopBar from './components/TopBar'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 68
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  })
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  }
  const handleSidebarClose = () => {
    setOpenSidebar(false);
  }

  const shouldOpenSidebar = isDesktop ? true : openSidebar;
  return (
    <div className={classNames({
      [classes.root]: true,
      [classes.shiftContent]: isDesktop
    })}>
      <TopBar onSidebarOpen={handleSidebarOpen}></TopBar>
      <SideBar onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}></SideBar>
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
}

export default Main