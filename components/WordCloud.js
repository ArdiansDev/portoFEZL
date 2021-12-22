import React from "react";
import { useState } from "react";

export function WordCloud({ options, onChange }) {
    const [selected, setSelected] = useState([]);
    let idsSelected = selected?.map(({id}) => id);
    
    const onChangeSelected = (status, option) => {
        let newSelected = JSON.parse(JSON.stringify(selected));
       
        if(status === "select"){
            newSelected.push(option);
            let idsSelected = newSelected?.map(({id}) => id);
            setSelected(newSelected)
            onChange(idsSelected)
        }

        if(status === "unselect"){
            let filteredSelected = newSelected.filter(selected => selected.id !== option.id);
            let idsSelected = filteredSelected?.map(({id}) => id);
            setSelected(filteredSelected)
            onChange(idsSelected.length > 0 ? idsSelected : null)
        }
    }

    return (
        <div className="space-y-4">
            <div className="sm:px-8 gap-3 flex flex-wrap justify-center w-full">
              {options?.map((option) => (
                <div key={option.id} className={`${idsSelected.includes(option.id) ? "bg-base-100 border-base-200 text-base-900" : "bg-white border-gray-200 text-gray-900"} focus:ring-base-500 p-4 w-max text-sm leading-5 font-medium border rounded-12 cursor-pointer`}
                    onClick={() => onChangeSelected(idsSelected.includes(option.id) ? "unselect" : "select", option)}
                >
                    {option.content}
                </div>
              ))}
            </div>
        </div>
    )
}