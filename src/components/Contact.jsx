import DogImg from '../assets/img/dogs/dog-contact.png';

const Contact = () => {
  return (
    <section className='bg-yellow-secondary pt-6'>
      <div className='container mx-auto'>
         <div className='flex flex-col lg:flex-row justify-around'>
           <div className='order-1 lg:-order-1 lg:mt-16'>
             <img className='-mb-[12px]' src={DogImg} alt="" />
           </div>
           <div className='flex flex-col items-center justify-center'>
              <div className='text-xl text-orange font-semibold mb-3'>Contact Us</div>
              <div className='text-4xl text-blue font-extrabold'>09301738569</div>
              <div className='mb-7 mt-2 text-blue'>Opening Hours: Mon - Sun: 10 am - 6pm</div>
              <a className='btn flex items-center py-4 px-5 font-semibold ' href='#appointment'>Get an appointment</a>
           </div>
         </div>
      </div>
    </section>
  );
};

export default Contact;