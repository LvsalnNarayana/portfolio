import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import Typography from '@mui/material/Typography'
import WorkIcon from '@mui/icons-material/Work' // Using a generic work icon
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Container, Divider } from '@mui/material'

const experiences = [
  {
    role: 'Java Developer',
    company: 'Cogniverse Labs',
    duration: 'Sep 2025 – Present',
    points: [
      'Built scalable microservices using Java & Spring Boot for telecom platform',
      'Designed REST APIs with Swagger; improved integration efficiency',
      'Integrated legacy CRM systems reducing latency',
      'Implemented secure middleware using IBM MQ & DataPower',
    ],
  },
  {
    role: 'Frontend Engineer',
    company: 'Cogniverse Labs',
    duration: 'Aug 2024 – Feb 2025',
    points: [
      'Built 25+ reusable React components across 20+ modules',
      'Improved CRM performance by 30%',
      'Developed real-time AI dashboard for Kumbh Mela 2025',
      'Optimized Redux & rendering performance',
    ],
  },
  {
    role: 'Frontend Engineer',
    company: 'i13 Ventures',
    duration: 'Oct 2023 – Apr 2024',
    points: [
      'Architected frontend for AI business intelligence platform',
      'Built BFF layer reducing API latency by 35%',
      'Developed real-time chat & visualization system',
      'Integrated Stripe & Clerk authentication systems',
    ],
  },
  {
    role: 'Frontend Engineer',
    company: 'f1Studioz',
    duration: 'Jan 2022 – Jul 2022',
    points: [
      'Built Angular data visualization platform',
      'Created reusable component library (+30% efficiency)',
      'Developed real-time dashboards with API integrations',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'EC-Council',
    duration: 'Aug 2020 – Jan 2022',
    points: [
      'Improved PageSpeed from 65 → 96',
      'Reduced load time by 50% and increased traffic by 40%',
      'Built responsive UI using WordPress & Webflow',
    ],
  },
]

export default function Experience() {
  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh", py: 4 }} id="experience">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        My Professional Journey
      </Typography>
      <Timeline position="alternate">
        {experiences.map((experience, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align={index % 2 === 0 ? 'right' : 'left'} // Alternate alignment for opposite content
              variant="body2"
              color="text.secondary"
              fontWeight={600}
            >
              {experience.duration}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <WorkIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="h6" component="span">
                {experience.role}
              </Typography>
              <Typography sx={{ mb: 2 }}>
                {experience.company}
              </Typography>
              <List sx={{
                listStyleType: 'disc',
                pl: 3,                    // indent bullets
                m: 0,
                '& .MuiListItem-root': {
                  display: 'list-item',
                  listStyleType: 'disc',
                  py: 0.4,
                  px: 0,
                },
              }}>
                {experience.points.map((point, pointIndex) => (
                  <ListItem key={pointIndex} sx={{ py: 0, px: 0 }}>
                    <ListItemText primary={`${point}`} sx={{ m: 0 }} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ mt: 2 }} />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  )
}