import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100/50 hover:shadow-sm transition-all">
        <div className={`w-1.5 h-10 ${color} rounded-full`} />

        <div>
           <p className="text-[13px] text-gray-400 font-medium uppercase tracking-wider">{label}</p>
           <h3 className="text-xl md:text-2xl font-bold text-slate-800">{value}</h3>
        </div>
    </div>
  )
}

export default InfoCard