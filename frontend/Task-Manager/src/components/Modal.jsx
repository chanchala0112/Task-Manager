import React from 'react'

const Modal = ({children, isOpen, onClose, title}) => {
    if (!isOpen) return;
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-50">
          <h3 className="text-xl font-bold text-slate-800">
            {title}
          </h3>

          <button 
            type="button"
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
            onClick={onClose}
          >
            <svg 
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="https://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2.5" 
                d="M1 1 L13 13 M13 1 L1 13"
              />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal