import PropTypes from 'prop-types'
import { textVariants } from './Text.variants'

const Text = ({
  variant = 'body24r',
  color = 'white',
  textAlign = 'left',
  mt = '0',
  mb = '0',
  children,
  className,
}) => {
  return (
    <p
      className={textVariants({ variant, color, className })}
      style={{ textAlign, marginTop: mt, marginBottom: mb }}
    >
      {children}
    </p>
  )
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'body24r',
    'body48r',
    'body48m',
    'body56m',
    'buttonSmall',
    'button',
  ]),
  color: PropTypes.oneOf(['white', 'gray', 'accent', 'button']),
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  mt: PropTypes.string,
  mb: PropTypes.string,
  className: PropTypes.string,
}

export default Text
