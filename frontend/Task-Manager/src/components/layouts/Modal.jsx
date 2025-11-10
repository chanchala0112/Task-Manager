import React from 'react'

const Modal = ({children, isOpen, onClose, title}) => {
    if (!isOpen) return;
    
  return <div className="">
    <div className="">
      {/* Modal Content*/}
    </div>
    <div className="">
      {/*Modal header*/}

      <div className="">
        <h3 className="">
          {title}
        </h3>

        <button 
          type="button"
          className=""
          onClick={onClose}
        >

        <svg 
          className=""
          aria-hidden="true"
          xmlns="https://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >

        <path 
          strocke="currentColoe"
          strockeLinecap="round"
          strockeLinejoin="round"
          strockeWidth="2"
          d="ml 1 6 6m0 0 6 6M7 716-6M7 7l-6 6"
        />

        </svg>
        </button>

      </div>

      <div className="">
        {children}
      </div>

    </div>
  </div>
}

export default Modal