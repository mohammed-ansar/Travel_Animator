const Destination = () => {
    return (
      <div className="relative flex items-center justify-center w-7 h-7">
        {/* Outer Circle */}
        <div className="absolute w-7 h-7 bg-white rounded-full"></div>
        {/* Inner Circle */}
        <div
          className="absolute w-6 h-6 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #FEA701, #F86B01)',
          }}
        ></div>
        {/* Airplane Icon */}
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="absolute w-3.5 h-3.5"
        fill="#FFFFFF"
      >
<path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32L0 64 0 368 0 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-247.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48l0-16z"/>
      </svg>
      </div>
    );
  };
  
  export default Destination;