import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import useMediaQuery from '@mui/material/useMediaQuery';
import deptLogo from './images/Madras_Institute_of_Technology_logo.png'
import aulogo from './images/anna-university-logo.png'
import { Bloodtype } from '@mui/icons-material';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    </Menu>
  );
  const matches = useMediaQuery('(min-width:600px)');
  const matches1 = useMediaQuery('(max-width:839px)');
  const matches2 = useMediaQuery('max-width:599');
  if (matches) {
    return (
      <span>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ height: 100, display: "flex", justifyContent: "center", alignItems: "center", }}>
            <Toolbar sx={{ justifyContent: 'center', }}>
              <img src={deptLogo} alt="Department Logo" style={{ width: '80px', height: '70px', marginRight: '30px' }} />
              <Typography
                variant="h4"
                noWrap
                component="div"

                sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: '500', fontSize: "2.5vw" }}
              >
                MADRAS INSTITUTE OF TECHNOLOGY
              </Typography>
              <img src={aulogo} alt="AU Logo" style={{ width: '80px', height: '70px', marginLeft: '30px' }} />
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
        {/* {`(min-width:600px) matches: ${matches}`} */}
      </span>
    );
  }
  else {
    return (
      <span>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ height: 80 }} style={{ background: 'red !important' }}>
            <Toolbar sx={{ justifyContent: 'center', margin: 1, fontSize: "2vw" }}>
              <img src={deptLogo} alt="Department Logo" style={{ width: '80px', height: '70px', marginRight: '30px' }} />
              <Typography
                noWrap
                component="div"
                sx={{ fontWeight: '200', fontSize: "2vw" }}
              >
                MADRAS INSTITUTE OF TECHNOLOGY
              </Typography>
              <img src={aulogo} alt="AU Logo" style={{ width: '80px', height: '70px', marginLeft: '30px' }} />

            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </span>
    );
  }

}