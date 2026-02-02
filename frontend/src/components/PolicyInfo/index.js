import React from 'react'
import { useNavigate } from 'react-router-dom'
import { InfoBox, SubInfo,PreviousLink } from 'styles/components/InfoBox'

const PolicyInfo = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <>
      <PreviousLink onClick={goBack}>Previous page</PreviousLink>
      <InfoBox>
        <div className='title'>Policy Info</div>
        <SubInfo>
            <div>
                <p>Policy number</p>
                <div className='box-value'>HO00000098-01</div>
            </div>
            <div>
                <p>Insured</p>
                <div className='box-value'>Durent Adam</div>
            </div>
        </SubInfo>
      </InfoBox>
    </>
  )
}

export default PolicyInfo