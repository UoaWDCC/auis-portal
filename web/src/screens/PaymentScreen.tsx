function PaymentScreen() {
    return (
        <div style={{ paddingLeft: '350px', marginTop: '150px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', paddingBottom: '3px' }}>
            Review Order
          </h1>
          <div style={{ borderBottom: '1px solid #ccc', width: '700px', marginBottom: '10px' }}></div>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', paddingTop: '25px', paddingLeft: '30px' }}>Two Semester Membership:</h2>
          <h3 style={{ fontSize: '15px', paddingTop: '11px', paddingLeft: '50px' }}>
            - Full-year <i>free</i> access to all AUIS events (except steins, balls, and select events)
          </h3>
          <h4 style={{ fontSize: '15px', paddingLeft: '50px', paddingTop: '4px' }}>
            - Discounted tickets to other host events
          </h4>
          
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '370px' }}>$15.00 NZD</span>
            <button style={{
              padding: '8px 25px', 
              fontSize: '20px', 
              fontWeight: 'bold',
              backgroundColor: 'orange', 
              color: 'white',
              borderRadius: '17px',
              marginLeft: '30px' }}>
              Continue
            </button>
          </div>
        </div>
      );
    }

export default PaymentScreen;
