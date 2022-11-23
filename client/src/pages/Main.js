import { Link } from 'react-router-dom'
import './Main.css';

const Main = () => {
    return (
        <>
         <div className='container'>

        <div className='main'>

        <div className='main-h1'>
        <h1>Best Books in One Place</h1>
        </div>
        <div className='main-p'>
        <p>Rent or buy online</p>

        </div>

        </div>
  

        <div className='info'>

        
        <h1>How It Works?</h1>

<p>
You may receive a new or a used textbook, based on availability. All used textbooks will be in acceptable rental condition, 
as determined by us. If you are not satisfied with the book you receive, you can return it for a refund within 30 days
for semester-long rentals or 15 days for monthly (30, 60 or 90 day) rentals. 
See Rental Terms and Conditions for more on initial return window and refund policy.
With fundraising for all, we are creating the giving layer of the internet: a space where individuals, teams, organisations</p>
</div>
        </div>
        </>
       
    );
}

export default Main;