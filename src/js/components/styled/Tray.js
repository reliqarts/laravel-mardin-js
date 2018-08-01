/**
 * Mardin
 *
 * Styled Tray Component
 *
 * @type styled('div')
 */

import styled from 'react-emotion';

export default styled('div')`
    display: inline-block;
    margin: 0;
    padding: 0;
    position: relative;
    top: .5em;
    vertical-align: middle;

    * {
        box-sizing: border-box;
    }

    .tray {
        background-color: #fefefe;
        border: none;
        border-radius: 3px;
        box-shadow: 1px 1px 7rem 170rem rgba(0, 0, 0, .62);
        bottom: 20px;
        left: 20px;
        right: 20px;
        max-height: 478px;
        position: fixed;
        text-align: left;
        top: 15%;
        width: auto;
        display: none;
        z-index: 2;

        .tray-inner {
            display: flex;
            flex-direction: column;
            height: 100%;
            position: relative;

            .tray-title {
                background-color: transparent;
                border-bottom: 1px solid #f4f4f4;
                color: #555;
                font-weight: bold;
                flex: 0 0 auto;
                padding: 5px 8px;
                text-align: center;
                text-transform: none;
                width: auto;
            }

            .tray-body {
                background-color: #f5f5f5;
                -webkit-flex: 1 1 100%;
                flex: 1 1 100%;
                overflow-y: auto;

                > ul {
                    margin: 0;
                    padding: .6875rem .625rem;

                    > li {
                        display: inline-block;
                        font-size: .954rem;
                        line-height: 2.5;
                        vertical-align: middle;
                        background-color: rgba(254, 254, 254, .95);
                        box-shadow: 0 1px 2px 0 rgba(17, 17, 17, .0681);
                        border: 1px solid transparent;
                        margin: 0 0 .625rem;
                        border: 1px solid rgba(232, 231, 231, .79);
                        border-radius: 3px;
                        width: 100%;

                        .message {
                            align-items: flex-start;
                            display: flex;
                            cursor: pointer;
                            justify-content: space-around;
                            line-height: 1.4;
                            margin: 0;
                            overflow: hidden;
                            padding: .5rem;

                            > * {
                                padding: .5rem;
                            }

                            .bdy-upd {
                                flex: 1 1 100%;
                                overflow: auto;
                                width: auto;

                                .bdy {
                                    font-family: inherit;
                                    font-weight: normal;
                                    font-size: 14px;
                                    line-height: 1.6;
                                    margin-bottom: 0;
                                    text-rendering: optimizeLegibility;
                                    word-wrap: break-word;
                                }

                                .sndr-name {
                                    display: block;
                                    font-weight: bold;
                                }

                                .upd {
                                    display: block;
                                    opacity: .8;
                                    text-align: right;
                                }
                            }

                            .sndr {
                                color: transparent;
                                box-shadow: 0 1px 2px 0 rgba(17, 17, 17, .29);
                                border-radius: 35px;
                                display: inline-block;
                                height: 35px;
                                margin: 8px 0 0;
                                overflow: hidden;
                                padding: 0;
                                flex: 1 0 35px;

                                a {
                                    color: inherit;
                                    cursor: default;
                                    display: block;

                                    img {
                                        display: block;
                                        height: 35px;
                                        width: 35px;
                                        margin: 0;
                                    }
                                }
                            }

                            &.mine {
                                background-color: #f2f2f2;
                            }
                        }
                    }
                }

                .empty {
                    display: -webkit-flex;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    color: #777777;
                    height: 100%;
                    margin: 0;
                    padding: 1.7rem 1rem;
                    text-align: center;

                    svg, .icon {
                        display: inline-block;
                        margin: 0 auto 1rem;
                        font-size: 3em;
                        opacity: .2;
                        vertical-align: -35%;
                    }
                }
            }

            .tray-footer {
                background: transparent;
                border-top: 1px solid #f4f4f4;
                border-radius: 3px;
                overflow: hidden;
                padding: 0;
                font-weight: bold;
                font-size: 12px;
                font-size: .85714rem;
                flex: 0 0 auto;

                > a {
                    color: #666;
                    display: block;
                    padding: .4375rem .5rem;
                    text-decoration: none;
                    text-align: center;

                    &:hover {
                        background-color: rgba(134, 181, 73, .012);
                        color: #47979a;
                    }
                }
            }
        }

        &:before {
            border: none;
            color: #fff;
            content: "Click anywhere outside to close.";
            display: block;
            position: absolute;
            height: auto;
            width: auto;
            right: 0;
            top: -30px;
        }

        @media screen and (min-width: 40em) {
            box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, .12);
            bottom: auto;
            left: auto;
            max-height: none;
            position: absolute;
            right: -16px;
            top: 100%;
            width: 320px;

            .tray-inner {
                display: block;
                height: auto;

                .tray-body {
                    max-height: 300px;
                }
            }

            &:before {
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid #ffffff;
                content: "";
                right: 20px;
                top: -5px;
                width: 0;
                height: 0;
            }
        }
    }

    .tray-toggle {
        svg,
        .icon {
            display: inline-block;
            font-size: 1.33333em;
            vertical-align: -15%;
            z-index: 1;
        }

        .tray-count {
            display: inline-block;
            color: #fff;
            background: #f25158;
            border-radius: 20px;
            box-shadow: 0 1px 2px 0 rgba(17, 17, 17, .0681);
            font-size: .71429rem;
            height: 17px;
            line-height: 15px;
            width: 17px;
            text-align: center;
            font-weight: normal;
            overflow: hidden;
            padding: 0;
            position: absolute;
            z-index: 2;
            top: -8px;
            right: -8px;
        }

        &:after {
            display: none;
        }

        &:hover {
            svg,
            .icon {
                opacity: .8;
            }
        }
    }

    &.open {
        .tray {
            display: block;
        }
    }
`;
