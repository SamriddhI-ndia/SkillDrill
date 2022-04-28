import * as React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/system';
import { ThemeProvider } from '@mui/private-theming';
import QuizIcon from '@mui/icons-material/Quiz';
const Theme = createTheme({
  overrides: {
    TimelineItem: {
      missingOppositeContent: {
        "&:before": {
          display: "none"
        }
      }
    },
    TimelineContent:{
      width: "500px"
    }
  }
});
export default function CustomizedTimeline() {
  return (
  <ThemeProvider theme={Theme}>
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
                <DateRangeRoundedIcon />
            </TimelineDot>
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className='timeline-content' sx={{ py: '100px', px: 2 }}>
            <Typography variant="h6" component="span">
                Schedule Interview
            </Typography>
            <Typography>Because it&apos;s awesome!</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent className='timeline-content'
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
            <Typography variant="h6" component="span">
             Pair Up
            </Typography>
            <Typography>Because you need strength</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
                <ConnectWithoutContactRoundedIcon />
            </TimelineDot>
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>    
        </TimelineContent>
      </TimelineItem>
      <TimelineItem> 
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <HotelIcon />
          </TimelineDot>
          <TimelineConnector className='timeline-content' sx={{ bgcolor: 'secondary.main' }} />   
        </TimelineSeparator>
        <TimelineContent className='timeline-content' sx={{ py: '12px', px: 2 }}>
        <Typography variant="h6" component="span">
            Give Permissions
          </Typography>
          <Typography>Because you need rest</Typography>
          </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent className='timeline-content'
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          <Typography variant="h6" component="span">
            Ask Questions
          </Typography>
          <Typography>Because you need strength</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          <TimelineDot color="secondary">
            <QuizIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>     
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>     
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <RateReviewIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />         
        </TimelineSeparator>
        <TimelineContent className='timeline-content' sx={{ py: '50px', px: 4 }}>
        <Typography variant="h6" component="span">
            Give Feedback
          </Typography>
          <Typography>Because you need rest</Typography>
          </TimelineContent>
      </TimelineItem>
    </Timeline>
    </ThemeProvider>
  );
}
