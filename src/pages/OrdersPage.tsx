import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { IOrder } from '../types/order'

const OrdersPage = () => {
  const orders = useAppSelector(state => state.order)
  const user = useAppSelector(state => state.user)
  const filteredOrders = orders.filter(
    order => order.username === user.username
  )

  return (
    <section className='max-w-7xl mx-auto my-6 px-4 md:my-8 min-h-[75vw] md:min-h-[50vh]'>
      <header className='mb-2 md:mb-4'>
        <h1 className='text-3xl md:text-4xl font-bold uppercase'>Orders</h1>
      </header>
      {filteredOrders.length > 0 && (
        <div className='grid grid-cols-1 gap-0.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {filteredOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
      {filteredOrders.length === 0 && (
        <div className='flex flex-col items-center justify-center border border-neutral min-h-[inherit]'>
          <p className='text-2xl mb-4'>No orders found</p>
          <Link
            to='/products'
            className='bg-primary text-light px-4 py-2 rounded'
          >
            Create an order
          </Link>
        </div>
      )}
    </section>
  )
}

const OrderCard = ({ order }: { order: IOrder }) => {
  const date = new Date(order.date)
  const fixedDate = `${date.getFullYear()}-${date.getDate()}-${date.getDay()} ${date.getHours()}:${date.getMinutes().toString().padStart(2,'0')}`
  return (
    <article className='space-y-2 rounded text-center border border-neutral p-4 hover:border-secondary'>
      <p>
        <strong>Order: </strong>#{order.id}
      </p>
      <p>
        <strong>Date: </strong>{fixedDate}
      </p>
      <p>
        <strong>Status: </strong>
        <span className='text-green-800 bg-green-200 p-2 rounded capitalize'>{order.status}</span>
      </p>
      <p>
        <strong>Total: </strong>${order.total}
      </p>
      <p>
        <Link
          to={`/orders/${order.id}`}
          className='inline-block text-center rounded font-bold text-secondary'
        >
          Details
        </Link>
      </p>
    </article>
  )
}

export default OrdersPage
