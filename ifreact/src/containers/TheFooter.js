import React from 'react'
import { CFooter, CButton } from '@coreui/react'
// import worker from './../views/service/IFWorker'
import { PingDot } from './../views/service/Ping'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="m-auto col-4">
        <PingDot />
      </div>
      <div className="m-auto text-center col-4">
        <span className="text-center mb-0">Hwaipy &copy; 2020</span>
      </div>
      <div className="m-auto text-right col-4">
        <div className="mfs-auto mr-1">
          <CButton id="ButSpec" href="http://www.beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" color="link">
            {'沪ICP备20021828号'}
          </CButton>
        </div>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
