import React, { Fragment } from 'react'
import { Component } from "react";
import { inject, observer } from 'mobx-react'
import VFrameStore from './store';
import { Drag } from '../Drag';

export interface VFrameProps {

    vFrameStore?: VFrameStore
}


export interface VFrameState {

}

@inject('vFrameStore')
@observer
export class VFrame extends Component<VFrameProps, VFrameState>{

    clickPP = () => {
        const { vFrameStore } = this.props
        const val = Math.random()
        console.log(val)
        vFrameStore && vFrameStore.setTitle(`${val}`)
    }

    render() {
        const { vFrameStore } = this.props
        return (
            <Fragment>
                <p onClick={this.clickPP} >
                    {vFrameStore && vFrameStore.title}
                </p>
                <Drag/>
            </Fragment>
        )
    }
}