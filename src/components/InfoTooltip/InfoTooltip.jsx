import React from 'react'
import './InfoTooltip.css'
import success from '../../images/success.svg'
import failure from '../../images/failure.svg'
import closeIcon from '../../images/closeIcon.svg'


function InfoTooltip({
    isSuccess,
    infoTooltipText,
    closeInfoTooltip,
    isInfoTooltipOpen }) {
    return (
        <div
            onClick={closeInfoTooltip}
            className={`info-tooltip ${isInfoTooltipOpen ? 'info-tooltip_type_opened' : ''}`}>
            <div className='info-tooltip__container'>
                <button className='info-tooltip__close-button'>
                    <img
                        className='info-tooltip__close-icon'
                        src={closeIcon}
                        alt='Крестик'
                        onClick={closeInfoTooltip} />
                </button>
                <img
                    className='info-tooltip__image'
                    src={isSuccess ? success : failure}
                    alt={isSuccess ? 'Иконка ОК' : 'Иконка ошибки'} />
                <p className='info-tooltip__text'>
                    {infoTooltipText}
                </p>
            </div>
        </div>
    )
}

export default InfoTooltip;