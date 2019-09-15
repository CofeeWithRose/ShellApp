import { Component } from "react";
import { inject, observer } from "mobx-react";
import VFrameStore from "../VFrame/store";
import React from 'react'

export interface DragProps {

    vFrameStore?: VFrameStore,

}


@inject(({vFrameStore})=>({
    vFrameStore,
}))
@observer
export class Drag extends Component<DragProps, {}> {

    render(){
        const { vFrameStore } = this.props
        return(
            <p>{ vFrameStore&& vFrameStore.titleName}</p>
        )
    }
}