const Plane = () => {
    return (
      <div className="relative flex items-center justify-center w-7 h-7">
        {/* Outer Circle */}
        <div className="absolute w-7 h-7 bg-white rounded-full"></div>
        {/* Inner Circle */}
        <div
          className="absolute w-6 h-6 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #0787F5, #0F96E6)',
          }}
        ></div>
        {/* Airplane Icon */}
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        className="absolute w-3.5 h-3.5"
        fill="#FFFFFF"
      >
        <path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z" />
      </svg>
      </div>
    );
  };
  
  export default Plane;