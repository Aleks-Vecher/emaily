// SurveyField contains logic to render a single label and text input

import React from 'react'
// two level deep distraction below
const SurveyField = ({input, label, meta: {error, touched}}) => {  // we take all benefit from props input
  return (
      <div>
        <label>{label}</label>
        <input {...input} style={{marginBottom: '5px'}}/>
        <div className="red-text" style={{marginBottom: '20px'}}>
          {touched && error}
        </div>
      </div>
  )
}

export default SurveyField
// until a user touches the field, do not attempt to show the validation message