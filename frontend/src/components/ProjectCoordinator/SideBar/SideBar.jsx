import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GradeIcon from '@mui/icons-material/Grade';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReportIcon from '@mui/icons-material/Report';
import ArticleIcon from '@mui/icons-material/Article';
import TocIcon from '@mui/icons-material/Toc';
import GroupIcon from '@mui/icons-material/Group';


const drawerWidth = 365;

const Sidebar = ({ handleNavigation }) => {
    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/coodinatorDashboard' },
        { text: 'Assessments', icon: <AssessmentIcon />, path: '/Assessments' },
        { text: 'MarkSheets', icon: <GradeIcon />, path: '/MarkSheet' },
        { text: 'Presentations', icon: <SlideshowIcon />, path: '/Presentations' },
        { text: 'Projects', icon: <AssignmentIcon />, path: '/Projects' },
        { text: 'Reports', icon: <ReportIcon />, path: '/Reports' },
        { text: 'Research Papers', icon: <ArticleIcon />, path: '/ResearchPapers' },
        { text: 'Rubric', icon: <TocIcon />, path: '/Rubric' },
        { text: 'Teams', icon: <GroupIcon />, path: '/Teams' },
      ];

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    top: '120px', // Adjust to the height of the AppBar
                    height: `calc(100% - 64px)` // Adjust to the height of the AppBar
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text} onClick={() => handleNavigation(item.path)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
