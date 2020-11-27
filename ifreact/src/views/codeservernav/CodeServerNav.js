import React from 'react'
import CIcon from '@coreui/icons-react'
import { brandSet } from '@coreui/icons'
import { CButton } from '@coreui/react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LandscapeIcon from '@material-ui/icons/Landscape';
import StorageIcon from '@material-ui/icons/Storage';

const currentDomain = window.location.hostname
const localDomainMap = {
  'localhost': true,
  '192.168.25.5': true,
  '172.16.60.200': true,
  '172.16.60.2': true,
}

function CodeServerItem(prop) {
  const ref = "https://" + currentDomain + ":" + (localDomainMap[currentDomain] ? prop.internalPort : prop.externalPort)

  return (
    <CButton color="dark" href={ref} target="_blank" rel="noopener noreferrer">
      {prop.icon}
      &nbsp;&nbsp;&nbsp;{prop.name}
    </CButton>
  )
}

export default function CodeServerNav() {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CodeServerItem name="InteractionFreePy" internalPort="18001" externalPort="2401" icon={<CIcon content={brandSet.cibPython} />}></CodeServerItem>
          </Grid>
          <Grid item xs={12}>
            <CodeServerItem name="InteractionFreeScala" internalPort="18002" externalPort="2402" icon={<CIcon content={brandSet.cibScala} />}></CodeServerItem>
          </Grid>
          <Grid item xs={12}>
            <CodeServerItem name="InteractionFreeJS" internalPort="18003" externalPort="2403" icon={<CIcon content={brandSet.cibNodeJs} />}></CodeServerItem>
          </Grid>
          <Grid item xs={12}>
            <CodeServerItem name="Storage" internalPort="18004" externalPort="2404" icon={<StorageIcon />}></CodeServerItem>
          </Grid>
          <Grid item xs={12}>
            <CodeServerItem name="Lab" internalPort="18005" externalPort="2405" icon={<LandscapeIcon />}></CodeServerItem>
          </Grid>
          <Grid item xs={12}>
            <CodeServerItem name="View" internalPort="18006" externalPort="2406" icon={<CIcon content={brandSet.cibReact} />}></CodeServerItem>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}