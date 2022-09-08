import React, { Component } from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import GroupIcon from '@mui/icons-material/Group';

export default class NavigationBar extends Component {

  render() {

    const iconArray = [
      <HomeIcon/>, <AccountBoxIcon/>, <TheaterComedyIcon/>,<GroupIcon/>
      ];
    return (
      <div>
        <h1>Hello</h1>
        <Drawer
            anchor={"left"}
            open={true}
            onClose={null}
          >
        <List>
        {['Home', 'Profile', 'Friends', 'Match'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{iconArray[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Drawer>
      </div>
    )
  }
}
