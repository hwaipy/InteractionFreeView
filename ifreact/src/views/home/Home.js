import React from 'react'
import {
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Center from 'react-center';
import { brandSet } from '@coreui/icons'

const Home = () => {
  return (
    <>
      <Center>
        <h1 className="display-3">InteractionFree</h1>
      </Center>
      <span>&nbsp;&nbsp;</span>
      <span>&nbsp;&nbsp;</span>
      <Center>
        <p className="lead">An intuitive, light-weight, reliable and cross-language RPC library for distributed system.</p>
      </Center>
      <span>&nbsp;&nbsp;</span>
      <span>&nbsp;&nbsp;</span>

      <hr className="my-2" />
      <span>&nbsp;&nbsp;</span>
      <span>&nbsp;&nbsp;</span>
      {/* <CCol xs="12" sm="12" md="12" lg="10" xl="8" className="sm"> */}


      <CRow className="align-items-center mt-3">
        <CCol col="2" className="text-center mt-3">
          <CButton color="dark" id="ButSpec" href="https://github.com/hwaipy/InteractionFreePy/blob/master/interactionfreepy/spec.md" target="_blank" rel="noopener noreferrer">
            <CIcon name="cil-notes" />
            {' Spec'}
          </CButton>
          {" "}
          <CButton color="dark" id="ButPython" href="https://github.com/hwaipy/InteractionFreePy" target="_blank" rel="noopener noreferrer">
            <CIcon content={brandSet["cibPython"]} />
            {' Python'}
          </CButton>
          {" "}
          <CButton color="dark" id="ButScala" href="https://github.com/hwaipy/InteractionFreeScala" target="_blank" rel="noopener noreferrer">
            <CIcon content={brandSet["cibScala"]} />
            {' Scala'}
          </CButton>
          {" "}
          <CButton color="dark" id="ButNodeJs" href="https://github.com/hwaipy/InteractionFreeJS" target="_blank" rel="noopener noreferrer">
            <CIcon content={brandSet["cibNodeJs"]} />
            {' Node.js'}
          </CButton>
          {" "}
          <CButton color="dark" id="ButArduino" href="" target="_blank" rel="noopener noreferrer">
            <CIcon content={brandSet["cibArduino"]} />
            {' Arduino'}
          </CButton>
        </CCol>
      </CRow>


      {/* <CCol> */}
      {/* <CTabs activeTab={0}>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink>
                <CIcon name="cil-notes" />
                {' Spec'}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                <CIcon content={brandSet["cibPython"]} />
                {' Python'}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                <CIcon content={brandSet["cibScala"]} />
                {' Scala'}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                <CIcon content={brandSet["cibNodeJs"]} />
                {' Node.js'}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                <CIcon content={brandSet["cibArduino"]} />
                {' Arduino'}
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane>
              <Center>
                <Spec></Spec> */}
      {/* {`1. ${lorem}`} */}
      {/* <CEmbed> */}
      {/* <CEmbedItem src="https://github.com/hwaipy/InteractionFreePy/blob/master/interactionfreepy/spec.md" /> */}
      {/* </CEmbed>
                <CButton block color="link">View in GitHub.</CButton>
              </Center>
            </CTabPane>
            <CTabPane>
              {`2. ${lorem}`}
            </CTabPane>
            <CTabPane>
              {`3. ${lorem}`}
            </CTabPane>
          </CTabContent>
        </CTabs> */} 
      {/* </CCol> */}
    </>
  )
}

export default Home