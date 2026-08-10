import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import CurrentOrder from '../components/CurrentOrder';
import OrderHistory from '../components/OrderHistory';
import CheckoutCard from '../components/CheckoutCard';

function Home () {
    return (
        <div className= 'container'>
            <Sidebar />

            <ChatWindow />

            <div className='right-panel'>
                <CurrentOrder />
                <OrderHistory />
            </div>

            <CheckoutCard />
        </div>
    );
}

export default Home;