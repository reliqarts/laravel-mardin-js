/**
 * Mardin Inbox - Ad
 *
 * @type {Component}
 */
import React, { Component } from 'react';

export default class Ad extends Component {
    componentDidMount() {
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        if (!window.mardinAd) {
            return <span></span>;
        }

        let { slotId, classes } = this.props,
            clientId = window.mardinAd.client;
        slotId = slotId || window.mardinAd.slotId;
        classes = 'sr-ad mardin-ad ad' + (classes ? ` ${classes}` : '');

        return (
            <div className={classes}>
                <ins className="adsbygoogle"
                     style={{display: 'block'}}
                     data-ad-client={clientId}
                     data-ad-slot={slotId}
                     data-ad-format="auto">
                </ins>
            </div>
        );
    }
}