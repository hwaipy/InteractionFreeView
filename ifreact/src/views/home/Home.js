import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CJumbotron,
  CNavLink,
  CNav,
  CNavItem,
  CTabs,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Center from 'react-center';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'

const Home = () => {
  return (
    <>
      <CCol>
        <CTabs activeTab={0}>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink>
                <CIcon name="cil-notes" />
                {' Spec'}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                <CIcon name="cil-calculator" />
                {' Spec'}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                <CIcon name="cil-calculator" />
                {' Spec'}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                <CIcon name="cil-basket" />
                {' Profile'}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                <CIcon name="cil-chart-pie" />
                {' Messages'}
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane>
              {`1. ${lorem}`}
            </CTabPane>
            <CTabPane>
              {`2. ${lorem}`}
            </CTabPane>
            <CTabPane>
              {`3. ${lorem}`}
            </CTabPane>
          </CTabContent>
        </CTabs>
      </CCol>

    </>
  )
}

export default Home
