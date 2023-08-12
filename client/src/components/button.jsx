const Button = ({ children, onClick }) => {
  return (
    <>
      <div className="group">
        <button
          onClick={onClick}
          className="flex items-center px-1 py-1 sm:px-3 md:py-2 md:px-4 bg-gray-200 rounded-full overflow-hidden font-medium text-base leading-6 font-sans text-gray-800 tracking-tighter group relative"
        >
          <span className="flex flex-col h-6 overflow-hidden relative z-30 text-lg sm:text-xl md:text-xl ">
            <span className="text-white transform -translate-y-full group-hover:transform group-hover:-translate-y-1 duration-300 ease-in-out">
              {children}
            </span>
            <span
              className="text-black transform -translate-y-8 
            group-hover:transform group-hover:translate-y-full duration-300 ease-in-out"
            >
              {children}
            </span>
          </span>
          <span className="z-30">
            <span className="ml-2 group-hover:text-white ">
              {/*  after:content-[''] after:bg-black after:rounded-full hover:after:w-72 hover:after:h-72  hover:bg-red-300 */}
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </span>
          </span>
          <span className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black rounded-full w-0 h-0 group-hover:w-full group-hover:h-full transition-all duration-300 ease-in-out"></span>
        </button>
      </div>
    </>
  )
}

export default Button
