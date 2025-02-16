import React, { useState } from 'react';

const LocationSearchPanel = (props) => {
    const locations=[
        "Kempegowda International Airport, KIAL Rd, Devanahalli, Bengaluru, Karnataka",
        "Nexus Koramangala,No.21, Hosur Main Road, Koramangala, Bangalorem Karnataka",
        "Cubbon Park,Kasturba Road, Ambedkar Veedhi, Bengaluru, Karnataka",
        "Bengaluru City Junction Railway Station, Majestic, Bengaluru, Karnataka"
    ]
    return (
        <div>
            {
                locations.map(function(elem,idx){
                    return <div  key={idx} onClick={()=>{
                        props.setVehiclePanelOpen(true)
                        props.setPanelOpen(false)
                    }
                        
                    }className='flex border-2 p-2 rounded-lg border-white active:border-black items-center mb-2'>
                    <h2 className='bg-[#eeee] p-1 rounded-full'><i className="ri-map-pin-line text-xl"></i></h2>
                    <h3 className='ml-2 font-semibold text-base'>{elem}</h3>
                </div>
                })
            }
            
        </div>
    )
}
export default LocationSearchPanel;