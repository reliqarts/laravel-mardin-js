/**
 * Mardin Inbox - Nav
 *
 * @type {Component}
 */

import React from 'react';

import Ad from './Ad';
import { Link, IndexLink } from 'react-router';

let Nav = (props) => {
    return (
        <aside className="sec-side sr-side">
            <section id="menu" className="sr-card list nav">
                <ul>
                    <li>
                        <IndexLink to="/" activeClassName="active"><span className="icon icon-f-envelope-3"></span> All</IndexLink>
                    </li>
                    <li>
                        <Link to="unread" activeClassName="active"><span className="icon icon-f-email-2"></span> Unread</Link>
                    </li>
                    {/*
                    <li>
                        <Link to="starred" activeClassName="active"><span className="icon icon-f-rank-army-star-badge-2"></span> Starred</Link>
                    </li>
                    <li>
                        <Link to="archived" activeClassName="active"><span className="icon icon-f-boxes-2"></span> Archived</Link>
                    </li>
                    <li>
                        <Link to="trashed" activeClassName="active"><span className="icon icon-f-bin-2"></span> Trashed</Link>
                    </li>
                    */}
                </ul>
            </section>
        </aside>
    )
};

export default Nav;