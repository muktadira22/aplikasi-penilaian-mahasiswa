import React from 'react'
import PropTypes from 'prop-types'

const List = props => {
  const {college, aspect} = props
  return (
    <React.Fragment>
      {
        college.map((col, keyCol) => 
          <div key={keyCol}>
            
          </div>
        )
      }
    </React.Fragment>
  )
}

List.propTypes = {
  college: PropTypes.number.isRequired,
  aspect: PropTypes.number.isRequired,
}

export default List