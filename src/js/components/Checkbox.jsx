/**
 * Mardin Inbox - Checkbox
 *
 * @type {Component}
 */
import React, { Component } from 'react';

let Checkbox = (props) => {
    let { selected, onSelect, onCheck, label, iconClass } = props,
        classes = 'mardin-cbx' + (selected ? ' selected' : '');

    iconClass = (iconClass || 'icon-f-check-1') + ' icon-only';

    return (
        <div className={classes} onClick={onSelect || onCheck}>
            <label>
                <input defaultChecked={selected} type="checkbox" />{label}
            </label>
            { selected ?
            <span className={iconClass}></span>
            : null}
        </div>
    );
}

export default Checkbox;