import { Link, useParams } from 'react-router-dom'
import { IOrder } from '../types/order'
import { ArrowIcon } from '../components/Icons'
import { useAppSelector } from '../hooks/redux'

const OrderPage = () => {
  const { orderId } = useParams()
  const orders = useAppSelector(state => state.order)
  const user = useAppSelector(state => state.user)
  const order = orders.find((order: IOrder) => order.id === Number(orderId) && order.username === user.username)

  return (
    <section className='max-w-7xl mx-auto px-4 my-4 min-h-[75vw] md:min-h-[50vh]'>
      {order && <OrderView order={order} />}
      {!order && (
        <div className='flex flex-col items-center justify-center border border-neutral min-h-[inherit]'>
          <p className='text-2xl mb-4'>No order found</p>
          <Link
            to='/orders'
            className='bg-primary text-light px-4 py-2 rounded'
          >
            Go to orders
          </Link>
        </div>
      )}
    </section>
  )
}

const OrderView = ({ order }: { order: IOrder }) => {
  const date = new Date(order.date)
  const fixedDate = `${date.getFullYear()}-${date.getDate()}-${date.getDay()} ${date.getHours()}:${date.getMinutes().toString().padStart(2,'0')}`
  return (
    <>
      <Link to='/orders' className='flex gap-1 items-center mb-4'>
        <ArrowIcon className='w-4 rotate-90' /> Go to orders
      </Link>
      <header className='flex flex-wrap items-center justify-between mb-4'>
        <h1 className='font-bold text-2xl uppercase break-all'>
          Order # {order.id}
        </h1>
        <span className='text-green-800 bg-green-200 p-2 px-3 rounded capitalize'>
          {order.status}
        </span>
      </header>
      <article className='border border-neutral rounded flex flex-wrap gap-4 justify-between p-2'>
        <p>
          <strong>Date:</strong> {fixedDate}
        </p>
        <p>
          <strong>Total:</strong> ${order.total}
        </p>
      </article>
      <h2 className='text-2xl uppercase font-bold border-b-4 border-secondary pl-2 pr-4 truncate my-4'>
        Products
      </h2>
      <div className='overflow-x-auto'>
        <table className='table w-full border border-neutral border-collapse'>
          <thead className='table-header-group'>
            <tr className='table-row'>
              <th className='table-cell text-left border border-neutral p-2'>
                Title
              </th>
              <th className='table-cell text-left border border-neutral p-2'>
                Price
              </th>
              <th className='table-cell text-left border border-neutral p-2'>
                Quantity
              </th>
              <th className='table-cell text-left border border-neutral p-2'>
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody className='table-row-group'>
            {order.products.map(product => (
              <tr key={product.id} className='table-row'>
                <td className='table-cell p-2 border border-neutral'>
                  {product.title}
                </td>
                <td className='table-cell p-2 border border-neutral'>
                  ${product.price}
                </td>
                <td className='table-cell p-2 border border-neutral'>
                  {product.quantity}
                </td>
                <td className='table-cell p-2 border border-neutral'>
                  ${product.price * product.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default OrderPage
