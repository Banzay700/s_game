import PropTypes from 'prop-types'
import { btnVariant, containerVariant } from './Button.variants'

const Button = ({ size = 'large', children, onClick }) => {
  return (
    <div className={containerVariant({ size })}>
      <button className={btnVariant({ size })} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

Button.propTypes = {
  size: PropTypes.oneOf(['medium', 'large']),
  children: PropTypes.node,
  onClick: PropTypes.func,
}

export default Button
