import PropTypes from 'prop-types'
import { headingVariants } from './Heading.variants'

const Heading = ({
  variant = 'h1',
  color = 'white',
  mt = '0',
  mb = '0',
  uppercase = false,
  className,
  children,
}) => {
  const Tag = variant === 'numbers' ? 'span' : variant

  return (
    <Tag
      className={headingVariants({ variant, color, uppercase, className })}
      style={{ marginTop: mt, marginBottom: mb }}
    >
      {children}
    </Tag>
  )
}

Heading.propTypes = {
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'numbers']),
  color: PropTypes.oneOf(['white', 'gray', 'accent']),
  uppercase: PropTypes.bool,
  mt: PropTypes.string,
  mb: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Heading
