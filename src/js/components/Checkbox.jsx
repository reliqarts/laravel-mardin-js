/**
 * Mardin Inbox - Checkbox
 *
 * @type {Component}
 */
import React from 'react';
import { IoMdCheckmark, IoMdDoneAll } from 'react-icons/io';

let Checkbox = (props) => {
    let { selected, onSelect, onCheck, label, iconClass } = props,
        classes = 'mardin-cbx' + (selected ? ' selected' : ''),
        Icon = IoMdCheckmark;

    iconClass = (iconClass || 'single');

    if (iconClass !== 'single') {
        Icon = IoMdDoneAll;
    }

    return (
        <div className={classes} onClick={onSelect || onCheck}>
            <label>
                <input defaultChecked={selected} type="checkbox" />{label}
            </label>
            { selected ?
            <Icon/>
            : null}
        </div>
    );
}

export default Checkbox;