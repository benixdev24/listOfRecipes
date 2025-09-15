import React, { useState } from 'react';
import { ButtonEnter } from './ButtonEnter.jsx';

export function Tool({ drugs, isVisibleEnter, isVisible, onClickEnter,  onClickHandleClick }) {
    const [wordSearch, setWordSearch] = useState('');

    function handleChangeInInput(e) {
        setWordSearch(e.target.value.toLowerCase());
        isVisibleEnter();
    }
    
    return(
        <>
            <form className='flex relative w-11/12 justify-center'>
                <input 
                    type='text'
                    value={wordSearch}
                    onChange={e => handleChangeInInput(e)}
                    className='w-full p-1.5 pl-10 bg-gray-200 border-2 border-[#1e403f] rounded-xl outline-none' 
                    placeholder='Search here' 
                />
                <i className="fa-solid fa-magnifying-glass absolute left-3 self-center text-[#CCCCCC]"></i>
            </form>
            {
                wordSearch.trim() !== '' ? drugs
                    .filter(drug => (
                        drug.tradeName.includes(wordSearch.trim()) || 
                        drug.genericName.includes(wordSearch.trim()) || 
                        drug.reagents.includes(wordSearch.trim())
                    ))
                    .map(drug=> (
                        <ul 
                            key={`${drug.tradeName}-${Math.random()}`} 
                            className='flex w-11/12 mt-2.5 flex-wrap'
                        >
                            <li 
                                key={`li-${drug.tradeName}-${Math.random()}`} 
                                className='flex relative w-full h-fit my-1 p-2.5 bg-white rounded-2xl'
                            >
                                <p className='flex w-2/3 grow'>
                                    {`Nombre comercial: ${drug.tradeName.toUpperCase()}.`}<br />
                                    {` Nombre generico: ${drug.genericName.toUpperCase()}.`}
                                </p>
                                <details className='max-w-1/3'>
                                    <summary>Reagents</summary>
                                    {drug.reagents.map(d => (
                                            <p 
                                                key={`${d}-${Math.random()}`}
                                                className='flex m-1 p-1 bg-gray-200 justify-center rounded-2xl break-words overflow-hidden'
                                            >
                                                {d.toUpperCase()}
                                            </p>
                                    ))}
                                </details>
                            </li>
                        </ul>
                    )) : (
                        <section className='flex flex-col h-full justify-center items-center grow'>
                            <p className='flex mt-10 mb-5 text-center text-[#A0A0A0] self-center'>You have not yet searched for any medication</p>
                            <i className="fa-solid fa-prescription-bottle-medical fa-5x mt-2.5 text-[#A0A0A0]"></i>
                        </section>
                    )
            }
            <ButtonEnter 
                onClick={() => onClickHandleClick(isVisible)} 
                isVisible={isVisible} 
                onClickEnter={onClickEnter}  
            />
        </>
    )
}