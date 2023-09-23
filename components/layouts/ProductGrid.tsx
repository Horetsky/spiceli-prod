import { FC } from 'react'
import "./style.css"
interface ProductGridProps {
    children: React.ReactNode
}

const ProductGrid: FC<ProductGridProps> = ({ children }) => {
  return (
    <div className='container product-grid'>
        { children }
    </div>
  )
}

export default ProductGrid