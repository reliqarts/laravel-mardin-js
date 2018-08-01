/**
 * Mardin
 *
 * Common CSS parts
 *
 * @type string
 */

let grayDarker = '#222',
    grayDark = '#333',
    gray = '#555',
    grayLight = '#777',
    grayLighter = '#eee',
    primaryColor = '#86B549',
    secondaryColor = '#1682B0',
    dangerColor = '#f25158';

let clearfix = `
    clear: both;

    &:after {
        clear: both;
        content: '';
        display: block;
    }
`;

export default `
    clear: both;
    display: block;
    max-width: 100%;
    width: 100%;

    svg {
        vertical-align: middle;
    }

    > aside,
    > main {
        float: left;
    }

    .light {
        opacity: .5;
    }

    .sec-side {
        padding-right: 1rem;
        width: 25%;
    }

    .sec-main {
        padding-left: 1rem;
        width: 75%;
    }

    .sec-side,
    .sec-main {
        .sec-card {
            background-color: rgba(249, 249, 249, .9);
            box-shadow: 0 1px 2px 0 rgba(17, 17, 17, .0681);
            border: 1px solid transparent;
            margin: 0 0 20px;
            border-radius: 3px;
            overflow: hidden;

            > .card-title {
                background: #fff;
                border-bottom: 1px solid ${secondaryColor};
                margin: 0;
                min-height: 45px;
                padding: .7rem 1rem;

                > span {
                    display: inline-block;
                    font-size: 1.2rem;
                    margin-top: 3px;
                }
            }

            p {
                &.empty {
                    color: #777;
                    padding: 1rem;
                    text-align: center;

                    > .icon {
                        color: rgba(119, 119, 119, .7);
                        display: block;
                        font-size: 3em;
                        margin: 1rem auto 1.2rem;
                    }
                }
            }

            div {
                .thread-list {
                    margin: 0;
                    border: none;
                    display: table;
                    padding: 0;

                    thead,
                    tbody {
                        th,
                        td {
                            padding: .5rem .625rem .625rem;
                        }
                    }

                    thead {
                        background-color: #f5f5f7;
                        border: none;

                        tr {
                            th {
                                font-size: .8rem;
                                font-weight: 300;
                                text-transform: uppercase;

                                &.cbx {
                                    width: 2%;
                                }

                                &.lst {
                                    width: 65%;
                                }
                            }
                        }
                    }

                    tbody {
                        background: rgba(254, 254, 254, .9);

                        tr {
                            &.thread {
                                background-color: rgba(255, 255, 255, .8);
                                border: solid #eeeeee;
                                border-width: 1px 0 0;
                                cursor: pointer;
                                display: table-row;
                                overflow: hidden;
                                padding: 1rem 0;
                                position: relative;

                                td {
                                    &.cbx {
                                        width: 2%;
                                    }

                                    &.lst {
                                        width: 65%;
                                    }

                                    &.sndr {
                                        white-space: nowrap;

                                        img {
                                            background: #fff url(../img/person-silhouette.png) no-repeat center/contain;
                                            color: transparent;
                                            box-shadow: 0 1px 2px 0 rgba(17, 17, 17, .29);
                                            border-radius: 40px;
                                            display: inline-block;
                                            height: 24px;
                                            width: 24px;
                                            position: relative;
                                            vertical-align: middle;
                                            z-index: 1;

                                            & + span {
                                                display: inline-block;
                                                margin-left: .6rem;
                                                vertical-align: middle;
                                                max-width: 100px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                            }
                                        }
                                    }

                                    &.upd {
                                        font-size: .75em;
                                        width: 80px;
                                    }
                                }

                                &.new {
                                    background-color: #fff9d0; 
                                    font-weight: bold;
                                }

                                &.selected {
                                    background-color: rgba(134, 181, 73, .2);
                                    border-color: rgba(134, 181, 73, .31);
                                }
                            }
                        }
                    }
                }
            }

            .card-footer {
                background: #fff;
                color: #7d7d7d;
                font-size: 14px;
                font-size: 1rem;
                padding: .5rem 1rem;
                min-height: 45px;
            }

            .card-footer, .thread-updater {
                background-color: #f7f7f7;
                border-top: 1px solid #eeeeee;
                padding: 1rem 1rem .7rem;

                form {
                    .actions {
                        border-top: 1px dotted rgba(12, 63, 86, .08);
                        display: flex;
                        align-items: flex-start;
                        justify-content: space-between;
                        border-color: rgba(142, 142, 142, .22);
                        margin-top: 1rem;
                        padding: 1rem 0 .5rem;

                        .action-info {
                            color: #777777;
                            flex: 1 1 80%;
                        }

                        .buttons {
                            flex: 1 1 20%;
                            text-align: right;

                            .btn {
                                box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1162);
                                min-width: 5.5rem;
                            }
                        }
                    }

                    .field {
                        textarea {
                            border: 1px solid #eee;
                            border-radius: 0;
                            margin: 0;
                            padding: .5rem;
                            width: 100%;
                            transition: box-shadow .5s, border-color .25s ease-in-out;
                            -webkit-appearance: none;

                            &:hover, &:focus {
                                border-color: ${primaryColor};
                                color: ${secondaryColor};
                            }
                        }

                        .te-companion {
                            color: #777777;
                            padding: 0;

                            .red {
                                color: ${dangerColor};
                            }
                        } 
                    }
                }
            }

            .mardin-actions {
                border: 1px solid #eee;
                border-radius: 3px;
                list-style-type: none;
                color: ${grayLight};
                display: inline-block;
                float: right;
                margin: 0 0 0 1rem;
                padding: 0;
                
                * {
                    vertical-align: middle;
                }

                li {
                    display: block;
                    float: left;

                    a {
                        color: #777;
                        display: inline-block;
                        padding: 0 .5rem;
                        text-decoration: none;
                        font-size: 1rem;
                        text-align: center;

                        svg,
                        .icon {
                            position: relative;
                            top: -.1em;
                        }

                        &:hover {
                            color: ${primaryColor};
                        }
                    }

                    &:not(:last-child) {
                        border-right: 1px solid #eee;
                    }
                }
            }

            .mardin-cbx {
                display: inline-block;
                font-family: Verdana;
                font-size: 12px;
                width: 15px;
                height: 15px;
                padding: 0;
                text-align: center;
                border: 1px solid #ccc;
                border-radius: 2px;
                cursor: pointer;
                -webkit-user-select: none;
                vertical-align: middle;

                label {
                    display: none;
                }

                svg, .icon {
                    font-size: 1.1em;
                    position: relative;
                    top: -.3em;
                }
            }

            .thread-messages {
                background: rgba(255, 255, 255, .8);
                border-radius: 0;
                margin: 0;
                max-height: 500px;
                overflow-y: auto;
                padding: 0;
                transition: all 200ms;
                width: 100%;

                * {
                    transition: all 200ms;
                }

                > .message {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-around;
                    margin: 0 .5rem;
                    overflow: hidden;
                    padding: 1rem;

                    > * {
                        padding: .5rem;
                    }

                    .bdy-upd {
                        flex: 1 1 100%;
                        overflow: auto;
                        width: auto;

                        .sndr-name {
                            display: block;
                            font-weight: bold;
                        }

                        .bdy {
                            word-wrap: break-word;
                            margin-bottom: .5rem;
                        }

                        .upd {
                            color: #7a7a7a;
                            display: block;
                            text-align: right;
                            opacity: .8;
                        }
                    }

                    .sndr {
                        flex: 1 0 75px;

                        a {
                            display: block;

                            > * {
                                margin: 0 .3rem;
                            }

                            img {
                                background: #fff url(../img/person-silhouette.png) no-repeat center/contain;
                                color: transparent;
                                box-shadow: 0 1px 2px 0 rgba(17, 17, 17, .29);
                                border-radius: 40px;
                                display: inline-block;
                                position: relative;
                                vertical-align: middle;
                                width: 100%;
                                z-index: 1;
                                height: 50px;
                                width: 50px;
                            }
                        }
                    }

                    &.mine {
                        background-color: #f2f2f2;
                    }

                    &:not(:last-child) {
                        border-bottom: 1px solid #e6e6e6;
                    }
                }
            }

            &.messages {
                h1 {
                    border-bottom: 2px solid rgba(#eee, .43);
                    
                    &.new, &[contenteditable="true"] {
                        color: ${primaryColor};
                        cursor: text;
                        outline: none;
                    }
                }

                .info-bar {
                    color: #777;

                    ${clearfix}
                }
            }

            &.loading {
                min-height: 200px;

                * {
                   opacity: .015;
                }
            }

            &.list {
                ul {
                    display: block;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    width: 100%;

                    li {
                        background: rgba(241, 241, 241, .4);
                        display: block;

                        a {
                            display: block;
                            padding: .5rem 1rem;
                            text-decoration: none;
                            transition: all 200ms;

                            > .icon {
                                color: inherit;
                            }

                            &:hover {
                                color: #47979a;
                            }

                            &.active {
                                background: #fefefe;
                                color: #7eaa45;

                                > .icon {
                                    color: inherit;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    ${clearfix}
`;
